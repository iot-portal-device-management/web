import { Grid, Typography } from '@mui/material';
import Text from '../Text';

interface StartTimeEndTimeProps {
  startTime?: string;
  endTime?: string;
}

const StartTimeEndTime = ({ startTime, endTime }: StartTimeEndTimeProps) => {
  const timeFormat = 'DD/MM/YYYY, h:mm:ss A'

  return (
    <Typography variant="subtitle2">
      <Grid container rowSpacing={1}>
        <Grid item xs={12}>
          Start time:
        </Grid>
        <Grid item xs={12}>
          <Text color="black">
            <b>{timeFormat}</b>
          </Text>
        </Grid>
        <Grid item xs={12}>
          End time:
        </Grid>
        <Grid item xs={12}>
          <Text color="black">
            <b>{timeFormat}</b>
          </Text>
        </Grid>
      </Grid>
    </Typography>
  );
};

export default StartTimeEndTime;
