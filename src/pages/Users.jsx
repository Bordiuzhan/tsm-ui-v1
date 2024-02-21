import React, {useEffect, useState} from "react";
import SimpleTable from "../components/table/SimpleTable";
import {users} from "../dataExamples/users";
import {columnsUser} from "../components/table/columns/columnsUser";
import ModalCreateUser from "../components/modals/ModalCreateUser";
import LoupeSvg from "../components/svg/LoupeSvg";
import CloseSvg from "../components/svg/CloseSvg";

const Users = () => {
    const [tableData, setTableData] = useState(sortUsers(users));
    const [filtering, setFiltering] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalColumns, setModalColumns] = useState({});
    /* For focus Input mobile */
    const [onFocus, setOnFocus] = useState(false);
    const ref = React.useRef(null);
    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOnFocus(false);
            }
        };
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [onFocus]);

    /* --- */

    function sortUsers(users) {
        // Sort users alphabetically by default
        const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
        // Move active users to the top
        const activeUsers = sortedUsers.filter((user) => user.status === "active");
        const inactiveUsers = sortedUsers.filter((user) => user.status !== "active");
        return [...activeUsers, ...inactiveUsers];
    }

    const openModal = (columns) => {
        setModalColumns(columns);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (<div className="container-fluid ovX-a ">
        <h2 className="c-grey-900 mT-5 mB-10">Users</h2>
        <div className="row">
            <div className="col-md-12">
                <div className="bgc-white bd bdrs-3 p-20 mB-20">
                    {/* Search */}
                    <div className="bgc-white d-flex justify-content-between align-items-center pb-4">
                        <div className="position-relative input-group input-group-lg width-300 me-2" ref={ref}>
                            <input
                                className="px-5  form-control rounded-2 z-0"
                                type="text"
                                placeholder={"Type to Search"}
                                value={filtering}
                                onFocus={() => setOnFocus(true)}
                                onChange={(e) => setFiltering(e.target.value)}
                            />
                            <div className="position-absolute top-50 start-0 translate-middle-y ps-4">
                                <LoupeSvg/>
                            </div>
                            {filtering && (<div
                                className="position-absolute cur-p top-50 end-0 translate-middle-y pe-4"
                                onClick={() => setFiltering("")}
                            >
                                <CloseSvg/>
                            </div>)}
                        </div>
                        <button
                            className={`btn cur-p btn-primary btn-color btn-sm fs-5 ${onFocus ? "d-none" : ""} d-sm-block`}
                            onClick={() => openModal()}>
                            <span className="min-width-90 d-block">
                            Create user
                            </span>
                        </button>
                    </div>
                    {/* Table */}
                    <SimpleTable
                        columns={columnsUser(openModal)}
                        data={tableData}
                        search={filtering}
                        setFiltering={setFiltering}
                    />
                    {/* Modal */}
                    {isModalOpen && (<ModalCreateUser
                        closeModal={closeModal}
                        setData={setTableData}
                        dataFetch={modalColumns}
                    />)}
                </div>
            </div>
        </div>
    </div>);
};

export default Users;
