import axios from '../../libs/axios';
import { useRouter } from 'next/router';
import toastHelper from '../../libs/toastHelper';
import { Dispatch, SetStateAction } from 'react';

type SetErrors = Dispatch<SetStateAction<object | null>>;
type SetSubmitting = (isSubmitting: boolean) => void;

interface ActionsProps {
  setSubmitting: SetSubmitting;
  setErrors: SetErrors;
}

export interface DeviceData {
  name: string;
  deviceCategory: string;
}

export const useDeviceCRUD = () => {
  const router = useRouter();

  const createDevice = async ({ name, deviceCategory }: DeviceData, { setSubmitting, setErrors }: ActionsProps) => {
    const data = {
      name: name,
      deviceCategory: deviceCategory
    };

    axios
      .post('/api/devices', data)
      .then(() => {
        toastHelper.success('Device created successfully');
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

  const updateDevice = async (id: string, { name, deviceCategory }: DeviceData, {
    setSubmitting,
    setErrors
  }: ActionsProps) => {
    const data = {
      name: name,
      deviceCategory: deviceCategory
    };

    axios
      .patch(`/api/devices/${id}`, data)
      .then(() => {
        toastHelper.success('Device updated successfully');
        router.push('/devices');
      })
      .catch(error => {
        toastHelper.error(`Failed to update device: ${error.message}`);

        if (error.response.status !== 422)
          throw error;

        setErrors(error.response.data.errors);
      })
      .finally(() => setSubmitting(false));
  };

  return {
    createDevice,
    updateDevice
  };
};
