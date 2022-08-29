import { Box, Typography } from '@mui/material';

interface DurationContentProps {
  value?: number | string;
  subHeader?: string;
}

interface DurationContentSeparatorProps {
  separator?: string;
  hidden?: boolean;
}

interface DurationProps {
  hours?: number | string;
  minutes?: number | string;
  seconds?: number | string;
}

const Duration = ({ hours, minutes, seconds }: DurationProps) => {
  const Content = ({ value = 0, subHeader }: DurationContentProps) => {
    const padZero = (str: string, max: number = 2) => str.length < max ? `0${str}` : str;

    return (
      <Box textAlign={{ sm: 'center' }}>
        <Typography variant="h2">{padZero(value.toString())}</Typography>
        <Typography variant="caption">{subHeader}</Typography>
      </Box>
    )
  };

  const Hours = ({ value, subHeader = 'Hours' }: DurationContentProps) => {
    return value
      ? <Content value={value} subHeader={subHeader}/>
      : null;
  };

  const Minutes = ({ value, subHeader = 'Minutes' }: DurationContentProps) => {
    return value
      ? <Content value={value} subHeader={subHeader}/>
      : (hours
        ? <Content value={0} subHeader={subHeader}/>
        : null);
  };

  const Seconds = ({ value, subHeader = 'Seconds' }: DurationContentProps) => {
    return <Content value={value} subHeader={subHeader}/>;
  };

  const Separator = ({ separator = ':', hidden = true }: DurationContentSeparatorProps) => {
    if (hidden) return null;

    return (
      <Box mx={3}>
        <Typography variant="h2">{separator}</Typography>
      </Box>
    );
  };

  return (
    <Box display="flex" alignItems="center">
      <Hours value={hours}/>
      <Separator hidden={!hours}/>
      <Minutes value={minutes}/>
      <Separator hidden={!(hours || minutes)}/>
      <Seconds value={seconds}/>
    </Box>
  );
};

export default Duration;
