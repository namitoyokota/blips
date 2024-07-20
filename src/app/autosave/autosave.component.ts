import { Component } from '@angular/core';
import { Person } from 'src/models/person';
import { AutosavePersonService } from 'src/services/autosave-person.service';

@Component({
    templateUrl: './autosave.component.html',
    styleUrl: './autosave.component.scss',
})
export class AutosaveComponent {
    /** Data on the person */
    person = new Person();

    /** Status of the autosave request */
    status = this.autosavePersonService.status$;

    /** Error on previous API request */
    error = this.autosavePersonService.error$;

    constructor(private autosavePersonService: AutosavePersonService) {}

    /**
     * Fires save request to autosave service
     */
    savePerson(): void {
        this.autosavePersonService.requestSave(this.person);
    }

    /**
     * Immediately saves changes on person object
     */
    savePersonNow(): void {
        this.autosavePersonService.saveNow(this.person);
    }
}
