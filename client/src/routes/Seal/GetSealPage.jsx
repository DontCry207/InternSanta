import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { fetchData } from '../../utils/apis/api';
import AlertModal from '../Common/AlertModal';
import machine from '../../assets/images/machine.png';
import turn from '../../assets/images/turn.png';
const GetSealPage = () => {
  const [sealResult, setSealResult] = useState([]);
  const [modal, setModal] = useState(false);
  const [openToggle, setOpenToggle] = useState(false);

  useEffect(() => {
    let timer;
    if (openToggle) {
      timer = setTimeout(() => {
        setModal(true);
        setOpenToggle(!openToggle);
        console.log('g');
      }, 3000);
    }
  }, [openToggle]);

  const getOneSeal = (num) => {
    fetchData.patch('/api/v1/seal', { count: num }).then((res) => {
      setSealResult(res.data);
      console.log(res.data);
    });
    setOpenToggle(true);
  };

  const openModal = () => {
    if (modal) {
      return (
        <AlertModal
          title="뽑기 결과"
          rightBtnName="닫기"
          setRightBtnControl={() => setModal(false)}>
          {sealResult?.map((item, i) => {
            return (
              <div key={i}>
                <img src={item.sealUrl} alt="" width="200px" />
                <p>{item.sealName}</p>
              </div>
            );
          })}
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
        <img className="turn" src={turn} alt="" />
      </Machine>
      <BtnSet>
        <button
          onClick={() => getOneSeal(1)}
          disabled={openToggle ? true : false}>
          1번 씰뽑기
        </button>
        <button
          onClick={() => getOneSeal(11)}
          disabled={openToggle ? true : false}>
          10번 씰뽑기
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
  .turn {
    position: absolute;
    top: 67%;
    left: 39%;
    width: 20%;
  }
  margin: 20px 0;
`;
const BtnSet = styled.div`
  button {
    width: 140px;
    height: 50px;
    background-color: #60c783;
    border-radius: 70px;
    font-size: 24px;
    color: white;
    &:last-child {
      background-color: #de6363;
    }
  }
`;
export default GetSealPage;
