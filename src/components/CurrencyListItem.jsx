"use client"

const CurrencyListItem = ({ currency }) => {
    return (
        <div className="w-1/2 mt-2 h-full border border-gray-700 p-3 rounded-lg bg-gray-500 flex items-center justify-between">
            <p className="font-semibold text-xl text-white">{currency.name}</p>
            <p className="font-semibold text-xl text-white">{currency.price}</p>
        </div>
    );
}

export default CurrencyListItem;