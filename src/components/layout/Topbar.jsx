import TopbarNavLeft from './TopbarNavLeft';
import TopBarNavRight from './TopBarNavRight';

const Topbar = () => {
    return (
        <div className="header navbar">
            <div className="header-container">
                <TopbarNavLeft/>
                <TopBarNavRight/>
            </div>
        </div>
    );
};

export default Topbar;
