from rest_framework.decorators import api_view
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
import quickdraw.AI as AI

@api_view(["POST"])
def quickdraw(request):
    word = request.data.get('word')
    vector = request.data.get('vector')

    draw = AI.AIfunction(vector, word)

    if draw == word: result = True
    else: result = False

    return Response({"result": result, "draw": draw}, status=status.HTTP_200_OK)
