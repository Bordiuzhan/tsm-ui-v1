import {Suspense} from 'react';
import {Outlet} from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Footer from './Footer';
import MainContent from './MainContent';
import {useStore} from '../../store/useStore';

const Layout = () => {
    const isCollapsed = useStore((state) => state.isCollapsed);

    return (
        <div className={`${isCollapsed ? 'is-collapsed' : ''} `}>
            <Sidebar/>
            <div className="page-container">
                <Topbar/>
                <MainContent>
                    <Suspense fallback={null}>
                        <Outlet/>
                    </Suspense>
                </MainContent>
                <Footer/>
            </div>
        </div>
    );
};

export default Layout;
