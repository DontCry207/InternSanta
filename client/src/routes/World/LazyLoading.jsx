import { useEffect } from 'react';

const Loading = (props) => {
  useEffect(() => {
    console.log('lazy');

    return () => {
      setTimeout(() => {
        props.setLoading();
      }, 1000);
    };
  }, []);

  return;
};

export default Loading;
