import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
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

    constructor(private autosavePersonService: AutosavePersonService, private metaService: Meta) {
        this.metaService.updateTag({
            property: 'og:image',
            content:
                'https://dynamic-og-image-generator.vercel.app/api/generate?title=Blips+-+unique+prototypes&author=Namito+Yokota&websiteUrl=https%3A%2F%2Fwww.namitoyokota.com&avatar=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F42247132%3Fv%3D4&theme=default',
        });
    }

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
