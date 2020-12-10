const openingHours = {
    open: 8,
    close: 18,
    workedHours: 10,
};

const hoursOpen = Array.from(
    { length: openingHours.workedHours },
    (_, i) => openingHours.open + i,
);

export default {
    ...openingHours,
    hoursOpen,
};
