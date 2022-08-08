import useSWR from 'swr';
import axios from '../../libs/axios';

export const useSavedDeviceCommands = (params: any) => {
  const { data, error, isValidating, mutate } = useSWR({ url: '/api/device/commands/saved', params },
    ({ url, params }) => axios
      .get(url, { params })
      .then(res => res.data.result.savedDeviceCommands)
  );

  return {
    savedDeviceCommands: data?.data,
    savedDeviceCommandsMeta: data?.meta,
    isSavedDeviceCommandsLoading: !error && !data,
    isSavedDeviceCommandsError: error,
    isSavedDeviceCommandsValidating: isValidating,
    mutateSavedDeviceCommands: mutate,
  };
};
