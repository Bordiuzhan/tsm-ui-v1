function ModalConfirm({closeModal, onSubmit, closeSupModal}) {
    return (
        <div className="modal show fade  d-block " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
             aria-modal="true" role={"dialog"} style={{background: 'linear-gradient(176deg, black, transparent)'}}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content m-auto w-75">
                    <div className="" id="exampleModalToggle2" aria-hidden="true"
                         aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered modal-sm">
                            <div className="modal-content border-0">
                                <div className="modal-body">
                                    <p className="fw-bold text-center ">
                                        There are unsaved changes, would you like to save them?
                                    </p>
                                </div>
                                <div className="mx-auto ">
                                    <button className="btn btn-secondary me-3" data-bs-target="#exampleModalToggle"
                                            data-bs-toggle="modal"
                                            onClick={closeModal}
                                    >No
                                    </button>
                                    <button className="btn btn-primary" data-bs-target="#exampleModalToggle"
                                            data-bs-toggle="modal"
                                            onClick={() => {
                                                onSubmit();
                                                closeSupModal()
                                            }}
                                    >
                                        Yes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}

export default ModalConfirm;