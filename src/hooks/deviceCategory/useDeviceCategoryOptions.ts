/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import useSWR from 'swr';
import axios from '../../libs/axios';

interface Parameters {
  name?: string;
}

export const useDeviceCategoryOptions = (name: string) => {
  const { data, error, isValidating, mutate } = useSWR({
      url: '/api/device/categories/options',
      params: { name: name }
    }, ({ url, params }) => {
      let paramsToBeSent: Parameters = {};

      // Filter out empty string or undefined parameters
      Object.keys(params).forEach(key => {
        if (params[key as keyof Parameters] !== undefined && params[key as keyof Parameters] !== '') {
          paramsToBeSent[key as keyof Parameters] = params[key as keyof Parameters];
        }
      });

      return axios
        .get(url, { params: paramsToBeSent })
        .then(res => res.data.result.deviceCategories)
    }
  );

  return {
    deviceCategoryOptions: data,
    deviceCategoryOptionsError: error,
    isDeviceCategoryOptionsLoading: !error && !data,
    isDeviceCategoryOptionsValidating: isValidating,
    mutateDeviceCategoryOptions: mutate,
  };
};
