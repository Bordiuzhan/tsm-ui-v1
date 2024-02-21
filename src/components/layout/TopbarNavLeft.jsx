import {useStore} from '../../store/useStore';

const TopbarNavLeft = () => {
	const toggleSidebar = useStore((state) => state.toggleSidebar);

	return (
		<ul className="nav-left">
			<li>
				<button className="sidebar-toggle" onClick={toggleSidebar}>
					<i className="ti-menu"></i>
				</button>
			</li>

		</ul>
	);
};

export default TopbarNavLeft;
