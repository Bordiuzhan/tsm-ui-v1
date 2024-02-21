const CheckBoxPrimaryContact = ({checked, onChange, index, length}) => {

    return (<div className="">
        <div className="d-flex">
            <div className="w-1r h-1r p-1 border border-secondary rounded-1 d-flex position-relative">
                <svg
                    className={` ${length === 1 ? "text-secondary" : checked ? "text-primary" : "text-white"}`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M1 5.917 5.724 10.5 15 1.5"
                    />
                </svg>
                <input
                    className=" position-absolute w-100 h-100 top-0 start-0 opacity-0"
                    type="checkbox"
                    checked={checked}
                    id={`contacts.${[index]}.primary`}
                    name="primary"
                    onChange={onChange}
                />
            </div>
            <label
                className="text-normal mx-1 form-label text-muted "
                htmlFor={`contacts.${[index]}.primary`}
            >
                "Make this contact primary"
            </label>
        </div>
    </div>);
}

export default CheckBoxPrimaryContact;
