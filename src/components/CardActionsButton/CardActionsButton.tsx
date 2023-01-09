/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { Button, ButtonProps } from '@mui/material';

interface CardActionsButtonProps extends ButtonProps {
}

const CardActionsButton = ({ children, ...rest }: CardActionsButtonProps) => {
  return (
    <Button
      {...rest}
    >
      {children}
    </Button>
  );
};

export default CardActionsButton;
