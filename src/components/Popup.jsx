import {useEffect, useRef} from "react";

const Popup = ({setIsPopupShow, setColumnVisibility, columnVisibility}) => {
    const MenuItems = [
        {
            id: 1,
            name: "Driver",
            checked: columnVisibility.driver_first_name_last_name,
            setIsChecked: (value) =>
                setColumnVisibility((prev) => ({
                    ...prev,
                    driver_first_name_last_name: value,
                })),
        },
        {
            id: 2,
            name: "Power Unit",
            checked: columnVisibility.power_unit_model,
            setIsChecked: (value) =>
                setColumnVisibility((prev) => ({
                    ...prev,
                    power_unit_model: value,
                })),
        },
        {
            id: 3,
            name: "Trailer",
            checked: columnVisibility.trailer_model,
            setIsChecked: (value) =>
                setColumnVisibility((prev) => ({
                    ...prev,
                    trailer_model: value,
                })),
        },
    ];

    const outsideClickRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (
                outsideClickRef.current &&
                !outsideClickRef.current.contains(e.target)
            ) {
                setIsPopupShow(false);
            }
        };
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [setIsPopupShow]);

    return (
        <ul
            ref={outsideClickRef}
            className="dropdown-menu fsz-sm position-absolute top-100 start-0 translate-middle-x show "
        >
            {MenuItems.map((item) => (
                <li key={item.id} className="dropdown-item">
                    <label className="d-flex align-items-center">
                        <input
                            type="checkbox"
                            className="d-none"
                            id="driver"
                            onChange={() => item.setIsChecked(!item.checked)}
                        />
                        <div className="me-3 border border-2 px-1 rounded-3">
                            <svg
                                className={item.checked ? "text-primary" : "text-white"}
                                aria-hidden="true"
                                width={14}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 16 12"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 5.917 5.724 10.5 15 1.5"
                                />
                            </svg>
                        </div>
                        <span>{item.name}</span>
                    </label>
                </li>
            ))}
        </ul>
    );
};

export default Popup;
