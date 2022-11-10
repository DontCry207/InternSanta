import { useEffect, useState } from 'react';
import styled from 'styled-components';
import game from './road.js';
import { IoIosArrowBack } from 'react-icons/io';
import game2 from '../../assets/images/crossroad.png';
// import './game.css';
const CrossRoad = (props) => {
  const { setPage } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      game();
    }
  }, [loading]);

  const play = () => {
    return (
      <>
        <div id="counter">0</div>

        <Results id="end">
          {/* <button id="retry">Retry</button> */}
          <button onClick={() => setPage(1)}>처음으로</button>
        </Results>

        <div id="cr"></div>
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
        <Title textColor="white">길건너 눈사람</Title>

        <Explain>
          <GameImg src={game2} alt="" />
          <p>방향키(WASD키)를 이용하여 멀리멀리 달려보자.</p>
          <p>사고나지 않게 조심히 차를 피해야 한다!</p>
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
`;
export default CrossRoad;
