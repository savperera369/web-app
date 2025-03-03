const oneBillion = 1000000000

export const formatBigNumbers = (bigNumber) => {
    return "$" + (parseFloat(bigNumber) / oneBillion).toFixed(2) + "B";
}

export const formatRegularNumbers = (regularNumber) => {
    return "$" + parseFloat(regularNumber).toFixed(2);
}

export const formatPercentage = (percentage) => {
    return parseFloat(percentage).toFixed(2) + "%";
}