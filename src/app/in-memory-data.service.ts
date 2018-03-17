import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tours = [
        { id: 1, name: 'Lato Turnus 1', termin: '01.01.2018-01.01.2018',
            location: 'Mikolajki', resort: 'Hotel Golebiewski',
            coordinators: 'Adam Kowalski', schedule: 'sniadanie, obiad, kolacja' },

        { id: 2, name: 'Lato Turnus 2', termin: '01.01.2018-01.01.2018',
            location: 'Mikolajki', resort: 'Hotel Golebiewski',
            coordinators: 'Adam Kowalski', schedule: 'sniadanie, obiad, kolacja' },

        { id: 3, name: 'Lato Turnus 3', termin: '01.01.2018-01.01.2018',
            location: 'Mikolajki', resort: 'Hotel Golebiewski',
            coordinators: 'Adam Kowalski', schedule: 'sniadanie, obiad, kolacja' },

        { id: 4, name: 'Zima Turnus 1', termin: '01.01.2018-01.01.2018',
            location: 'Mikolajki', resort: 'Hotel Golebiewski',
            coordinators: 'Adam Kowalski', schedule: 'sniadanie, obiad, kolacja' },

        { id: 5, name: 'Zima Turnus 2', termin: '01.01.2018-01.01.2018',
            location: 'Mikolajki', resort: 'Hotel Golebiewski',
            coordinators: 'Adam Kowalski', schedule: 'sniadanie, obiad, kolacja' },

        { id: 6, name: 'Zima Turnus 3', termin: '01.01.2018-01.01.2018',
            location: 'Mikolajki', resort: 'Hotel Golebiewski',
            coordinators: 'Adam Kowalski', schedule: 'sniadanie, obiad, kolacja' }
    ];
    return {tours};
  }
}
