"use client"
import { useQuery } from '@tanstack/react-query';
import CurrencyListItem from "@/components/CurrencyListItem";
import { RefreshCwIcon, SearchIcon } from "lucide-react";
import { useState } from "react";

export default function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const fetchCryptoData = async () => {
        const response = await fetch('https://api.coincap.io/v2/assets', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.COINCAP_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        return data.data.slice(0,5);
    }

    const { isPending, isError, data, error, refetch } = useQuery({
        queryKey: ['cryptodata'],
        queryFn: fetchCryptoData,
    });

    if (isPending) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>{error.message}</span>;
    }

    const filteredData = data ? data : [];

    return (
        <div className="px-4 py-4 flex flex-col gap-y-4 items-center min-h-screen">
            <p className="p-2 text-5xl font-bold text-transparent bg-gradient-to-r from-gray-500 to-gray-900 bg-clip-text">
                CryptoCurrency Dashboard
            </p>
            <p className="text-2xl text-gray-900 font-semibold mt-10">
                Live USD Prices of 5 Cryptocurrencies
            </p>
            <div className="relative mt-4">
                <input
                    className="pl-10 rounded-lg pr-4 py-2 bg-white border border-gray-700 focus:outline-none text-md text-gray=500"
                    placeholder="Search currency..."
                />
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"/>
            </div>
            <div className="flex flex-col w-full items-center justify-center gap-y-4 p-4">
                {filteredData?.length ? (
                    filteredData.map((currency) => (
                        <CurrencyListItem key={currency.id} currency={currency} />
                    ))
                ) : null}
            </div>
            <button
                className="mt-4 flex items-center gap-x-2 rounded-md shadow-lg bg-gray-700 text-white text-lg font-semibold p-4 hover:bg-gray-900 hover:cursor-pointer w-[130px]"
                onClick={() => refetch()}
            >
                <RefreshCwIcon />
                Refresh
            </button>
        </div>
    );
}
