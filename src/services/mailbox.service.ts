import { Mail } from 'src/models/mail';
import { Person } from 'src/models/person';

export class MailboxService {
    changesExist = new Mail<Person>();
}
