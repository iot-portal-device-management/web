import { FormFormikActions } from '../../types/formik';
import axios from '../../libs/axios';
import toastHelper from '../../libs/toastHelper';
import { SotaPayload } from '../../types/sota';

export const useSota = () => {
  const submitSota = (id: string, payload: SotaPayload, { setSubmitting }: FormFormikActions) => {
    const toastId = toastHelper.loading('Submitting SOTA command. Waiting for deviceStatus acknowledgement...');

    const data = { command: 'SOTA', payload: payload };

    return axios.post(`/api/devices/${id}/commands`, data)
      .then(result => {
        toastHelper.success('Submitted SOTA command successfully!', toastId);
      })
      .catch(error => {
        toastHelper.error(`SOTA failed: ${error.message}`, toastId);
      })
      .finally(() => setSubmitting(false));
  };

  return {
    submitSota
  };
};
