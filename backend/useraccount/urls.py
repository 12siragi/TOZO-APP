from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import (
    UserRegistrationAPIView,
    UserLoginAPIView,
    PasswordResetAPIView,
    PasswordChangeAPIView,
    EmailVerificationAPIView,
    google_login_callback,
    validate_google_token
)

urlpatterns = [
    # Token obtain and refresh views (for JWT tokens)
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),

    # User registration view
    path('register/', UserRegistrationAPIView.as_view(), name='user_register'),

    # User login view
    path('login/', UserLoginAPIView.as_view(), name='user_login'),

    # Password reset view
    path('password-reset/', PasswordResetAPIView.as_view(), name='password_reset'),

    # Password change view
    path('password-change/', PasswordChangeAPIView.as_view(), name='password_change'),

    # Email verification view
    path('verify-email/', EmailVerificationAPIView.as_view(), name='verify_email'),

    # Google login callback URL (redirect to frontend with access token)
    path('google-login/callback/', google_login_callback, name='google_login_callback'),

    # Validate Google token endpoint
    path('validate-google-token/', validate_google_token, name='validate_google_token'),
]
