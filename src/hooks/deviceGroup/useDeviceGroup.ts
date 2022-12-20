import useSWR from 'swr';
import axios from '../../libs/axios';

export const useDeviceGroup = (id: string) => {
  const {
    data,
    error,
    isValidating,
    mutate
  } = useSWR(
    id ? `/api/device/groups/${id}` : null,
    (url) => axios.get(url).then(res => res.data.result.deviceGroup),
  );

  return {
    deviceGroup: data,
    deviceGroupError: error,
    isDeviceGroupLoading: !error && !data,
    isDeviceGroupValidating: isValidating,
    mutateDeviceGroup: mutate,
  };
};
