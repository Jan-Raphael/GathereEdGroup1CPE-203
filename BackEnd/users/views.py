from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.http import HttpResponse

def profile_view(request):
    return HttpResponse("User Profile Page")
