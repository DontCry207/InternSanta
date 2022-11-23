import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { gambleModalState } from '../../../Atom';
import MainModal from '../../Common/MainModal';
import coin from '../../../assets/images/coin.png';

const items = ['🍭', '❌', '⛄️', '🦄', '🍌', '💩'];
// 2개맞을 확률: 13.88%, 3개맞을 확률: 2.77%
// 당첨시 4배, 20배

const GambleModal = () => {
  const [gambleModal, setGambleModal] = useRecoilState(gambleModalState);

  const close = (e) => {
    setGambleModal(false);
  };

  let doors = document.querySelectorAll('.door');

  function init(firstInit = true, groups = 1, duration = 1) {
    for (const door of doors) {
      if (firstInit) {
        door.dataset.spinned = '0';
      } else if (door.dataset.spinned === '1') {
        return;
      }

      const boxes = door.querySelector('.boxes');
      const boxesClone = boxes.cloneNode(false);
      const pool = ['❓'];

      if (!firstInit) {
        const arr = [];
        for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
          arr.push(...items);
        }
        pool.push(...shuffle(arr));

        boxesClone.addEventListener(
          'transitionstart',
          function () {
            door.dataset.spinned = '1';
            this.querySelectorAll('.box').forEach((box) => {
              box.style.filter = 'blur(1px)';
            });
          },
          { once: true },
        );

        boxesClone.addEventListener(
          'transitionend',
          function () {
            this.querySelectorAll('.box').forEach((box, index) => {
              box.style.filter = 'blur(0)';
              if (index > 0) this.removeChild(box);
            });
          },
          { once: true },
        );
      }

      for (let i = pool.length - 1; i >= 0; i--) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.style.width = door.clientWidth + 'px';
        box.style.height = door.clientHeight + 'px';
        box.textContent = pool[i];
        boxesClone.appendChild(box);
      }
      boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
      boxesClone.style.transform = `translateY(-${
        door.clientHeight * (pool.length - 1)
      }px)`;
      door.replaceChild(boxesClone, boxes);
    }
  }

  async function spin() {
    init(false, 1, 2);

    for (const door of doors) {
      console.log(door);
      const boxes = door.querySelector('.boxes');
      const duration = parseInt(boxes.style.transitionDuration);
      boxes.style.transform = 'translateY(0)';
      await new Promise((resolve) => setTimeout(resolve, duration * 100));
    }
  }

  function shuffle([...arr]) {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  }

  useEffect(() => {
    if (gambleModal) {
      doors = document.querySelectorAll('.door');
      init();
    }
  }, [gambleModal]);

  const render = () => {
    init();
    return (
      <Modal>
        <MainModal closeBtnControl={close} bgColor="#836f87">
          <Title>
            <p>슬롯머신</p>
          </Title>
          <Content>
            <div className="doors">
              <div className="door">
                <div className="boxes">
                  <div className="box">?</div>
                </div>
              </div>

              <div className="door">
                <div className="boxes">
                  <div className="box">?</div>
                </div>
              </div>

              <div className="door">
                <div className="boxes">
                  <div className="box">?</div>
                </div>
              </div>
            </div>
          </Content>
          <Buttons>
            <Coin>
              <img src={coin} alt="" />
              <input type="number" />
            </Coin>
            <button
              id="spinner"
              onClick={() => {
                init();
                spin();
              }}>
              Play
            </button>
          </Buttons>
        </MainModal>
      </Modal>
    );
  };

  return <>{gambleModal ? render() : null}</>;
};

const Modal = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
`;

const Title = styled.div`
  width: 100%;
  text-align: center;
  p {
    font-size: 60px;
    color: white;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .doors {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .door {
    background: #fafafa;
    width: 32%;
    aspect-ratio: 1;
    overflow: hidden;
    border-radius: 20px;
    margin: 5px;
  }

  .boxes {
    /* transform: translateY(0); */
    transition: transform 1s ease-in-out;
  }

  .box {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 7rem;
  }

  .info {
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
  }
`;

const Coin = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  img {
    height: 50px;
  }
  input {
    width: 200px;
    height: 50px;
    border-radius: 20px;
    font-size: 30px;
    padding: 20px;
    border: none;
    color: #0d005c;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;

  button {
    width: 140px;
    height: 50px;
    background-color: #60c783;
    border-radius: 70px;
    font-size: 24px;
    color: white;
  }
  #reseter {
    background-color: #d63c3c;
  }
`;
export default GambleModal;
