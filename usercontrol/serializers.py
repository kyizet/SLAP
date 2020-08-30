from rest_framework import serializers

from .models import Account


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['email', 'password']

    def save(self):
        account = Account(
            email=self.validated_data['email'],
        )
        password = self.validated_data['password']
        account.set_password(password)
        account.save()
        return account


class AccountSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields = ['email', 'username', 'first_name', 'last_name', 'date_of_birth', 'profile_picture']
        extra_kwargs = {'email': {'required': False}}
