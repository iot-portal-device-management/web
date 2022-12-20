import useSWR from 'swr';
import axios from '../../libs/axios';

export const useDeviceCategories = (params: any) => {
  const { data, error, isValidating, mutate } = useSWR(
    { url: '/api/device/categories', params },
    ({ url, params }) => axios.get(url, { params }).then(res => res.data.result.deviceCategories),
  );

  return {
    deviceCategories: data?.data,
    deviceCategoriesMeta: data?.meta,
    deviceCategoriesError: error,
    isDeviceCategoriesLoading: !error && !data,
    isDeviceCategoriesValidating: isValidating,
    mutateDeviceCategories: mutate,
  };
};
