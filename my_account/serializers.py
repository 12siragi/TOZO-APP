from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.core.exceptions import ValidationError

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        # Create a new user with hashed password
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        
        # Validate the email and password
        user = User.objects.filter(email=email).first()
        if user and user.check_password(password):
            return {'user': user}
        raise ValidationError("Invalid credentials")

class ResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        # Check if the user with this email exists
        user = User.objects.filter(email=value).first()
        if not user:
            raise serializers.ValidationError("Email not found")
        return value

class SetPasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    def validate(self, data):
        # Check that the new password and confirm password match
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords must match")
        return data
