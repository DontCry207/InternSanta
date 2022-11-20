import { useEffect, useRef, useState } from 'react';

const UseInterval = (callback, delay, duration) => {
  const [intervalId, setIntervalId] = useState(null);
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      setIntervalId(setInterval(tick, delay));
      setTimeout(() => clearInterval(intervalId), duration);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default UseInterval;
