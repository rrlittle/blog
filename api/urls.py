from django.conf.urls import url
import views

urlpatterns = [
	url(r'^posts/$', views.PostList.as_view()),
	url(r'^posts/(?P<pk>[0-9]+)/$', views.PostDetail.as_view()),
	url(r'^users/$', views.PostList.as_view()),
	url(r'^users/(?P<pk>[0-9]+)/$', views.PostDetail.as_view()),
]
