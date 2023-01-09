/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import useSWR from 'swr';
import axios from '../libs/axios';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useRouter } from 'next/router';

type SetErrors = Dispatch<SetStateAction<string[]>>;
type SetStatus = Dispatch<SetStateAction<string | null>>;

interface UseAuthProps {
  middleware?: string;
  redirectIfAuthenticated?: string;
}

interface AuthProps {
  setSubmitting: (isSubmitting: boolean) => void;
  setErrors: SetErrors;
  setStatus: SetStatus;
  email: string;
}

interface RegisterProps extends Omit<AuthProps, 'setStatus'> {
  name: string;
  password: string;
  passwordConfirmation: string;
}

interface LoginProps extends AuthProps {
  password: string;
  remember: boolean;
}

interface ForgotPasswordProps extends AuthProps {
}

interface ResetPasswordProps extends Omit<AuthProps, 'setStatus'> {
  password: string;
  passwordConfirmation: string;
}

interface ResendEmailVerificationProps extends Omit<AuthProps, 'setErrors' | 'email'> {
}

export const useAuth = ({ middleware, redirectIfAuthenticated }: UseAuthProps) => {
  const router = useRouter();

  const { data: user, error, mutate } = useSWR('/api/user', (url) =>
    axios
      .get(url)
      .then(response => response.data.result.user)
      .catch(error => {
        if (error.response.status !== 409)
          throw error;

        if (window.location.pathname !== '/verify-email')
          router.push('/verify-email');
      })
  );

  const csrf = () => axios.get('/sanctum/csrf-cookie');

  const register = async ({ setSubmitting, setErrors, ...rest }: RegisterProps) => {
    await csrf();

    setErrors([]);

    axios
      .post('/api/register', rest)
      .then(() => mutate())
      .catch(error => {
        if (error.response.status !== 422)
          throw error;

        setErrors(Object.values(error.response.data.errors).flat() as []);
      })
      .finally(() => setSubmitting(false));
  };

  const login = async ({ setSubmitting, setErrors, setStatus, ...rest }: LoginProps) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post('/api/login', rest)
      .then(() => mutate())
      .catch(error => {
        if (error.response.status !== 422)
          throw error;

        setErrors(Object.values(error.response.data.errors).flat() as []);
      })
      .finally(() => setSubmitting(false));
  };

  const forgotPassword = async ({ setSubmitting, setErrors, setStatus, email }: ForgotPasswordProps) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post('/api/forgotPassword', { email })
      .then(response => setStatus(response.data.status))
      .catch(error => {
        if (error.response.status !== 422)
          throw error;

        setErrors(Object.values(error.response.data.errors).flat() as []);
      })
      .finally(() => setSubmitting(false));
  };

  const resetPassword = async ({ setSubmitting, setErrors, ...rest }: ResetPasswordProps) => {
    await csrf();

    setErrors([]);

    axios
      .post('/api/resetPassword', { token: router.query.token, ...rest })
      .then(response => router.push('/login?reset=' + btoa(response.data.status)))
      .catch(error => {
        if (error.response.status !== 422)
          throw error;

        setErrors(Object.values(error.response.data.errors).flat() as []);
      })
      .finally(() => setSubmitting(false));
  };

  const resendEmailVerification = ({ setSubmitting, setStatus }: ResendEmailVerificationProps) => {
    setSubmitting(true);

    axios
      .post('/api/emailVerificationNotification')
      .then(response => setStatus(response.data.status))
      .finally(() => setSubmitting(false));
  };

  const logout = async () => {
    if (!error) {
      await axios
        .post('/api/logout')
        .then(() => mutate());
    }

    if (window.location.pathname !== '/login')
      window.location.pathname = '/login';
  };

  useEffect(() => {
    if (
      middleware === 'guest' &&
      redirectIfAuthenticated &&
      user &&
      !error &&
      window.location.pathname !== redirectIfAuthenticated
    )
      router.push(redirectIfAuthenticated);

    if (middleware === 'auth' && error)
      logout();
  }, [user, error]);

  return {
    user,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  };
};
