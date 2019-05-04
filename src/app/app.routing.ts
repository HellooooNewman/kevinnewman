import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Route imports
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectsComponent } from './projects/projects.component';
import { GameJamComponent } from './game-jam/game-jam.component';
import { NotFoundComponent } from './errors/400/not-found-component/not-found.component';

// Route Configuration
export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent, data: { state: 'home' }},
  { path: 'contact', component: ContactComponent, data: { state: 'contact' }},
  { path: 'game-jams', component: GameJamComponent, data: { state: 'game-jams' }},
  { path: 'projects', component: ProjectsComponent, data: { state: 'projects' }},
  { path: 'project/:id', component: ProjectDetailComponent, data: { state: 'project' }},
  { path: '404', component: NotFoundComponent, data: { state: '404' }},
  { path: '**', redirectTo: '/404' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
