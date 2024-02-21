import {useState} from "react";
import ModalConfirm from "./ModalConfirm";
import _ from "lodash";
import {useForm} from "react-hook-form";

const ModalCreateLoads = ({closeModal, setData, dataFetch}) => {
    const [isOpenSupModal, setIsOpenSupModal] = useState(false);

    /* Initial State for Form*/
    const initialFormState = {
        driver: {
            id: dataFetch?.driver?.id || "",
            name: dataFetch?.driver?.first_name + " " + dataFetch?.driver?.last_name || "",
            address: dataFetch?.driver?.address || "",
            power_unit_id: dataFetch?.driver?.power_unit_id || "",
            trailer_id: dataFetch?.driver?.trailer_id || "",
        },
        power_unit: {
            id: dataFetch?.power_unit?.id || "",
            model: dataFetch?.power_unit?.model || "",
            pu_number: dataFetch?.power_unit?.pu_number || "",
            trailer: dataFetch?.power_unit?.trailer || "",
            active: dataFetch?.power_unit?.active || "",
        },
        trailer: dataFetch?.trailer || "",
        customer: dataFetch?.customer || "",
        pick: {
            id: dataFetch?.pick?.id || "",
            address: dataFetch?.pick?.address || "",
            zip_code: dataFetch?.pick?.zip_code || "",
            city: dataFetch?.pick?.city || "",
            admindistrict: dataFetch?.pick?.admindistrict || "",
        },
        drop: {
            id: dataFetch?.drop?.id || "",
            address: dataFetch?.drop?.address || "",
            zip_code: dataFetch?.drop?.zip_code || "",
            city: dataFetch?.drop?.city || "",
            admindistrict: dataFetch?.drop?.admindistrict || "",
        },
        order_number: dataFetch?.order_number || "",
        distance: dataFetch?.distance || "",
        pickup_date: dataFetch?.pickup_date || "",
        pickup_time: dataFetch?.pickup_time || "",
        delivery_date: dataFetch?.delivery_date || "",
        delivery_time: dataFetch?.delivery_time || "",
        delivery_status: dataFetch?.delivery_status || "",
        reference_number: dataFetch?.reference_number || "",
        driver_status: dataFetch?.driver_status || "",
        billing_status: dataFetch?.billing_status || "",
        price: dataFetch?.price || "",
        attachments: dataFetch?.attachments || [],
    }

    console.log(initialFormState.driver.name)

    const {
        register, watch, handleSubmit, control, formState: {errors},
    } = useForm({defaultValues: initialFormState});

    const onSubmit = handleSubmit((data) => {
        if (dataFetch) {
            setData((prev) => {
                return prev.map((item) => {
                    if (item.id === dataFetch.id) {
                        return {
                            id: dataFetch.id,
                            driver: {
                                id: data.driver.id,
                                first_name: data.driver.first_name,
                                last_name: data.driver.last_name,
                                address: data.driver.address,
                                power_unit_id: data.driver.power_unit_id,
                                trailer_id: data.driver.trailer_id,
                            },
                            power_unit: {
                                id: data.power_unit.id,
                                model: data.power_unit.model,
                                pu_number: data.power_unit.pu_number,
                                trailer: data.power_unit.trailer,
                                active: data.power_unit.active,
                            },
                            trailer: data.trailer,
                            customer: data.customer,
                            pick: {
                                id: data.pick.id,
                                address: data.pick.address,
                                zip_code: data.pick.zip_code,
                                city: data.pick.city,
                                admindistrict: data.pick.admindistrict,
                            },
                            drop: {
                                id: data.drop.id,
                                address: data.drop.address,
                                zip_code: data.drop.zip_code,
                                city: data.drop.city,
                                admindistrict: data.drop.admindistrict,
                            },
                            order_number: data.order_number,
                            distance: data.distance,
                            pickup_date: data.pickup_date,
                            pickup_time: data.pickup_time,
                            delivery_date: data.delivery_date,
                            delivery_time: data.delivery_time,
                            delivery_status: data.delivery_status,
                            driver_status: data.driver_status,
                            billing_status: data.billing_status,
                            attachments: data.attachments,
                        };
                    }
                    return item;
                });
            });
            return closeModal();
        }
        setData((prev) => {
            const newId = prev.length > 0 ? Math.max(...prev.map((item) => item.id)) + 1 : 1;
            return [{
                id: newId,
                driver: {
                    id: data.driver.id,
                    first_name: data.driver.name.split(" ")[0],
                    last_name: data.drive.name.split(" ")[1],
                    address: data.driver.address,
                    power_unit_id: data.driver.power_unit_id,
                    trailer_id: data.driver.trailer_id,
                },
                power_unit: {
                    id: data.power_unit.id,
                    model: data.power_unit.model,
                    pu_number: data.power_unit.pu_number,
                    trailer: data.power_unit.trailer,
                    active: data.power_unit.active,
                },
                trailer: data.trailer,
                customer: data.customer,
                pick: {
                    id: data.pick.id,
                    address: data.pick.address,
                    zip_code: data.pick.zip_code,
                    city: data.pick.city,
                    admindistrict: data.pick.admindistrict,
                },
                drop: {
                    id: data.drop.id,
                    address: data.drop.address,
                    zip_code: data.drop.zip_code,
                    city: data.drop.city,
                    admindistrict: data.drop.admindistrict,
                },
                order_number: data.order_number,
                distance: data.distance,
                pickup_date: data.pickup_date,
                pickup_time: data.pickup_time,
                delivery_date: data.delivery_date,
                delivery_time: data.delivery_time,
                delivery_status: data.delivery_status,
                driver_status: data.driver_status,
                billing_status: data.billing_status,
                attachments: data.attachments,
            }, ...prev,];
        });
        closeModal();
    });

    const closeModalLoads = () => {
        const values = watch()
        const isEqual = _.isEqual(values, initialFormState);
        if (isEqual) closeModal();
        if (!isEqual) {
            openSupModal();
        }
    }
    const openSupModal = () => {
        setIsOpenSupModal(true);
    }
    const closeSupModal = () => {
        setIsOpenSupModal(false);
    }

    return (<div
        className="modal show fade  d-block "
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-modal="true"
        role={"dialog"}
        style={{background: "linear-gradient(176deg, black, transparent)"}}
    >
        <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content m-auto">
                {/* Title */}
                <div className="modal-header">
                    <h5 className="modal-title">
                        {dataFetch ? "Change loads" : "Create loads"}
                    </h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={closeModal}
                    ></button>
                </div>
                {/* Body */}
                <div className="modal-body">
                    <form id=" createUserForm">

                        {/* PickUp/Delivery */}
                        <div className="mb-2">
                            <div
                                className="bg-body-secondary px-3 py-1 d-flex justify-content-between align-items-center rounded-2"
                            >
                                <h5 className="m-0">
                                    PickUp/Delivery
                                </h5>
                            </div>
                        </div>
                        <div className="d-flex flex-column flex-lg-row  mt-3">
                            <div className="col-lg-6 col-12 ">
                                <div className="me-lg-3 me-0">
                                    <label htmlFor="driver" className="d-flex ">Driver<span
                                        className="text-danger">*</span></label>
                                    <input type="text" className="form-control" id="driver"
                                           {...register("driver.name", {
                                               required: {value: true, message: "This field is required"}, minLength: {
                                                   value: 3, message: "Minimum 3 characters",
                                               },
                                           })}
                                    />
                                </div>
                            </div>
                            <div className="d-flex ">
                                <div className="w-lg-25 w-100 me-3">
                                    <label htmlFor="order" className="d-flex ">Order # <span
                                        className="text-danger">*</span></label>
                                    <input type="text" className="form-control" id="order"
                                           {...register("order_number", {
                                               required: {value: true, message: "This field is required"}, minLength: {
                                                   value: 3, message: "Minimum 3 characters",
                                               },
                                           })}
                                    />
                                </div>
                                <div className="w-lg-25 w-100">
                                    <label htmlFor="reference" className="d-flex ">Reference # <span
                                        className="text-danger">*</span></label>
                                    <input type="text" className="form-control" id="reference"
                                           {...register("reference_number")}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between flex-column flex-lg-row mt-3">
                            <div className="w-lg-25 w-100 me-3">
                                <label htmlFor="price" className="d-flex ">Price <span
                                    className="text-danger">*</span></label>
                                <input type="text" className="form-control" id="price"
                                       {...register("price", {
                                           required: {value: true, message: "This field is required"},
                                       })}
                                />
                            </div>
                            <div className="w-lg-25 w-100 me-3">
                                <label htmlFor="miles" className="d-flex ">Miles <span
                                    className="text-danger">*</span></label>
                                <input type="text" className="form-control" id="miles"/>
                            </div>
                            <div className="col-lg-6 col-12">
                                <label htmlFor="deadhead_address" className="d-flex ">Deadhead Address <span
                                    className="text-danger">*</span></label>
                                <input type="text" className="form-control" id="deadhead_address"/>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between flex-column flex-lg-row mt-3">
                            <div className="col-lg-6 col-12">
                                <div className="me-lg-3 me-0">
                                    <label htmlFor="pick_up_address" className="d-flex ">Pick Up Address <span
                                        className="text-danger">*</span></label>
                                    <input type="text" className="form-control" id="pick_up_address"/>
                                </div>
                            </div>
                            <div className="col-lg-6 col-12">
                                <label htmlFor="delivery_address" className="d-flex ">Delivery Address <span
                                    className="text-danger">*</span></label>
                                <input type="text" className="form-control" id="delivery_address"/>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between flex-column flex-lg-row mt-3">
                            <div className="col-lg-6 col-12">
                                <div className="me-lg-3 me-0">
                                    <label htmlFor="pick_up_date" className="d-flex ">Pick Up Date <span
                                        className="text-danger">*</span></label>
                                    <input type="text" className="form-control" id="pick_up_date"/>
                                </div>
                            </div>
                            <div className="col-lg-6 col-12">
                                <label htmlFor="delivery_date" className="d-flex ">Delivery Date <span
                                    className="text-danger">*</span></label>
                                <input type="text" className="form-control" id="delivery_date"/>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between flex-column flex-lg-row mt-3">
                            <div className="col-lg-6 col-12 d-flex">
                                <div className="w-50  me-3">
                                    <label htmlFor="zip-from" className="d-flex ">Zip From <span
                                        className="text-danger">*</span></label>
                                    <input type="text" className="form-control" id="zip-from"/>
                                </div>
                                <div className="w-50 me-lg-3 me-0">
                                    <label htmlFor="zip-to" className="d-flex ">Zip To <span
                                        className="text-danger">*</span></label>
                                    <input type="text" className="form-control" id="zip-to"/>
                                </div>
                            </div>
                            <div className="col-lg-6 col-12 d-flex">
                                <div className="w-50  me-3">
                                    <label htmlFor="pick_up_time" className="d-flex ">Pick Up Time </label>
                                    <input type="time" className="form-control" id="pick_up_time"/>
                                </div>
                                <div className="w-50 me-lg-3 me-0">
                                    <label htmlFor="delivery_time" className="d-flex ">Delivery Time </label>
                                    <input type="time" className="form-control" id="delivery_time"/>
                                </div>
                            </div>

                        </div>
                        <div className="d-flex justify-content-between flex-column flex-lg-row mt-3 mb-3">
                            <div className="d-flex">
                                <input type="checkbox" className="form-check-input me-3" id="track_is_not_used"/>
                                <label htmlFor="track_is_not_used" className="d-flex ">Track is not used ?</label>
                            </div>
                        </div>

                        {/* Customer */}
                        <div className="mb-2">
                            <div className="bg-body-secondary px-3 py-1 rounded-2">
                                <h5 className="m-0">
                                    Customer
                                </h5>
                            </div>
                            <div className="">
                                <div className="justify-content-lg-between align-items-center d-flex mt-3">
                                    <div className="col-lg-6 col-8">
                                        <label htmlFor="customer" className="" id="customer">Customer <span
                                            className="text-danger">*</span>
                                        </label>
                                        <input type="text" className="form-control" id="customer"/>
                                    </div>
                                    <div className="col-lg-4 col-4">
                                        <input className="form-check-input" type="checkbox" id="show_detail"/>
                                        <label className="form-check-label" htmlFor="show_detail">Show Details</label>
                                    </div>
                                </div>
                                <div className="border-1 border rounded-1 mt-3 p-5">
                                    <div className="d-flex justify-content-between flex-column flex-lg-row mt-3">
                                        <div className="w-lg-50 w-100 me-3">
                                            <label htmlFor="mc_number" className="d-flex ">MC Number <span
                                                className="text-danger">*</span></label>
                                            <input type="text" className="form-control" id="mc_number"/>
                                        </div>
                                        <div className="w-lg-50 w-100 me-3">
                                            <label htmlFor="zip" className="d-flex ">Zip <span
                                                className="text-danger">*</span></label>
                                            <input type="text" className="form-control" id="zip"/>
                                        </div>
                                        <div className="w-lg-50 w-100">
                                            <label htmlFor="city" className="d-flex ">City <span
                                                className="text-danger">*</span></label>
                                            <input type="text" className="form-control" id="city"/>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between flex-column flex-lg-row mt-3">
                                        <div className="w-lg-50 w-100 me-3">
                                            <label htmlFor="state" className="d-flex ">State <span
                                                className="text-danger">*</span></label>
                                            <input type="text" className="form-control" id="state"/>
                                        </div>
                                        <div className="w-lg-50 w-100 me-3">
                                            <label htmlFor="country" className="d-flex ">Country <span
                                                className="text-danger">*</span></label>
                                            <input type="text" className="form-control" id="country"/>
                                        </div>
                                        <div className="w-lg-50 w-100">
                                            <label htmlFor="phone" className="d-flex ">Phone <span
                                                className="text-danger">*</span></label>
                                            <input type="text" className="form-control" id="phone"/>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between flex-column flex-lg-row mt-3">
                                        <div className="w-100">
                                            <label htmlFor="adress" className="d-flex ">Adress <span
                                                className="text-danger">*</span></label>
                                            <input type="text" className="form-control" id="adress"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Units */}
                        <div className="mb-2">
                            <div
                                className="bg-body-secondary px-3 py-1 d-flex justify-content-between align-items-center rounded-2"
                            >
                                <h5 className="m-0">
                                    Units
                                </h5>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between flex-column flex-lg-row mt-3">
                            <div className="w-lg-50 w-100 me-3">
                                <label htmlFor="power_unit" className="d-flex ">Power Unit </label>
                                <input type="select" className="form-control" id="power_unit"/>
                            </div>
                            <div className="w-lg-50 w-100">
                                <label htmlFor="trailer" className="d-flex ">Trailer </label>
                                <input type="select" className="form-control" id="trailer"/>
                            </div>
                        </div>
                    </form>
                </div>
                {/* Buttons */}
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                        onClick={closeModalLoads}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={onSubmit}
                        form="createUserForm"
                    >
                        Save changes
                    </button>
                </div>
                {/* Modal confirm */}
                {isOpenSupModal && (<ModalConfirm
                    closeModal={closeModal}
                    onSubmit={onSubmit}
                    closeSupModal={closeSupModal}
                />)}
            </div>
        </div>
    </div>);
};

export default ModalCreateLoads;