from django.urls import path
from .views import RegisterUserView, LoginUserView, PasswordResetView, SetPasswordView,  LogoutView

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('login/', LoginUserView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'), 
    path('password-reset/', PasswordResetView.as_view(), name='password-reset'),
    path('password-change/', SetPasswordView.as_view(), name='password-change'),
]
