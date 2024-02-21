import {useState} from "react";
import LoupeSvg from "../components/svg/LoupeSvg";
import CloseSvg from "../components/svg/CloseSvg";
import SimpleTable from "../components/table/SimpleTable";
import ModalCreateUser from "../components/modals/ModalCreateUser";
import {columnsTrailers} from "../components/table/columns/columnsTrailers";
import {trailers} from "../dataExamples/trailers";


const Trailers = () => {
    const [tableData, setTableData] = useState(sortTrailers(trailers)); // state for table
    const [filtering, setFiltering] = useState(''); // for search
    const [isModalOpen, setIsModalOpen] = useState(false); // for modal
    const [modalColumns, setModalColumns] = useState({}); // for modal

    function sortTrailers(trailers) {

        return [...trailers];
    }

    const openModal = (columns) => {
        setModalColumns(columns)
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }
    return (<div className="container-fluid ovX-a ">
        <h2 className="c-grey-900 mT-5 mB-10">Drivers</h2>
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
                                onChange={(e) => setFiltering(e.target.value)}/>
                            <div className="position-absolute top-50 start-0 translate-middle-y ps-4">
                                <LoupeSvg/>
                            </div>
                            {filtering &&
                                <div className="position-absolute cur-p top-50 end-0 translate-middle-y pe-4 z-1"
                                     onClick={() => setFiltering("")}>
                                    <CloseSvg/>
                                </div>}
                        </div>
                        <button className="btn cur-p btn-primary btn-color btn-sm fs-5"
                                onClick={() => openModal()}>
                            Create trailer
                        </button>
                    </div>
                    {/* Table */}
                    <SimpleTable columns={columnsTrailers(openModal)} data={tableData} search={filtering}
                                 setFiltering={setFiltering}/>
                    {/* Modal */}
                    {isModalOpen &&
                        <ModalCreateUser closeModal={closeModal} setData={setTableData} dataFetch={modalColumns}/>}
                </div>
            </div>
        </div>
    </div>);
};

export default Trailers;