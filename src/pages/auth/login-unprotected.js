// next
import Head from 'next/head';
// sections
import Login from '../../sections/auth/Login';

// ----------------------------------------------------------------------

export default function LoginUnprotectedPage() {
  return (
    <>
      <Head>
        <title>SW 마일리지 관리자 로그인</title>
      </Head>

      <Login />
    </>
  );
}
