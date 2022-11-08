import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import AppCanvas from './components/AppCanvas';
import santa from '../../assets/images/santa.png';
import { fetchData } from '../../utils/apis/api';
import photo1 from '../../assets/images/photo1.png';
import photo2 from '../../assets/images/photo2.png';
import photo3 from '../../assets/images/photo3.png';
import photo4 from '../../assets/images/photo4.png';
const SantaFourCutPage = () => {
  const [page, setPage] = useState(1);
  const [photoNum, setPhotoNum] = useState(1);

  useEffect(() => {
    console.log(photoNum);
    if (photoNum === 5) {
      console.log('api호출');
      setPage(3);
    }
  }, [photoNum]);

  async function capture() {
    let resbox = document.getElementById('resbox');
    let canvas = document.querySelectorAll('#arcamera canvas');
    // console.log(canvas);
    let imgData1 = canvas[0].toDataURL('image/png');
    let imgData2 = canvas[1].toDataURL('image/png');

    //임시 캔버스 생성
    var tempCanvas = document.createElement('canvas');
    tempCanvas.width = 600;
    tempCanvas.height = 400;
    var context = tempCanvas.getContext('2d');
    context.globalCompositeOperation = 'source-over';

    //캔버스에 이미지 합쳐서 그리기
    var tempImage = new Image();
    tempImage.src = imgData2;
    tempImage.onload = function () {
      context.drawImage(tempImage, 0, 0, 600, 400);
      var tempImage2 = new Image();
      tempImage2.src = imgData1;
      tempImage2.onload = function () {
        context.drawImage(tempImage2, 0, 0, 600, 400);
        var dataURI = tempCanvas.toDataURL('image/png');
        document.querySelector('#photo' + photoNum).src = dataURI;
        setPhotoNum(photoNum + 1);
      };
    };

    // let im1 = document.createElement('img');
    // let im2 = document.createElement('img');
    // im1.setAttribute('src', imgData1);
    // im1.setAttribute('width', 90);
    // im1.setAttribute('height', 60);
    // resbox.appendChild(im1);
    // im2.setAttribute('src', imgData2);
    // im2.setAttribute('width', 90);
    // im2.setAttribute('height', 60);
    // resbox.appendChild(im2);

    // const fourcut = await imgChange(imgData1, imgData2);
    // console.log(fourcut.data);
    // let photo = document.createElement('img');
    // photo.setAttribute('width', 90);
    // photo.setAttribute('src', fourcut.data);
    // resbox.appendChild(photo);
  }

  const imgChange = async (imgData1, imgData2) => {
    const formData = new FormData();
    formData.append('photoImage1', imgData1);
    formData.append('photoImage2', imgData2);
    // console.log(formData.get('photoImageList'));
    return await fetchData.post('/api/v2/photo', formData, {
      headers: {
        'Content-Type': `multipart/form-data`,
      },
    });
  };

  const page1 = () => {
    return (
      <>
        <StartBtn>
          <button onClick={() => setPage(2)}>시작</button>
        </StartBtn>
      </>
    );
  };

  const page2 = () => {
    return (
      <>
        <PhotoBox id="resbox">
          <img src={photo1} alt="" id="photo1" />
          <img src={photo2} alt="" id="photo2" />
          <img src={photo3} alt="" id="photo3" />
          <img src={photo4} alt="" id="photo4" />
        </PhotoBox>
        <StartBtn>
          <button onClick={() => capture()}>캡쳐</button>
        </StartBtn>
      </>
    );
  };
  return (
    <>
      <div>
        <Logo>
          <p>산타</p>
          <img src={santa} alt="santaLogo" />
          <p>네컷</p>
        </Logo>
        <SubTitle>나의 캐릭터와 함께 사진을 찍어보아요!</SubTitle>
      </div>
      {page === 2 ? page2() : null}
      <CameraBox id="arcamera">
        <AppCanvas />
      </CameraBox>
      {page === 1 ? page1() : null}
    </>
  );
};
const Logo = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  font-size: 72px;
  color: #de6363;
  img {
    width: 72px;
  }
`;
const SubTitle = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  color: white;
  padding: 20px 0;
`;
const CameraBox = styled.div`
  position: relative;
  /* position: absolute;
  bottom: 100px; */
  /* transform: translate(-50%, -50%); */
`;
const StartBtn = styled.div`
  padding: 20px;
  button {
    width: 140px;
    height: 50px;
    background-color: #60c783;
    border-radius: 70px;
    font-size: 24px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    color: white;
  }
`;

const PhotoBox = styled.div`
  display: flex;
  gap: 10px;
  padding-bottom: 20px;
  img {
    width: 100px;
  }
`;
export default SantaFourCutPage;
