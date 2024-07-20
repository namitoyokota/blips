import { BehaviorSubject, first, Observable, Subscription, timer } from 'rxjs';
import { SaveStatus } from 'src/enums/save-status';

export abstract class AutosaveService<T> {
    /** Request object to save on the next trigger */
    protected dataToSave: T = null;

    /** Current status of the save */
    protected status = new BehaviorSubject<SaveStatus>(SaveStatus.NULL);

    /** Current status of the save */
    status$ = this.status.asObservable();

    /** Indicates error happened on last API call */
    protected error = new BehaviorSubject<boolean>(false);

    /** Indicates error happened on last API call */
    error$ = this.error.asObservable();

    /** Observable for timer ticks */
    private timer$: Observable<number>;

    /** Subscription listening to latest timer */
    private timerSubscription: Subscription;

    /** Frequency of the timer tick in milliseconds */
    private readonly tickFrequency = 5000;

    constructor() {}

    /** Calls API to save data */
    abstract saveData(): Promise<void>;

    /**
     * Requests service to save data on the next tick
     * @param request Data to save
     */
    requestSave(request: T): void {
        this.timerSubscription?.unsubscribe();

        this.timer$ = timer(this.tickFrequency);
        this.dataToSave = request;
        this.error.next(false);
        this.status.next(SaveStatus.UNSAVED);

        this.listenToTimer();
    }

    /**
     * Saves data at the moment of the request
     * @param request Data to save
     */
    saveNow(request: T): Promise<void> {
        this.status.next(SaveStatus.UNSAVED);
        this.dataToSave = request;
        this.error.next(false);

        return this.saveData();
    }

    /**
     * Empties save request
     */
    clearRequest(): void {
        this.status.next(SaveStatus.SAVED);
        this.dataToSave = null;
        this.error.next(false);
    }

    /**
     * Triggers save on timer tick
     */
    private listenToTimer(): void {
        this.timerSubscription = this.timer$.pipe(first()).subscribe(() => {
            const triggerSave = this.dataToSave && !this.error.getValue() && this.status.getValue() === SaveStatus.UNSAVED;
            if (triggerSave) {
                this.saveData();
            }
        });
    }
}
