import React from "react";

const CheckedSvg = ({value, color = "text-primary"}) => {
    return (<svg className={value ? color : "text-white"} aria-hidden="true" width={12}
                 height={12}
                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"
              d="M1 5.917 5.724 10.5 15 1.5"/>
    </svg>);
}

export default CheckedSvg;


