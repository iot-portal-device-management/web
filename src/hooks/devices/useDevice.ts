import useSWR from 'swr';
import axios from '../../libs/axios';

export const useDevice = (id: string) => {
  const { data, error, isValidating, mutate } = useSWR(`/api/devices/${id}`, (url) => {
      return axios
        .get(url)
        .then(res => res.data.result.device)
    }
  );

  return {
    device: data,
    isDeviceLoading: !error && !data,
    isDeviceError: error,
    isDeviceValidating: isValidating,
    mutateDevice: mutate
  };
};
