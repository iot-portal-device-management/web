import PropTypes from 'prop-types';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface PageTitleProps {
  heading?: string;
  subHeading?: string;
  docs?: string;
}

const PageTitleWrapper = styled(Grid)(`
    justify-content: space-between;
    align-items: center;
`
);

const PageTitle = ({ heading = '', subHeading = '', docs = '', ...rest }: PageTitleProps) => {
  return (
    <PageTitleWrapper container {...rest}>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {heading}
        </Typography>
        <Typography variant="subtitle2">
          {subHeading}
        </Typography>
      </Grid>
      {!!docs && <Grid item>
        <Button
          href={docs}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small"/>}
        >
          {heading} Documentation
        </Button>
      </Grid>}
    </PageTitleWrapper>
  );
};

PageTitle.propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  docs: PropTypes.string,
};

export default PageTitle;
