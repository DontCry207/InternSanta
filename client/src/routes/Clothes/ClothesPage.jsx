import { useState } from 'react';
import styled from 'styled-components';
import { fetchData } from '../../utils/apis/api';
import ClothesCut from './ClothesCut';
import clothesEmpty from '../../assets/images/clothesEmpty.png';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../Atom';
import AlertModal from '../Common/AlertModal';

const ClothesPage = (props) => {
  const [clothesFront, setClothesFront] = useState('');
  const [clothesBack, setClothesBack] = useState('');
  const [frontModal, setFrontModal] = useState(false);
  const [backModal, setBackModal] = useState(false);
  const [resultModal, setResultModal] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const openModal = () => {
    if (frontModal) {
      return (
        <ClothesCut
          title="앞면"
          closeModal={() => setFrontModal(false)}
          setClothesData={setClothesFront}
        />
      );
    }
    if (backModal) {
      return (
        <ClothesCut
          title="뒷면"
          closeModal={() => setBackModal(false)}
          setClothesData={setClothesBack}
        />
      );
    }
    if (resultModal) {
      return (
        <AlertModal
          title="변경 완료"
          rightBtnName="닫기"
          setRightBtnControl={() => {
            setResultModal(false);
            props.close();
          }}>
          <ResultBox>변경이 완료되었습니다.</ResultBox>
        </AlertModal>
      );
    }
  };

  const callApi = async () => {
    const formData = new FormData();
    formData.append('clothesFront', clothesFront);
    formData.append('clothesBack', clothesBack);

    // return await fetchData.patch('/api/v1/member/top', formData, {
    fetchData
      .post('/api/v1/member/top', formData, {
        headers: {
          'Content-Type': `multipart/form-data`,
        },
      })
      .then((res) => {
        let newUserInfo = { ...userInfo };
        newUserInfo['memberTop'] = res.data.memberTop;
        setUserInfo(newUserInfo);
        setResultModal(true);
      })
      .catch(() => {
        alert('사진을 추가해주세요.');
      });
  };

  const render = () => {
    return (
      <>
        <Title>
          <h2>나만의 옷 만들기</h2>
          <SubTitle>
            내가 가진 옷을 캐릭터에게 입혀보자.
            <br />
            옷의 앞면과 뒷면 사진을 추가해서 캐릭터 옷으로 만들 수 있다!
          </SubTitle>
        </Title>

        <ClothCut>
          <Front>
            <p>앞면</p>
            <img
              className="front"
              src={clothesFront ? clothesFront : clothesEmpty}
              onClick={() => setFrontModal(true)}
              alt=""
            />
          </Front>

          <Back>
            <p>뒷면</p>
            <img
              className="back"
              src={clothesBack ? clothesBack : clothesEmpty}
              onClick={() => setBackModal(true)}
              alt=""
            />
          </Back>
        </ClothCut>

        <ButtonBox>
          <PlayBtn
            onClick={() => {
              callApi();
            }}>
            적용
          </PlayBtn>
        </ButtonBox>

        {openModal()}
      </>
    );
  };

  return <>{render()}</>;
};

const Title = styled.div`
  width: 100%;
  height: 20%;
  h2 {
    display: block;
    font-size: 80px;
    width: 100%;
    text-align: center;
    color: white;
  }
`;
const SubTitle = styled.p`
  text-align: center;
  padding-top: 20px;
  color: white;
  font-size: 22px;
`;

const ClothCut = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  padding: 20px;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      text-align: center;
      padding-bottom: 20px;
      font-size: 30px;
      color: white;
    }
    & > img {
      height: 90%;
      border-radius: 40px;
      cursor: pointer;
      margin: 0 auto;
    }
    .front {
      border: 5px solid #de6363;
    }
    .back {
      border: 5px solid #60c783;
    }
  }
`;

const ButtonBox = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PlayBtn = styled.button`
  width: 140px;
  height: 50px;
  background-color: #60c783;
  border-radius: 70px;
  font-size: 24px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: white;
`;

const Front = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Back = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ResultBox = styled.div`
  font-size: 28px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default ClothesPage;
