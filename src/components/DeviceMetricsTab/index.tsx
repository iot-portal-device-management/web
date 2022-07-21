import { Grid } from '@mui/material';
import DeviceMetricCpuTemperaturesChartCard from '../DeviceMetricCpuTemperaturesChartCard';
import DeviceMetricCpuUsagesChartCard from '../DeviceMetricCpuUsagesChartCard';
import DeviceMetricDiskUsagesChartCard from '../DeviceMetricDiskUsagesChartCard';
import DeviceMetricAvailableMemoriesChartCard from '../DeviceMetricAvailableMemoriesChartCard';

interface DeviceMetricsTabProps {
  deviceId: string;
}

const DeviceMetricsTab = ({ deviceId }: DeviceMetricsTabProps) => {
    return (
      <>
        <Grid item xs={12}>
          <DeviceMetricCpuTemperaturesChartCard deviceId={deviceId}/>
        </Grid>
        <Grid item xs={12}>
          <DeviceMetricCpuUsagesChartCard deviceId={deviceId}/>
        </Grid>
        <Grid item xs={12}>
          <DeviceMetricDiskUsagesChartCard deviceId={deviceId}/>
        </Grid>
        <Grid item xs={12}>
          <DeviceMetricAvailableMemoriesChartCard deviceId={deviceId}/>
        </Grid>
      </>
    );
  }
;

export default DeviceMetricsTab;
