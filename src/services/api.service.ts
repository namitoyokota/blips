import { Person } from 'src/models/person';

export class ApiService {
    constructor() {}

    /**
     * Mock API request to show demo
     */
    save(person: Person): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (Math.ceil(Math.random() * 10) > 5) {
                setTimeout(() => {
                    resolve();
                }, 1000);
            } else {
                reject();
            }
        });
    }
}
