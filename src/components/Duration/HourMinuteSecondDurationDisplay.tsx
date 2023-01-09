/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { Box, Typography } from '@mui/material';

interface HourMinuteSecondDurationDisplayContentProps {
  value?: number | string;
  padLength?: number;
  subHeader?: string;
}

interface HourMinuteSecondDurationDisplayContentSeparatorProps {
  separator?: string;
  hidden?: boolean;
}

interface HourMinuteSecondDurationDisplayProps {
  hours?: number | string;
  minutes?: number | string;
  seconds?: number | string;
}

const HourMinuteSecondDurationDisplay = ({ hours, minutes, seconds }: HourMinuteSecondDurationDisplayProps) => {
  const hideHourMinuteSeparator = !hours;
  const hideMinuteSecondSeparator = !(hours || minutes);

  const Content = ({ value = 0, padLength = 2, subHeader }: HourMinuteSecondDurationDisplayContentProps) => {
    const padZero = (str: string, padLength: number = 2) => str.length < padLength ? `0${str}` : str;

    return (
      <Box textAlign={{ sm: 'center' }}>
        <Typography variant="h2">{padZero(value.toString(), padLength)}</Typography>
        <Typography variant="caption">{subHeader}</Typography>
      </Box>
    )
  };

  const Hours = ({ value, subHeader = 'Hours' }: HourMinuteSecondDurationDisplayContentProps) => {
    return value
      ? <Content value={value} subHeader={subHeader}/>
      : null;
  };

  const Minutes = ({ value, subHeader = 'Minutes' }: HourMinuteSecondDurationDisplayContentProps) => {
    return hideMinuteSecondSeparator ? null : <Content value={value} subHeader={subHeader}/>
  };

  const Seconds = ({ value, subHeader = 'Seconds' }: HourMinuteSecondDurationDisplayContentProps) => {
    return <Content value={value} padLength={hideMinuteSecondSeparator ? 1 : 2} subHeader={subHeader}/>;
  };

  const Separator = ({ separator = ':', hidden = true }: HourMinuteSecondDurationDisplayContentSeparatorProps) => {
    if (!hidden) {
      return (
        <Box mx={3}>
          <Typography variant="h2">{separator}</Typography>
        </Box>
      );
    }

    return null;
  };

  return (
    <Box display="flex" alignItems="center">
      <Hours value={hours}/>
      <Separator hidden={hideHourMinuteSeparator}/>
      <Minutes value={minutes}/>
      <Separator hidden={hideMinuteSecondSeparator}/>
      <Seconds value={seconds}/>
    </Box>
  );
};

export default HourMinuteSecondDurationDisplay;
