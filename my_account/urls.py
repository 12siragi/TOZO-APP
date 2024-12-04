from django.urls import path
from .views import RegisterUserView, LoginUserView, PasswordResetView, SetPasswordView

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('login/', LoginUserView.as_view(), name='login'),
    path('password-reset/', PasswordResetView.as_view(), name='password-reset'),
    path('set-password/', SetPasswordView.as_view(), name='set-password'),
]
