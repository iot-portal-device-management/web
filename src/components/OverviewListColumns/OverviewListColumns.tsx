import { Grid } from '@mui/material';
import DevicesTwoToneIcon from '@mui/icons-material/DevicesTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone';
import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';
import { ApexOptions } from 'apexcharts';
import OverviewListColumnCard from '../OverviewListColumnCard';
import { useStatistics } from '../../hooks/statistic/useStatistics';
import { chartSeriesDataFormatter } from '../../utils/apexCharts';

const OverviewListColumns = () => {
  const { statistics, isStatisticsLoading, isStatisticsError } = useStatistics();

  const lastSevenDayNewDeviceCountData = statistics?.lastSevenDayNewDeviceCount.map(chartSeriesDataFormatter) || [];
  const lastSevenDayNewDeviceGroupCountData = statistics?.lastSevenDayNewDeviceGroupCount.map(chartSeriesDataFormatter) || [];
  const lastSevenDayNewDeviceCategoryCountData = statistics?.lastSevenDayNewDeviceCategoryCount.map(chartSeriesDataFormatter) || [];
  const lastSevenDayNewDeviceJobCountData = statistics?.lastSevenDayNewDeviceJobCount.map(chartSeriesDataFormatter) || [];

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={3}
    >
      <Grid item md={3} xs={12}>
        <OverviewListColumnCard
          icon={DevicesTwoToneIcon}
          header="Devices"
          total={statistics?.deviceTotal}
          series={[
            {
              name: 'Devices',
              data: lastSevenDayNewDeviceCountData,
            }
          ] as ApexOptions['series']}
        />
      </Grid>
      <Grid item md={3} xs={12}>
        <OverviewListColumnCard
          icon={AccountTreeTwoToneIcon}
          header="Device groups"
          total={statistics?.deviceGroupTotal}
          series={[
            {
              name: 'Device groups',
              data: lastSevenDayNewDeviceGroupCountData,
            }
          ] as ApexOptions['series']}
        />
      </Grid>
      <Grid item md={3} xs={12}>
        <OverviewListColumnCard
          icon={CategoryTwoToneIcon}
          header="Device categories"
          total={statistics?.deviceCategoryTotal}
          series={[
            {
              name: 'Device categories',
              data: lastSevenDayNewDeviceCategoryCountData,
            }
          ] as ApexOptions['series']}
        />
      </Grid>
      <Grid item md={3} xs={12}>
        <OverviewListColumnCard
          icon={WorkTwoToneIcon}
          header="Device jobs"
          total={statistics?.deviceJobTotal}
          series={[
            {
              name: 'Device jobs',
              data: lastSevenDayNewDeviceJobCountData,
            }
          ] as ApexOptions['series']}
        />
      </Grid>
    </Grid>
  );
};

export default OverviewListColumns;
