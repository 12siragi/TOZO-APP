from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = [
            'id', 'title', 'description', 'priority', 'deadline', 
            'category', 'is_completed', 'created_at', 'updated_at', 'is_deleted', 'owner'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'owner']
from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = [
            'id', 'title', 'description', 'priority', 'deadline', 
            'category', 'is_completed', 'created_at', 'updated_at', 'is_deleted', 'owner'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'owner']
