import { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

interface PageTitleProps {
  heading?: string;
  subHeading?: string;
  labels?: ReactElement;
  docs?: string;
}

const PageTitleWrapper = styled(Grid)(`
    justify-content: space-between;
    align-items: center;
`
);

const TitleWithLabelsGrid = styled(Grid)(`
    align-items: center;
`
);

const PageTitle = ({ heading = '', subHeading = '', labels = undefined, docs = '', ...rest }: PageTitleProps) => {
  return (
    <PageTitleWrapper container {...rest}>
      <Grid item>
        <TitleWithLabelsGrid container>
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              {heading}
            </Typography>
          </Grid>
          {labels && (
            <Grid item sx={{ ml: 3 }}>
              <Stack direction="row" spacing={1}>
                {labels}
              </Stack>
            </Grid>
          )}
        </TitleWithLabelsGrid>
        <Typography variant="subtitle2">
          {subHeading}
        </Typography>
      </Grid>
      {!!docs && (
        <Grid item>
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
        </Grid>
      )}
    </PageTitleWrapper>
  );
};

PageTitle.propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  docs: PropTypes.string,
};

export default PageTitle;
