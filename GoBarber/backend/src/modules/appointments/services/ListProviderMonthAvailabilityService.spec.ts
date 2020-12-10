import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();

        listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
            fakeAppointmentsRepository,
        );
    });

    it("Should be able to list provider's month availability", async () => {
        const openingHours = { from: 8, to: 18 };
        const hoursOpen = Array.from(
            { length: openingHours.to - openingHours.from },
            (_, i) => openingHours.from + i,
        );

        const appointmentsPromises = hoursOpen.map(hour =>
            fakeAppointmentsRepository.createAndSave({
                provider: 'providerId',
                date: new Date(2020, 10, 25, hour, 0, 0),
            }),
        );

        await Promise.all(appointmentsPromises);

        const availability = await listProviderMonthAvailabilityService.execute(
            { providerId: 'providerId', year: 2020, month: 11 },
        );

        expect(availability).toEqual(
            expect.arrayContaining([
                { day: 24, available: true },
                { day: 25, available: false },
                { day: 26, available: true },
                { day: 27, available: true },
            ]),
        );
    });
});