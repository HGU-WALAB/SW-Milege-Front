import { useState } from 'react';
import * as Yup from 'yup';
// next
import NextLink from 'next/link';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
// auth
// components
import Iconify from '../../components/iconify';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import { login } from '../../auth/utils';
// ----------------------------------------------------------------------

export const DOMAIN = process.env.NEXT_PUBLIC_HOST_BASE_DOMAIN;

export default function AuthLoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    uniqueId: Yup.string().required('학번을 입력하세요'),
    password: Yup.string().required('비밀번호를 입력하세요'),
  });

  const defaultValues = {
    uniqueId: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const loginData = {
        uniqueId: data.uniqueId,
        password: data.password,
      };
      await login(loginData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="uniqueId" label="학번" />

        <RHFTextField
          name="password"
          label="히즈넷 비밀번호"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack alignItems="flex-end" sx={{ my: 2 }}>
        <Link
          component={NextLink}
          href="https://hisnet.handong.edu/"
          target="_blank"
          variant="body2"
          color="inherit"
          underline="always"
        >
          히즈넷 가기
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        sx={{
          bgcolor: 'text.primary',
          color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          '&:hover': {
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          },
        }}
      >
        로그인
      </LoadingButton>
    </FormProvider>
  );
}
