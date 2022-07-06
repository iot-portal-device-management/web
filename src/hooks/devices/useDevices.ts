import useSWR from 'swr';
import axios from '../../libs/axios';

export const useDevices = (params: any) => {
  const { data, error, isValidating, mutate } = useSWR({
      url: '/api/devices',
      params
    }, ({ url, params }) => {
      return axios
        .get(url, { params })
        .then(res => res.data.result.devices);
    }
  );

  return {
    devices: data,
    isDevicesLoading: !error && !data,
    isDevicesError: error,
    isDevicesValidating: isValidating,
    mutateDevices: mutate
  };
};
