import React, {useState} from "react";
import {useForm} from "react-hook-form";
import ModalConfirm from "./ModalConfirm";
import "react-international-phone/style.css";
import CustomizeUnitsCustomer from "../forms/CustomizeUnitsCustomer";
import CustomerNotes from "../forms/CustomerNotes";
import CustomerCompanyInputs from "../forms/CustomerCompanyInputs";
import CustomerPrimaryContact from "../forms/CustomerPrimaryContact";
import _ from "lodash";

const ModalCreateCustomer = ({closeModal, setData, data}) => {
    /* State Modal Confirm */
    const [isOpenSupModal, setIsOpenSupModal] = useState(false);

    /* Initial State for UseForm */
    const initialFormState = {
        id: data?.id || Number(new Date()) % 10000,
        contacts: data ? data.contacts.map((contact) => ({
            id: contact.id,
            firstName: contact.name?.split(" ")[0] || "",
            lastName: contact.name?.split(" ")[1] || "",
            phone: contact.phone || "",
            fax: contact.fax,
            email: contact.email || "",
            primary: contact.primary,
        })) : [{
            id: 1, firstName: "", lastName: "", phone: "", fax: "", email: "", primary: 0,
        },],
        customize_units: {
            distance: data?.customize_units?.distance || "mi",
            fuel_consumption: data?.customize_units?.fuel_consumption || "mpg",
            height: data?.customize_units?.height || "ft",
            length: data?.customize_units?.length || "ft",
            weight: data?.customize_units?.weight || "lbs",
            width: data?.customize_units?.width || "ft",
        },
        city: data?.city || "",
        country: data?.country || "",
        distance_unit: data?.distance_unit || "",
        dot_number: data?.dot_number || "",
        line1: data?.line1 || "",
        mcnumber: data?.mcnumber || "",
        name: data?.name || "",
        phone: data?.phone || "",
        private_note: data?.private_note || "",
        public_note: data?.public_note || "",
        state: data?.state || "",
        temperature_unit: data?.temperature_unit || "",
        weight_unit: data?.weight_unit || "",
        zip: data?.zip || "",
    };

    /* UseForm */
    const {
        register, handleSubmit, watch, setValue, control, formState: {errors},
    } = useForm({defaultValues: initialFormState});

    /* Submit data */
    const onSubmit = handleSubmit((data) => {
        /* set id for roles */
        setData((prev) => {
            return [{
                id: data.id,
                name: data.name,
                line1: data.line1,
                city: data.city,
                state: data.state,
                zip: data.zip,
                country: data.country,
                phone: data.phone,
                mcnumber: data.mcnumber,
                dot_number: data.dot_number,
                public_note: data.public_note,
                private_note: data.private_note,
                customize_units: {
                    distance: data.customize_units.distance,
                    fuel_consumption: data.customize_units.fuel_consumption,
                    height: data.customize_units.height,
                    length: data.customize_units.length,
                    weight: data.customize_units.weight,
                    width: data.customize_units.width,
                },
                contacts: data.contacts.map((contact) => ({
                    id: contact.id,
                    name: `${contact.firstName} ${contact.lastName}`,
                    phone: contact.phone,
                    fax: contact.fax,
                    email: contact.email,
                    primary: contact.primary,
                })),
            }, ...prev.filter((item) => item.id !== data.id)];
        });
        closeModal();
    });

    /* Close Modal */
    const closeModalCustomer = () => {
        const values = watch()
        const isEqual = _.isEqual(values, initialFormState);
        if (isEqual) closeModal();
        if (!isEqual) {
            openSupModal();
        }
    };
    /* Open Modal Confirm */
    const openSupModal = () => {
        setIsOpenSupModal(true);
    };
    /* Close Modal Confirm */
    const closeSupModal = () => {
        setIsOpenSupModal(false);
    };

    return (<div
        className="modal show fade  d-block "
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-modal="true"
        role={"dialog"}
        style={{background: "linear-gradient(176deg, black, transparent)"}}
    >
        <div className="modal-dialog modal-dialog-centered  modal-lg">
            <div className="modal-content m-auto ">
                {/* Title */}
                <div className="modal-header">
                    <h5 className="modal-title">
                        {data ? "Change customer" : "Create customer"}
                    </h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={closeModalCustomer}
                    />
                </div>
                {/* Body */}
                <div className="modal-body">
                    <form id="createCustomerForm" className=" ">
                        <div>
                            {/* Company contact */}
                            <CustomerCompanyInputs
                                register={register}
                                errors={errors}
                                control={control}
                                watch={watch}
                                setValue={setValue}
                            />
                            {/* Primary contact */}
                            <CustomerPrimaryContact
                                register={register}
                                errors={errors}
                                control={control}
                                watch={watch}
                                setValue={setValue}
                            />
                            {/* Customer notes */}
                            <CustomerNotes register={register}/>
                            {/* Customize units */}
                            <CustomizeUnitsCustomer register={register}/>
                        </div>
                    </form>
                </div>
                {/* Buttons*/}
                <div className="modal-footer">
                    <div className="m-auto">
                        <button
                            type="button"
                            className="btn btn-secondary me-3"
                            data-bs-dismiss="modal"
                            onClick={closeModalCustomer}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={onSubmit}
                        >
                            Save changes
                        </button>
                    </div>
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
}

export default ModalCreateCustomer;
