import useSWR from 'swr';
import axios from '../../libs/axios';

export const useDeviceJob = (id: string) => {
  const {
    data,
    error,
    isValidating,
    mutate
  } = useSWR(id ? `/api/device/jobs/${id}` : null,
    (url) => axios.get(url).then(res => res.data.result.deviceJob)
  );

  return {
    deviceJob: data,
    isDeviceJobLoading: !error && !data,
    isDeviceJobError: error,
    isDeviceJobValidating: isValidating,
    mutateDeviceJob: mutate,
  };
};
