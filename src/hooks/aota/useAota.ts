import { FormFormikActions } from '../../types/formik';
import axios from '../../libs/axios';
import toastHelper from '../../libs/toastHelper';
import { AotaFormFormikValues, AotaPayload } from '../../types/aota';

export const useAota = () => {
  const submitAota = (deviceId: string, payload: AotaPayload, { setSubmitting }: FormFormikActions<AotaFormFormikValues>) => {
    const toastId = toastHelper.loading('Submitting AOTA command. Waiting for device acknowledgement...');

    const data = { command: 'AOTA', payload: payload };

    return axios.post(`/api/devices/${deviceId}/commands`, data)
      .then(result => {
        toastHelper.success('Submitted AOTA command successfully!', toastId);
      })
      .catch(error => {
        toastHelper.error(`AOTA failed: ${error.message}`, toastId);
      })
      .finally(() => setSubmitting(false));
  };

  return {
    submitAota
  };
};
