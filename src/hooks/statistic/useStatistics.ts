/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

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
    statisticsError: error,
    isStatisticsLoading: !error && !data,
    isStatisticsValidating: isValidating,
    mutateStatistics: mutate,
  };
};
