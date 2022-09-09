import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import VerifiedUserTwoToneIcon from '@mui/icons-material/VerifiedUserTwoTone';
import DevicesTwoToneIcon from '@mui/icons-material/DevicesTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone';
import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";

export interface MenuItem {
  link: string;
  icon?: OverridableComponent<SvgIconTypeMap> & { muiName: string };
  badge?: string;
  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [
  {
    heading: '',
    items: [
      {
        name: 'Dashboard',
        link: '/',
        icon: DashboardTwoToneIcon
      }
    ]
  },
  {
    heading: 'Device Management',
    items: [
      {
        name: 'Devices',
        icon: DevicesTwoToneIcon,
        link: '/devices',
        items: [
          {
            name: 'Devices',
            link: '/devices'
          },
          {
            name: 'Create Device',
            link: '/devices/create'
          }
        ]
      },
      {
        name: 'Device Groups',
        icon: AccountTreeTwoToneIcon,
        link: '/device/groups',
        items: [
          {
            name: 'Devices Groups',
            link: '/device/groups'
          },
          {
            name: 'Create Device Group',
            link: '/device/groups/create'
          }
        ]
      },
      {
        name: 'Device Categories',
        icon: CategoryTwoToneIcon,
        link: '/device/categories',
        items: [
          {
            name: 'Devices Categories',
            link: '/device/categories'
          },
          {
            name: 'Create Device Category',
            link: '/device/categories/create'
          }
        ]
      },
      {
        name: 'Device Jobs',
        icon: WorkTwoToneIcon,
        link: '/device/jobs',
        items: [
          {
            name: 'Devices Jobs',
            link: '/device/jobs'
          },
          {
            name: 'Create Device Job',
            link: '/device/jobs/create'
          }
        ]
      }
    ]
  },
  {
    heading: 'Device Commands',
    items: [
      {
        name: 'Saved Device Commands',
        icon: VerifiedUserTwoToneIcon,
        link: '/device/commands/saved',
        items: [
          {
            name: 'Saved Device Commands',
            link: '/device/commands/saved'
          },
          {
            name: 'Create Saved Device Command',
            link: '/device/commands/saved/create'
          }
        ]
      }
    ]
  },
];

export default menuItems;
