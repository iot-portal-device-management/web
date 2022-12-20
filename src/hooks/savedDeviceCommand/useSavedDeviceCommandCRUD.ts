import axios from '../../libs/axios';
import { useRouter } from 'next/router';
import toastHelper from '../../libs/toastHelper';
import { KeyedMutator } from 'swr/dist/types';
import { FormFormikActions } from '../../types/formik';
import { CreateSavedDeviceCommandFormFormikValues } from '../../types/savedDeviceCommand';

export interface SavedDeviceCommandData {
  name: string;
}

export const useSavedDeviceCommandCRUD = () => {
  const router = useRouter();

  const createSavedDeviceCommand = (data: SavedDeviceCommandData, {
    setErrors,
    setSubmitting
  }: FormFormikActions<CreateSavedDeviceCommandFormFormikValues>) => {
    return axios
      .post('/api/device/commands/saved', data)
      .then(() => {
        toastHelper.success('Saved device commands created successfully');
        router.push('/device/commands/saved');
      })
      .catch(error => {
        toastHelper.error(`Failed to create saved device command: ${error.message}`);

        if (error.response.status !== 422)
          throw error;

        if (setErrors) {
          setErrors(error.response.data.errors);
        }
      })
      .finally(() => setSubmitting(false));
  };

  const deleteSavedDeviceCommands = (ids: string[], redirectToListing: boolean = false, mutate: KeyedMutator<any>) => {
    const data = { ids: ids };

    const toastId = toastHelper.loading('Deleting saved device commands');

    return axios
      .delete('/api/device/commands/saved', { data })
      .then(() => {
        mutate();
        toastHelper.success('Saved device commands deleted successfully', toastId);

        if (redirectToListing)
          router.push('/device/commands/saved');
      })
      .catch(error => {
        toastHelper.error(`Failed to delete saved device commands: ${error.message}`, toastId);
      });
  };

  return {
    createSavedDeviceCommand,
    deleteSavedDeviceCommands,
  };
};
