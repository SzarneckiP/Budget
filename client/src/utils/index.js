export const formatCurrency = (value) => {
    const number = Number(value);

    return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(number)
}

export const formatDate = string => {
    const date = new Date(string);

    return new Intl.DateTimeFormat('pl-Pl').format(date);
}