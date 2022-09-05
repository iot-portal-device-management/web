import useSWR from 'swr';
import axios from '../../libs/axios';

export const useDeviceCategory = (id: string) => {
  const {
    data,
    error,
    isValidating,
    mutate
  } = useSWR(
    id ? `/api/device/categories/${id}` : null,
    (url) => axios.get(url).then(res => res.data.result.deviceCategory),
  );

  return {
    deviceCategory: data,
    isDeviceCategoryLoading: !error && !data,
    isDeviceCategoryError: error,
    isDeviceCategoryValidating: isValidating,
    mutateDeviceCategory: mutate,
  };
};
