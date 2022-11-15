import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { fetchData } from '../../utils/apis/api';
import AlertModal from '../Common/AlertModal';

const GetSealPage = () => {
  const [sealResult, setSealResult] = useState([]);
  const [modal, setModal] = useState(false);
  const [openToggle, setOpenToggle] = useState(false);

  useEffect(() => {
    let timer;
    if (openToggle) {
      timer = setTimeout(() => {
        setModal(true);
        setOpenToggle(!openToggle);
        console.log('g');
      }, 3000);
    }
  }, [openToggle]);

  const getOneSeal = (num) => {
    fetchData.patch('/api/v1/seal', { count: num }).then((res) => {
      setSealResult(res.data);
      console.log(res.data);
    });
    setOpenToggle(true);
  };

  const openModal = () => {
    if (modal) {
      return (
        <AlertModal
          title="뽑기 결과"
          rightBtnName="닫기"
          setRightBtnControl={() => setModal(false)}>
          {sealResult?.map((item, i) => {
            return (
              <div key={i}>
                <img src={item.sealUrl} alt="" width="200px" />
                <p>{item.sealName}</p>
              </div>
            );
          })}
        </AlertModal>
      );
    }
  };
  return (
    <div>
      <button
        onClick={() => getOneSeal(1)}
        disabled={openToggle ? true : false}>
        1번 씰뽑기
      </button>
      <button
        onClick={() => getOneSeal(11)}
        disabled={openToggle ? true : false}>
        10+1번 씰뽑기
      </button>
      {openModal()}
    </div>
  );
};

export default GetSealPage;
