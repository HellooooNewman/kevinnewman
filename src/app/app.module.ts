import { NgModule } from "@angular/core"
import { HttpClientModule } from "@angular/common/http"
import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { CommonModule } from "@angular/common"

import { HomeComponent } from "./home/home.component"
import { ContactComponent } from "./contact/contact.component"
import { AppComponent } from "./app.component"
import { FooterComponent } from "./footer/footer.component"
import { HeaderComponent } from "./header/header.component"
import { AppRoutingModule } from "./app.routing"
import { ProjectsComponent } from "./projects/projects.component"
import { GameJamComponent } from "./game-jam/game-jam.component"
import { ProjectDetailComponent } from "./project-detail/project-detail.component"
import { DataService } from "./services/services.data"
import { SocialMediaLinksComponent } from "./social-media-links/social-media-links.component"
import { NotFoundComponent } from "./errors/400/not-found-component/not-found.component"
import { TruncatePipe } from "./pipes/truncate"
import { SharedModule } from "./shared/shared.module"

import { LazyLoadImagesModule } from "ngx-lazy-load-images"

@NgModule({
  declarations: [
    HomeComponent,
    ContactComponent,
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ProjectsComponent,
    GameJamComponent,
    ProjectDetailComponent,
    SocialMediaLinksComponent,
    NotFoundComponent,
    TruncatePipe,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LazyLoadImagesModule,
    SharedModule,
    CommonModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule { }
