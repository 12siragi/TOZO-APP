from django.apps import AppConfig

class MyAccountConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'my_account'  # Updated to match the new directory name
