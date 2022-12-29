#
# Copyright (C) 2021-2022 Intel Corporation
# SPDX-License-Identifier: MIT
#

version_settings(constraint='>=0.22.2')

docker_build(
    'iotportaldevicemanagement-web',
    '.',
    dockerfile='./dockerfiles/Dockerfile.development',
    live_update=[
        fall_back_on(['./next.config.js', './next-i18next.config.js']),
        sync('.', '/app/'),
        run('npm ci', trigger=['./package.json', './package-lock.json']),
    ],
)
