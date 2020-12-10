import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();

        listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
            fakeAppointmentsRepository,
        );
    });

    it("Should be able to list provider's day availability", async () => {
        await fakeAppointmentsRepository.createAndSave({
            provider: 'providerId',
            date: new Date(2020, 10, 25, 8, 0, 0),
        });

        await fakeAppointmentsRepository.createAndSave({
            provider: 'providerId',
            date: new Date(2020, 10, 25, 10, 0, 0),
        });

        const availability = await listProviderDayAvailabilityService.execute({
            providerId: 'providerId',
            year: 2020,
            month: 11,
            day: 25,
        });

        expect(availability).toEqual(
            expect.arrayContaining([
                { hour: 8, available: false },
                { hour: 9, available: true },
                { hour: 10, available: false },
                { hour: 11, available: true },
            ]),
        );
    });
});
