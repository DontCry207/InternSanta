from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import cv2
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from os import remove
from PIL import Image
from io import BytesIO
import boto3
from django.conf import settings
from django.apps import AppConfig
import numpy as np
import base64
import uuid
import hashlib

class ClothesInit(AppConfig):
    global S3_CLIENT
    global BUCKET
    BUCKET = settings.AWS_STORAGE_BUCKET_NAME
    S3_CLIENT = boto3.client(
        's3',
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY
    )


@api_view(["POST"])
def top(request):
    temp1 = request.POST.__getitem__('front')
    temp2 = request.POST.__getitem__('back')
    
    header1, data1 = temp1.split(';base64,')
    header2, data2 = temp2.split(';base64,')
    
    image_data1 = base64.b64decode(data1)
    image_data2 = base64.b64decode(data2)
    
    nparr1 = np.fromstring(image_data1, np.uint8)
    nparr2 = np.fromstring(image_data2, np.uint8)
    
    src1 = cv2.imdecode(nparr1, cv2.IMREAD_COLOR)
    src2 = cv2.imdecode(nparr2, cv2.IMREAD_COLOR)
    
    front = cv2.resize(src1, (480, 480))
    back = cv2.resize(src2, (480, 480))
    
    memberId = request.data["member"]
    # 팔부분 색상
    b, g, r = front[80, 80]

    # 텍스쳐 파일 생성
    texture = cv2.imread('clothes/img/texture.png')
    width, height, channel = front.shape

    # # 자른 이미지를 소스 이미지에 붙인다.
    texture[0: width, 230: height + 230] = front
    texture[500:width + 500, 230:height + 230] = back
    cv2.rectangle(texture, (0, 0, 200, 700), (int(b), int(g), int(r)), -1)

    # cv2.imshow('show', texture)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()

    # BGR -> RGB 변환
    textureRGB = cv2.cvtColor(texture, cv2.COLOR_BGR2RGB)
    # nparray -> PIL Image 변환
    result = Image.fromarray(textureRGB)
    # PIL Image -> Bytes 변환
    buffer = BytesIO()
    result.save(buffer, "PNG")
    buffer.seek(0)

    salt = uuid.uuid4().hex
    fileName = hashlib.sha256(salt.encode() + str(memberId).encode()).hexdigest()

    imageUrl = "texture/" + str(memberId) + "/"+ fileName + ".png"
    
    # 기존 텍스쳐 파일 삭제
    filePath = request.data["filePath"]

    # 기본 텍스쳐 파일이 아니라면 삭제
    if filePath[60] != '0': 
        S3_CLIENT.delete_object(Bucket=BUCKET, Key=filePath[52:])
    # 이미지 업로드
    S3_CLIENT.upload_fileobj(
        buffer,
        BUCKET,
        imageUrl,
        ExtraArgs={
            "ContentType": 'image/png'
        }
    )

    resUrl = "internsanta.s3.ap-northeast-2.amazonaws.com/" + imageUrl
    return Response(resUrl, status=status.HTTP_200_OK)
