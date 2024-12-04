from django.contrib.auth import get_user_model
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer, LoginSerializer, ResetPasswordSerializer, SetPasswordSerializer
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ValidationError
from rest_framework.permissions import AllowAny 

User = get_user_model()

# Register User View - No authentication required for registration
class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = []  # No authentication required for this view

# Login User View - Generates JWT tokens, no authentication needed
class LoginUserView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        # Handle user login and JWT generation
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = serializer.validated_data['user']
        
        # Create refresh and access tokens
        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token
        
        # Return the tokens as part of the response
        return Response({
            'access_token': str(access_token),
            'refresh_token': str(refresh),
        })

# Password Reset View - Allows password reset request (no authentication needed)
class PasswordResetView(generics.GenericAPIView):
    serializer_class = ResetPasswordSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        # Validate reset request (email check)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Handle the logic for sending a password reset email
        # For now, we are just simulating the response
        email = serializer.validated_data['email']
        
        user = User.objects.filter(email=email).first()
        if not user:
            raise ValidationError("Email not found")
        
        # Simulate email sending (In real scenario, you'd send an actual email here)
        return Response({"detail": "Password reset email sent"}, status=status.HTTP_200_OK)

# Set Password View - Allows authenticated user to change their password
class SetPasswordView(generics.GenericAPIView):
    serializer_class = SetPasswordSerializer
    permission_classes = [AllowAny ]  # Only authenticated users can access this view
    

    def post(self, request, *args, **kwargs):
        # Ensure user is authenticated and update their password
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Get the authenticated user and update their password
        user = request.user  # This gets the authenticated user
        new_password = serializer.validated_data['new_password']
        user.set_password(new_password)
        user.save()  # Save the updated user
        
        return Response({"detail": "Password has been updated"}, status=status.HTTP_200_OK)
