import {useState} from "react";
import AngleUpSvg from "../svg/AngleUpSvg";
import AngleDownSvg from "../svg/AngleDownSvg";
import CustomerContact from "./CustomerContact";
import SmoothCollapse from "react-smooth-collapse";

const CustomerPrimaryContact = ({register, errors, control, watch, setValue}) => {
    const [isOpenPrimary, setIsOpenPrimary] = useState(true);
    const {contacts} = watch();

    const [checkedContact, setCheckedContact] = useState(
        contacts.find((contact) => contact.primary)?.id || contacts[0].id,
    );

    const addContact = () => {
        if (contacts.length === 3) return;
        const newId = Math.max(...contacts.map((contact) => contact.id)) + 1;
        const newContact = {
            id: newId,
            firstName: "",
            lastName: "",
            phone: "",
            fax: "",
            email: "",
            primary: false,
        };
        setValue("contacts", [...contacts, newContact]);
    };

    const removeContact = (idToRemove) => {
        if (contacts.length === 1) return;
        if (checkedContact === idToRemove) {
            setCheckedContact(
                contacts.find((contact) => contact.id !== idToRemove).id,
            );
        }
        const newContacts = contacts.filter((contact) => contact.id !== idToRemove);
        setValue("contacts", newContacts);
    };

    return (
        <div className="mb-2">
            <div
                className="bg-body-secondary px-3 py-1 d-flex justify-content-between align-items-center rounded-2"
                onClick={() => setIsOpenPrimary(!isOpenPrimary)}
            >
                <h5 className="m-0">Primary contact</h5>
                {isOpenPrimary ? <AngleUpSvg/> : <AngleDownSvg/>}
            </div>
            {/* Contact1 */}

            <SmoothCollapse
                expanded={isOpenPrimary}
                heightTransition="0.5s ease"
                allowOverflowWhenOpen={true}
            >
                {contacts.map((contact, index) => {
                    return (
                        <CustomerContact
                            key={index}
                            contact={contact}
                            index={index}
                            register={register}
                            errors={errors}
                            control={control}
                            removeContact={removeContact}
                            checkedContact={checkedContact}
                            setCheckedContact={setCheckedContact}
                            length={contacts.length}
                            watch={watch}
                            setValue={setValue}
                        />
                    );
                })}
                <button
                    type="button"
                    className="border-0 link-primary bg-transparent mt-1"
                    onClick={addContact}
                >
                    + Add another contact
                </button>
            </SmoothCollapse>
        </div>
    );
}

export default CustomerPrimaryContact;
