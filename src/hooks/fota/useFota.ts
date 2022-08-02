import { FormFormikActions } from '../../types/formik';
import axios from '../../libs/axios';
import toastHelper from '../../libs/toastHelper';
import { FotaPayload } from '../../types/fota';

export const useFota = () => {
  const submitFota = (id: string, payload: FotaPayload, { setSubmitting }: FormFormikActions) => {
    const toastId = toastHelper.loading('Submitting FOTA command. Waiting for deviceStatus acknowledgement...');

    const data = { command: 'FOTA', payload: payload };

    return axios.post(`/api/devices/${id}/commands`, data)
      .then(result => {
        toastHelper.success('Submitted FOTA command successfully!', toastId);
      })
      .catch(error => {
        toastHelper.error(`FOTA failed: ${error.message}`, toastId);
      })
      .finally(() => setSubmitting(false));
  };

  return {
    submitFota
  };
};
