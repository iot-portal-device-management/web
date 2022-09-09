import Link from 'next/link';
import { Box, List, ListItemButton, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';

const ListWrapper = styled(Box)(
  ({ theme }) => `
    .MuiTouchRipple-root {
      display: none;
    }
    
    .MuiListItemButton-root {
      transition: ${theme.transitions.create(['color', 'fill'])};
      
      &.MuiListItem-indicators {
        padding: ${theme.spacing(1, 2)};
    
        .MuiListItemText-root {
          .MuiTypography-root {
            &:before {
                height: 4px;
                width: 22px;
                opacity: 0;
                visibility: hidden;
                display: block;
                position: absolute;
                bottom: -10px;
                transition: all .2s;
                border-radius: ${theme.general.borderRadiusLg};
                content: "";
                background: ${theme.colors.primary.main};
            }
          }
        }

        &.active,
        &:active,
        &:hover {
          background: transparent;
      
          .MuiListItemText-root {
            .MuiTypography-root {
              &:before {
                  opacity: 1;
                  visibility: visible;
                  bottom: 0px;
              }
            }
          }
        }
      }
    }
`
);

const HeaderMenu = () => {
  return (
    <ListWrapper>
      <List disablePadding component={Box} display="flex">
        <Link href="/components/buttons">
          <ListItemButton classes={{ root: 'MuiListItem-indicators' }}>
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="Buttons"
            />
          </ListItemButton>
        </Link>
        <Link href="/components/forms">
          <ListItemButton classes={{ root: 'MuiListItem-indicators' }}>
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="Forms"
            />
          </ListItemButton>
        </Link>
      </List>
    </ListWrapper>
  );
};

export default HeaderMenu;
