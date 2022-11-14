import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { fetchData } from '../../utils/apis/api';
import AlertModal from '../Common/AlertModal';

const GetSealPage = () => {
  const [sealResult, setSealResult] = useState([]);
  const [modal, setModal] = useState(false);
  const getOneSeal = (num) => {
    fetchData.patch('/api/v1/seal', { count: num }).then((res) => {
      setSealResult(res.data);
    });
    setModal(true);
  };
  const openModal = () => {
    if (modal) {
      return (
        <AlertModal
          title="뽑기 결과"
          rightBtnName="닫기"
          setRightBtnControl={() => setModal(false)}>
          {sealResult?.map((item) => {
            return (
              <div>
                {/* <img src={item.sealUrl} alt="" /> */}
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
      <button onClick={() => getOneSeal(1)}>1번 씰뽑기</button>
      <button onClick={() => getOneSeal(11)}>10+1번 씰뽑기</button>
      {openModal()}
    </div>
  );
};

export default GetSealPage;
