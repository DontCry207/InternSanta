import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { fetchData } from '../../utils/apis/api';
import AlertModal from '../Common/AlertModal';
import UseInterval from '../Common/UseInterval';

const FortunePage = (props) => {
  const [fortuneText, setFortuneText] = useState('...');
  const [result, setResult] = useState('');
  const [Loading, setLoading] = useState(true);

  // UseInterval(
  //   () => {
  //     setFortuneText(fortuneText + '.');
  //   },
  //   1000,
  //   4000,
  // );

  const getFortune = async () => {
    const res = await fetchData.get('/api/v1/fortune');
    console.log(res);
    const { fortune } = res.data;

    return fortune;
  };

  const close = () => {
    props.setOnFortuneModal();
  };

  useEffect(() => {
    // console.log(fortuneText);
    // if (fortuneText == '...') {
    //   getFortune();
    // }

    const timer = async () => {
      const result = await getFortune();
      setResult(result);
      setTimeout(() => {
        setLoading(true);
      }, 3000);
    };

    timer();
  }, []);

  return (
    // <AlertModal
    //   title="오늘의 운세"
    //   rightBtnName="닫기"
    //   setRightBtnControl={close()}>
    //   {/* <SubTitle>{Loading ? fortuneText : result}</SubTitle> */}
    // </AlertModal>
    <AlertModal></AlertModal>
  );
};
const SubTitle = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  font-size: 40px;
  color: #313131;
  padding: 20px 0;
`;

const StartBtn = styled.div`
  button {
    width: 140px;
    height: 50px;
    background-color: #60c783;
    border-radius: 70px;
    font-size: 24px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    color: white;
  }
`;

export default FortunePage;
