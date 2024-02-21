import {PhoneInput} from "react-international-phone";
import validator from "validator";
import {Controller} from "react-hook-form";
import {useEffect, useMemo, useState} from "react";
import Select from "react-select";
import countryList from 'react-select-country-list'
import axios from "axios";


const CustomerCompanyInputs = ({register, errors, control, watch, setValue}) => {
    const defaultCountry = useMemo(() => {
        return countryList().getLabel("US")
    }, [])
    const [countries] = useState(useMemo(() => {
        return countryList().getData()
    }, []))
    const [country, setCountry] = useState({label: defaultCountry, value: ""});
    const [states, setStates] = useState([])
    const [state, setState] = useState(null);
    const [cities, setCities] = useState([])
    const [city, setCity] = useState(null);

    useEffect(() => {
        const countryForm = watch("country")
        const stateForm = watch("state")
        const cityForm = watch("city")

        if (countryForm === "") {
            setValue("country", defaultCountry)
        }

        if (countryForm) {
            setCountry({label: countryForm, value: ""})
        }
        if (stateForm) {
            setState({label: stateForm, value: ""})
        }
        if (cityForm) {
            setCity({label: cityForm, value: ""})
        }
    }, [watch])

    useEffect(() => {
        const fetchStatesData = async (country) => {
            try {
                const response = await axios({
                    method: 'post', url: 'https://countriesnow.space/api/v0.1/countries/states', data: {
                        country: country
                    }
                });
                const data = response.data.data.states.map((item) => ({
                    label: item.name, value: item.state_code
                })) || [];
                setStates(data)
            } catch (e) {
                console.log(e); // TypeError: failed to fetch
            }
        }
        const fetchCitiesData = async (country, state) => {
            try {
                const response = await axios({
                    method: 'post', url: 'https://countriesnow.space/api/v0.1/countries/state/cities', data: {
                        country: country, state: state
                    }
                });
                const data = response.data.data.map((item) => ({
                    label: item, value: item
                })) || [];
                setCities(data)
            } catch (e) {
                console.log(e); // TypeError: failed to fetch
            }
        }
        if (country && country.label) {
            fetchStatesData(country.label)
        }
        if (state) {
            fetchCitiesData(country.label, state.label)

        }
    }, [country, state])

    const handleCountryChange = (e) => {
        setState("")
        setCity("")
        setCountry(e);
    }
    const handleStateChange = (e) => {
        setCity("")
        setState(e);
    }

    const colourStyles = (errors) => {
        return {
            container: (styles) => ({
                ...styles, border: "none", pointerEvents: "auto",
            }), control: (baseStyles, {isFocused, isDisabled}) => ({
                ...baseStyles,
                borderRadius: "0.375rem",
                boxShadow: isFocused ? errors ? "0 0 0 0.25rem rgba(244, 67, 54, 0.25)" : "0 0 0 0.25rem rgba(33, 150, 243, 0.25)" : "none",
                borderColor: isDisabled ? errors ? "#f44336" : "#00000010" : isFocused ? (errors ? "#f44336" : "#90cbf9") : errors ? "#f44336" : "#00000010",
                ':hover': {
                    borderColor: isDisabled ? errors ? "#f44336" : "#00000010" : isFocused ? (errors ? "#f44336" : "#90cbf9") : errors ? "#f44336" : "#00000010",
                },
                height: "35px",
                minHeight: "0px",


            }),
        }
    }

    return (<>
        {/* Company inputs */}
        <div className="d-flex justify-content-between flex-column flex-lg-row ">
            <div className="col-lg-3 col-12 me-3 mt-3">
                <label htmlFor="mcnumber" className="d-flex ">
                    MC Number
                    <span className="text-danger">*</span>
                </label>
                <input
                    type="text"
                    className={`form-control ${errors.mcnumber ? "is-invalid" : ""}`}
                    id="mcnumber"
                    {...register("mcnumber", {
                        required: {value: true, message: "This field is required"}, minLength: {
                            value: 3, message: "Minimum 3 characters",
                        },
                    })}
                />
                {errors.mcnumber && (<span className="invalid-feedback">{errors.mcnumber.message}</span>)}
            </div>
            <div className="w-lg-75 w-100 me-3 mt-3 ">
                <label htmlFor="name">
                    Company Name
                    <span className="text-danger">*</span>
                </label>
                <input
                    type="text"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    id="name"
                    {...register("name", {
                        required: {value: true, message: "This field is required"}, minLength: {
                            value: 3, message: "Minimum 3 characters",
                        },
                    })}
                />
                {errors.name && (<span className="invalid-feedback">{errors.name.message}</span>)}
            </div>
            <div className="col-lg-4 col-12 mt-3">
                <label htmlFor="phone">
                    Phone
                    <span className="text-danger">*</span>
                </label>
                <Controller
                    name="phone"
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
                        inputClassName={`ps-5 rounded-2 border form-control ${errors.phone ? "is-invalid border-danger" : ""}`}
                        containerStyle={{width: "100%"}}
                        className={"position-relative rounded-3 border-0"}
                        countrySelectorStyleProps={{
                            className: "position-absolute top-0 start-0 rounded-3 border-0",
                            buttonClassName: "border-0 bg-transparent",
                        }}
                    />)}
                />
                {errors.phone && (<span className="invalid-feedback d-block">
              {errors.phone.message}
            </span>)}
            </div>
        </div>
        {/* Address inputs */}
        <div className="d-flex justify-content-between flex-column flex-lg-row">
            {/* Country */}
            <div className="col-lg-3 col-12 me-3 mt-3">
                <label htmlFor="country">
                    Country
                    <span className="text-danger">*</span>
                </label>
                <Controller
                    name="country"
                    control={control}
                    rules={{
                        required: {value: true, message: "Country is required"},
                    }}
                    render={({field: {onChange}}) => <Select
                        onChange={(e) => {
                            onChange(e?.label)
                            handleCountryChange(e)
                        }}
                        options={countries}
                        value={country}
                        styles={colourStyles(errors.country)}
                    />}
                />

                {errors.country && (<span className="invalid-feedback d-block">
              {errors.country.message}
            </span>)}
            </div>
            {/* State */}
            <div className="w-100 me-3 mt-3">
                <label htmlFor="state">
                    State
                    <span className="text-danger">*</span>
                </label>
                <Controller
                    name="state"
                    control={control}
                    rules={{
                        required: {value: true, message: "State is required"},
                    }}
                    render={({field: {onChange}}) => (<Select
                        onChange={(e) => {
                            onChange(e.label)
                            handleStateChange(e)
                        }}
                        options={states}
                        value={state}
                        styles={colourStyles(errors.state)}


                    />)}
                />
                {errors.state && (<span className="invalid-feedback d-block">
              {errors.state.message}
            </span>)}
            </div>
            {/* City */}
            <div className="w-100 me-3 mt-3">
                <label htmlFor="city">
                    City
                    <span className="text-danger">*</span>
                </label>
                <Controller
                    name="city"
                    control={control}
                    rules={{
                        required: {value: true, message: "City is required"},
                    }}
                    render={({field: {onChange}}) => <Select
                        onChange={(e) => {
                            onChange(e.label)
                            setCity(e)
                        }}
                        options={cities}
                        value={city}
                        styles={colourStyles(errors.city)}
                    />}
                />
                {errors.city && (<span className="invalid-feedback d-block">
              {errors.city.message}
            </span>)}
            </div>
            {/* Zip */}
            <div className="w-100 mt-3">
                <label htmlFor="zip">
                    Zip
                    <span className="text-danger">*</span>
                </label>
                <input
                    type="text"
                    className={`form-control ${errors.zip ? "is-invalid" : ""}`}
                    id="zip"
                    {...register("zip", {
                        required: {value: true, message: "This field is required"},
                        validate: (value) => validator.isPostalCode(value, "any") || "Zip format is incorrect",
                    })}
                />
                {errors.zip && (<span className="invalid-feedback ">{errors.zip.message} </span>)}
            </div>
        </div>
        {/* Address inputs */}
        <div className="mb-4 d-flex justify-content-between flex-column flex-lg-row">
            <div className="col-lg-3 col-12 me-3 mt-3">
                <label htmlFor="dot">DOT Number</label>
                <input
                    type="text"
                    className="form-control"
                    id="dot_number"
                    {...register("dot_number")}
                />
            </div>
            <div className="w-100 mt-3">
                <label htmlFor="address">
                    Address
                    <span className="text-danger">*</span>
                </label>
                <input
                    type="text"
                    className={`form-control ${errors.line1 ? "is-invalid" : ""}`}
                    id="address"
                    {...register("line1", {
                        required: {value: true, message: "This field is required"},
                        minLength: {value: 3, message: "Minimum 3 characters"},
                    })}
                />
                {errors.line1 && (<span className="invalid-feedback">{errors.line1.message}</span>)}
            </div>
        </div>
    </>);
}

export default CustomerCompanyInputs;
