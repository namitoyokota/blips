import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from 'src/services/api.service';
import { AutosavePersonService } from 'src/services/autosave-person.service';
import { MailboxService } from 'src/services/mailbox.service';
import { StorePersonService } from 'src/services/store-person.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutosaveComponent } from './autosave/autosave.component';
import { HomeComponent } from './home/home.component';
import { ActionPaneComponent } from './mailbox/action-pane/action-pane.component';
import { MailboxComponent } from './mailbox/mailbox.component';
import { PersonFormComponent } from './mailbox/person-form/person-form.component';
import { StoreComponent } from './store/store.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AutosaveComponent,
        MailboxComponent,
        StoreComponent,
        ActionPaneComponent,
        PersonFormComponent,
    ],
    imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, CommonModule, FormsModule],
    providers: [MailboxService, ApiService, AutosavePersonService, StorePersonService],
    bootstrap: [AppComponent],
})
export class AppModule {}
