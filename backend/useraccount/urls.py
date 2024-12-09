from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import UserRegistrationAPIView, UserLoginAPIView, PasswordResetAPIView, PasswordChangeAPIView

urlpatterns = [
    # Token obtain view (for getting access and refresh tokens)
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
]
