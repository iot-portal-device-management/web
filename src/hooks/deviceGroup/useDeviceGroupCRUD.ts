import axios from '../../libs/axios';
import { useRouter } from 'next/router';
import toastHelper from '../../libs/toastHelper';
import { KeyedMutator } from 'swr/dist/types';
import { FormFormikActions } from '../../types/formik';
import { CreateDeviceGroupFormFormikValues, EditDeviceGroupFormFormikValues } from '../../types/deviceGroup';

export interface DeviceGroupData {
  name: string;
  deviceIds?: string[];
}

export const useDeviceGroupCRUD = () => {
  const router = useRouter();

  const createDeviceGroup = (data: DeviceGroupData, {
    setErrors,
    setSubmitting
  }: FormFormikActions<CreateDeviceGroupFormFormikValues>) => {
    return axios
      .post('/api/device/groups', data)
      .then(() => {
        toastHelper.success('Device group created successfully');
        router.push('/device/groups');
      })
      .catch(error => {
        toastHelper.error(`Failed to create device group: ${error.message}`);

        if (error.response.status !== 422)
          throw error;

        if (setErrors) {
          setErrors(error.response.data.errors);
        }
      })
      .finally(() => setSubmitting(false));
  };

  const updateDeviceGroup = (id: string, data: DeviceGroupData, {
    setErrors,
    setSubmitting
  }: FormFormikActions<EditDeviceGroupFormFormikValues>) => {
    return axios
      .patch(`/api/device/groups/${id}`, data)
      .then(() => {
        toastHelper.success('Device group updated successfully');
        router.push('/device/groups');
      })
      .catch(error => {
        toastHelper.error(`Failed to update device group: ${error.message}`);

        if (error.response.status !== 422)
          throw error;

        if (setErrors) {
          setErrors(error.response.data.errors);
        }
      })
      .finally(() => setSubmitting(false));
  };

  const deleteDeviceGroups = (ids: string[], redirectToListing: boolean = false, mutate: KeyedMutator<any>) => {
    const data = { ids: ids };

    const toastId = toastHelper.loading('Deleting device groups');

    return axios
      .delete('/api/device/groups', { data })
      .then(() => {
        mutate();
        toastHelper.success('Device groups deleted successfully', toastId);

        if (redirectToListing)
          router.push('/device/groups');
      })
      .catch(error => {
        toastHelper.error(`Failed to delete device groups: ${error.message}`, toastId);
      });
  };

  return {
    createDeviceGroup,
    updateDeviceGroup,
    deleteDeviceGroups,
  };
};
