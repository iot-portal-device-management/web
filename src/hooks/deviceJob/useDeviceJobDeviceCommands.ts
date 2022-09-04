import useSWR from 'swr';
import axios from '../../libs/axios';

export const useDeviceJobDeviceCommands = (deviceJobId: string, params: any) => {
  const { data, error, isValidating, mutate } = useSWR({
      url: `/api/device/jobs/${deviceJobId}/deviceCommands`,
      params
    },
    (
      { url, params }) => axios
      .get(url, { params })
      .then(res => res.data.result.deviceJobDeviceCommands)
  );

  return {
    deviceJobDeviceCommands: data?.data,
    deviceJobDeviceCommandsMeta: data?.meta,
    isDeviceJobDeviceCommandsLoading: !error && !data,
    isDeviceJobDeviceCommandsError: error,
    isDeviceJobDeviceCommandsValidating: isValidating,
    mutateDeviceJobDeviceCommands: mutate,
  };
};
