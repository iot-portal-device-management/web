import axios from '../../libs/axios';
import { useRouter } from 'next/router';
import toastHelper from '../../libs/toastHelper';
import { KeyedMutator } from 'swr/dist/types';
import { FormFormikActions } from '../../types/formik';
import { CreateDeviceJobFormFormikValues } from '../../types/deviceJob';

export interface DeviceJobData {
  name: string;
  deviceGroupId: string;
  savedDeviceCommandId: string;
}

export const useDeviceJobCRUD = () => {
  const router = useRouter();

  const createDeviceJob = (data: DeviceJobData, {
    setErrors,
    setSubmitting
  }: FormFormikActions<CreateDeviceJobFormFormikValues>) => {
    return axios
      .post('/api/device/jobs', data)
      .then(() => {
        toastHelper.success('Device job created successfully');
        router.push('/device/jobs');
      })
      .catch(error => {
        toastHelper.error(`Failed to create device job: ${error.message}`);

        if (error.response.status !== 422)
          throw error;

        if (setErrors) {
          setErrors(error.response.data.errors);
        }
      })
      .finally(() => setSubmitting(false));
  };

  const deleteDeviceJobs = (ids: string[], redirectToListing: boolean = false, mutate: KeyedMutator<any>) => {
    const data = { ids: ids };

    const toastId = toastHelper.loading('Deleting device jobs');

    return axios
      .delete('/api/device/jobs', { data })
      .then(() => {
        mutate();
        toastHelper.success('Device jobs deleted successfully', toastId);

        if (redirectToListing)
          router.push('/device/jobs');
      })
      .catch(error => {
        toastHelper.error(`Failed to delete device jobs: ${error.message}`, toastId);
      });
  };

  return {
    createDeviceJob,
    deleteDeviceJobs,
  };
};
