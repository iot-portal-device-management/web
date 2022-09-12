import useSWR from 'swr';
import axios from '../../libs/axios';

export const useStatistics = () => {
  const {
    data,
    error,
    isValidating,
    mutate
  } = useSWR( '/api/statistics', (url) => axios.get(url).then(res => res.data.result.statistics));

  return {
    statistics: data,
    isStatisticsLoading: !error && !data,
    isStatisticsError: error,
    isStatisticsValidating: isValidating,
    mutateStatistics: mutate,
  };
};
