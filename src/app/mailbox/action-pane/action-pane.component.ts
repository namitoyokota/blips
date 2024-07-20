import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MailboxService } from 'src/services/mailbox.service';

@Component({
    selector: 'action-pane',
    templateUrl: './action-pane.component.html',
    styleUrls: ['./action-pane.component.scss'],
})
export class ActionPaneComponent implements OnInit, OnDestroy {
    /** Indicates when input has been changed */
    isDirty = false;

    private changeSub: Subscription;

    constructor(private mailboxService: MailboxService) {}

    ngOnInit(): void {
        this.listenToPersonChange();
    }

    ngOnDestroy(): void {
        this.changeSub?.unsubscribe();
    }

    listenToPersonChange(): void {
        this.changeSub = this.mailboxService.changesExist.message$.subscribe((person) => {
            if (person) {
                this.isDirty = true;
            }
        });
    }

    saveChanges(): void {
        // API request goes here

        this.isDirty = false;
    }
}
