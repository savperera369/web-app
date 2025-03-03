"use client"
import { useQuery } from '@tanstack/react-query';
import CurrencyListItem from "@/components/CurrencyListItem";
import CurrencyTable from "@/components/CurrencyTable";
import { RefreshCwIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { formatBigNumbers, formatRegularNumbers, formatPercentage } from "@/utils/utils";

export default function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const [tableView, setTableView] = useState(true);

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

    const filteredData = data ?
        data.filter((currency) => currency.name.toLowerCase().startsWith(searchTerm.toLowerCase()))?.map((filteredCurrency) => ({
            rank: filteredCurrency.rank,
            name: filteredCurrency.name,
            symbol: filteredCurrency.symbol,
            supply: formatBigNumbers(filteredCurrency.supply),
            mktCap: formatBigNumbers(filteredCurrency.marketCapUsd),
            volume: formatBigNumbers(filteredCurrency.volumeUsd24Hr),
            change: formatPercentage(filteredCurrency.changePercent24Hr),
            vwap: formatRegularNumbers(filteredCurrency.vwap24Hr),
            price: formatRegularNumbers(filteredCurrency.priceUsd)
        }))
        : [];

    if (isPending) {
        return (
            <div className="p-4 flex items-center justify-center w-full min-h-screen">
                <div className="bg-gray-200 rounded-md p-8 flex flex-col items-center w-1/2 gap-y-4">
                    <p className="font-semibold text-2xl text-gray-900">
                        Retrieving Data...
                    </p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-4 flex items-center justify-center w-full min-h-screen">
                <div className="bg-gray-200 rounded-md p-8 flex flex-col items-center w-1/2 gap-y-4">
                    <p className="font-semibold text-2xl text-gray-900">
                        {error.message}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="px-4 py-4 flex flex-col items-center min-h-screen overflow-auto">
            <p className="p-2 text-5xl font-bold text-transparent bg-gradient-to-r from-gray-500 to-gray-900 bg-clip-text text-center">
                CryptoCurrency Dashboard
            </p>
            <p className="text-2xl text-gray-900 font-semibold mt-10 text-center">
                Live USD Prices of 5 Cryptocurrencies
            </p>
            <div className="flex flex-col mt-6 border border-gray-500 rounded-md p-4 bg-gray-100">
                <div className="relative">
                    <input
                        className="pl-10 rounded-lg pr-4 py-2 bg-white border border-gray-700 focus:outline-none text-md text-gray=500"
                        placeholder="Search currency..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"/>
                </div>
                <div className="flex w-full justify-center p-4 mb-0 mt-4">
                    <button
                        className="border rounded-md bg-white p-2 hover:cursor-pointer hover:bg-gray-900 hover:text-white"
                        onClick={() => setTableView((prevValue) => !prevValue)}
                    >
                        {tableView ? "Condensed View" : "Table View"}
                    </button>
                </div>
            </div>
            <div className="flex flex-col w-full items-center justify-center gap-y-4 p-4 mt-2">
                {filteredData?.length ? (
                    tableView ? (
                        <CurrencyTable currencyList={filteredData} />
                    ) : (
                        filteredData.map((currency, index) => (
                            <CurrencyListItem key={index} currency={currency} />
                        ))
                    )
                ) : (
                    <p className="text-xl font-semibold text-gray-900">No currency matches your search...</p>
                )}
            </div>
            <button
                className="mt-2 flex items-center gap-x-2 rounded-md shadow-lg bg-gray-700 text-white text-lg font-semibold p-4 hover:bg-gray-900 hover:cursor-pointer w-[130px]"
                onClick={() => refetch()}
            >
                <RefreshCwIcon />
                Refresh
            </button>
        </div>
    );
}
