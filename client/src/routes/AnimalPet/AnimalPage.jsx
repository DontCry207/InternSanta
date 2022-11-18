import React, { useEffect } from 'react';
import { useState } from 'react';
import Webcam from 'react-webcam';
import * as tmImage from '@teachablemachine/image';
import styled from 'styled-components';
import { fetchData } from '../../utils/apis/api';
import animalImg from '../../assets/images/animal.webp';
import { Canvas } from '@react-three/fiber';
import { PetImage } from '../../utils/constants/constants';

const AnimalPage = (props) => {
  const [page, setPage] = useState(1); // 페이지 넘기기 변수
  const [animal, setAnimal] = useState(); // 동물형 기록 변수
  const [animalKey, setAnimalKey] = useState(1); // 동물형 기록 변수
  const [onOff, setOnOff] = useState(true); // 카메라 OnOff 변수
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  // Teachable machine 클라우드 URL
  const URL = 'https://teachablemachine.withgoogle.com/models/46rTWJ4Ls/';
  let model, maxPredictions;

  // 웹캠 캡쳐
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    initMan();
    setOnOff(false);
  }, [webcamRef, setImgSrc]);

  // 클라우드의 Tensorflow 모델 호출하여 대기
  const initMan = async () => {
    const modelURL = URL + 'model.json';
    const metadataURL = URL + 'metadata.json';
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    // 이하 Predict 함수
    setTimeout(predict, 0);
  };

  // 캡쳐한 사진으로 결과값 산출하는 함수
  const predict = async () => {
    var image = document.getElementById('canvas');
    const prediction = await model.predict(image, false);
    let percent = 0;
    let animal;
    for (let i = 0; i < maxPredictions; i++) {
      if (percent < prediction[i].probability.toFixed(2)) {
        percent = prediction[i].probability.toFixed(2);
        animal = prediction[i].className;
      }
    }
    if (animal === 'Dog') {
      setAnimalKey(1);
      animal = '당신은 확신의 강아지상!!';
    } else if (animal === 'Cat') {
      setAnimalKey(2);
      animal = '당신은 확신의 고양이상!!';
    } else if (animal === 'Deer') {
      setAnimalKey(5);
      animal = '당신은 확신의 사슴상!!';
    } else if (animal === 'Bear') {
      setAnimalKey(6);
      animal = '당신은 확신의 곰상!!';
    } else if (animal === 'Rabbit') {
      setAnimalKey(3);
      animal = '당신은 확신의 토끼상!!';
    } else if (animal === 'Dino') {
      setAnimalKey(8);
      animal = '당신은 확신의 공룡상!!';
    } else if (animal === 'Fox') {
      setAnimalKey(4);
      animal = '당신은 확신의 여우상!!';
    } else if (animal === 'turtle') {
      setAnimalKey(7);
      animal = '당신은 확신의 거북이상!!';
    }
    setAnimal(() => animal);
    setTimeout(go, 0);
  };

  const go = () => {
    setPage((page) => page + 1);
  };
  const start = () => {
    setPage(1);
    setOnOff(true);
  };

  const complete = () => {
    setPage(1);
    setOnOff(true);
    props.close();
  };

  const fetchPet = async () => {
    start();
    await fetchData.patch('/api/v1/member/pet', {
      memberPet: animalKey,
    });
    complete();
  };

  const cameraActive = () => {
    return (
      <CameraBox>
        {onOff === true ? (
          <Camera>
            <Webcam
              video="false"
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              style={{
                width: 768,
                height: 575,
                bottom: 0,
              }}
            />
          </Camera>
        ) : (
          <img
            src={imgSrc}
            id="canvas"
            style={{
              position: 'absolute',
              width: 480,
              height: 360,
              borderRadius: '40px',
              display: 'none',
              transform: 'translate(44.5%, 10%)',
            }}
          />
        )}
      </CameraBox>
    );
  };

  const render = () => {
    return (
      <Container>
        {(page == 1 && (
          <>
            <Title>
              <p>얼굴형 분석으로</p>
              <p>나와 닮은 펫을 받아봅시다!</p>
            </Title>
            <Image>
              <img src={animalImg} />
            </Image>
            <Button>
              <button onClick={go}>분석하기</button>
            </Button>
          </>
        )) ||
          (page == 2 && (
            <>
              {/* Page 02 - 촬영 화면 */}
              <CameraTitle>
                {onOff === true ? (
                  <p>정면을 바라보고 사진을 찍어주세요</p>
                ) : (
                  <p className="resultReady">분석 중…</p>
                )}
              </CameraTitle>
              {cameraActive()}
              <Button>
                {onOff === true ? (
                  <button onClick={capture}>사진 찍기</button>
                ) : (
                  <></>
                )}
              </Button>
            </>
          )) ||
          (page == 3 && ( // Page 03 - 결과 발표
            <>
              <Title>
                <p>{animal}</p>
              </Title>
              <Image>
                <img src={PetImage[animalKey]} alt="" />
              </Image>
              <Button>
                <button
                  onClick={() => {
                    {
                      fetchPet();
                    }
                  }}>
                  펫 받기
                </button>
              </Button>
            </>
          ))}
      </Container>
    );
  };

  return <>{render()}</>;
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    font-size: 4.5rem;
    color: white;
  }
`;
const Image = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  img {
    height: 100%;
  }
`;

const Button = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  button {
    background-color: #60c783;
    border-radius: 70px;
    padding: 10px 20px;
    font-size: 34px;
    box-shadow: 1px 1px 3px 1px gray;
    color: white;
    cursor: pointer;
  }
`;

const CameraTitle = styled.div`
  width: 100%;
  height: 20%;
  p {
    font-size: 4.5rem;
    color: white;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CameraBox = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Camera = styled.div`
  height: 100%;
  overflow: hidden;
  border-radius: 40px;
`;

export default AnimalPage;
