from django.views.generic import View
from django.shortcuts import render


class PedigreeView(View):

	def get(self, request):
		number = request.GET.get('number', None)

		template = './pedigree.html'
		if number == "1":
			template = './pedigree1.html'
		elif number == "2":
			template = './pedigree2.html'
		return render(request, template)

