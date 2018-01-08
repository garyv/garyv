import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { BioComponent } from './bio/bio.component';
import { BioService } from './bio/bio.service';
import { ContactComponent } from './contact/contact.component';
import { ContactsService } from './contact/contacts.service';
import { HeaderComponent } from './header/header.component';
import { ImageComponent } from './image/image.component';
import { ImageTagComponent } from './image/image-tag.component';
import { LinkComponent } from './link/link.component';
import { MissingComponent } from './missing/missing.component';
import { ProjectComponent } from './projects/project/project.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsService } from './projects/projects.service';
import { StateService } from './state/state.service';

const routes: Routes = [
  { path: '', redirectTo: '/about', pathMatch: 'full'},
  { path: 'about', component: BioComponent },
  { path: 'work', component: ProjectsComponent },
  { path: 'work/tags/:tags', component: ProjectsComponent },
  { path: 'work/:friendly-id', component: ProjectComponent },
  { path: 'work/tags/:tags/:friendly-id', component: ProjectComponent },
  { path: 'contact', component: ContactComponent },

  { path: '**', component: MissingComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BioComponent,
    ContactComponent,
    HeaderComponent,
    ImageComponent,
    ImageTagComponent,
    LinkComponent,
    MissingComponent,
    ProjectComponent,
    ProjectsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(
      routes, 
      { enableTracing: !environment['production'] }  
    )
  ],
  providers: [ BioService, ContactsService, FormsModule, ProjectsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
