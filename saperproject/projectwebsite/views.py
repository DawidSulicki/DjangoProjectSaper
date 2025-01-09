from django.shortcuts import render

def home(request):
    return render(request, 'home.html',{})
def saper(request):
    return render(request, 'sapergame.html',{})