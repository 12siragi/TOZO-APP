from django.contrib.auth import get_user_model
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from django.core.exceptions import ValidationError
from django.urls import reverse
from django.core.mail import send_mail
from .serializers import RegisterSerializer, LoginSerializer, ResetPasswordSerializer, SetPasswordSerializer
from .tokens import email_verification_token
from django.contrib.auth.tokens import PasswordResetTokenGenerator

User = get_user_model()
reset_token_generator = PasswordResetTokenGenerator()


# Register User View
class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        user = serializer.save()
        user.is_active = False  # Deactivate the user until email verification
        user.save()  # Save the `is_active` status

        # Generate the verification token
        token = email_verification_token.make_token(user)

        # Construct the verification URL
        verification_url = f"http://localhost:8000{reverse('verify-email', kwargs={'uid': user.id, 'token': token})}"

        # Send the verification email
        send_mail(
            subject='Verify Your Email',
            message=f'Hi {user.username}, click the link to verify your email: {verification_url}',
            from_email='noreply@yourapp.com',
            recipient_list=[user.email],
            fail_silently=False,
        )


# Login User View
class LoginUserView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token
        return Response({
            'access_token': str(access_token),
            'refresh_token': str(refresh),
        })


# Logout View
class LogoutView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        refresh_token = request.data.get("refresh_token")
        if not refresh_token:
            return Response({"detail": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"detail": "Logged out successfully. Tokens will expire naturally."}, status=status.HTTP_200_OK)


# Password Reset View
class PasswordResetView(generics.GenericAPIView):
    serializer_class = ResetPasswordSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        user = User.objects.filter(email=email).first()

        if user:
            # Generate reset token
            token = reset_token_generator.make_token(user)
            reset_link = f"http://localhost:8000/reset-password/{user.id}/{token}"

            # Send reset email
            send_mail(
                subject='Password Reset Request',
                message=f'Click here to reset your password: {reset_link}',
                from_email='noreply@yourapp.com',
                recipient_list=[user.email],
                fail_silently=False,
            )

        return Response({"detail": "If this email exists, a reset link has been sent."}, status=status.HTTP_200_OK)


# Set Password View
class SetPasswordView(generics.GenericAPIView):
    serializer_class = SetPasswordSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = request.user
        new_password = serializer.validated_data['new_password']
        user.set_password(new_password)
        user.save()
        return Response({"detail": "Password has been updated"}, status=status.HTTP_200_OK)


# Verify Email View
class VerifyEmailView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, uid, token, *args, **kwargs):
        try:
            # Find the user by their ID
            user = User.objects.get(id=uid)

            # Verify the token
            if email_verification_token.check_token(user, token):
                user.is_active = True  # Activate the user
                user.save()
                return Response({"detail": "Email verified successfully"}, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "Invalid user"}, status=status.HTTP_400_BAD_REQUEST)
