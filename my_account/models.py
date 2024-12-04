from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class CustomUser(AbstractUser):
    # Your custom fields here
    groups = models.ManyToManyField(
        Group,
        related_name='customuser_groups',  # Custom related name for groups
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_permissions',  # Custom related name for user_permissions
        blank=True
    )
