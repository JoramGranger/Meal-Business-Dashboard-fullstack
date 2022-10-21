import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const SideMenu = () => {
    const navigate = useNavigate();
    const menuItems = [
        {
            key: '/',
            label: 'Orders',
        },
        {
            key: 'menu',
            label: 'Menu',
        },
        {
            key: 'order-history',
            label: 'Order History',
        },
        {
            key: 'settings',
            label: 'Settings',
        },
        {
            key: 'signOut',
            label: 'Sign out',
            danger: 'true',
        }
    ];

    /* const onMenuItemClicked = (menuItem) => {
        navigate(menuItem.key)
    } */
    return ( 
        <Menu items={menuItems} onClick={(menuItem) => navigate(menuItem.key)}>

        </Menu>
     );
}
 
export default SideMenu;