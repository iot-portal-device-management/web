/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import axios from "./axios";

const fetcher = (url: string) => axios.get(url).then(res => res.data)

export default fetcher;