import { Box, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { VERSION } from '../../data/version';

const LogoWrapper = styled(Box)(
  ({ theme }) => `
    color: ${theme.palette.text.primary};
    text-decoration: none;
    font-weight: ${theme.typography.fontWeightBold};
    cursor: pointer;
    margin: auto;
    text-align: center;
`
);

const VersionBadge = styled(Box)(
  ({ theme }) => `
    background: ${theme.palette.success.main};
    color: ${theme.palette.success.contrastText};
    padding: ${theme.spacing(0.4, 1)};
    border-radius: ${theme.general.borderRadiusSm};
    text-align: center;
    display: inline-block;
    line-height: 1;
    font-size: ${theme.typography.pxToRem(11)};
    margin: auto;
`
);

const LogoText = styled(Box)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(15)};
    font-weight: ${theme.typography.fontWeightBold};
    text-align: center;
`
);

const Logo = () => {
  return (
    <Link href="/">
      <LogoWrapper>
        <Tooltip title={`Version ${VERSION}`} arrow placement="right">
          <VersionBadge>{VERSION}</VersionBadge>
        </Tooltip>
        <LogoText>IoT Portal <br/>
          Device Management</LogoText>
      </LogoWrapper>
    </Link>
  );
}

export default Logo;
