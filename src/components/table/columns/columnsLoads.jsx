export const columnsLoads = (openModal) => [
    {
        header: "ID",
        accessorKey: "id",
        width: 60,
        minWidth: 60,
    },
    {header: "Status", accessorKey: "driver_status", width: 100, minWidth: 100},
    {
        header: "Pick Date",
        accessorKey: "pickup_date",
        width: 100,
        minWidth: 100,
    },
    {
        header: "Pick Address",
        accessorKey: "pick.address",
        width: 300,
        minWidth: 300,
    },
    {
        header: "Drop Date",
        accessorKey: "delivery_date",
        width: 100,
        minWidth: 100,
    },
    {
        header: "Drop Address",
        accessorKey: "drop.address",
        width: 250,
        minWidth: 250,
    },

    {
        header: "Driver",
        accessorKey: "driver_first_name_last_name",
        accessorFn: (row) => row.driver.first_name + " " + row.driver.last_name,
        cell: ({cell}) => {
            return (
                cell.row.original.driver.first_name +
                " " +
                cell.row.original.driver.last_name
            );
        },
        width: 200,
        minWidth: 200,
    },
    {
        header: "Power Unit",
        accessorKey: "power_unit.model",
        width: 200,
        minWidth: 200,
    },
    {
        header: "Trailer",
        accessorKey: "trailer.model",
        cell: ({cell}) => {
            return cell.row.original.trailer?.model || "No trailer";
        },
        width: 200,
        minWidth: 200,
    },
    {
        header: "Action",
        accessorKey: "action",
        cell: ({cell}) => (
            <div className="d-flex">
                <button
                    className="border-0 bg-white link-primary text-decoration-underline link-underline-opacity-0-hover bg-transparent"
                    type="button"
                    onClick={() => openModal(cell.row.original)}
                >
                    Change
                </button>
                {cell.row.original.driver_status !== "cancelled" && (
                    <button
                        className="border-0 bg-white alpha  text-decoration-underline link-underline-opacity-0-hover bg-transparent"
                        type="button"
                        onClick={() => {
                        }}
                    >
                        Cancel
                    </button>
                )}
                <button
                    className="border-0 bg-white link-danger text-decoration-underline link-underline-opacity-0-hover bg-transparent"
                    type="button"
                    onClick={() => {
                    }}
                >
                    Delete
                </button>
            </div>
        ),
        width: 180,
    },
];
