import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('ListProviderMonthAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeCacheProvider = new FakeCacheProvider();

        listProviderAppointmentsService = new ListProviderAppointmentsService(
            fakeAppointmentsRepository,
            fakeCacheProvider,
        );
    });

    it("Should be able to list provider's appointments on a specific day", async () => {
        const appointment1 = await fakeAppointmentsRepository.createAndSave({
            providerId: 'providerId',
            userId: 'userId',
            date: new Date(2020, 10, 25, 12, 0, 0),
        });

        const appointment2 = await fakeAppointmentsRepository.createAndSave({
            providerId: 'providerId',
            userId: 'userId',
            date: new Date(2020, 10, 25, 15, 0, 0),
        });

        const appointments = await listProviderAppointmentsService.execute({
            providerId: 'providerId',
            year: 2020,
            month: 11,
            day: 25,
        });

        expect(appointments).toEqual(
            expect.arrayContaining([appointment1, appointment2]),
        );
    });
});
