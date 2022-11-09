import React from 'react';
import { useState } from 'react';
import BlockStack from './BlockStack';
import CrossRoad from './CrossRoad';

const MiniGamePage = () => {
  const [page, setPage] = useState(1);

  const miniGameHome = () => {
    return (
      <>
        <button onClick={() => setPage(2)}>블록쌓기</button>
        <button onClick={() => setPage(3)}>선물배달</button>
      </>
    );
  };

  const pageGuide = () => {
    if (page === 1) return miniGameHome();
    if (page === 2) return <BlockStack setPage={setPage} />;
    if (page === 3) return <CrossRoad setPage={setPage} />;
  };
  return <div>{pageGuide()}</div>;
};

export default MiniGamePage;
