import React, { useCallback } from 'react';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import axios from 'axios';

interface IForm {
  search_query: string;
}
const Profile = () => {
  const { nickname } = useParams<{ nickname: string }>();
  const { handleSubmit, register } = useForm<IForm>({ defaultValues: { search_query: '' } });

  const onSubmit = useCallback((data: IForm) => {
    // axios
    //   .post(`/api/user/${data.search_query}`)
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>사용자 검색</h1>
        <input type={'text'} {...register('search_query')} />
        <button type={'submit'}>검색</button>
      </form>
    </div>
  );
};

export default Profile;
