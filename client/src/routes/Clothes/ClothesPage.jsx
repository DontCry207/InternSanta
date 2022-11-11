import { useState } from 'react';
import styled from 'styled-components';
import ClothesCut from './ClothesCut';
const ClothesPage = () => {
  const [clothesFront, setClothesFront] = useState('');
  const [frontModal, setFrontModal] = useState(false);

  const openModal = () => {
    if (frontModal) {
      return (
        <ClothesCut
          closeModal={() => setFrontModal(false)}
          setClothesData={setClothesFront}
        />
      );
    }
  };
  return (
    <>
      <Title>
        <h2>나만의 옷 만들기</h2>
        <SubTitle>asdfaddasf</SubTitle>
      </Title>
      <ClothCut>
        <button onClick={() => setFrontModal(true)}>앞면</button>
      </ClothCut>

      <img src={clothesFront} alt="" />
      <PlayBtn onClick={() => setPage(1)}>적용</PlayBtn>
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

const ClothCut = styled.div``;

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
