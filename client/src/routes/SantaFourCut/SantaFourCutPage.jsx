import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import AppCanvas from './components/AppCanvas';

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
    // // console.log(imgData);
  }

  return (
    <>
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
const CameraBox = styled.div`
  position: absolute;
  bottom: 200px;
  left: 50px;
  /* transform: translate(-50%, -50%); */
`;
const Btn = styled.button`
  position: absolute;
  bottom: 400px;
`;
export default SantaFourCutPage;
