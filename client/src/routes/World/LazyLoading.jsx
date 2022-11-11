import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { loadingState } from '../../Atom';

const LazyLoading = () => {
  const [loading, setLoading] = useRecoilState(loadingState);
  useEffect(() => {
    return () => {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };
  }, []);

  return;
};

export default LazyLoading;
