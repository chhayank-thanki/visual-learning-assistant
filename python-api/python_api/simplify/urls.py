from django.urls import path
from .views import simplify_text

urlpatterns = [
    path('', simplify_text, name='simplify-text'),
]
