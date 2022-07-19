import axios from '../../libs/axios';
import { useRouter } from 'next/router';
import toastHelper from '../../libs/toastHelper';
import { Dispatch, SetStateAction } from 'react';
import { KeyedMutator } from 'swr/dist/types';

type SetErrors = Dispatch<SetStateAction<object | null>>;
type SetSubmitting = (isSubmitting: boolean) => void;

interface ActionsProps {
  setErrors: SetErrors;
  setSubmitting: SetSubmitting;
}

export interface DeviceData {
  name: string;
  deviceCategory: string;
}

export const useDeviceCRUD = () => {
  const router = useRouter();

  const createDevice = ({ name, deviceCategory }: DeviceData, { setErrors, setSubmitting }: ActionsProps) => {
    const data = {
      name: name,
      deviceCategory: deviceCategory
    };

    return axios
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

  const updateDevice = (id: string, { name, deviceCategory }: DeviceData, {
    setErrors,
    setSubmitting
  }: ActionsProps) => {
    const data = {
      name: name,
      deviceCategory: deviceCategory
    };

    return axios
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

  const deleteDevices = (ids: string[], redirectToListing: boolean = false, mutate: KeyedMutator<any>) => {
    const data = { ids: ids };

    const toastId = toastHelper.loading('Deleting deviceStatus');

    return axios
      .delete('/api/devices', { data })
      .then(() => {
        mutate();
        toastHelper.success('Device deleted successfully', toastId);

        if (redirectToListing)
          router.push('/devices');
      })
      .catch(error => {
        toastHelper.error(`Failed to delete device: ${error.message}`, toastId);
      });
  };

  return {
    createDevice,
    updateDevice,
    deleteDevices
  };
};
