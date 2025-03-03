import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'

const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor('rank', {
        header: () => 'Rank',
        cell: info => info.getValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor('name', {
        header: () => 'Name',
        cell: info => info.renderValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor('price', {
        header: () => 'Price',
        footer: info => info.column.id,
    }),
    columnHelper.accessor('mktCap', {
        header: 'Market Cap',
        footer: info => info.column.id,
    }),
    columnHelper.accessor('vwap', {
        header: 'VWAP(24hr)',
        footer: info => info.column.id,
    }),
    columnHelper.accessor('supply', {
        header: 'Supply',
        footer: info => info.column.id,
    }),
    columnHelper.accessor('volume', {
        header: 'Volume(24hr)',
        footer: info => info.column.id,
    }),
    columnHelper.accessor('change', {
        header: 'Change(24hr)',
        footer: info => info.column.id,
    }),
];

const CurrencyTable = ({ currencyList }) => {
    const table = useReactTable({
        data: currencyList,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="w-full p-2">
            { currencyList?.length ? (
                <table className="w-full border border-gray-500">
                    <thead className="bg-gray-700 text-white text-lg">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className="p-2 border-gray-500">
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody className="bg-white text-gray-600 text-lg">
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="p-4 border border-gray-500">
                                    <p className="text-center font-medium">{flexRender(cell.column.columnDef.cell, cell.getContext())}</p>
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : null}
        </div>
    )
}

export default CurrencyTable;