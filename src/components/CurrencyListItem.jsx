"use client"
import { ArrowRight } from "lucide-react";

const CurrencyListItem = ({ currency }) => {
    return (
        <div className="w-1/2 h-full border border-gray-700 p-4 rounded-md bg-gray-200 flex items-center justify-between">
            <p className="font-semibold text-xl text-gray-900">{currency.name}</p>
            <p className="font-semibold text-xl text-gray-900">${parseFloat(currency.priceUsd).toFixed(2)}</p>
        </div>
    );
}

export default CurrencyListItem;