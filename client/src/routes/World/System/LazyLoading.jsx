import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '../../../Atom';

const LazyLoading = () => {
  const setLoading = useSetRecoilState(loadingState);

  useEffect(() => {
    return () => {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };
  }, []);

  return <></>;
};

export default LazyLoading;
