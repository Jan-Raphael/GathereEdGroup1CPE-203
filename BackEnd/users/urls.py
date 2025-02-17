from django.urls import path
from . import views  # Ensure this import is correct

urlpatterns = [
    path('profile/', views.profile_view, name='profile'),
]
