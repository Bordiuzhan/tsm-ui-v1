import {NavLink} from 'react-router-dom';
import DashboardSvg from "../svg/DashboardSvg";
import UsersSvg from "../svg/UsersSvg";
import CustomersSvg from "../svg/CustomersSvg";
import LoadsSvg from "../svg/LoadsSvg";
import DriversSvg from "../svg/DriversSvg";
import PowerUnitsSvg from "../svg/PowerUnitsSvg";
import TrailersSvg from "../svg/TrailersSvg";

const SidebarMenu = () => {

    const menuList = [{
        link: '/', icon: <DashboardSvg/>, title: 'Dashboard'
    }, {
        link: '/users', icon: <UsersSvg/>, title: 'Users'
    }, {
        link: '/customers', icon: <CustomersSvg/>, title: 'Customers'
    }, {
        link: '/loads', icon: <LoadsSvg/>, title: 'Loads'
    }, {
        link: '/drivers', icon: <DriversSvg/>, title: 'Drivers'
    }, {
        link: '/powerunits', icon: <PowerUnitsSvg/>, title: 'Power units'
    }, {
        link: '/trailers', icon: <TrailersSvg/>, title: 'Trailers'
    },]


    return (<ul className="sidebar-menu scrollable pos-r">
        {menuList.map((item, index) => {
            return (<li className={`nav-item ${index === 0 ? 'mT-30' : ''}`} key={index}>
                <NavLink to={item.link} className="sidebar-link">
                            <span className="icon-holder">
                              {item.icon}
                            </span>
                    <span className="title ">{item.title}</span>
                </NavLink>
            </li>)
        })}
    </ul>);
};

export default SidebarMenu;

