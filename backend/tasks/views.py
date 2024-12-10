from rest_framework import generics, permissions, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from .models import Task
from .serializers import TaskSerializer

# Create Task
class TaskCreateView(generics.CreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# List Tasks
class TaskListView(generics.ListAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = ['priority', 'category', 'is_completed']
    ordering_fields = ['deadline', 'priority']
    search_fields = ['title', 'description']

    def get_queryset(self):
        return Task.objects.filter(owner=self.request.user, is_deleted=False)

# Retrieve, Update, Delete Task
class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(owner=self.request.user, is_deleted=False)

    def perform_destroy(self, instance):
        # Soft delete
        instance.is_deleted = True
        instance.save()

# Mark Task as Complete
class MarkTaskCompleteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            task = Task.objects.get(pk=pk, owner=request.user, is_deleted=False)
            task.is_completed = True
            task.save()
            return Response({'message': 'Task marked as completed!'})
        except Task.DoesNotExist:
            return Response({'error': 'Task not found'}, status=404)
