from rest_framework.decorators import api_view
import cv2
from PIL import Image
from io import BytesIO
from rest_framework.response import Response
from rest_framework import status
import numpy as np
import base64



@api_view(["POST"])
def photo(request):
    
    temp1 = request.POST.__getitem__('photoImage1')
    temp2 = request.POST.__getitem__('photoImage2')
    temp3 = request.POST.__getitem__('photoImage3')
    temp4 = request.POST.__getitem__('photoImage4')
    
    header1, data1 = temp1.split(';base64,')
    header2, data2 = temp2.split(';base64,')
    header3, data3 = temp3.split(';base64,')
    header4, data4 = temp4.split(';base64,')

    image_data1 = base64.b64decode(data1)
    image_data2 = base64.b64decode(data2)
    image_data3 = base64.b64decode(data3)
    image_data4 = base64.b64decode(data4)

    nparr1 = np.fromstring(image_data1, np.uint8)
    nparr2 = np.fromstring(image_data2, np.uint8)
    nparr3 = np.fromstring(image_data3, np.uint8)
    nparr4 = np.fromstring(image_data4, np.uint8)

    frame = cv2.imread('photo/img/frame.png')
    src1 = cv2.imdecode(nparr1, cv2.IMREAD_COLOR)
    src2 = cv2.imdecode(nparr2, cv2.IMREAD_COLOR)
    src3 = cv2.imdecode(nparr3, cv2.IMREAD_COLOR)
    src4 = cv2.imdecode(nparr4, cv2.IMREAD_COLOR)
    
    img1 = cv2.resize(src1, (0, 0), fx=0.915, fy=0.915, interpolation=cv2.INTER_AREA)
    img2 = cv2.resize(src2, (0, 0), fx=0.915, fy=0.915, interpolation=cv2.INTER_AREA)
    img3 = cv2.resize(src3, (0, 0), fx=0.915, fy=0.915, interpolation=cv2.INTER_AREA)
    img4 = cv2.resize(src4, (0, 0), fx=0.915, fy=0.915, interpolation=cv2.INTER_AREA)
    
    width, height, channel = img1.shape
    
    frame[17:width + 17, 25:height + 25] = img1
    frame[400:width + 400, 25:height + 25] = img2
    frame[783:width + 783, 25:height + 25] = img3
    frame[1166:width + 1166, 25:height + 25] = img4
    
    # # BGR -> RGB 변환
    frameRGB = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    # nparray -> PIL Image 변환
    result = Image.fromarray(frameRGB)
    # # PIL Image -> Bytes 변환
    buffer = BytesIO()
    result.save(buffer, "PNG")
    # buffer.seek(0)
    # Bytes -> base64 encoding
    img_base64 = base64.b64encode(buffer.getvalue())
    # header 추가 후  return
    print("good!")
    return Response("data:image/png;base64," + str(img_base64)[2:-1], status=status.HTTP_200_OK)
