import { Injectable } from '@angular/core';
import { SaveStatus } from 'src/enums/save-status';
import { Person } from 'src/models/person';
import { ApiService } from './api.service';
import { AutosaveService } from './autosave.service';

@Injectable({ providedIn: 'root' })
export class AutosavePersonService extends AutosaveService<Person> {
    constructor(private apiService: ApiService) {
        super();
    }

    /**
     * Calls API to save person's data
     */
    saveData(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.status.next(SaveStatus.SAVING);
            this.apiService
                .save(this.dataToSave)
                .then(() => {
                    this.clearRequest();
                    resolve();
                })
                .catch(() => {
                    this.status.next(SaveStatus.UNSAVED);
                    this.error.next(true);
                    reject();
                });
        });
    }
}
