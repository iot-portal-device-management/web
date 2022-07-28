import useSWR from 'swr';
import axios from '../../libs/axios';

export const useDevice = (id: string) => {
  const {
    data,
    error,
    isValidating,
    mutate
  } = useSWR(id ? `/api/devices/${id}` : null, (url) => axios.get(url).then(res => res.data.result.device));

  return {
    device: data,
    isDeviceLoading: !error && !data,
    isDeviceError: error,
    isDeviceValidating: isValidating,
    mutateDevice: mutate,
  };
};
