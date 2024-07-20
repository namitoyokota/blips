import { BehaviorSubject } from 'rxjs';
import { Person } from 'src/models/person';

export class StorePersonService {
    persons = new BehaviorSubject<Person[]>([]);

    persons$ = this.persons.asObservable();

    constructor() {}

    add(person: Person): void {
        const currentList = this.persons.getValue();
        const newList = [...currentList, person];
        this.persons.next(newList);
    }

    update(person: Person): void {
        const currentList = this.persons.getValue();
        const currentPerson = currentList.find((p) => p.id === person.id);
        currentPerson.firstName = person.firstName;
        currentPerson.lastName = person.lastName;
        this.persons.next(currentList);
    }

    remove(id: string): void {
        const currentList = this.persons.getValue();
        const newList = currentList.filter((person) => person.id !== id);
        this.persons.next(newList);
    }

    clear(): void {
        this.persons.next([]);
    }
}
