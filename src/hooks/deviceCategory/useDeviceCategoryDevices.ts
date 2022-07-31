import useSWR from 'swr';
import axios from '../../libs/axios';

export const useDeviceCategoryDevices = (deviceCategoryId: string, params: any) => {
  const { data, error, isValidating, mutate } = useSWR({
      url: `/api/device/categories/${deviceCategoryId}/devices`,
      params
    },
    ({ url, params }) => axios
      .get(url, { params })
      .then(res => res.data.result.deviceCategoryDevices)
  );

  return {
    deviceCategoryDevices: data?.data,
    deviceCategoryDevicesMeta: data?.meta,
    isDeviceCategoryDevicesLoading: !error && !data,
    isDeviceCategoryDevicesError: error,
    isDeviceCategoryDevicesValidating: isValidating,
    mutateDeviceCategoryDevices: mutate,
  };
};
