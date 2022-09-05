import axios from '../../libs/axios';
import { useRouter } from 'next/router';
import toastHelper from '../../libs/toastHelper';
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
      .then(result => {
        toastHelper.success('Device job created successfully');
        router.push(`/device/jobs/${result.data.result.deviceJob.id}`);
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

  return {
    createDeviceJob,
  };
};
