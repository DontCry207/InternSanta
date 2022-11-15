import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import QuickDraw from './QuickDraw';
import { submit } from './QuickDraw';
import { randNum } from './QuickDataSet';
import { fetchData } from '../../utils/apis/api';
import Quick from '../../assets/images/Quick.png';

const MiniDrawModal = (props) => {
  const [page, setPage] = useState(0); // 페이지 넘기기 변수
  const [count, setCount] = useState(1); // 연속 정답 횟수 기록 변수
  const [loading, setLoading] = useState(true); // 캔버스 유무 변수
  const [notDraw, setNotDraw] = useState(false); // 캔버스 덮개 유무, getPointer null 에러 방지 위함
  const [correct, setCorrect] = useState(''); // 정답 기록 변수
  const [lab, setLab] = useState(''); // 정답지 기록 변수
  const [draw, setDraw] = useState(''); // 랜덤 문제지
  const drawing = { 1: draw + ' 그려라!!', 2: '성공' };
  const coin = {
    0: 0,
    1: 5,
    2: 10,
    3: 20,
    4: 30,
    5: 50,
  };
  useEffect(() => {
    setDraw(randNum());
  }, []);
  // 그림판 재로딩 Promise
  let drawReload = new Promise(function (resolve, reject) {
    resolve();
    reject();
  });
  async function relay() {
    if (count < 5) {
      setCount(count + 1);
    } else {
      setLoading(true);
      setCount(6);
    }
  }
  async function complete() {
    props.setOnMiniDraw(false);
  }
  useEffect(() => {
    if (!loading) {
      QuickDraw();
    }
  }, [loading]);

  return (
    <>
      {page == 1 ? (
        count < 6 ? (
          <Title>
            <div>{drawing[1]}</div>
          </Title>
        ) : null
      ) : page == 0 ? null : correct ? (
        <Title>
          <div>정답!!</div>
        </Title>
      ) : (
        <Title>
          <div>오답…</div>
        </Title>
      )}
      {notDraw ? (
        <CanvasCover>
          <div></div>
        </CanvasCover>
      ) : null}
      {loading ? null : (
        <Canvas>
          <div className="App">
            <canvas
              id="canvas"
              className="canvas"
              width="810px"
              height="450px"></canvas>
          </div>
        </Canvas>
      )}
      {page == 1 ? (
        count < 6 ? (
          <Button>
            <div>
              <button
                onClick={() => {
                  {
                    const drawVector = submit();
                    fetchData
                      .post('/api/v2/quick', {
                        word: draw,
                        vector: drawVector,
                      })
                      .then((res) => {
                        setLab(res.data.draw);
                        setCorrect(res.data.result);
                      })
                      .then(() => {
                        setTimeout(setPage(2), 0);
                        setNotDraw(true);
                        setDraw(randNum());
                      });
                  }
                }}
                className="submitBtn">
                제출하기
              </button>
            </div>
          </Button>
        ) : (
          <>
            <Success>
              <div className="success">5연속 정답!! 축하해요!!</div>
              <div className="coin">50코인 획득!!</div>
            </Success>
            <Button>
              <button onClick={() => complete()}>종료하기</button>
            </Button>
          </>
        )
      ) : page == 0 ? (
        <Thumnail>
          <div>
            <img
              src={Quick}
              alt="시작하기"
              onClick={() => {
                setPage(1);
                setLoading(false);
              }}
            />
            <p>드로잉 테스트</p>
          </div>
        </Thumnail>
      ) : correct ? (
        <>
          <Answer>
            {count < 3 ? (
              <div>
                {lab}!! {count}번 연속 정답이에요!!
              </div>
            ) : (
              <div>
                {lab}!! 벌써 {count}번째 정답! 파죽지세!!
              </div>
            )}
          </Answer>
          <Button>
            <div>
              <button
                onClick={() => {
                  drawReload
                    .then(() => {
                      setLoading(true);
                    })
                    .then(() => {
                      setLoading(false);
                      relay();
                    })
                    .then(() => {
                      setNotDraw(false);
                      setPage(1);
                    });
                }}
                className="nextBtn">
                다음
              </button>
            </div>
          </Button>
        </>
      ) : (
        <>
          <Answer>
            <div>이건 {lab}이네요…</div>
          </Answer>
          <Result>
            <div>
              총 {count - 1} 문제 정답!! {coin[count - 1]} 코인 획득!!
            </div>
          </Result>
          <Button>
            <div>
              <button
                onClick={() => {
                  drawReload
                    .then(() => {
                      setLoading(true);
                    })
                    .then(() => {
                      setLoading(false);
                    })
                    .then(() => {
                      setNotDraw(false);
                      setPage(1);
                      setCount(1);
                    });
                }}
                className="reTryBtn">
                재도전!!
              </button>
            </div>
          </Button>
          <Button>
            <div>
              <button className="run" onClick={() => complete()}>
                종료하기
              </button>
            </div>
          </Button>
        </>
      )}
    </>
  );
};

const Title = styled.div`
  width: 1000px;
  height: 60px;
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  line-height: 60px;
  vertical-align: middle;
  color: white;
  font-size: 60px;
`;
const Thumnail = styled.div`
  margin-top: 100px;
  img {
    width: 340px;
    height: 340px;
    border-radius: 20px;
    cursor: pointer;
  }
  p {
    margin-top: 10px;
    text-align: center;
    font-size: 28px;
  }
`;
const Success = styled.div`
  width: 1000px;
  height: 60px;
  position: absolute;
  bottom: 48%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  text-align: center;
  line-height: 60px;
  vertical-align: middle;
  color: white;
  font-size: 60px;
  .coin {
    bottim: 40%;
    font-size: 50px;
  }
`;
const CanvasCover = styled.div`
  position: absolute;
  width: 840px;
  height: 480px;
  z-index: 999;
`;
const Canvas = styled.div`
  margin-top: 70px;
  width: 810px;
  height: 405px;
  border: 2px solid #56668e;
  border-radius: 40px;
  overflow: hidden;
  box-shadow: 1px 1px 3px 1px gray;
`;
const Answer = styled.div`
  width: 800px;
  height: 60px;
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  text-align: center;
  line-height: 60px;
  vertical-align: middle;
  font-size: 30px;
`;
const Result = styled.div`
  top: 83%;
  position: absolute;
  font-size: 20px;
`;
const Button = styled.div`
  button {
    position: absolute;
    width: 140px;
    height: 50px;
    border-radius: 70px;
    font-size: 24px;
    left: 50%;
    top: 60%;
    transform: translate(-50%, 360%);
    box-shadow: 1px 1px 3px 1px gray;
    color: white;
  }
  .submitBtn {
    background-color: #56668e;
  }
  .nextBtn {
    background-color: #60c783;
  }
  .reTryBtn {
    left: 40%;
    background-color: #de6363;
  }
  .run {
    left: 60%;
    background-color: black;
  }
`;
export default MiniDrawModal;
