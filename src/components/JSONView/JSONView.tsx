/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { isValidJSONString } from '../../utils/utils';
import { JSONTree } from 'react-json-tree';
import { Theme } from 'react-base16-styling';
import { memo } from 'react';

const theme = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#272822',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#a6e22e',
  base0C: '#a1efe4',
  base0D: '#66d9ef',
  base0E: '#ae81ff',
  base0F: '#cc6633',
};

interface JSONViewProps {
  data: any;
  theme?: Theme;
  invertTheme?: boolean;
}

const JSONView = ({ data, ...rest }: JSONViewProps) => {
  if (isValidJSONString(data)) {
    return (
      <JSONTree
        data={JSON.parse(data)}
        theme={theme}
        invertTheme={false}
        {...rest}
      />
    );
  }

  return (
    <JSONTree
      data={data}
      theme={theme}
      invertTheme={false}
      {...rest}
    />
  );
};

export default memo(JSONView);
