import { BehaviorSubject } from 'rxjs';

export class Mail<T> {
    private message = new BehaviorSubject<T>(null);

    message$ = this.message.asObservable();

    constructor(message: T = null) {
        if (message) {
            this.update(message);
        }
    }

    get(): T {
        return this.message.getValue();
    }

    update(message: T = null): void {
        this.message.next(message);
    }
}
