from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import cv2
import numpy as np
import io
from PIL import Image
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.core.files.storage import FileSystemStorage

# Create your views here.

@api_view(["POST"])
def top(request):
    print(request.data)
    front = request.FILES["front"]
    # front_name = request.data["front"]
    back = request.FILES["back"]
    print(str(front))
    # print(type(front_name.read()))
    # FileSystemStorage(location="clothes/img/tmp/").save(front.name, front)
    
    path = default_storage.save('clothes/img/tmp/temp.jpg', ContentFile(front.read()))
    # tmp_file = os.path.join(settings.MEDIA_ROOT, path)

    # aux_im = Image.open(front)
    # print(back.seek(0))
    # img_pil = Image.open(front.file)
    # path = default_storage.save('heart_of_the_swarm.txt', ContentFile(img.read()))
    # print(img)
    # print(img.file)
    # print(type(img.file))

    # data_io = io.BytesIO(img.file)
    # res = Image.open(img.file)

    # print(type(request.FILES["front"].read()))
    # img_back = cv2.imread(request.FILES["back"])
    # print(img_front)
    
    img_front = cv2.imread('./clothes/img/tmp/front.png')

    # width, height, channel = img_front.shape
    # print(width, height, channel)

    cv2.imshow('img_front', img_front)

    cv2.waitKey(0)
    cv2.destroyAllWindows()
    return Response("good", status=status.HTTP_200_OK)