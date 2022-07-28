import useSWR from 'swr';
import axios from '../../libs/axios';

export const useDeviceGroupDevices = (deviceGroupId: string, params: any) => {
  const { data, error, isValidating, mutate } = useSWR({ url: `/api/device/groups/${deviceGroupId}/devices`, params },
    ({ url, params }) => axios
      .get(url, { params })
      .then(res => res.data.result.deviceGroupDevices)
  );

  return {
    deviceGroupDevices: data?.data,
    deviceGroupDevicesMeta: data?.meta,
    isDeviceGroupDevicesLoading: !error && !data,
    isDeviceGroupDevicesError: error,
    isDeviceGroupDevicesValidating: isValidating,
    mutateDeviceGroupDevices: mutate,
  };
};
