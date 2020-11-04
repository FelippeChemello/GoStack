const formatValue = (value: number | string): string =>
    Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
        typeof value === 'string' ? parseFloat(value) : value,
    );

export default formatValue;
