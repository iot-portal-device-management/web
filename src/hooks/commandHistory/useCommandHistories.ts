import useSWR from 'swr';
import axios from '../../libs/axios';

export const useCommandHistories = (deviceId: string, params: any) => {
  const { data, error, isValidating, mutate } = useSWR({
      url: `/api/devices/${deviceId}/commands/histories`,
      params
    }, ({ url, params }) =>
      axios
        .get(url, { params })
        .then(res => res.data.result.commandHistories)
  );

  return {
    commandHistories: data?.data,
    commandHistoriesMeta: data?.meta,
    isCommandHistoriesLoading: !error && !data,
    isCommandHistoriesError: error,
    isCommandHistoriesValidating: isValidating,
    mutateCommandHistories: mutate
  };
};
