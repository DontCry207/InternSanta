import { useState } from 'react';
import styled from 'styled-components';
import { fetchData } from '../../utils/apis/api';
import ClothesCut from './ClothesCut';
const ClothesPage = () => {
  const [clothesFront, setClothesFront] = useState('');
  const [clothesBack, setClothesBack] = useState('');
  const [frontModal, setFrontModal] = useState(false);
  const [backModal, setBackModal] = useState(false);

  const openModal = () => {
    if (frontModal) {
      return (
        <ClothesCut
          closeModal={() => setFrontModal(false)}
          setClothesData={setClothesFront}
        />
      );
    }
    if (backModal) {
      return (
        <ClothesCut
          closeModal={() => setBackModal(false)}
          setClothesData={setClothesBack}
        />
      );
    }
  };
  const callApi = async () => {
    const formData = new FormData();
    formData.append('clothesFront', clothesFront);
    formData.append('clothesBack', clothesBack);

    // return await fetchData.patch('/api/v1/member/top', formData, {
    const a = await fetchData.patch('/api/v1/member/top', formData, {
      headers: {
        'Content-Type': `multipart/form-data`,
      },
    });
    console.log(a);
  };
  return (
    <>
      <Title>
        <h2>나만의 옷 만들기</h2>
        <SubTitle>asdfaddasf</SubTitle>
      </Title>
      <ClothCut>
        <div>
          <button onClick={() => setFrontModal(true)}>앞면</button>
          <img src={clothesFront} alt="" />
        </div>
        <div>
          <button onClick={() => setBackModal(true)}>뒷면</button>
          <img src={clothesBack} alt="" />
        </div>
      </ClothCut>

      <PlayBtn
        onClick={() => {
          callApi();
        }}>
        적용
      </PlayBtn>
      {openModal()}
    </>
  );
};
const Title = styled.div`
  h2 {
    display: block;
    font-size: 80px;
    width: 100%;
    text-align: center;
    color: white;
  }
`;
const SubTitle = styled.p``;

const ClothCut = styled.div`
  & > div {
    & > img {
      width: 200px;
    }
  }
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

export default ClothesPage;
