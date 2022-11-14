import React from 'react';
import { useState } from 'react';
import Webcam from 'react-webcam';
import * as tmImage from '@teachablemachine/image';
import styled from 'styled-components';
import { fetchData } from '../../utils/apis/api';
import Animal_Pet from '../../assets/images/Animal_Pet.png';
import MainModal from '../Common/MainModal';

const AnimalModal = (props) => {
  const [page, setPage] = useState(1); // 페이지 넘기기 변수
  const [animal, setAnimal] = useState(); // 동물형 기록 변수
  const [animalKey, setAnimalKey] = useState(1); // 동물형 기록 변수
  const [onOff, setOnOff] = useState(true); // 카메라 OnOff 변수
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const { closeBtnControl, bgColor } = props;

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
  async function initMan() {
    const modelURL = URL + 'model.json';
    const metadataURL = URL + 'metadata.json';
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    // 이하 Predict 함수
    setTimeout(predict, 0);
  }

  // 캡쳐한 사진으로 결과값 산출하는 함수
  async function predict() {
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
  }

  const go = () => {
    setPage((page) => page + 1);
  };
  const start = () => {
    setPage(1);
    setOnOff(true);
  };
  async function complete() {
    props.setAnimalPet(false);
  }
  if (page == 1)
    return (
      <MainModal bgColor="#639bb2" closeBtnControl={closeBtnControl}>
        {/* Page 01 - 메인 화면 */}
        <Title>
          <div className="mainTitle">
            얼굴형 분석으로
            <br />
            나와 닮은 펫을 받아봅시다!
          </div>
        </Title>
        <Image>
          <div>
            <img src={Animal_Pet} />
          </div>
        </Image>
        <Button>
          <div>
            <button onClick={go}>분석하기</button>
          </div>
        </Button>
      </MainModal>
    );
  if (page == 2)
    return (
      <MainModal bgColor="#639bb2" closeBtnControl={closeBtnControl}>
        {/* Page 02 - 촬영 화면 */}
        <Title>
          {onOff === true ? (
            <div>정면을 바라보고 사진을 찍어주세요</div>
          ) : (
            <div className="resultReady">분석 중…</div>
          )}
        </Title>
        {onOff === true ? (
          <Camera>
            <div>
              <Webcam
                video="false"
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                style={{
                  position: 'absolute',
                  width: 768,
                  height: 575,
                  bottom: 0,
                }}
              />
            </div>
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
        <Button>
          {onOff === true ? (
            <div>
              <button onClick={capture}>사진 찍기</button>
            </div>
          ) : (
            <></>
          )}
        </Button>
      </MainModal>
    );
  if (page == 3)
    return (
      <MainModal bgColor="#639bb2" closeBtnControl={closeBtnControl}>
        {/* Page 03 - 결과 발표 */}
        <End>
          <div>{animal}</div>
        </End>
        <Button>
          <div>
            <button
              onClick={() => {
                {
                  start;
                  fetchData
                    .patch('/api/v1/member/pet', {
                      memberPet: animalKey,
                    })
                    .then((res) => {
                      complete();
                      console.log(res);
                    });
                }
              }}>
              펫 받기
            </button>
          </div>
        </Button>
      </MainModal>
    );
};
const Title = styled.div`
  width: 800px;
  height: 60px;
  position: absolute;
  top: 12%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  text-align: center;
  line-height: 60px;
  vertical-align: middle;
  color: white;
  font-size: 40px;

  .mainTitle {
    font-size: 60px;
  }
  .resultReady {
    margin-top: 27%;
    font-size: 60px;
  }
`;
const Image = styled.div`
  margin-top: 130px;
  }
`;
const Camera = styled.div`
  position: absolute;
  width: 768px;
  height: 432px;
  top: 18%;
  left: 15%;
  overflow: hidden;
  border-radius: 40px;
`;
const Button = styled.div`
  button {
    position: absolute;
    width: 140px;
    height: 50px;
    background-color: #60c783;
    border-radius: 70px;
    font-size: 24px;
    left: 50%;
    top: 60%;
    transform: translate(-50%, 360%);
    box-shadow: 1px 1px 3px 1px gray;
    color: white;
  }
`;
const End = styled.div`
  width: 800px;
  height: 60px;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  line-height: 60px;
  vertical-align: middle;
  color: white;
  fontweight: 'bold';
  font-size: 50px;
`;
export default AnimalModal;