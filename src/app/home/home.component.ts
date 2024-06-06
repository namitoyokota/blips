import { Component } from '@angular/core';
import { routes } from 'src/models/routes';

@Component({
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {
    /** Navigation routes */
    readonly routes = routes;

    /** Title of the home route */
    readonly homeRouteTitle = 'Home';
}
