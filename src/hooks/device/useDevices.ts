import useSWR from 'swr';
import axios from '../../libs/axios';

export const useDevices = (params: any) => {
  const { data, error, isValidating, mutate } = useSWR({ url: '/api/devices', params }, ({ url, params }) =>
    axios
      .get(url, { params })
      .then(res => res.data.result.devices)
  );

  return {
    devices: data?.data,
    devicesMeta:  data?.meta,
    isDevicesLoading: !error && !data,
    isDevicesError: error,
    isDevicesValidating: isValidating,
    mutateDevices: mutate
  };
};
