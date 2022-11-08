from rest_framework.decorators import api_view
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from ai import AI

@api_view(["POST"])
def quickdraw(request):
    key = 1
    vector = "vector"
    if key == 1: answer = "나무"
    elif key == 2: answer = "망치"
    elif key == 3: answer = "못"
    else: return Response("not valid key", status=status.HTTP_409_CONFLICT)

    draw = AI.AIfunction(vector)

    if (draw != answer): result = True
    else: result = False

    return Response({"result": result, "draw": draw}, status=status.HTTP_200_OK)
