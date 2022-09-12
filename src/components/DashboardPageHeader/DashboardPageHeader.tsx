import { Avatar, Grid, Typography } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '@mui/material/styles';

const DashboardPageHeader = () => {
  const theme = useTheme();

  const { user } = useAuth({
    middleware: 'auth',
  });

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{ mr: 2, width: theme.spacing(8), height: theme.spacing(8) }}
          variant="rounded"
          alt={user?.name}
          src={user?.avatar}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Welcome, {user?.name}!
        </Typography>
        <Typography variant="subtitle2">
          Have a look on all of your devices!
        </Typography>
      </Grid>
    </Grid>
  );
};

export default DashboardPageHeader;
