import React, {useEffect, useState} from "react";
import {loads} from "../dataExamples/loads";
import LoupeSvg from "../components/svg/LoupeSvg";
import CloseSvg from "../components/svg/CloseSvg";
import GearSvg from "../components/svg/GearSvg";
import SimpleTable from "../components/table/SimpleTable";
import {columnsLoads} from "../components/table/columns/columnsLoads";
import ModalCreateUser from "../components/modals/ModalCreateUser";
import Popup from "../components/Popup";
import ModalCreateLoads from "../components/modals/ModalCreateLoads";

const Loads = () => {
    const [tableData, setTableData] = useState(sortLoads(loads));
    const [filtering, setFiltering] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalColumns, setModalColumns] = useState({});
    const [isPopupShow, setIsPopupShow] = useState(false);

    const [columnVisibility, setColumnVisibility] = useState(() => {
        return (JSON.parse(localStorage.getItem("columns")) || {
            driver_first_name_last_name: true, power_unit_model: true, trailer_model: true,
        });
    });

    useEffect(() => {
        localStorage.setItem("columns", JSON.stringify(columnVisibility));
    }, [columnVisibility]);

    function sortLoads(loads) {
        // Sort loads status and pick-up date,latest date loads to the top
        const sortedLoads = [...loads].sort((a, b) => a.driver_status.localeCompare(b.driver_status),);
        const sortedLoads2 = [...loads].sort((a, b) => a.pickup_date.localeCompare(b.pickup_date),);

        return [...sortedLoads, ...sortedLoads2];
    }

    const openModal = (columns) => {
        setModalColumns(columns);

        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (<div className="container-fluid ovX-a">
        <h2 className="c-grey-900 mT-5 mB-10">Loads</h2>
        <div className="row">
            <div className="col-md-12">
                <div className="bgc-white bd bdrs-3 p-20 mB-20">
                    {/* Search */}
                    <div className="bgc-white d-flex justify-content-between align-items-center pb-4">
                        <div className="position-relative input-group input-group-lg w-30p">
                            <input
                                className="px-5  form-control rounded-2 z-0"
                                type="text"
                                placeholder={"Type to Search"}
                                value={filtering}
                                onChange={(e) => setFiltering(e.target.value)}
                            />
                            <div className="position-absolute top-50 start-0 translate-middle-y ps-4">
                                <LoupeSvg/>
                            </div>
                            {filtering && (<div
                                className="position-absolute cur-p top-50 end-0 translate-middle-y pe-4 z-1"
                                onClick={() => setFiltering("")}
                            >
                                <CloseSvg/>
                            </div>)}
                        </div>
                        <div>
                            <div className="d-flex align-items-center dropdown">
                                <div
                                    className="me-2 cur-p "
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsPopupShow(!isPopupShow);
                                    }}
                                >
                                    <GearSvg/>
                                </div>
                                {isPopupShow && (<Popup
                                    setIsPopupShow={setIsPopupShow}
                                    setColumnVisibility={setColumnVisibility}
                                    columnVisibility={columnVisibility}
                                />)}
                                <button
                                    type="button"
                                    className="btn btn-primary btn-color cur-p btn-sm fs-5"
                                    onClick={() => openModal()}
                                >
                                    Create load
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Table */}
                    <SimpleTable
                        columns={columnsLoads(openModal)}
                        data={tableData}
                        search={filtering}
                        columnVisibility={columnVisibility}
                        setColumnVisibility={setColumnVisibility}
                    />
                    {/* Modal */}
                    {isModalOpen && (<ModalCreateLoads
                        closeModal={closeModal}
                        setData={setTableData}
                        dataFetch={modalColumns}
                    />)}
                </div>
            </div>
        </div>
    </div>);
};

export default Loads;
