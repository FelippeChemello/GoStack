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
            date: new Date(2020, 10, 25, 13, 0, 0),
        });

        await fakeAppointmentsRepository.createAndSave({
            provider: 'providerId',
            date: new Date(2020, 10, 25, 15, 0, 0),
        });

        jest.spyOn(Date, 'now').mockImplementationOnce(() =>
            new Date(2020, 10, 25, 11).getTime(),
        );

        const availability = await listProviderDayAvailabilityService.execute({
            providerId: 'providerId',
            year: 2020,
            month: 11,
            day: 25,
        });

        expect(availability).toEqual(
            expect.arrayContaining([
                { hour: 8, available: false },
                { hour: 9, available: false },
                { hour: 10, available: false },
                { hour: 11, available: false },
                { hour: 12, available: true },
                { hour: 13, available: false },
                { hour: 14, available: true },
                { hour: 15, available: false },
                { hour: 16, available: true },
            ]),
        );
    });
});
