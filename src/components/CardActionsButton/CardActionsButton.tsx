import { Button, ButtonProps } from '@mui/material';

interface CardActionsButtonProps extends ButtonProps {
}

const CardActionsButton = ({ children, ...rest }: CardActionsButtonProps) => {
  return (
    <Button
      {...rest}
    >
      {children}
    </Button>
  );
};

export default CardActionsButton;
