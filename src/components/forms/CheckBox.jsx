import {useState} from "react";
import CheckedSvg from "../svg/CheckedSvg";

function CheckBox({register, watch}) {
    const [value, setValue] = useState(watch("notification"));
    const handleCheckboxChange = () => {
        setValue(!value);
    }

    return (<div className="mb-3">
        <div className="d-flex">
            <div className="w-1r h-1r p-1 border border-secondary rounded-1 d-flex">
                <CheckedSvg value={value}/>
            </div>


            <input type="checkbox" className="op-0 position-absolute" id="notication" checked={value}
                   aria-checked={value}
                   {...register("notification")}
                   onChange={handleCheckboxChange}
            />
            <label className="text-normal mx-1 form-label" htmlFor="notication"> Send notification to the
                user</label>
        </div>
    </div>);
}

export default CheckBox;