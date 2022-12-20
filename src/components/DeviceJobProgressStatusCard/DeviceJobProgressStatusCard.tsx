import { Card, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material';
import DeviceJobStatusIndicator from '../DeviceJobStatusIndicator';
import HourMinuteSecondDurationDisplay from '../Duration';
import StartTimeEndTime from '../StartTimeEndTime';
import { useDeviceJobProgressStatus } from '../../hooks/deviceJob/useDeviceJobProgressStatus';
import { useDeviceJob } from '../../hooks/deviceJob/useDeviceJob';
import { Duration } from 'moment';
import { calculateStartTimeEndTimeDuration } from '../../utils/deviceJob';
import DeviceJobProgressPercentageRadialBar from '../DeviceJobProgressPercentageRadialBar';
import DeviceJobProgressStatusChart from '../DeviceJobProgressStatusChart';

interface DeviceJobProgressStatusCardProps {
  deviceJobId: string;
}

const DeviceJobProgressStatusCard = ({ deviceJobId }: DeviceJobProgressStatusCardProps) => {
  const { deviceJob, deviceJobError, isDeviceJobLoading } = useDeviceJob(deviceJobId);

  const {
    deviceJobProgressStatus,
    deviceJobProgressStatusError,
    isDeviceJobProgressStatusLoading
  } = useDeviceJobProgressStatus(deviceJobId);

  const deviceJobStatsChartSeries = [
    deviceJobProgressStatus?.pending ?? 0,
    deviceJobProgressStatus?.processing ?? 0,
    deviceJobProgressStatus?.successful ?? 0,
    deviceJobProgressStatus?.failed ?? 0,
  ];

  const duration: Duration = calculateStartTimeEndTimeDuration(deviceJob?.startedAt, deviceJob?.completedAt)

  return (
    <Card>
      <CardHeader title="Progress status"/>
      <Divider/>
      <CardContent>
        <Grid container>
          <Grid item xs={8}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>
                  Results
                </Typography>
              </Grid>
              <Grid sx={{ textAlign: 'center' }} item xs={12}>
                <DeviceJobStatusIndicator
                  status={deviceJob?.deviceJobStatus?.name}
                />
              </Grid>
              <Grid item xs={6}>
                <DeviceJobProgressPercentageRadialBar
                  progressPercentage={deviceJobProgressStatus?.progress}
                />
              </Grid>
              <Grid item xs={6}>
                <DeviceJobProgressStatusChart
                  series={deviceJobStatsChartSeries}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container rowSpacing={3}>
              <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>
                  Duration
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <HourMinuteSecondDurationDisplay
                  hours={duration.hours()}
                  minutes={duration.minutes()}
                  seconds={duration.seconds()}
                />
              </Grid>
              <Grid item xs={12}>
                <StartTimeEndTime
                  startTime={deviceJob?.startedAt}
                  endTime={deviceJob?.completedAt}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DeviceJobProgressStatusCard;
