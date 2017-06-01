from rest_framework import serializers
from models import Post
from django.contrib.auth.models import User


class PostSerializer(serializers.ModelSerializer):
	owner = serializers.ReadOnlyField(source='owner.username')

	class Meta:
		model = Post
		fields = ('id', 'title', 'body', 'owner')	


class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id', 'username', 'posts')
