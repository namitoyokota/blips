import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

@NgModule({
    declarations: [AppComponent, HomeComponent, HomeComponent],
    imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, CommonModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
