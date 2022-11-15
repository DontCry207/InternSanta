import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import QuickDraw from './QuickDraw';
import { submit } from './QuickDraw';
import { fetchData } from '../../utils/apis/api';

const DrawModal = (props) => {
  const [page, setPage] = useState(1); // 페이지 넘기기 변수
  const [chap, setChap] = useState(1); // 챕터 변수
  const [loading, setLoading] = useState(false); // 캔버스 유무 변수
  const [notDraw, setNotDraw] = useState(false); // 캔버스 덮개 유무, getPointer null 에러 방지 위함
  const [correct, setCorrect] = useState(''); // 정답 기록 변수
  const [lab, setLab] = useState(''); // 정답지 기록 변수
  const word = { 1: '나무', 2: '망치', 3: '못' };
  const drawing = {
    1: "'나무'를 그려주세요!!",
    2: "다음!! '망치'를 그려주세요!!",
    3: "마지막으로 '못'을 그려주세요!!",
    4: '축하합니다! 모든 미션을 완수하셨어요!!',
  };
  // 그림판 재로딩 Promise
  let drawReload = new Promise(function (resolve, reject) {
    resolve();
    reject();
  });
  async function chapter() {
    if (chap < 3) setChap(chap + 1);
    else {
      setLoading(true);
      setChap(4);
    }
  }
  async function complete() {
    props.setQuickDraw(false);
  }
  useEffect(() => {
    if (!loading) {
      QuickDraw();
    }
  }, [loading]);

  return (
    <>
      {page == 1 ? (
        chap < 4 ? (
          <Title>
            <div>{drawing[chap]}</div>
          </Title>
        ) : (
          <></>
        )
      ) : correct ? (
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
      ) : (
        <></>
      )}
      {loading ? (
        <></>
      ) : (
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
        chap < 4 ? (
          <Button>
            <div>
              <button
                onClick={() => {
                  {
                    const drawVector = submit();
                    fetchData
                      .post('/api/v2/quick', {
                        word: word[chap],
                        vector: drawVector,
                      })
                      .then((res) => {
                        setLab(res.data.draw);
                        setCorrect(res.data.result);
                      })
                      .then(() => {
                        setTimeout(setPage(2), 0);
                        setNotDraw(true);
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
              <div className="success">{drawing[chap]}</div>
            </Success>
            <Button>
              <button className="complete" onClick={() => complete()}>
                종료하기
              </button>
            </Button>
          </>
        )
      ) : correct ? (
        <>
          <Answer>
            {lab == '못' ? (
              <div>만족스러운 {lab}을 가져왔군!!</div>
            ) : (
              <div>만족스러운 {lab}를 가져왔군!!</div>
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
                      chapter();
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
            <div>이건 {lab}이잖아!!</div>
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
                    })
                    .then(() => {
                      setNotDraw(false);
                      setPage(1);
                    });
                }}
                className="reTryBtn">
                다시
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
  border: 4px solid #3e8887;
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
  .complete {
    color: gray;
  }
  .submitBtn {
    background-color: orange;
  }
  .nextBtn {
    background-color: #60c783;
  }
  .reTryBtn {
    background-color: #de6363;
  }
`;
export default DrawModal;
