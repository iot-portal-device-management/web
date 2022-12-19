import { Card, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material';
import Text from '../Text';
import JSONView from '../JSONView/JSONView';
import { useDeviceGroup } from '../../hooks/deviceGroup/useDeviceGroup';
import { useSavedDeviceCommand } from '../../hooks/savedDeviceCommand/useSavedDeviceCommand';

interface DeviceJobDetailsCardProps {
  deviceGroupId: string;
  savedDeviceCommandId: string;
}

const DeviceJobDetailsCard = ({ deviceGroupId, savedDeviceCommandId }: DeviceJobDetailsCardProps) => {
  const { deviceGroup, deviceGroupError, isDeviceGroupLoading } = useDeviceGroup(deviceGroupId);
  const {
    savedDeviceCommand,
    savedDeviceCommandError,
    isSavedDeviceCommandLoading
  } = useSavedDeviceCommand(savedDeviceCommandId);

  return (
    <Card>
      <CardHeader title="Details"/>
      <Divider/>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="subtitle2">
          <Grid container rowSpacing={2} columnSpacing={3}>
            <Grid item xs={12}>
              <Typography sx={{ color: 'common.black' }} variant="h5" gutterBottom>
                Device group:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
              Device group name:
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <Text color="black">
                <b>{deviceGroup?.name}</b>
              </Text>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ color: 'common.black' }} variant="h5" gutterBottom>
                Saved device command:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
              Saved device command name:
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <Text color="black">
                <b>{savedDeviceCommand?.name}</b>
              </Text>
            </Grid>
            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
              Device command type name:
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <Text color="black">
                <b>{savedDeviceCommand?.deviceCommandTypeName}</b>
              </Text>
            </Grid>
            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
              Payload:
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <JSONView data={savedDeviceCommand?.payload}/>
            </Grid>
          </Grid>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DeviceJobDetailsCard;
