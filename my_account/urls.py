from django.urls import path
from .views import RegisterUserView, LoginUserView, LogoutView, PasswordResetView, SetPasswordView, VerifyEmailView

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('login/', LoginUserView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('password-reset/', PasswordResetView.as_view(), name='password-reset'),
    path('set-password/', SetPasswordView.as_view(), name='set-password'),
    path('verify-email/<int:uid>/<str:token>/', VerifyEmailView.as_view(), name='verify-email'),
]
