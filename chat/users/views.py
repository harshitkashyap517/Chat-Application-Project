
from django.shortcuts import render,redirect,get_object_or_404
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets
from .serializer import userRegister, userdataSerializer
from django.contrib import messages
from allauth.account.models import EmailAddress
from .models import Profile
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
def profile_settings(request):
    return render(request, 'a_users/profile_settings.html')


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
    

class userViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = userdataSerializer

class userRegisterAPIView(APIView):

    def post(self, request):
        serializer = userRegister(data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
class userLoginAPIView(APIView):

   def post(self, request):
        data=request.data
        email=data.get('email')
        Password=data.get('password')
        user=User.objects.filter(email=email).first()
        if user and user.check_password(Password):
            token=RefreshToken.for_user(user)
            return Response({"token":str(token.access_token),"refreshtoken":str(token), "status": 200})
        return Response({"message":"Invalid credentials"}, status=400)
   

class ProfileView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self, request):
        serializer = userdataSerializer(request.user)
        return Response(serializer.data)