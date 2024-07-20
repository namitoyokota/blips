import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [],
})
export class AppComponent implements OnInit {
    constructor(private router: Router, private meta: Meta) {}

    /**
     * On init lifecycle hook
     */
    ngOnInit() {
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                map(() => this.router.routerState.root),
                map((route) => {
                    while (route.firstChild) route = route.firstChild;
                    return route;
                }),
                filter((route) => route.outlet === 'primary'),
                mergeMap((route) => route.data),
            )
            .subscribe((event) => {
                console.log(event['ogImageUrl']);
                this.meta.updateTag({ name: 'og:image', content: event['ogImageUrl'] });
            });
    }
}
