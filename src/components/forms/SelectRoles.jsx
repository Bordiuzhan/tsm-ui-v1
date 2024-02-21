import {useEffect, useRef, useState} from "react";
import CheckedSvg from "../svg/CheckedSvg";

function SelectRoles({register, fields, append, remove, errors}) {
    const [isRolesOpen, setIsRolesOpen] = useState(false);

    const outsideClickRef = useRef();

    const closeDropdown = () => {
        setIsRolesOpen(false);
    };

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

    const handleStatus = (e) => {
        const selectedRole = e.target.value;
        if (fields.some((field) => field.value === selectedRole)) {
            remove(fields.findIndex((field) => field.value === selectedRole));
            return;
        }
        append({value: selectedRole});
    };
    const renderSelectedRoles = () => {
        if (!fields.length) {
            return <span className="text-muted">No roles selected</span>;
        }

        return fields.map((field, index) => (<div key={index} className="d-flex align-items-center me-2">
            <span className="me-1 t text-capitalize">{field.value}</span>
            <button
                className="btn-close w-1/4r h-1/4r"
                type="button"
                aria-label="Close"
                onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(index);
                }}
            ></button>
        </div>));
    };

    const handleDelete = (index) => {
        remove(index);
    };

    return (<div ref={outsideClickRef} className="mb-3">
        <label className="text-normal text-dark form-label">Roles</label>
        <div
            className={`form-select d-flex dropend ${errors.role ? "is-invalid" : ""}`}
            onClick={() => {
                setIsRolesOpen(!isRolesOpen);
            }}
            {...register("role", {
                required: {value: true, message: "Roles is required"},
            })}
        >
            <div className="d-flex">{renderSelectedRoles()}</div>
            <ul
                className={`dropdown-menu fsz-sm dropdown-menu-dark  end-0 dropdown-menu-end ${isRolesOpen ? "show" : ""}`}
            >
                <li>
                    <input
                        type="checkbox"
                        className="d-none"
                        value="admin"
                        id="admin"
                        onChange={handleStatus}
                    />
                    <label htmlFor="admin" className="d-flex px-3 py-1 ">
                        <div
                            className={`me-2 ${!fields.some((field) => field.value === "admin") && "op-0"}`}>
                            <CheckedSvg value={true}/>
                        </div>
                        <span>Admin</span>
                    </label>
                </li>
                <li>
                    <input
                        type="checkbox"
                        className="d-none"
                        value="user"
                        id="user"
                        onChange={handleStatus}
                    />
                    <label htmlFor="user" className="d-flex px-3 py-1">
                        <div
                            className={`me-2 ${!fields.some((field) => field.value === "user") && "op-0"}`}>
                            <CheckedSvg value={true}/>
                        </div>
                        <span>User</span>
                    </label>
                </li>
                <li>
                    <input
                        type="checkbox"
                        className="d-none"
                        value="operator"
                        id="operator"
                        onChange={handleStatus}
                    />
                    <label htmlFor="operator" className="d-flex px-3 py-1">
                        <div
                            className={`me-2 ${!fields.some((field) => field.value === "operator") && "op-0"}`}>
                            <CheckedSvg value={true}/>
                        </div>
                        <span>Operator</span>
                    </label>
                </li>
            </ul>
        </div>
        {errors.role && (<span className="invalid-feedback ">Roles is required</span>)}
    </div>);
}

export default SelectRoles;
