import useSWR from 'swr';
import axios from '../../libs/axios';

export const useDeviceGroups = (params: any) => {
  const { data, error, isValidating, mutate } = useSWR(
    { url: '/api/device/groups', params },
    ({ url, params }) => axios.get(url, { params }).then(res => res.data.result.deviceGroups),
  );

  return {
    deviceGroups: data?.data,
    deviceGroupsMeta: data?.meta,
    isDeviceGroupsLoading: !error && !data,
    isDeviceGroupsError: error,
    isDeviceGroupsValidating: isValidating,
    mutateDeviceGroups: mutate,
  };
};
