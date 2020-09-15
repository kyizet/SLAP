from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

import stripe
# Create your views here.
stripe.api_key = 'sk_test_51HQ2cOAHruZuBiOAyirk2osuvs91iTgyZ0uWIlXDwuvge0nLBcE7gMVqLkvngTnQKej8ATzySUWH7bIHRA74uTRx003H6y6FZD'


@api_view(['POST'])
def test_payment(request):

    test_payment_intent = stripe.PaymentIntent.create(
        amount=1000, currency='pln',
        payment_method_types=['card'],
        receipt_email='test@example.com')
    return Response(status=status.HTTP_200_OK, data=test_payment_intent)


@api_view(['POST'])
def save_stripe_info(request):
    data = request.data
    email = data['email']
    amount = int(float(data['amount'])*100)
    payment_method_id = data['payment_method_id']
    extra_msg = ''

    customer_data = stripe.Customer.list(email=email).data

    if len(customer_data) == 0:
        customer = stripe.Customer.create(
            email=email, payment_method=payment_method_id)
    else:
        customer = customer_data[0]
        extra_msg = "Customer already existed."

    stripe.PaymentIntent.create(
        customer=customer,
        payment_method=payment_method_id,
        currency='USD',
        amount=amount,
        confirm=True
    )

    return Response(status=status.HTTP_200_OK,
                    data={
                        'message': 'Success',
                        'data': {'customer_id': customer.id}}
                    )
