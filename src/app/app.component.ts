import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [],
})
export class AppComponent implements OnInit {
    constructor(private activatedRoute: ActivatedRoute, private meta: Meta, private router: Router) {}

    /**
     * On init lifecycle hook
     */
    ngOnInit() {
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                map(() => this.activatedRoute),
                map((route) => {
                    while (route.firstChild) route = route.firstChild;
                    return route;
                }),
                filter((route) => route.outlet === 'primary'),
                mergeMap((route) => route.data),
            )
            .subscribe((event) => {
                if (event['ogImageUrl']) {
                    this.meta.addTag({ property: 'og:image', content: event['ogImageUrl'] });
                }
            });
    }
}
