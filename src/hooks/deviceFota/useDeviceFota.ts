import { FormFormikActions } from '../../types/formik';
import axios from '../../libs/axios';
import toastHelper from '../../libs/toastHelper';
import { DeviceFotaFormFormikValues, DeviceFotaPayload } from '../../types/deviceFota';

export const useDeviceFota = () => {
  const submitDeviceFota = (id: string, payload: DeviceFotaPayload, { setSubmitting }: FormFormikActions<DeviceFotaFormFormikValues>) => {
    const toastId = toastHelper.loading('Submitting FOTA command. Waiting for device acknowledgement...');

    const data = { device_command_type_name: 'FOTA', payload: payload };

    return axios.post(`/api/devices/${id}/triggerDeviceCommand`, data)
      .then(result => {
        toastHelper.success('Submitted FOTA command successfully!', toastId);
      })
      .catch(error => {
        toastHelper.error(`FOTA failed: ${error.message}`, toastId);
      })
      .finally(() => setSubmitting(false));
  };

  return {
    submitDeviceFota,
  };
};
