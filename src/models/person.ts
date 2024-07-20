export class Person {
    id: string;
    firstName: string;
    lastName: string;
    isDirty: boolean;

    constructor() {
        this.id = crypto.randomUUID();
        this.firstName = 'John';
        this.lastName = 'Doe';
        this.isDirty = true;
    }
}
