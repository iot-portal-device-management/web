import { useTheme } from '@mui/material/styles';
import NextNProgress from "nextjs-progressbar";

const NProgress = () => {
  const theme = useTheme();

  return (
    <NextNProgress color={theme.colors.primary.main}/>
  );
};

export default NProgress;
