from django.shortcuts import render,redirect,get_object_or_404
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from allauth.account.models import EmailAddress
from .forms import ProfileForm
from .models import Profile
from .forms import EmailForm,UsernameForm
from .models import User
# Create your views here.
def profile(request,username=None):   
    if username:
        profile = get_object_or_404(User, username=username).profile
    else:
        try:
            profile = request.user.profile
        except:
            return redirect('account_login')
    return render(request, "a_users/profile.html", {"profile": profile})

@login_required
def edit_profile_view(request):
    
     form = ProfileForm(instance=request.user.profile)  
    
     if request.method == 'POST':
        form = ProfileForm(request.POST, request.FILES, instance=request.user.profile)
        if form.is_valid():
            form.save()
            return redirect('profile')
    
     if request.path == reverse('onboarding_profile'):
        return render(request, 'a_users/profile_edit.html', { 'form':form, 'onboarding': True})
      
     return render(request, 'a_users/profile_edit.html', { 'form':form,})

@login_required
def profile_settings(request):
    return render(request, 'a_users/profile_settings.html')

@login_required
def email_changer(request):
    if request.htmx:
        form = EmailForm(instance=request.user)
        return render(request, 'partials/email_form.html', {'form': form})

    if request.method == 'POST':
        form = EmailForm(request.POST, instance=request.user)

        if form.is_valid():
            email = form.cleaned_data['email']

            # ✅ Check duplicate email
            if User.objects.filter(email=email).exclude(id=request.user.id).exists():
                messages.warning(request, 'This email is already in use.')
                return redirect('profile_settings')

            # ✅ Save new email to User model
            user = form.save()

            # ✅ Update or create EmailAddress (allauth table)
        email_address = EmailAddress.objects.filter(user=user, primary=True).first()
        if email_address:
            email_address.email = email
            email_address.verified = False  # Mark as unverified until they confirm
            email_address.save()
            email_address.send_confirmation(request)
        else:
            EmailAddress.objects.create(user=user, email=email, primary=True, verified=False)
        return redirect('profile_settings')