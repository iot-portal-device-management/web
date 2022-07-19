import useSWR from 'swr';
import axios from '../../libs/axios';

export const useEventHistories = (deviceId: string, params: any) => {
  const { data, error, isValidating, mutate } = useSWR({
      url: `/api/devices/${deviceId}/events/histories`,
      params
    }, ({ url, params }) =>
      axios
        .get(url, { params })
        .then(res => res.data.result.eventHistories)
  );

  return {
    eventHistories: data?.data,
    eventHistoriesMeta: data?.meta,
    isEventHistoriesLoading: !error && !data,
    isEventHistoriesError: error,
    isEventHistoriesValidating: isValidating,
    mutateEventHistories: mutate
  };
};
