/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import { ReactNode, useContext, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Badge, Button, Collapse, ListItem } from '@mui/material';
import Link from "next/link";
import { SidebarContext } from '../../../../contexts/SidebarContext';

import ExpandLessTwoToneIcon from '@mui/icons-material/ExpandLessTwoTone';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';

interface SidebarMenuItemProps {
  children?: ReactNode;
  link: string;
  icon?: any;
  badge?: string;
  open?: boolean;
  active?: boolean;
  name: string;
}

const SidebarMenuItem = ({
                           children,
                           link,
                           icon: Icon,
                           badge,
                           open: openParent = false,
                           active = false,
                           name,
                           ...rest
                         }: SidebarMenuItemProps) => {
  const [menuToggle, setMenuToggle] = useState<boolean | undefined>(openParent);

  const { toggleSidebar } = useContext(SidebarContext);

  const toggleMenu = (): void => {
    setMenuToggle((open) => !open);
  };

  if (children) {
    return (
      <ListItem component="div" className="Mui-children" key={name} {...rest}>
        <Button
          className={clsx({ 'Mui-active': menuToggle })}
          startIcon={Icon && <Icon/>}
          endIcon={
            menuToggle ? <ExpandLessTwoToneIcon/> : <ExpandMoreTwoToneIcon/>
          }
          onClick={toggleMenu}
        >
          {name}
        </Button>
        <Collapse in={menuToggle}>{children}</Collapse>
      </ListItem>
    );
  }

  return (
    <ListItem component="div" key={name} {...rest}>
      <Link href={link}>
        <Button
          className={clsx({ 'Mui-active': active })}
          onClick={toggleSidebar}
          startIcon={Icon && <Icon/>}
        >
          {name}
          {badge && <Badge badgeContent={badge}/>}
        </Button>
      </Link>
    </ListItem>
  );
};

SidebarMenuItem.propTypes = {
  children: PropTypes.node,
  active: PropTypes.bool,
  link: PropTypes.string,
  icon: PropTypes.elementType,
  badge: PropTypes.string,
  open: PropTypes.bool,
  name: PropTypes.string.isRequired
};

export default SidebarMenuItem;
