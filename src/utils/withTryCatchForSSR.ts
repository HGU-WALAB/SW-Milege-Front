// utils/withTryCatch.ts
import { GetServerSideProps } from 'next';
import axios, { AxiosError } from 'axios';

export const withTryCatchForSSR = <P>(
  getServerSidePropsFunction: GetServerSideProps<P>
): GetServerSideProps<P> => {
  return async (context) => {
    try {
      return await getServerSidePropsFunction(context);
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.isAxiosError && axiosError.response?.status === 403) {
        // return {
        //   redirect: {
        //     destination: '/auth/login',
        //     permanent: false,
        //   },
        // };
        return {
          props: {
            requireLogin: true, // 로그인 필요함을 나타내는 플래그
            error: '로그인이 필요합니다',
            permanent: false,
          } as unknown as P,
        };
      } else {
        console.error('Error:', axiosError.message);
        return {
          props: {
            fetchData: null,
            error: axiosError.message || 'An error occurred',
          } as unknown as P,
        };
      }
    }
  };
};
