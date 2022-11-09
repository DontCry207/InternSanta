from rest_framework.decorators import api_view
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
import quickdraw.AI as AI

@api_view(["POST"])
def quickdraw(request):
    key = request.data.get('key')
    vector = request.data.get('vector')

    draw, answer = AI.AIfunction(vector, key)

    if draw == 'error':
        return Response({"result": False, "draw": "not valid key"}, status=status.HTTP_409_CONFLICT)
    if draw == answer: result = True
    else: result = False

    return Response({"result": result, "draw": draw}, status=status.HTTP_200_OK)
