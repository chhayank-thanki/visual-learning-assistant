from django.urls import path
from .views import generate_flowchart

urlpatterns = [
    path('', generate_flowchart, name='generate-flowchart'),
]
