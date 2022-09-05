import useSWR from 'swr';
import axios from '../../libs/axios';

export const useDeviceEvents = (deviceId: string, params: any) => {
  const { data, error, isValidating, mutate } = useSWR(
    { url: `/api/devices/${deviceId}/events`, params },
    ({ url, params }) => axios.get(url, { params }).then(res => res.data.result.deviceEvents),
  );

  return {
    deviceEvents: data?.data,
    deviceEventsMeta: data?.meta,
    isDeviceEventsLoading: !error && !data,
    isDeviceEventsError: error,
    isDeviceEventsValidating: isValidating,
    mutateDeviceEvents: mutate
  };
};
