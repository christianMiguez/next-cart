export const format = (value: number) => {
    const formatted = new Intl.NumberFormat('es-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })

    return formatted.format(value);
}