import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Block from './block';
import { IoIosArrowBack } from 'react-icons/io';
import game1 from '../../assets/images/blockstack.png';
import coin from '../../assets/images/coin.png';
import { useRecoilState } from 'recoil';
import { infoUpdateState } from '../../Atom';
const BlockStack = (props) => {
  const { setPage } = props;
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useRecoilState(infoUpdateState);

  useEffect(() => {
    if (!loading) {
      Block();
    }
  }, [loading]);

  const getBack = () => {
    setUpdate(!update);
    setPage(1);
  };

  const play = () => {
    return (
      <BlockGame>
        <div id="game">
          <Score id="score">0</Score>
          <Results id="results">
            <div className="content">
              <h3>GAME OVER</h3>
              <p>
                score : <b id="result-score"></b>
              </p>
              <div className="coin">
                <img src={coin} alt="" />
                <span>
                  <b id="result-coin"></b>코인 획득
                </span>
              </div>
              <PlayBtn onClick={() => getBack()}>처음으로</PlayBtn>
            </div>
          </Results>
        </div>
      </BlockGame>
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

const BlockGame = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  #game {
    border-radius: 20px;
    overflow: hidden;
    position: relative;
  }
`;

const Score = styled.div`
  position: absolute;
  font-size: 30px;
  color: white;
  top: 10px;
  left: 0;
  right: 0;
  text-align: center;
`;
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
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  &::before {
    content: '';
    width: 100%;
    height: 100%;
    background-color: white;
    opacity: 0.3;
    position: absolute;
  }
  .content {
    position: absolute;
    width: 50%;
    height: 50%;
    background-color: #fff;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    h3 {
      font-size: 50px;
      font-weight: 700;
      color: #de6363;
    }
    & > p {
      font-size: 30px;
      padding-bottom: 20px;
    }
    .coin {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 10px;
      img {
        width: 30px;
        margin-right: 5px;
      }
      span {
        font-size: 30px;
      }
    }
    button {
    }
  }
`;
export default BlockStack;
