import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchData } from '../../utils/apis/api';
import { infoUpdateState } from '../../Atom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import ticket from '../../assets/images/ticket.png';
import { SealImg } from '../../utils/constants/constants';
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from 'react-icons/hi';
import AlertModal from '../Common/AlertModal';
const SealListPage = () => {
  const [sealList, setSealList] = useState([]);
  const [sealRank, setSealRank] = useState([]);
  const [openBtn, setOpenBtn] = useState(true);
  const [update, setUpdate] = useRecoilState(infoUpdateState);
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetchData.get('/api/v1/seal').then((res) => {
      setSealList(res.data);
    });
    fetchData.get(`/api/v1/member/rank/${5}`).then((res) => {
      setSealRank(res.data);
    });
  }, [update]);

  useEffect(() => {
    sealList?.map((item) => {
      if (item.count === 0) {
        setOpenBtn(false);
      }
    });
  }, [sealList]);

  const getTicket = async () => {
    const res = await fetchData.patch('/api/v1/seal/ticket');
    setSealList(res.data.memberSealResList);
    setUpdate(!update);
    setModal(true);
  };

  const openModal = () => {
    if (modal) {
      return (
        <Modal>
          <AlertModal
            title="뽑기 결과"
            rightBtnName="닫기"
            setRightBtnControl={() => setModal(false)}>
            <Content>
              <p>티켓 한장 교환 성공</p>
            </Content>
          </AlertModal>
        </Modal>
      );
    }
  };

  const rander = () => {
    return (
      <>
        {openModal()}
        <TopBox>
          <MainText>
            크<b>리</b>스<b>마</b>스 <b>씰</b> 모<b>으</b>기
          </MainText>
          <SubBox>
            <SubText>
              <p>12개의 씰을 모아 티켓으로 교환해보세요!</p>
              <p>교환한 티켓은 추첨을 통해 기프티콘으로 지급됩니다.</p>
              <p>티켓을 많이 모을수록 당첨 확률 up!</p>
            </SubText>

            <RankBtnList>
              {page === 1 ? (
                <button onClick={() => setPage(2)}>
                  순위 보러가기&nbsp;
                  <HiOutlineArrowNarrowRight />
                </button>
              ) : (
                <button onClick={() => setPage(1)}>
                  <HiOutlineArrowNarrowLeft /> &nbsp;내 씰 보러가기
                </button>
              )}
            </RankBtnList>
          </SubBox>
        </TopBox>
        {page === 1 ? page1() : page2()}
      </>
    );
  };

  const page1 = () => {
    return (
      <>
        <SealBox>
          {sealList?.map((item, i) => {
            return (
              <img
                src={SealImg[i]}
                alt=""
                key={i}
                style={item.count === 0 ? { display: 'none' } : null}
              />
            );
          })}
          <SealNumber>
            {sealList?.map((item, i) => {
              return (
                <p key={i} id={`seal${i}`}>
                  {item.count}
                </p>
              );
            })}
          </SealNumber>
        </SealBox>
        <div>
          <TicketBtn
            onClick={() => getTicket()}
            disabled={openBtn ? false : true}>
            <img src={ticket} alt="" width="28px" /> &nbsp;× 1 교환
          </TicketBtn>
        </div>
      </>
    );
  };

  const page2 = () => {
    return (
      <>
        <GiftBox>
          <div className="rank1">
            <img
              src="https://img.danawa.com/prod_img/500000/947/992/img/2992947_1.jpg?shrink=330:330&_v=20210913165010"
              alt="BHC 뿌링클"
            />
            <p>
              BHC 뿌링클
              <br />
              (1명)
            </p>
          </div>
          <div className="rank2">
            <img
              src="https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/2002775565/B.jpg?20000000"
              alt="스타벅스 '오늘도 달콤하게'"
            />
            <p>
              스타벅스 '오늘도 달콤하게'
              <br />
              (2명)
            </p>
          </div>
          <div className="rank3">
            <img
              src="http://gdimg.gmarket.co.kr/641073826/still/600?ver=1538621875"
              alt="스타벅스 아메리카노"
            />
            <p>
              스타벅스 아메리카노
              <br />
              (4명)
            </p>
          </div>
        </GiftBox>
        <RankBox>
          <table>
            <caption>티켓 TOP 5</caption>
            <colgroup>
              <col style={{ width: '20%' }} />
              <col style={{ width: '60%' }} />
              <col style={{ width: '20%' }} />
            </colgroup>
            <thead>
              <tr>
                <th>순위</th>
                <th>닉네임</th>
                <th>개수</th>
              </tr>
            </thead>
            <tbody>
              {sealRank?.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.memberNickname}</td>
                    <td>{item.memberTicket}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </RankBox>
      </>
    );
  };

  return sealList.length ? rander() : null;
};
const Modal = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 20;
`;

const Content = styled.div`
  font-size: 25px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
`;

const TopBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MainText = styled.div`
  font-size: 80px;
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

const SubBox = styled.div`
  display: flex;
  gap: 40px;
`;

const GiftBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 50px;
  padding: 20px 0;
  div {
    text-align: center;
    color: white;
    font-size: 18px;
  }
  img {
    border-radius: 20px;
    margin-bottom: 10px;
  }
  .rank1 {
    width: 20%;
    img {
      width: 100%;
    }
  }
  .rank2 {
    width: 16%;
    img {
      width: 100%;
    }
  }
  .rank3 {
    width: 12%;
    img {
      width: 100%;
    }
  }
`;

const SealBox = styled.div`
  position: relative;
  margin: 10px 0;
  background-image: url('https://internsanta.s3.ap-northeast-2.amazonaws.com/seal/sealboard.png');
  background-size: 100% 100%;
  border-radius: 20px;
  flex-grow: 1;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;

const RankBox = styled.div`
  flex-grow: 1;
  width: 60%;
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 22px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar,
  &::-webkit-scrollbar-thumb {
    overflow: visible;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(13, 12, 15, 0.4);
  }
  table {
    margin: 0 auto;
    width: 100%;
    caption {
      color: white;
      font-size: 36px;
      padding-bottom: 10px;
    }
    th {
      font-weight: 700;
      border-bottom: 2px solid white;
      padding: 8px 0;
    }
    td {
      padding: 8px 0;
    }
  }
`;
const SealNumber = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  /* background-color: #ffffff76; */
  opacity: 0;
  transition: all 0.2s;
  &:hover {
    background-color: #ffffff76;
    opacity: 1;
  }
  p {
    font-size: 24px;
    font-weight: 700;
    position: absolute;
    transform: translate(-50%, -50%);
    /* border: 1px ; */
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: white;
    color: white;
    border: 2px solid lightgray; */
    color: white;
    text-shadow: -2px 0 #023f1b, 0 2px #023f1b, 2px 0 #023f1b, 0 -2px #023f1b;
  }
  #seal0 {
    top: 22%;
    left: 20%;
  }
  #seal1 {
    top: 10%;
    left: 40%;
  }
  #seal2 {
    top: 20%;
    left: 59.5%;
  }
  #seal3 {
    top: 9%;
    left: 82.5%;
  }
  #seal4 {
    top: 45.25%;
    left: 15%;
  }
  #seal5 {
    top: 47%;
    left: 45%;
  }
  #seal6 {
    top: 34.5%;
    left: 79.25%;
  }
  #seal7 {
    top: 58%;
    left: 86.75%;
  }
  #seal8 {
    top: 80%;
    left: 21%;
  }
  #seal9 {
    top: 90.5%;
    left: 48.5%;
  }
  #seal10 {
    top: 71%;
    left: 65%;
  }
  #seal11 {
    top: 88%;
    left: 83%;
  }
`;
const RankBtnList = styled.div`
  button {
    width: 145px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #de6363;
    border-radius: 70px;
    font-size: 20px;
    margin-top: 10px;
    color: white;
  }
`;
const TicketBtn = styled.button`
  width: 140px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #60c783;
  border-radius: 70px;
  font-size: 24px;
  margin-top: 10px;
  color: white;
  &:disabled {
    background-color: lightgray;
  }
`;
export default SealListPage;
