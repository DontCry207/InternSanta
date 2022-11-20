import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import QuickDraw from './QuickDraw';
import { submit } from './QuickDraw';
import { fetchData } from '../../utils/apis/api';
import congrats from '../../assets/images/congrats.png';

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
    4: '모든 미션을 완수하셨어요!!',
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
    props.close();
  }
  useEffect(() => {
    if (!loading) {
      QuickDraw();
    }
  }, [loading]);

  return (
    <QuickDrawBox>
      <Title>
        {page == 1 && (chap < 4 ? <p>{drawing[chap]}</p> : <></>)}
        {page != 1 && (correct ? <p>정답!!</p> : <p>오답…</p>)}
        {chap === 4 && <p>축하합니다</p>}
      </Title>

      <CanvasBox>
        {chap === 4 && <img className="congrats" src={congrats}></img>}
        {notDraw && <CanvasCover></CanvasCover>}
        {!loading && (
          <Canvas>
            <canvas
              id="canvas"
              className="canvas"
              width="810px"
              height="530px"></canvas>
          </Canvas>
        )}
      </CanvasBox>

      {page == 1 ? (
        chap < 4 ? (
          <>
            <Answer />
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
          </>
        ) : (
          <>
            <Answer>
              <div className="success">{drawing[chap]}</div>
            </Answer>
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
    </QuickDrawBox>
  );
};

const QuickDrawBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    font-size: 4.5rem;
    color: white;
  }
`;

const CanvasBox = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .congrats {
    width: 80%;
  }
`;

const CanvasCover = styled.div`
  position: absolute;
  width: 100%;
  height: 60%;
  z-index: 20;
`;

const Canvas = styled.div`
  width: 810px;
  height: 100%;
  border: 2px solid #3e8887;
  border-radius: 40px;
  overflow: hidden;
  box-shadow: 1px 1px 3px 1px gray;
`;

const Answer = styled.div`
  position: relative;
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 40px;
`;

const Button = styled.div`
  position: relative;
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  button {
    background-color: #60c783;
    border-radius: 70px;
    padding: 10px 20px;
    font-size: 34px;
    box-shadow: 1px 1px 3px 1px gray;
    color: white;
    cursor: pointer;
  }
  .complete {
    background-color: #60c783;
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
