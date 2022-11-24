import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  gambleModalState,
  infoUpdateState,
  userInfoState,
} from '../../../Atom';
import MainModal from '../../Common/MainModal';
import coin from '../../../assets/images/coin.png';
import AlertModal from '../../Common/AlertModal';
import SlotMachine from './SlotMachine';
import santa from '../../../assets/images/santa.png';
import { fetchData } from '../../../utils/apis/api';

const GambleModal = () => {
  const [gambleModal, setGambleModal] = useRecoilState(gambleModalState);
  const [update, setUpdate] = useRecoilState(infoUpdateState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [reward, setReward] = useState(0);
  const [play, setPlay] = useState(false);
  const [insCoin, setInsCoin] = useState(100);

  useEffect(() => {
    if (reward === 2) {
      editCoin(insCoin * 3);
    } else if (reward === 3) {
      editCoin(insCoin * 20);
    }
  }, [reward]);

  useEffect(() => {
    setReward(0);
    setInsCoin(100);
    setPlay(false);
  }, [gambleModal]);

  const close = (e) => {
    setGambleModal(false);
  };

  const editCoin = async (e) => {
    const res = await fetchData.patch('/api/v1/member/coin', {
      memberCoin: e,
    });
    setUpdate(!update);
  };

  const slotPlay = () => {
    if (insCoin <= userInfo.memberCoin) {
      editCoin(-insCoin);
      setPlay(true);
    } else {
      setReward(4);
    }
  };

  const alarm = () => {
    return (
      <Modal>
        <AlertModal
          title={'알림'}
          rightBtnName={'닫기'}
          setRightBtnControl={() => {
            setReward(0);
            setPlay(false);
          }}>
          <Reward>
            {reward !== 1 && <img src={coin} alt="" />}
            {reward === 1 && <p>꽝! 다시 도전 하세요</p>}
            {reward === 2 && <p>+{insCoin * 3}</p>}
            {reward === 3 && <p>+{insCoin * 20}</p>}
            {reward === 4 && <p>보유 코인이 부족합니다</p>}
          </Reward>
        </AlertModal>
      </Modal>
    );
  };

  const render = () => {
    return (
      <Modal>
        {reward ? alarm() : null}
        <MainModal closeBtnControl={close} bgColor="#836f87">
          <Title>
            <MainTitle>
              <p>산타</p>
              <img src={santa} />
              <p>슬롯</p>
            </MainTitle>
            <p className="sub">같은 그림 2개면 3배 보상!</p>
            <p className="sub">같은 그림 3개면 20배 보상!</p>
          </Title>
          <SlotMachine play={play} result={(e) => setReward(e)} />
          <CoinBox>
            <Coin>
              <p>투입 코인</p>
              <img src={coin} alt="" />
              <select
                size="1"
                className="insCoin"
                onChange={(e) => {
                  setInsCoin(e.target.value);
                }}
                disabled={play ? true : false}>
                <option value={100} defaultValue>
                  100
                </option>
                <option value={200}>200</option>
                <option value={400}>400</option>
                <option value={400}>600</option>
                <option value={800}>800</option>
                <option value={1000}>1000</option>
                <option value={5000}>5000</option>
                <option value={10000}>10000</option>
              </select>
            </Coin>
            {play ? (
              <button className="disable">Play</button>
            ) : (
              <button
                id="spinner"
                onClick={() => {
                  slotPlay();
                }}>
                Play
              </button>
            )}
          </CoinBox>
        </MainModal>
      </Modal>
    );
  };

  return <>{gambleModal ? render() : null}</>;
};

const Modal = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
`;

const Title = styled.div`
  width: 100%;
  text-align: center;
  p {
    font-size: 90px;
    color: white;
  }
  .sub {
    font-size: 30px;
  }
`;

const MainTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  img {
    height: 80px;
  }
`;

const Coin = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 30px;
  img {
    height: 50px;
  }
  select {
    width: 150px;
    height: 50px;
    border-radius: 20px;
    font-size: 30px;
    padding: 0 20px;
    color: #0d005c;
    cursor: pointer;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
  }

  select:hover {
    border-color: #888;
  }

  select:focus {
    border-color: #aaa;
    box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    color: #222;
    outline: none;
  }

  select:disabled {
    opacity: 0.5;
  }
`;

const CoinBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;

  button {
    width: 140px;
    height: 50px;
    background-color: #e31d13;
    border-radius: 70px;
    font-size: 28px;
    color: white;
  }

  .disable {
    opacity: 0.4;
    cursor: default;
  }
`;

const Reward = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  img {
    height: 40px;
  }
  p {
    font-size: 40px;
  }
`;

export default GambleModal;
