from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .forms import ProfileForm
# Create your views here.
def profile(request):   
    profile = request.user.profile
    return render(request, "a_users/profile.html", {"profile": profile})

@login_required
def edit_profile_view(request):
    form =ProfileForm(instance=request.user.profile)
    return render(request,'a_users/profile_edit.html', {'form': form})