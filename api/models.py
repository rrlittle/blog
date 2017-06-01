from __future__ import unicode_literals

from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.conf import settings


# Create your models here.
class Post(models.Model):
	owner = models.ForeignKey('auth.user', related_name='posts',
														on_delete=models.CASCADE)
	created = models.DateTimeField(auto_now_add=True)
	title = models.CharField(max_length=100)
	body = models.CharField(max_length=400)

	class Meta:
		ordering = ('created',)


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
	if created:
		Token.objects.create(user=instance)
