import axios from 'axios';
import { useState } from 'react';

export type UseMutationState<T> = { loading: boolean; data?: T; error?: object };
export type UseMutationReturnType<T> = [(data: any) => void, UseMutationState<T>];

const useMutation = <T = any>(url: string): UseMutationReturnType<T> => {
  const [state, setState] = useState<UseMutationState<T>>({ loading: false, data: undefined, error: undefined });
  const mutation = (data: any) => {
    setState((prev) => ({ ...prev, loading: true }));
    axios
      .post(url, data, { withCredentials: true })
      .then((res) => {
        setState((prev) => ({ ...prev, data: res.data }));
      })
      .catch((error) => {
        console.error('❌ 400 클라이언트 오류', error);
        setState((prev) => ({ ...prev, error }));
      })
      .finally(() => {
        setState((prev) => ({ ...prev, loading: false }));
      });
  };
  return [mutation, { ...state }];
};
export default useMutation;
