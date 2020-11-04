const formatDate = (date: Date): string => {
    if (!date) return '';
    return Intl.DateTimeFormat('pt-BR').format(new Date(date));
};

export default formatDate;
