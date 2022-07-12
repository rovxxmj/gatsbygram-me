import { useCallback, useState } from 'react';

const useInput = (initialValue: any) => {
  const [state, setState] = useState(initialValue);
  const handler = useCallback((e: any) => {
    setState(e.target.value);
  }, []);

  return [state, handler, setState];
};

export default useInput;
