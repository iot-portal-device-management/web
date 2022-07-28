import { LoadingButton, LoadingButtonProps } from '@mui/lab';

interface CardActionsLoadingButtonProps extends LoadingButtonProps {
}

const CardActionsLoadingButton = ({ children, ...rest }: CardActionsLoadingButtonProps) => {
  return (
    <LoadingButton
      sx={{ m: 1 }}
      variant="contained"
      {...rest}
    >
      {children}
    </LoadingButton>
  );
};

export default CardActionsLoadingButton;
