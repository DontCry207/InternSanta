import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { BsFillTreeFill } from 'react-icons/bs';
import { BiSmile } from 'react-icons/bi';
import { HiVolumeUp } from 'react-icons/hi';

const PlayUi = () => {
  const [prog, setProg] = useState(false);
  return (
    <ContainerUi>
      <LeftTopBox>
        <Logo>
          <p>INTERN</p>
          <p>SANTA</p>
        </Logo>
        <ProgressButton
          prog={prog}
          onClick={() => {
            setProg(!prog);
          }}>
          HI
        </ProgressButton>
      </LeftTopBox>
      <RightTopBox>
        <IconBorder>
          <BsFillTreeFill size={46} color={'white'} />
        </IconBorder>
        <IconBorder>
          <BiSmile size={60} color={'white'} />
        </IconBorder>
        <IconBorder>
          <HiVolumeUp size={46} color={'white'} />
        </IconBorder>
      </RightTopBox>
      <RightBottomBox>HI</RightBottomBox>
    </ContainerUi>
  );
};

const ContainerUi = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
`;

const LeftTopBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 20px;
`;

const RightTopBox = styled.div`
  width: 360px;
  height: 120px;
  position: absolute;
  right: 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 20px;
`;

const RightBottomBox = styled.div`
  position: absolute;
  background-color: white;
  border: solid #9991b1;
  width: 300px;
  height: 300px;
  bottom: -80px;
  right: -60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 40px 0 0 0;
  padding: 20px;
  gap: 20px;
  rotate: -10deg;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    font-size: 44px;
    color: white;
    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.5));
    -webkit-text-stroke: 1px #000;
  }
`;

const ProgressButton = styled.div`
  width: ${(props) => (props.prog ? '500px' : '80px')};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 60px;
  border: solid 1px grey;
  pointer-events: auto;
  cursor: pointer;
  transition: ease-in 0.1s;
`;

const IconBorder = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border-radius: 50px;
  background-color: transparent;
  border: solid 4px #ffffff;
  pointer-events: auto;
  cursor: pointer;
`;

const MissionProgress = styled.div`
  
`
export default PlayUi;
