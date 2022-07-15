import { ActionsProps } from '../../types/formik';
import axios from '../../libs/axios';
import toastHelper from '../../libs/toastHelper';
import { CotaPayload } from '../../types/cota';

export const useCota = () => {
  const submitCota = (id: string, payload: CotaPayload, { setSubmitting }: ActionsProps) => {
    const toastId = toastHelper.loading('Submitting COTA command. Waiting for device acknowledgement...');

    const data = { command: 'COTA', payload: payload };

    return axios.post(`/api/devices/${id}/commands`, data)
      .then(result => {
        toastHelper.success('Submitted COTA command successfully!', toastId);
      })
      .catch(error => {
        toastHelper.error(`COTA failed: ${error.message}`, toastId);
      })
      .finally(() => setSubmitting(false));
  };

  return {
    submitCota
  };
};
