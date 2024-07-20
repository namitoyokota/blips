import { Routes } from '@angular/router';
import { AutosaveComponent } from 'src/app/autosave/autosave.component';
import { FormTourComponent } from 'src/app/form-tour/form-tour.component';
import { HomeComponent } from 'src/app/home/home.component';
import { MailboxComponent } from 'src/app/mailbox/mailbox.component';
import { RichMarkdownComponent } from 'src/app/rich-markdown/rich-markdown.component';
import { StoreComponent } from 'src/app/store/store.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { title: 'Home', path: 'home', component: HomeComponent },
    { title: 'Form Validation Tour', path: 'form-tour', component: FormTourComponent },
    { title: 'Mailbox Service', path: 'mailbox', component: MailboxComponent },
    { title: 'Rich Markdown Editor', path: 'rich-markdown', component: RichMarkdownComponent },
    { title: 'Store Service', path: 'store', component: StoreComponent },
    {
        title: 'Autosave Service',
        path: 'autosave',
        component: AutosaveComponent,
        data: {
            ogImageUrl:
                'https://dynamic-og-image-generator.vercel.app/api/generate?title=Autosave+Service&author=Namito+Yokota&websiteUrl=https%3A%2F%2Fblips.namitoyokota.com%2Fautosave&avatar=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F42247132%3Fv%3D4&theme=default',
        },
    },
];
