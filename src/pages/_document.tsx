/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content="#1975ff"/>
          <meta name="description" content="Simplifies your edge IoT device management."/>
          <meta name="keywords" content="iot device, device management"/>
        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    );
  };
};
