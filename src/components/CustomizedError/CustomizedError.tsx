/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import Error, { ErrorProps } from 'next/error';

const CustomizedError = ({ statusCode, ...rest }: ErrorProps) => {
  return (
    <Error statusCode={statusCode === 403 ? 404 : statusCode || 404} {...rest}/>
  );
};

export default CustomizedError;
