/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { ReactNode } from 'react';
import PropTypes from 'prop-types';

interface BaseLayoutProps {
  children?: ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <>
      {children}
    </>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node
};

export default BaseLayout;
