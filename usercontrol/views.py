from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser

from .serializers import RegistrationSerializer, AccountSerializer
from .models import Account
from rest_framework.authtoken.models import Token


@api_view(['POST', ])
def registration_view(request):
    if request.method == 'POST':
        serializer = RegistrationSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            account = serializer.save()
            data['response'] = "Account has been created"
            data['email'] = account.email + " can now be logged in."
            return Response(data)
        else:
            return Response(serializer.errors)

@api_view(['GET', ])
@permission_classes((IsAuthenticated, ))
def account_profile_view(request):
	try:
		account = request.user
	except Account.DoesNotExist:
		return Response(status=status.HTTP_404_NOT_FOUND)

	if request.method == 'GET':
		serializer = AccountSerializer(account)
		return Response(serializer.data)

@api_view(['PUT',])
@permission_classes((IsAuthenticated, ))
@parser_classes([MultiPartParser, FormParser])
def update_account_view(request):
	try:
		account = request.user
	except Account.DoesNotExist:
		return Response(status=status.HTTP_404_NOT_FOUND)
		
	if request.method == 'PUT':
		serializer = AccountSerializer(account, data=request.data)
		data = {}
		if serializer.is_valid():
			serializer.save()
			data['response'] = 'Account update success'
			return Response(data=data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)