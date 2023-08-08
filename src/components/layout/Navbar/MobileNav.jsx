import React from 'react';
import { navItems } from './NavItem';
import MobileNavItem from './MobileNavItem'
import { Stack } from '@chakra-ui/react';

const MobileNav = (onClick) => {
    const MobileItems = navItems.map((navItem)=>{
        return <MobileNavItem onClick={onClick} key={navItem.label} {...navItem} />
    })
    return (
        <Stack>
            {MobileItems}
        </Stack>
    );
}

export default MobileNav;
