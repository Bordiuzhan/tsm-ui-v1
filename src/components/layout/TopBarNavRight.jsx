import {useEffect, useRef, useState} from "react";
import {useStore} from "../../store/useStore";

const TopBarNavRight = () => {

    const [show, setShow] = useState(false);
    const logout = useStore((state) => state.logout);

    const outsideClickRef = useRef();
    const closeDropdown = () => {
        setShow(false);
    }
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (outsideClickRef.current && !outsideClickRef.current.contains(e.target)) {
                closeDropdown();
            }
        };
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    const showDropdown = () => {
        setShow(true);
    }


    const dropdownMenu = [
        {menuName: "settings", href: "#", icon: "ti-settings", onClick: logout,},
        {menuName: "profile", href: "#", icon: "ti-user", onClick: logout,},
        {menuName: "messages", href: "#", icon: "ti-email", onClick: logout,},
        {menuName: "logout", href: "#", icon: "ti-power-off", onClick: logout,}];


    return (
        <div ref={outsideClickRef}>
            <ul className="nav-right">
                <li className="dropdown">
                    <button
                        className="dropdown-toggle no-after peers fxw-nw ai-c lh-1"
                        onClick={showDropdown}
                    >
                        <div className="peer mR-10">
                            <img
                                className="w-2r bdrs-50p"
                                src="https://randomuser.me/api/portraits/men/10.jpg"
                                alt=""
                            />
                        </div>
                        <div className="peer">
                            <span className="fsz-sm c-grey-900">John Doe</span>
                        </div>
                    </button>
                    <ul className={`dropdown-menu fsz-sm ${show ? 'show' : ''}`}>
                        {dropdownMenu.map((item, index) => (
                            <li key={index}>
                                <button onClick={item.onClick}
                                        className="d-f align-items-center td-n pY-5 bgcH-grey-100 c-grey-700 ">
                                    <i className={`${item.icon} mR-10`}></i>
                                    <span>{item.menuName}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default TopBarNavRight;
