import { Grid, Typography } from '@mui/material';
import Text from '../Text';
import moment from 'moment';

interface StartTimeEndTimeProps {
  startTime?: string;
  endTime?: string;
}

const timeFormat = 'DD/MM/YYYY, h:mm:ss A'

const StartTimeEndTime = ({ startTime, endTime }: StartTimeEndTimeProps) => {
  return (
    <Typography variant="subtitle2">
      <Grid container rowSpacing={1}>
        <Grid item xs={12}>
          Start time:
        </Grid>
        <Grid item xs={12}>
          <Text color="black">
            <b>{startTime ? moment(startTime).format(timeFormat) : '-'}</b>
          </Text>
        </Grid>
        <Grid item xs={12}>
          End time:
        </Grid>
        <Grid item xs={12}>
          <Text color="black">
            <b>{endTime ? moment(endTime).format(timeFormat) : '-'}</b>
          </Text>
        </Grid>
      </Grid>
    </Typography>
  );
};

export default StartTimeEndTime;
