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
    front_file = request.FILES["front"]
    back_file = request.FILES["back"]
    memberId = request.data["member"]
    # 이미지 파일 임시 저장
    front_path = default_storage.save(
        'clothes/img/tmp/' + str(front_file), ContentFile(front_file.read()))
    back_path = default_storage.save(
        'clothes/img/tmp/' + str(back_file), ContentFile(back_file.read()))

    img_front = cv2.imread(front_path)
    img_back = cv2.imread(back_path)

    # 이미지 자르기
    front = img_front[50: 480, 175: 630]
    back = img_back[50: 480, 175: 630]

    # 팔부분 색상
    b, g, r = img_front[80, 100]

    # 텍스쳐 파일 생성
    texture = cv2.imread('clothes/img/texture.png')
    width, height, channel = front.shape

    # # 자른 이미지를 소스 이미지에 붙인다.
    texture[10: width + 10, 240: height + 240] = back
    texture[520:width + 520, 240:height + 240] = front
    cv2.rectangle(texture, (0, 0, 200, 700), (int(b), int(g), int(r)), -1)
    # 임시 저장 이미지 삭제
    remove(front_path)
    remove(back_path)
    # BGR -> RGB 변환
    textureRGB = cv2.cvtColor(texture, cv2.COLOR_BGR2RGB)
    # nparray -> PIL Image 변환
    result = Image.fromarray(textureRGB)
    # PIL Image -> Bytes 변환
    buffer = BytesIO()
    result.save(buffer, "PNG")
    buffer.seek(0)

    imageUrl = "texture/" + str(memberId) + "/texture.png"
    # 기존 텍스쳐 파일 삭제
    S3_CLIENT.delete_object(Bucket=BUCKET, Key=imageUrl)
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
