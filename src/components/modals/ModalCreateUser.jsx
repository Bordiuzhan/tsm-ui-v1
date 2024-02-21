import CheckBoxRound from "../forms/CheckBoxRound";
import SelectRoles from "../forms/SelectRoles";
import CheckBox from "../forms/CheckBox";
import {useFieldArray, useForm} from "react-hook-form";
import EmailInput from "../forms/EmailInput";
import PasswordInput from "../forms/PasswordInput";
import NameInput from "../forms/NameInput";
import React, {useState} from "react";
import ModalConfirm from "./ModalConfirm";
import _ from "lodash";

function ModalCreateUser({closeModal, setData, dataFetch}) {
    /* State for modal confirm */
    const [isOpenSupModal, setIsOpenSupModal] = useState(false);

    /* Initial State for Form*/
    const initialFormState = {
        email: dataFetch?.email || "",
        firstName: dataFetch?.name ? dataFetch.name.split(" ")[0] : "",
        lastName: dataFetch?.name ? dataFetch.name.split(" ")[1] : "",
        notification: dataFetch?.notification || false,
        password: "",
        role: dataFetch?.role ? dataFetch.role.map((role) => ({value: role})) : [],
        status: dataFetch?.status !== "inactive",
    };

    const {
        register, watch, handleSubmit, control, formState: {errors},
    } = useForm({defaultValues: initialFormState});
    const {fields, append, remove} = useFieldArray({
        control, name: "role",
    });

    const onSubmit = handleSubmit((data) => {
        if (dataFetch) {
            setData((prev) => {
                return prev.map((item) => {
                    if (item.id === dataFetch.id) {
                        return {
                            id: dataFetch.id,
                            name: `${data.firstName} ${data.lastName}`,
                            status: data.status ? "active" : "inactive",
                            email: data.email,
                            role: data.role.map((role) => role.value.toLowerCase()),
                            notification: data.notification,
                            password: data.password,
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
                name: `${data.firstName} ${data.lastName}`,
                status: data.status ? "inactive" : "active",
                email: data.email,
                role: data.role.map((role) => role.value.toLowerCase()),
            }, ...prev,];
        });
        closeModal();
    });

    const closeModalUser = () => {
        const values = watch()
        const isEqual = _.isEqual(values, initialFormState);
        if (isEqual) closeModal();
        if (!isEqual) {
            openSupModal();
        }
    };
    const openSupModal = () => {
        setIsOpenSupModal(true);
    };
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
        <div className="modal-dialog modal-dialog-centered">
            <div className={`modal-content m-auto`}>
                {/* Title */}
                <div className="modal-header">
                    <h5 className="modal-title">
                        {dataFetch ? "Change user" : "Create user"}
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
                        {/* First name Last name */}
                        <NameInput register={register} errors={errors}/>
                        {/* Email */}
                        <EmailInput
                            register={register}
                            errors={errors}
                            titleForm={"Email"}
                        />
                        {/* Password */}
                        <PasswordInput
                            register={register}
                            errors={errors}
                            isRequired={false}
                        />
                        {/* Status */}
                        <CheckBoxRound register={register} data={watch}/>
                        {/* Roles */}
                        <SelectRoles
                            register={register}
                            fields={fields}
                            append={append}
                            remove={remove}
                            errors={errors}
                        />
                        {/* Send notification */}
                        <CheckBox
                            register={register}
                            watch={watch}
                        />
                    </form>
                </div>
                {/* Buttons */}
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                        onClick={closeModalUser}
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
}

export default ModalCreateUser;
