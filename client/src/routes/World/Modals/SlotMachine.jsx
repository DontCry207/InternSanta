import React, { useEffect } from 'react';
import styled from 'styled-components';

const items = ['🎅', '😊', '👻', '🦌', '🥶', '⛄', '💯', '💖', '🎃', '💎'];
// 2개맞을 확률: 30%, 3개맞을 확률: 1%
// 당첨시 3배, 20배

const SlotMachine = (props) => {
  const doors = document.querySelectorAll('.door');
  let selected = [];

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

  const isPrized = () => {
    let res = 1;
    if (selected[0] === selected[1] && selected[0] === selected[2]) {
      console.log('잭팟');
      res = 3;
    } else if (
      selected[0] === selected[1] ||
      selected[0] === selected[2] ||
      selected[1] === selected[2]
    ) {
      console.log('2등상');
      res = 2;
    } else {
      console.log('꽝');
    }
    setTimeout(() => {
      props.result(res);
    }, 2200);
  };

  async function spin() {
    init(false, 1, 2);
    selected = [];

    for (const door of doors) {
      const boxes = door.querySelector('.boxes');
      const temp = boxes.querySelector('.box').innerText;
      selected.push(temp);
      const duration = parseInt(boxes.style.transitionDuration);
      boxes.style.transform = 'translateY(0)';
      await new Promise((resolve) => setTimeout(resolve, duration * 100));
    }
    isPrized();
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
    init();
    if (props.play) {
      spin();
    }
  }, [props.play]);

  return (
    <>
      <Content>
        <div className="doors">
          <div className="door">
            <div className="boxes">
              <div className="box">
                <p>❓</p>
              </div>
            </div>
          </div>

          <div className="door">
            <div className="boxes">
              <div className="box">
                <p>❓</p>
              </div>
            </div>
          </div>

          <div className="door">
            <div className="boxes">
              <div className="box">
                <p>❓</p>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </>
  );
};

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
    margin: 20px;
  }

  .boxes {
    height: 100%;
    /* transform: translateY(0); */
    transition: transform 1s ease-in-out;
  }

  .box {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 7rem;
    p {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  .info {
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
  }
`;

export default SlotMachine;
