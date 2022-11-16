import React, { useState, useRef } from 'react';

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from 'react-image-crop';
import { canvasPreview } from './canvasPreview';
import { useDebounceEffect } from './useDebounceEffect';
import AlertModal from '../Common/AlertModal';

import 'react-image-crop/dist/ReactCrop.css';
import styled from 'styled-components';

const ClothesCut = (props) => {
  const { title, closeModal, setClothesData } = props;
  const [imgSrc, setImgSrc] = useState('');
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const [crop, setCrop] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(1 / 1);
  // const [aspect, setAspect] = useState(undefined);

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined);
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        aspect,
        mediaWidth,
        mediaHeight,
      ),
      mediaWidth,
      mediaHeight,
    );
  }

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        );
      }
    },

    100,
    [completedCrop, scale, rotate],
  );
  const res = () => {
    const canvas = document.getElementById('resultImg');
    setClothesData(canvas.toDataURL('image/jpeg'));
    closeModal();
  };
  // function handleToggleAspectClick() {
  //   if (aspect) {
  //     setAspect(undefined);
  //   } else if (imgRef.current) {
  //     const { width, height } = imgRef.current;
  //     setAspect(1 / 1);
  //     setCrop(centerAspectCrop(width, height, 1 / 1));
  //   }
  // }
  return (
    <AlertModal
      title={title}
      leftBtnName="닫기"
      rightBtnName="적용"
      setLeftBtnControl={closeModal}
      setRightBtnControl={res}>
      <div>
        {imgSrc ? (
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}>
            <img
              ref={imgRef}
              alt="Crop me"
              src={imgSrc}
              style={{
                transform: `scale(${scale}) rotate(${rotate}deg)`,
                maxWidth: '500px',
                maxHeight: '400px',
                minHeight: '100px',
                minWidth: '100px',
              }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        ) : (
          <EmptyBox>사진이 여기에 표시됩니다.</EmptyBox>
        )}
      </div>

      <FileInput className="Crop-Controls">
        <label htmlFor="imgfile">사진 업로드</label>
        <input
          id="imgfile"
          type="file"
          accept="image/*"
          onChange={onSelectFile}
        />
      </FileInput>

      <div style={{ display: 'none' }}>
        {completedCrop && (
          <canvas
            id="resultImg"
            ref={previewCanvasRef}
            style={{
              border: '1px solid black',
              objectFit: 'contain',
              width: completedCrop.width,
              height: completedCrop.height,
            }}
          />
        )}
      </div>
    </AlertModal>
  );
};

const FileInput = styled.div`
  padding-top: 20px;
  label {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100px;
    height: 40px;
    border-radius: 10px;
    font-size: 20px;
    color: white;
    background-color: #e9a33a;
    /* box-shadow: 5px 5px 5px #939393; */
    /* border: 4px solid #e9a33a; */
    cursor: pointer;
  }
  input {
    display: none;
  }
`;

const EmptyBox = styled.div`
  width: 500px;
  height: 400px;
  background-color: #9c9c9c;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: white;
`;

export default ClothesCut;
