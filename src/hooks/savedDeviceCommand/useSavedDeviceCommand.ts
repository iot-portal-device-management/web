import useSWR from 'swr';
import axios from '../../libs/axios';

export const useSavedDeviceCommand = (id: string) => {
  const {
    data,
    error,
    isValidating,
    mutate
  } = useSWR(id ? `/api/device/commands/saved/${id}` : null,
    (url) => axios
      .get(url)
      .then(res => res.data.result.savedDeviceCommand)
  );

  return {
    savedDeviceCommand: data,
    isSavedDeviceCommandLoading: !error && !data,
    isSavedDeviceCommandError: error,
    isSavedDeviceCommandValidating: isValidating,
    mutateSavedDeviceCommand: mutate,
  };
};
