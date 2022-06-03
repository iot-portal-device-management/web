import axios from '../libs/axios';
import { useRouter } from 'next/router';
import toastHelper from '../libs/toastHelper';
import { Dispatch, SetStateAction } from 'react';

type SetErrors = Dispatch<SetStateAction<null | object>>;

export interface CreateDeviceProps {
  setSubmitting: (isSubmitting: boolean) => void;
  setErrors: SetErrors
  name: string;
  deviceCategory: string;
}

export const useDevice = () => {
  const router = useRouter();

  const createDevice = async ({ setSubmitting, setErrors, name, deviceCategory }: CreateDeviceProps) => {
    const payload = {
      name: name,
      deviceCategory: deviceCategory
    };

    axios
      .post('/api/devices', payload)
      .then(() => {
        toastHelper.success('Device created successfully!');
        router.push('/devices');
      })
      .catch(error => {
        toastHelper.error(`Failed to create device: ${error.message}`);

        if (error.response.status !== 422)
          throw error;

        setErrors(error.response.data.errors);
      })
      .finally(() => setSubmitting(false));
  };

  return {
    createDevice
  };
};
