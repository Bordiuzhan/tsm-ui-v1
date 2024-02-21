import SidebarHeader from './SidebarHeader';
import SidebarMenu from './SidebarMenu';

const Sidebar = () => {
	return (
		<div className="sidebar">
			<div className="sidebar-inner">
				<SidebarHeader/>
				<SidebarMenu/>
			</div>
		</div>
	);
};

export default Sidebar;
