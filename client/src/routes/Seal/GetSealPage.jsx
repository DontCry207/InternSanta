import React from 'react';
import { fetchData } from '../../utils/apis/api';

const GetSealPage = () => {
  const getSeal = () => {
    fetchData.patch('/api/v1/seal').then((res) => {
      console.log(res.data);
    });
  };
  return (
    <div>
      <button onClick={() => getSeal()}>씰뽑기</button>
    </div>
  );
};

export default GetSealPage;
