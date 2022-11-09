import { useEffect } from 'react';

const Loading = (props) => {
  useEffect(() => {
    return () => {
      setTimeout(() => {
        props.setLoading();
      }, 200);
    };
  }, []);

  return;
};

export default Loading;
