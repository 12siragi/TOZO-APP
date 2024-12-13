from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.password_validation import validate_password
from rest_framework.exceptions import ValidationError
from django.contrib.auth.tokens import default_token_generator
from django.core.exceptions import ObjectDoesNotExist

UserModel = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = UserModel
        fields = ("id", "username", "email", "password1", "password2")
        extra_kwargs = {
            "password1": {"write_only": True},
            "password2": {"write_only": True},
        }

    def validate(self, attrs):
        # Check if both passwords match
        if attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError("Passwords do not match!")

        password = attrs.get("password1", "")
        # Check if password meets minimum length requirements
        if len(password) < 8:
            raise serializers.ValidationError("Passwords must be at least 8 characters!")

        # Email validation: Check if email is in the correct format
        email = attrs.get('email', '')
        if not email or '@' not in email:
            raise serializers.ValidationError("Invalid email format.")
        
        # Check if the email already exists in the database
        if UserModel.objects.filter(email=email).exists():
            raise serializers.ValidationError("A user with this email already exists.")

        return attrs

    def create(self, validated_data):
        # Remove password2 field before creating the user
        password = validated_data.pop("password1")
        validated_data.pop("password2")

        # Create the user
        user = UserModel.objects.create_user(password=password, **validated_data)

        # Generate a token for email verification (optional)
        refresh = RefreshToken.for_user(user)
        # Email verification token or link can be sent via email
        # Example: Send verification link with token

        return user
    

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        user = UserModel.objects.filter(email=email).first()
        if user is None:
            raise ValidationError("Invalid email or password.")

        if not user.check_password(password):
            raise ValidationError("Incorrect password for this email.")
        
        # Generate tokens for the user
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }



class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if not UserModel.objects.filter(email=value).exists():
            raise ValidationError("No user with this email address.")
        return value

    def save(self):
        email = self.validated_data['email']
        try:
            user = UserModel.objects.get(email=email)
        except ObjectDoesNotExist:
            raise ValidationError("No user with this email address.")
        
        # Generate a password reset token and send it via email (to be implemented)
        token = default_token_generator.make_token(user)
        reset_url = f"http://localhost:8000/api/password-reset-confirm/?token={token}&email={email}"
        # send reset_url via email logic goes here
        return {"message": "Password reset email has been sent."}


class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True, validators=[validate_password])

    def validate_old_password(self, value):
        # Use the request context to check the user's old password
        user = self.context['request'].user
        if not user.check_password(value):
            raise ValidationError("Old password is incorrect.")
        return value


class EmailVerificationSerializer(serializers.Serializer):
    token = serializers.CharField()
    email = serializers.EmailField(write_only=True)

    def validate_token(self, value):
        # Extract the email from the context or request data
        email = self.context.get('email') or self.initial_data.get('email')

        if not email:
            raise serializers.ValidationError("Email is required for verification.")
        
        try:
            user = UserModel.objects.get(email=email)
        except UserModel.DoesNotExist:
            raise serializers.ValidationError("User does not exist.")

        # Check if the token is valid and not expired
        if default_token_generator.check_token(user, value):
            if user.is_verified:
                raise serializers.ValidationError("Email is already verified.")
            user.is_verified = True
            user.save()
            return value
        else:
            raise serializers.ValidationError("Invalid or expired token.")
        
class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['id', 'username', 'email']  # Include other fields as needed

    def update(self, instance, validated_data):
        # Update user instance with validated data
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.save()
        return instance
