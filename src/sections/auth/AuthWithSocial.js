// @mui
import { Divider, IconButton, Stack } from '@mui/material';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// components
import Iconify from '../../components/iconify';
import MailModalForm from '../../components/modalForm/MailModalForm';
import Link from 'next/link';
import { useRouter } from 'next/router';
// ----------------------------------------------------------------------

export default function AuthWithSocial() {
  const { loginWithGoogle, loginWithGithub, loginWithTwitter } = useAuthContext();


  const handleGithubLogin = async () => {
    try {
      if (loginWithGithub) {
        loginWithGithub();
      }
      console.log('GITHUB LOGIN');
    } catch (error) {
      console.error(error);
    }
  };

 
  const { pathname } = useRouter();

  return (
    <div>
      {pathname === '/auth/login' && (
        <Divider
          sx={{
            my: 2.5,
            typography: 'overline',
            color: 'text.disabled',
            '&::before, ::after': {
              borderTopStyle: 'dashed',
            },
          }}
        >
          contact
        </Divider>
      )}

      <Stack direction="row" justifyContent="center" spacing={2}>
        <MailModalForm />

        <Link href="https://github.com/HGU-WALAB/SW-Milege-Front" target="_blank">
          <IconButton color="inherit" onClick={handleGithubLogin}>
            <Iconify icon="eva:github-fill" />
          </IconButton>
        </Link>
      </Stack>
    </div>
  );
}
