from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from os import remove
import cv2
from PIL import Image
from io import BytesIO
import json

@api_view(["POST"])
def photo(request):
    image_files = request.FILES.getlist('photoImageList')
    image_file1 = image_files[0]
    image_file2 = image_files[1]
    image_file3 = image_files[2]
    image_file4 = image_files[3]
    
    image_file1_path = default_storage.save(
        'photo/img/tmp/' + str(image_file1), ContentFile(image_file1.read()))
    image_file2_path = default_storage.save(
        'photo/img/tmp/' + str(image_file2), ContentFile(image_file2.read()))
    image_file3_path = default_storage.save(
        'photo/img/tmp/' + str(image_file3), ContentFile(image_file3.read()))
    image_file4_path = default_storage.save(
        'photo/img/tmp/' + str(image_file4), ContentFile(image_file4.read()))    
    frame = cv2.imread('photo/img/frame.png')
    src1 = cv2.imread(image_file1_path)
    src2 = cv2.imread(image_file2_path)
    src3 = cv2.imread(image_file3_path)
    src4 = cv2.imread(image_file4_path)

    img1 = cv2.resize(src1, dsize=(535,436), interpolation=cv2.INTER_AREA)
    img2 = cv2.resize(src2, dsize=(535,436), interpolation=cv2.INTER_AREA)
    img3 = cv2.resize(src3, dsize=(535,436), interpolation=cv2.INTER_AREA)
    img4 = cv2.resize(src4, dsize=(535,436), interpolation=cv2.INTER_AREA)
    
    width, height, channel = img1.shape
    
    frame[150:width + 150, 185:height + 185] = img1
    frame[655:width + 655, 185:height + 185] = img2
    frame[1155:width + 1155, 185:height + 185] = img3
    frame[1660:width + 1660, 185:height + 185] = img4
    
    # BGR -> RGB 변환
    frameRGB = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    # nparray -> PIL Image 변환
    result = Image.fromarray(frameRGB)
    # PIL Image -> Bytes 변환
    buffer = BytesIO()
    result.save(buffer, "PNG")
    buffer.seek(0)

    buffer.read()
    print(type(buffer))
    return Response({'photo': output.png}, status=status.HTTP_200_OK)
