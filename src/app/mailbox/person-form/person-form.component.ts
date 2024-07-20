import { Component } from '@angular/core';
import { Person } from 'src/models/person';
import { MailboxService } from 'src/services/mailbox.service';

@Component({
    selector: 'person-form',
    templateUrl: './person-form.component.html',
    styleUrls: ['./person-form.component.scss'],
})
export class PersonFormComponent {
    person = new Person();

    constructor(private mailboxService: MailboxService) {}

    personUpdated(): void {
        this.mailboxService.changesExist.update(this.person);
    }
}
