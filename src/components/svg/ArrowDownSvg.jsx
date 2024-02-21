const ArrowDownSvg = ({size = 9}) => {
    return (<span className="pe-1">
                                <svg className=" text-gray-800 dark:text-white"
                                     width={size} height={size}
                                     aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M5 1v12m0 0 4-4m-4 4L1 9"/>
  </svg>
                            </span>);
}

export default ArrowDownSvg;