import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchData } from '../../utils/apis/api';
import { userInfoState } from '../../Atom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import ticket from '../../assets/images/ticket.png';
import { SealImg } from '../../utils/constants/constants';
const SealListPage = () => {
  const [sealList, setSealList] = useState([]);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [openBtn, setOpenBtn] = useState(true);
  useEffect(() => {
    fetchData.get('/api/v1/seal').then((res) => {
      setSealList(res.data);
    });
  }, []);

  useEffect(() => {
    sealList?.map((item) => {
      if (item.count === 0) {
        setOpenBtn(false);
      }
    });
  }, [sealList]);

  const getTicket = () => {
    fetchData.patch('/api/v1/seal/ticket').then((res) => {
      setSealList(res.data.memberSealResList);
      let newUserInfo = { ...userInfo };
      newUserInfo['memberTicket'] = res.data.memberTicket;
      setUserInfo(newUserInfo);
    });
  };

  console.log(userInfo);

  const render = () => {
    return (
      <>
        <TopBox>
          <Title>
            <MainText>
              크<b>리</b>스<b>마</b>스 <b>씰</b> 모<b>으</b>기
            </MainText>
            <SubText>
              <p>12개의 씰을 모아 티켓으로 교환해보세요!</p>
              <p>교환한 티켓은 추첨을 통해 기프티콘으로 지급됩니다.</p>
              <p>티켓을 많이 모을수록 당첨 확률 up!</p>
            </SubText>
          </Title>
        </TopBox>
        <SealBox>
          {sealList?.map((item, i) => {
            return (
              <>
                <img
                  src={SealImg[i]}
                  alt=""
                  key={i}
                  style={item.count === 0 ? { display: 'none' } : null}
                />
              </>
            );
          })}
        </SealBox>
        <div>
          <TicketBtn
            onClick={() => getTicket()}
            disabled={openBtn ? false : true}>
            <img src={ticket} alt="" width="36px" /> &nbsp;× 1 교환
          </TicketBtn>
        </div>
      </>
    );
  };
  return sealList.length ? render() : null;
};
const TopBox = styled.div``;
const Title = styled.p``;
const MainText = styled.div`
  font-size: 60px;
  color: #de6363;
  b {
    color: #60c783;
  }
`;
const SubText = styled.div`
  color: white;
  font-size: 20px;
  padding: 10px 0;
`;
const SealBox = styled.div`
  position: relative;
  width: 500px;
  background-image: url('https://internsanta.s3.ap-northeast-2.amazonaws.com/seal/sealboard.png');
  background-size: 100% 100%;
  border-radius: 20px;
  flex-grow: 1;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    &:hover {
      background-color: rgba(255, 255, 255, 0.099);
    }
  }
`;
const TicketBtn = styled.button`
  width: 230px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #60c783;
  border-radius: 70px;
  font-size: 30px;
  margin-top: 10px;
`;
export default SealListPage;
