/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { Alert, AlertTitle } from '@mui/material';
import { styled } from '@mui/material/styles';

interface FormValidationErrorsProps {
  errors: string[];
}

const ErrorUl = styled('ul')(
  ({ theme }) => `
  padding: 0;
  list-style-position: inside;
`
);

const FormValidationErrors = ({ errors = [], ...rest }: FormValidationErrorsProps) => {
  return (
    <>
      {errors.length > 0 && (
        <Alert severity="error" {...rest}>
          <AlertTitle>Whoops! Something went wrong.</AlertTitle>
          <ErrorUl>
            {errors.map(error => (
              <li key={error}>{error}</li>
            ))}
          </ErrorUl>
        </Alert>
      )}
    </>
  );
};

export default FormValidationErrors;
