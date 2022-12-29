/*
 * Copyright (C) 2021-2022 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import type { ApexOptions } from 'apexcharts';
import Chart from '../Chart';
import { roundToTwoDecimalPlaces } from '../../utils/utils';

interface DeviceJobProgressPercentageRadialBarProps {
  progressPercentage: number;
}

const DeviceJobProgressPercentageRadialBar = ({
                                                progressPercentage = 0,
                                                ...rest
                                              }: DeviceJobProgressPercentageRadialBarProps) => {
  const options: ApexOptions = {
    chart: {
      type: 'radialBar',
      width: 200,
    },
    plotOptions: {
      radialBar: {
        startAngle: -130,
        endAngle: 130,
        hollow: {
          margin: 15,
          size: '70%'
        },
        dataLabels: {
          show: true,
          name: {
            show: true,
            fontSize: '13px',
            color: "#888",
            offsetY: -10,
          },
          value: {
            show: true,
            fontSize: '30px',
            color: "#111",
          }
        }
      }
    },
    stroke: {
      lineCap: 'round',
    },
    labels: ['Progress'],
  };

  const series = [roundToTwoDecimalPlaces(progressPercentage)];

  return (
    <Chart
      options={options}
      series={series}
      type="radialBar"
      height={200}
      {...rest}
    />
  );
};

export default DeviceJobProgressPercentageRadialBar;
