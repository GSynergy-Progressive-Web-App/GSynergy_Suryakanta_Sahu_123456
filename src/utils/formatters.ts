export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(value);
};

export const formatPercentage = (value: number): string => {
    return `${(value * 100).toFixed(2)}%`;
};

export const formatNumber = (value: number): string => {
    return new Intl.NumberFormat('en-US').format(value);
};