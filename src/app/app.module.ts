import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MailboxService } from 'src/services/mailbox.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ActionPaneComponent } from './mailbox/action-pane/action-pane.component';
import { MailboxComponent } from './mailbox/mailbox.component';
import { PersonFormComponent } from './mailbox/person-form/person-form.component';

@NgModule({
    declarations: [AppComponent, HomeComponent, HomeComponent, MailboxComponent, ActionPaneComponent, PersonFormComponent],
    imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, CommonModule, FormsModule],
    providers: [MailboxService],
    bootstrap: [AppComponent],
})
export class AppModule {}
