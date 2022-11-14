import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchData } from '../../utils/apis/api';

const SealListPage = () => {
  const [sealList, setSealList] = useState(null);
  useEffect(() => {
    fetchData.get('/api/v1/seal').then((res) => {
      setSealList(res.data);
    });
  }, []);

  const render = () => {
    return (
      <div>
        {sealList?.map((item, i) => {
          return (
            <div key={i}>
              {item.sealName}: {item.count}
            </div>
          );
        })}
        <button onClick={() => {}}>티켓 교환</button>
      </div>
    );
  };
  return sealList ? render() : null;
};

export default SealListPage;
