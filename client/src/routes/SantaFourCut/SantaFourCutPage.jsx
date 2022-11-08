import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import AppCanvas from './components/AppCanvas';
import santa from '../../assets/images/santa.png';
import { fetchData } from '../../utils/apis/api';
const SantaFourCutPage = () => {
  function capture() {
    let resbox = document.getElementById('resbox');
    let canvas = document.querySelectorAll('#arcamera canvas');
    // console.log(canvas);
    let imgData1 = canvas[0].toDataURL('image/png');
    let imgData2 = canvas[1].toDataURL('image/png');
    let im1 = document.createElement('img');
    let im2 = document.createElement('img');
    im1.setAttribute('src', imgData1);
    im1.setAttribute('width', 90);
    im1.setAttribute('height', 60);
    resbox.appendChild(im1);
    im2.setAttribute('src', imgData2);
    im2.setAttribute('width', 90);
    im2.setAttribute('height', 60);
    resbox.appendChild(im2);

    // fetchData.post('/api/v2/photo', {});

    const formData = new FormData();

    formData.append('photoImageList', imgData1);
    formData.append('photoImageList', imgData2);

    fetchData
      .post('/api/v2/photo', formData, {
        headers: {
          'Content-Type': `multipart/form-data`,
        },
      })
      .then((res) => {
        // // console.log(inputAuction);
        // alert('성공');
        // if (reservation) navigate(`/auctions/${res.data}`);
        // else navigate(`/standby/${res.data}`);
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      <Logo>
        <p>산타</p>
        <img src={santa} alt="santaLogo" />
        <p>네컷</p>
      </Logo>
      <SubTitle>나의 캐릭터와 함께 사진을 찍어보아요!</SubTitle>
      <CameraBox id="arcamera">
        <AppCanvas />
      </CameraBox>
      <Btn
        onClick={() => {
          capture();
        }}>
        캡쳐
      </Btn>
      <div id="resbox"></div>
    </>
  );
};
const Logo = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  font-size: 80px;
  color: #de6363;
  img {
    width: 80px;
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
const Btn = styled.button``;
export default SantaFourCutPage;
