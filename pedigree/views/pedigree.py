from django.views.generic import View
from django.shortcuts import render


class PedigreeView(View):

	def get(self, request):
		question = 'hello?'
		return render(request, './pedigree.html', {'question': question})

