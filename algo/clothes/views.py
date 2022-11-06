from unittest import result
from urllib import response
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import cv2
import numpy as np
from django.core.files.storage import default_storage
from django.core.files.storage import FileSystemStorage

from django.core.files.base import ContentFile
from os import remove
from django.http import FileResponse
from django.http import HttpResponse
from PIL import Image
from io import BytesIO
import boto3
# Create your views here.


@api_view(["POST"])
def top(request):
    front_file = request.FILES["front"]
    back_file = request.FILES["back"]
    # 이미지 파일 임시 저장
    fs = FileSystemStorage()
    front_path = fs.save(
        'clothes/img/tmp/' + str(front_file), ContentFile(front_file.read()))
    back_path = fs.save(
        'clothes/img/tmp/' + str(back_file), ContentFile(back_file.read()))
    print(front_file.read())
    print(front_path)
    print(back_path)
    img_front = cv2.imread(front_path)
    img_back = cv2.imread(back_path)

    front = img_front[50: 480, 175: 630]
    back = img_back[50: 480, 175: 630]

    # 팔부분 색상
    b, g, r = img_front[80, 100]

    # 텍스쳐 파일 생성
    texture = cv2.imread('clothes/img/texture.png')
    width, height, channel = front.shape
    # print(width, height, channel)

    # # 자른 이미지를 소스 이미지에 붙인다.
    texture[10: width + 10, 240: height + 240] = back
    texture[520:width + 520, 240:height + 240] = front
    cv2.rectangle(texture, (0, 0, 200, 700), (int(b), int(g), int(r)), -1)

    # # 결과를 출력한다.
    # cv2.imshow('texture', texture)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()
    # cv2.imwrite('texture_result.png', texture)

    # cv2.imwrite()
    # response = HttpResponse(
    #     texture, content_type="application/octet-stream; charset=utf-8")
    # response['Content-Disposition'] = 'attachment; filename=texture_file'

    textureRGB = cv2.cvtColor(texture, cv2.COLOR_BGR2RGB)
    # cv2.imwrite('clothes/img/tmp/' + 'result.png', textureRGB)
    result = Image.fromarray(textureRGB)
    buffer = BytesIO()
    result.save(buffer, "PNG")
    buffer.seek(0)

    s3_client = boto3.client(
        's3',
        aws_access_key_id='AKIA6QAZ24GKGKIVGZWF',
        aws_secret_access_key='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'
    )

    a = s3_client.upload_fileobj(
        buffer,
        "internsanta",
        "texture1",
        ExtraArgs={
            "ContentType": 'image/png'
        }
    )
    print(a)
    # result.show(result)
    # result.save('clothes/img/tmp/' + 'result.png')
    # data = open('clothes/img/tmp/' + 'result.png', 'rb')
    # print(type(data))
    # print(data.content_type)

    # s3r = boto3.resource('s3', aws_access_key_id='AKIA6QAZ24GKGKIVGZWF',
    #                      aws_secret_access_key='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')
    # s3r.Bucket('internsanta').put_object(
    #     Key='texture/', body=data, ContentType='png')
    # AWS_ACCESS_KEY_ID = 'AKIA6QAZ24GKGKIVGZWF'
# AWS_SECRET_ACCESS_KEY = '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'
    # result_path = default_storage.save(
    #     'texture/memberId/' + str(result), buffer)
    # response = FileResponse(result, content_type='application/force-download')
    # response['Content-Disposition'] = 'attachment; filename="filename.pdf"'
    # return HttpResponse(result, content_type="image/png")
    remove(front_path)
    remove(back_path)
    return Response("success", status=status.HTTP_200_OK)
