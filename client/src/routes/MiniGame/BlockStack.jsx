import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Block from './block';
import { IoIosArrowBack } from 'react-icons/io';
import game1 from '../../assets/images/blockstack.png';
const BlockStack = (props) => {
  const { setPage } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      Block();
    }
  }, [loading]);

  const play = () => {
    return (
      <>
        <Results id="results">
          <div className="content">
            <button onClick={() => setPage(1)}>처음으로</button>
          </div>
        </Results>
        <div id="score">0</div>

        <div id="game"></div>
      </>
    );
  };
  const guide = () => {
    return (
      <>
        <BackBtn>
          <IoIosArrowBack
            onClick={() => setPage(1)}
            color={'white'}
            size={50}
          />
        </BackBtn>
        <Title textColor="white">선물 쌓기</Title>

        <Explain>
          <GameImg src={game1} alt="" />
          <p>스페이스바를 이용하여 선물을 최대한 높게 쌓아보자.</p>
          <p>아래 상자와 딱 맞게 놓지 않으면 선물 크기가 작아진다!</p>
        </Explain>
        <PlayBtn
          onClick={() => {
            setLoading(false);
          }}>
          PLAY
        </PlayBtn>
      </>
    );
  };
  return <>{loading ? guide() : play()}</>;
};
const Title = styled.h2`
  display: block;
  font-size: 80px;
  width: 100%;
  text-align: center;
  color: ${(props) => props.textColor};
`;
const BackBtn = styled.div`
  position: absolute;
  left: 5px;
  top: 15px;
  cursor: pointer;
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
const Explain = styled.div`
  text-align: center;
  font-size: 24px;
  p {
    padding-top: 15px;
  }
`;
const GameImg = styled.img`
  width: 300px;
  border-radius: 20px;
`;

const Results = styled.div`
  display: none;
  position: absolute;
  bottom: 0;
`;
export default BlockStack;
