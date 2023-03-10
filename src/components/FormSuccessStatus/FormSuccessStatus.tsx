/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { Alert, AlertTitle } from '@mui/material';

interface FormSuccessStatusProps {
  title?: string | null;
  message?: string | null;
}

const FormSuccessStatus = ({ title, message, ...rest }: FormSuccessStatusProps) => {
  return (
    <>
      {(title || message) && (
        <Alert severity="success" {...rest}>
          {title && (<AlertTitle>{title}</AlertTitle>)}
          {message}
        </Alert>
      )}
    </>
  );
};

export default FormSuccessStatus;
