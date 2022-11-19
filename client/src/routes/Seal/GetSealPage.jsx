import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { fetchData } from '../../utils/apis/api';
import AlertModal from '../Common/AlertModal';
import machine from '../../assets/images/machine.png';
import turn from '../../assets/images/turn.png';
import { infoUpdateState } from '../../Atom';
import { useRecoilState } from 'recoil';
import coin from '../../assets/images/coin.png';

const GetSealPage = () => {
  const [sealResult, setSealResult] = useState([]);
  const [modal, setModal] = useState(false);
  const [openToggle, setOpenToggle] = useState(false);
  const [update, setUpdate] = useRecoilState(infoUpdateState);
  const turnEl = useRef();
  useEffect(() => {
    let timer;
    if (openToggle) {
      turnEl.current.style.animation = 'rotate_image 1s linear 1';
      timer = setTimeout(() => {
        setModal(true);
        setOpenToggle(!openToggle);
        console.log('g');
        turnEl.current.style.animation = 'none';
      }, 1000);
    }
  }, [openToggle]);

  const getOneSeal = async (num) => {
    await fetchData.patch('/api/v1/seal', { count: num }).then((res) => {
      setSealResult(res.data);
      console.log(res.data);
    });
    setUpdate(!update);
    setOpenToggle(true);
  };

  const openModal = () => {
    if (modal) {
      return (
        <AlertModal
          title="뽑기 결과"
          rightBtnName="닫기"
          setRightBtnControl={() => setModal(false)}>
          <SealResult>
            {sealResult?.map((item, i) => {
              if (i < 5)
                return (
                  <div key={i}>
                    <img src={item.sealUrl} alt="" width="200px" />
                    <p>{item.sealName}</p>
                  </div>
                );
            })}
          </SealResult>
          <SealResult>
            {sealResult?.map((item, i) => {
              if (i >= 5 && i < 10)
                return (
                  <div key={i} className="second">
                    <img src={item.sealUrl} alt="" width="200px" />
                    <p>{item.sealName}</p>
                  </div>
                );
            })}
          </SealResult>
        </AlertModal>
      );
    }
  };
  return (
    <>
      <Title>
        <p>크리스마스 씰 뽑기</p>
        <small>코인을 이용해 12가지 씰을 모두 모아보세요!</small>
      </Title>
      <Machine>
        {/* <img src={} alt="" /> */}
        <img className="turn" src={turn} alt="" ref={turnEl} />
      </Machine>
      <BtnSet>
        <button
          onClick={() => getOneSeal(1)}
          disabled={openToggle ? true : false}>
          <span>1회 뽑기</span>
          <small>
            <img src={coin} alt="" width="16px" />
            &nbsp;× 100
          </small>
        </button>
        <button
          onClick={() => getOneSeal(10)}
          disabled={openToggle ? true : false}>
          <span>10회 뽑기</span>
          <small>
            <img src={coin} alt="" width="16px" />
            &nbsp;× 1000
          </small>
        </button>
      </BtnSet>
      {openModal()}
    </>
  );
};

const Title = styled.div`
  text-align: center;
  p {
    font-size: 80px;
    color: white;
  }
  small {
    display: block;
    font-size: 24px;
    color: white;
    padding: 10px 0;
  }
`;

const Machine = styled.div`
  /* width: 40%; */
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${machine}) no-repeat;
  /* height: 100%; */
  background-size: 100% 100%;
  flex-grow: 1;
  position: relative;
  aspect-ratio: 2/3;
  @keyframes rotate_image {
    100% {
      transform: rotate(360deg);
    }
  }

  .turn {
    position: absolute;
    top: 68%;
    left: 38.5%;
    width: 20%;
    transform: rotate(0deg);
  }
  margin: 20px 0;
`;
const BtnSet = styled.div`
  display: flex;
  gap: 20px;
  button {
    width: 140px;
    height: 50px;
    background-color: #60c783;
    border-radius: 70px;
    font-size: 24px;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    &:last-child {
      background-color: #de6363;
    }
    small {
      font-size: 18px;
    }
  }
`;

const SealResult = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  /* display: grid;
  justify-content: center;
  grid-template-columns: repeat(5, 1fr); */
  width: 100%;
  gap: 10px;
  text-align: center;

  & .second {
    padding-top: 30px;
  }
  & > div {
    img {
      max-width: 100px;
      max-height: 100px;
    }
    p {
      font-size: 20px;
      padding-top: 5px;
    }
  }
`;
export default GetSealPage;
