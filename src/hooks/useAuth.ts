import useSWR from 'swr';
import axios from '../libs/axios';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useRouter } from 'next/router';

type setErrorsType = Dispatch<SetStateAction<string[]>>;
type setStatusType = Dispatch<SetStateAction<string | null>>;

interface useAuthProps {
  middleware?: string;
  redirectIfAuthenticated?: string;
}

interface authProps {
  setSubmitting: (isSubmitting: boolean) => void;
  setErrors: setErrorsType;
  setStatus: setStatusType;
  email: string;
}

interface registerProps extends Omit<authProps, 'setStatus'> {
  name: string;
  password: string;
  passwordConfirmation: string;
}

interface loginProps extends authProps {
  password: string;
  remember: boolean;
}

interface forgotPasswordProps extends authProps {
}

interface resetPasswordProps extends Omit<authProps, 'setStatus'> {
  password: string;
  passwordConfirmation: string;
}

interface resendEmailVerificationProps extends Omit<authProps, 'setErrors' | 'email'> {
}

export const useAuth = ({ middleware, redirectIfAuthenticated }: useAuthProps) => {
  const router = useRouter();

  const { data: user, error, mutate } = useSWR('/api/user', (url) =>
    axios
      .get(url)
      .then(res => res.data)
      .catch(error => {
        if (error.response.status !== 409)
          throw error;

        router.push('/verify-email');
      })
  );

  const csrf = () => axios.get('/sanctum/csrf-cookie');

  const register = async ({ setSubmitting, setErrors, ...rest }: registerProps) => {
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

  const login = async ({ setSubmitting, setErrors, setStatus, ...rest }: loginProps) => {
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

  const forgotPassword = async ({ setSubmitting, setErrors, setStatus, email }: forgotPasswordProps) => {
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

  const resetPassword = async ({ setSubmitting, setErrors, ...rest }: resetPasswordProps) => {
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

  const resendEmailVerification = ({ setSubmitting, setStatus }: resendEmailVerificationProps) => {
    setSubmitting(true);

    axios
      .post('/api/email/verificationNotification')
      .then(response => setStatus(response.data.status))
      .finally(() => setSubmitting(false));
  };

  const logout = async () => {
    if (!error) {
      await axios
        .post('/api/logout')
        .then(() => mutate());
    }

    window.location.pathname = '/login';
  };

  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && user) router.push(redirectIfAuthenticated);
    if (middleware === 'auth' && error) logout();
  }, [user, error]);

  return {
    user,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout
  };
};
