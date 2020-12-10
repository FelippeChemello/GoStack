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
        await fakeAppointmentsRepository.createAndSave({
            provider: 'providerId',
            date: new Date(2020, 10, 25, 8, 0, 0),
        });

        await fakeAppointmentsRepository.createAndSave({
            provider: 'providerId',
            date: new Date(2020, 10, 25, 10, 0, 0),
        });

        await fakeAppointmentsRepository.createAndSave({
            provider: 'providerId',
            date: new Date(2020, 10, 26, 8, 0, 0),
        });

        await fakeAppointmentsRepository.createAndSave({
            provider: 'providerId',
            date: new Date(2020, 11, 25, 8, 0, 0),
        });

        const availability = await listProviderMonthAvailabilityService.execute(
            { providerId: 'providerId', year: 2020, month: 11 },
        );

        expect(availability).toEqual(
            expect.arrayContaining([
                { day: 24, available: true },
                { day: 25, available: false },
                { day: 26, available: false },
                { day: 27, available: true },
            ]),
        );
    });
});
