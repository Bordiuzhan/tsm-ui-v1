import DeleteSvg from "../svg/DeleteSvg";
import CheckBoxPrimaryContact from "./CheckBoxPrimaryContact";
import validator from "validator";
import {Controller} from "react-hook-form";
import {PhoneInput} from "react-international-phone";
import {useEffect} from "react";

const CustomerContact = ({
                             register,
                             errors,
                             control,
                             setValue,
                             watch,
                             contact,
                             index,
                             removeContact,
                             length,
                             setCheckedContact,
                             checkedContact
                         }) => {
    useEffect(() => {
        setValue(`contacts.${[index]}.primary`, checkedContact === contact.id ? 1 : 0);
    }, [checkedContact, contact.id, index, setValue]);
    return (<div className="border border-secondary-subtle rounded-2 pt-1 mt-2 pb-3 px-2">
        <div className="d-flex justify-content-between">
            <h6 className="m-0">Contact {index + 1}</h6>
            <button
                type="button"
                className="border-0 bg-transparent p-0"
                onClick={() => removeContact(contact.id)}
            >
                {length === 1 ? null : <DeleteSvg/>}
            </button>
        </div>
        <div className="d-flex justify-content-between flex-column flex-lg-row">
            {/* First Name */}
            <div className="w-lg-50 w-100 me-3 mt-3">
                <label htmlFor="name">
                    First Name
                    <span className="text-danger">*</span>
                </label>
                <input
                    type="text"
                    className={`form-control ${errors.contacts?.[index]?.firstName ? "is-invalid" : ""}`}
                    id="name"
                    {...register(`contacts.${[index]}.firstName`, {
                        required: {value: true, message: "This field is required"}, minLength: {
                            value: 3, message: `Minimum length is 3 characters`,
                        },
                    })}
                />
                {errors.contacts?.[index]?.firstName?.type && (<span className="invalid-feedback">
              {errors.contacts?.[index].firstName.message}
            </span>)}
            </div>
            {/* Last Name */}
            <div className="w-lg-50 w-100 mt-3">
                <label htmlFor="name">
                    Last Name
                    <span className="text-danger">*</span>
                </label>
                <input
                    type="text"
                    className={`form-control ${errors.contacts?.[index]?.lastName ? "is-invalid" : ""}`}
                    id="name"
                    {...register(`contacts.${[index]}.lastName`, {
                        required: {
                            value: true, message: "This field is required",
                        }, minLength: {
                            value: 3, message: `Minimum length is 3 characters`,
                        },
                    })}
                />{" "}
                {errors.contacts?.[index]?.lastName?.type && (<span className="invalid-feedback">
              {errors.contacts?.[index].lastName.message}
            </span>)}
            </div>
        </div>
        <div className="d-flex justify-content-between flex-column flex-lg-row">
            {/* Phone */}
            <div className="w-lg-50 w-100 me-3 mt-3">
                <label htmlFor="phone">
                    Phone
                    <span className="text-danger">*</span>
                </label>
                <Controller
                    name={`contacts.${[index]}.phone`}
                    control={control}
                    rules={{
                        required: {value: true, message: "Phone is required"}, minLength: {
                            value: 12, message: "Phone format is incorrect",
                        }, validate: (value) => validator.isMobilePhone(value.replace(/\+/g, "")),
                    }}
                    render={({field: {onChange, value}}) => (<PhoneInput
                        defaultCountry="us"
                        value={value}
                        onChange={onChange}
                        inputClassName={`ps-5 rounded-2 border form-control ${errors.contacts?.[index]?.phone ? "is-invalid border-danger" : ""}`}
                        containerStyle={{width: "100%"}}
                        className={"position-relative rounded-3 border-0"}
                        countrySelectorStyleProps={{
                            className: "position-absolute top-0 start-0 rounded-3 border-0",
                            buttonClassName: "border-0 bg-transparent",
                        }}
                    />)}
                />
                {errors.contacts?.[index]?.phone?.type && (<span className="invalid-feedback d-block">
              {errors.contacts?.[index].phone.message}
            </span>)}
            </div>
            {/* Fax */}
            <div className="w-lg-50 w-100 mt-3">
                <label htmlFor="fax">Fax</label>
                <input
                    type="text"
                    className="form-control"
                    id="fax"
                    {...register(`contacts.${[index]}.fax`)}
                />
            </div>
        </div>
        <div className="d-flex align-self-end mb-3 flex-column flex-lg-row">
            {/* Email  */}
            <div className="w-lg-50 w-100 me-3 mt-3">
                <label htmlFor="email">
                    Email address
                    <span className="text-danger">*</span>
                </label>
                <input
                    type="email"
                    className={`form-control ${errors.contacts?.[index]?.email ? "is-invalid" : ""}`}
                    id="email"
                    {...register(`contacts.${[index]}.email`, {
                        required: {value: true, message: "Email is required"},
                        validate: (value) => validator.isEmail(value) || "Email format is incorrect",
                    })}
                />
                {errors.contacts?.[index]?.email?.type && (<span className="invalid-feedback position-absolute">
              {errors.contacts?.[index].email.message}
            </span>)}
            </div>
            {/* Primary contact */}
            <div className="w-lg-50 w-100 mt-3 d-flex  ">
                <div className="d-flex align-content-end flex-wrap">
                    <Controller
                        name={`contacts.${[index]}.primary`}
                        control={control}
                        render={({field: {onChange, value}}) => (<CheckBoxPrimaryContact
                            length={length}
                            checked={checkedContact === contact.id}
                            index={index}
                            onChange={(e) => {
                                setCheckedContact(contact.id);
                                onChange(Number(e.target.checked));
                            }}
                        />)}
                    />
                </div>
            </div>
        </div>
    </div>);
}

export default CustomerContact;
