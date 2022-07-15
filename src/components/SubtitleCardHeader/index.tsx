import { Box, Typography } from '@mui/material';

interface SubtitleCardHeaderProps {
  title: string;
  subheader: string;
}

const SubtitleCardHeader = ({ title, subheader }: SubtitleCardHeaderProps) => {
  return (
    <Box
      p={3}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box>
        {title && (
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
        )}
        {subheader && (
          <Typography variant="subtitle2">
            {subheader}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SubtitleCardHeader;
