from django.conf.urls import include, url
from django.contrib import admin
from django.shortcuts import render

from views.pedigree import PedigreeView

urlpatterns = [
    # Examples:
    url(r'^$', PedigreeView.as_view()),
    # url(r'^blog/', include('blog.urls')),

    # url(r'^admin/', include(admin.site.urls)),
    # url(r'^admin/', include(admin.site.urls)),
]
