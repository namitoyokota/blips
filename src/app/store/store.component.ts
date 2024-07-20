import { Component } from '@angular/core';
import { Person } from 'src/models/person';
import { StorePersonService } from 'src/services/store-person.service';

@Component({
    templateUrl: './store.component.html',
    styleUrl: './store.component.scss',
})
export class StoreComponent {
    person = new Person();

    persons$ = this.storePersonService.persons$;

    constructor(private storePersonService: StorePersonService) {}

    add(): void {
        this.person.isDirty = false;
        this.storePersonService.add(this.person);
        this.person = new Person();
    }

    update(person: Person): void {
        person.isDirty = false;
        this.storePersonService.update(person);
    }

    remove(id: string): void {
        this.storePersonService.remove(id);
    }

    clear(): void {
        this.storePersonService.clear();
    }
}
