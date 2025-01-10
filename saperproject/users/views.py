from django.shortcuts import render,redirect
from django.contrib.auth import authenticate,login,logout
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm

def login_user(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.success(request, "Zła nazwa lub hasło")
            return redirect('login_user')
    else:
        return render(request,'login.html',{})
def logout_user(request):
    logout(request)
    return redirect('home')

def registration(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=password)
            login(request,user)
            return redirect('home')
        else:
            return render(request, 'registration.html', {'form': form})
    else:
        form = UserCreationForm()
    return render(request, 'registration.html', {'form': form})