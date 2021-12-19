"use strict";
(self["webpackChunkkevinnewman2017"] = self["webpackChunkkevinnewman2017"] || []).push([["main"],{

/***/ 5041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _app_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component.scss?ngResource */ 8429);
/* harmony import */ var _services_services_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/services.data */ 9010);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 1109);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 8143);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 5485);
/* harmony import */ var _router_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./router.animations */ 4903);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






let AppComponent = class AppComponent {
    constructor(dataService, document, router) {
        this.dataService = dataService;
        this.document = document;
        this.router = router;
        this.maxNavScrollHeight = 260;
        this.router.events.subscribe(event => {
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_3__.NavigationEnd) {
                ga('set', 'page', event.urlAfterRedirects);
                ga('send', 'pageview');
            }
        });
    }
    ngOnInit() {
        console.log('Oh hey....what are you doing here :P');
        console.log('Try putting your mouse on the stars in the header. ^');
    }
    getState(outlet) {
        return outlet.activatedRouteData.state;
    }
    changeOfRoutes() {
        if (this.document.scrollingElement.scrollTop > 350) {
            window.scrollTo(0, 330);
        }
    }
    onWindowScroll() {
        let scrollPosition = this.document.scrollingElement.scrollTop;
        if (scrollPosition < this.maxNavScrollHeight) {
            this.position = '-' + scrollPosition;
        }
        if (scrollPosition > 260) {
            this.dataService.smallNav = true;
        }
        else {
            this.dataService.smallNav = false;
        }
        // Just to make sure it doesn't go past the scroll point
        if (scrollPosition > this.maxNavScrollHeight) {
            this.position = '-' + this.maxNavScrollHeight.toString();
        }
    }
};
AppComponent.ctorParameters = () => [
    { type: _services_services_data__WEBPACK_IMPORTED_MODULE_1__.DataService },
    { type: Document, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Inject, args: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.DOCUMENT,] }] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__.Router }
];
AppComponent.propDecorators = {
    onWindowScroll: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.HostListener, args: ['window:scroll', [],] }]
};
AppComponent = __decorate([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
        selector: 'app-app',
        encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_4__.ViewEncapsulation.None,
        animations: [_router_animations__WEBPACK_IMPORTED_MODULE_2__.routerTransition],
        template: `
        <app-header [style.top]="position + 'px'" [class.small-nav]="dataService.smallNav"></app-header>
        <main [@routerTransition]="getState(route)">
            <router-outlet #route="outlet" (activate)="changeOfRoutes()"></router-outlet>
        </main>
        <app-footer></app-footer>`,
        styles: [_app_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__]
    })
], AppComponent);



/***/ }),

/***/ 6747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/core */ 1109);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common/http */ 8336);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/platform-browser */ 8394);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/platform-browser/animations */ 7497);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/common */ 8143);
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home/home.component */ 5067);
/* harmony import */ var _contact_contact_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contact/contact.component */ 1563);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ 5041);
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./footer/footer.component */ 970);
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./header/header.component */ 3482);
/* harmony import */ var _app_routing__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.routing */ 6738);
/* harmony import */ var _projects_projects_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./projects/projects.component */ 5609);
/* harmony import */ var _game_jam_game_jam_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./game-jam/game-jam.component */ 2126);
/* harmony import */ var _project_detail_project_detail_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./project-detail/project-detail.component */ 3872);
/* harmony import */ var _services_services_data__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./services/services.data */ 9010);
/* harmony import */ var _social_media_links_social_media_links_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./social-media-links/social-media-links.component */ 5297);
/* harmony import */ var _errors_400_not_found_component_not_found_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./errors/400/not-found-component/not-found.component */ 9871);
/* harmony import */ var _pipes_truncate__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./pipes/truncate */ 4235);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./shared/shared.module */ 4466);
/* harmony import */ var ngx_lazy_load_images__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ngx-lazy-load-images */ 5751);
/* harmony import */ var swiper_angular__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! swiper/angular */ 5244);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















let AppModule = class AppModule {
};
AppModule = __decorate([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_14__.NgModule)({
        declarations: [
            _home_home_component__WEBPACK_IMPORTED_MODULE_0__.HomeComponent,
            _contact_contact_component__WEBPACK_IMPORTED_MODULE_1__.ContactComponent,
            _app_component__WEBPACK_IMPORTED_MODULE_2__.AppComponent,
            _footer_footer_component__WEBPACK_IMPORTED_MODULE_3__.FooterComponent,
            _header_header_component__WEBPACK_IMPORTED_MODULE_4__.HeaderComponent,
            _projects_projects_component__WEBPACK_IMPORTED_MODULE_6__.ProjectsComponent,
            _game_jam_game_jam_component__WEBPACK_IMPORTED_MODULE_7__.GameJamComponent,
            _project_detail_project_detail_component__WEBPACK_IMPORTED_MODULE_8__.ProjectDetailComponent,
            _social_media_links_social_media_links_component__WEBPACK_IMPORTED_MODULE_10__.SocialMediaLinksComponent,
            _errors_400_not_found_component_not_found_component__WEBPACK_IMPORTED_MODULE_11__.NotFoundComponent,
            _pipes_truncate__WEBPACK_IMPORTED_MODULE_12__.TruncatePipe,
        ],
        imports: [
            _angular_common_http__WEBPACK_IMPORTED_MODULE_15__.HttpClientModule,
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_16__.BrowserModule,
            _app_routing__WEBPACK_IMPORTED_MODULE_5__.AppRoutingModule,
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_17__.BrowserAnimationsModule,
            swiper_angular__WEBPACK_IMPORTED_MODULE_18__.SwiperModule,
            ngx_lazy_load_images__WEBPACK_IMPORTED_MODULE_19__.LazyLoadImagesModule,
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_13__.SharedModule,
            _angular_common__WEBPACK_IMPORTED_MODULE_20__.CommonModule,
        ],
        providers: [_services_services_data__WEBPACK_IMPORTED_MODULE_9__.DataService],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__.AppComponent],
    })
], AppModule);



/***/ }),

/***/ 6738:
/*!********************************!*\
  !*** ./src/app/app.routing.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routes": () => (/* binding */ routes),
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 1109);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 5485);
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home/home.component */ 5067);
/* harmony import */ var _contact_contact_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contact/contact.component */ 1563);
/* harmony import */ var _project_detail_project_detail_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./project-detail/project-detail.component */ 3872);
/* harmony import */ var _projects_projects_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./projects/projects.component */ 5609);
/* harmony import */ var _game_jam_game_jam_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./game-jam/game-jam.component */ 2126);
/* harmony import */ var _errors_400_not_found_component_not_found_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./errors/400/not-found-component/not-found.component */ 9871);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


// Route imports






// Route Configuration
const routes = [
    { path: '', component: _home_home_component__WEBPACK_IMPORTED_MODULE_0__.HomeComponent },
    { path: 'home', component: _home_home_component__WEBPACK_IMPORTED_MODULE_0__.HomeComponent, data: { state: 'home' } },
    { path: 'contact', component: _contact_contact_component__WEBPACK_IMPORTED_MODULE_1__.ContactComponent, data: { state: 'contact' } },
    { path: 'game-jams', component: _game_jam_game_jam_component__WEBPACK_IMPORTED_MODULE_4__.GameJamComponent, data: { state: 'game-jams' } },
    { path: 'projects', component: _projects_projects_component__WEBPACK_IMPORTED_MODULE_3__.ProjectsComponent, data: { state: 'projects' } },
    { path: 'project/:id', component: _project_detail_project_detail_component__WEBPACK_IMPORTED_MODULE_2__.ProjectDetailComponent, data: { state: 'project' } },
    { path: '404', component: _errors_400_not_found_component_not_found_component__WEBPACK_IMPORTED_MODULE_5__.NotFoundComponent, data: { state: '404' } },
    { path: '**', redirectTo: '/404' }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule]
    })
], AppRoutingModule);



/***/ }),

/***/ 1563:
/*!**********************************************!*\
  !*** ./src/app/contact/contact.component.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContactComponent": () => (/* binding */ ContactComponent)
/* harmony export */ });
/* harmony import */ var _contact_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./contact.component.html?ngResource */ 2105);
/* harmony import */ var _contact_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contact.component.scss?ngResource */ 5946);
/* harmony import */ var _services_services_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../services/services.data */ 9010);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1109);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




let ContactComponent = class ContactComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.message = '';
    }
    ngOnInit() {
        this.dataService.setTitle('Contact');
    }
};
ContactComponent.ctorParameters = () => [
    { type: _services_services_data__WEBPACK_IMPORTED_MODULE_2__.DataService }
];
ContactComponent = __decorate([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-contact',
        template: _contact_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_contact_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ContactComponent);



/***/ }),

/***/ 9871:
/*!***********************************************************************!*\
  !*** ./src/app/errors/400/not-found-component/not-found.component.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotFoundComponent": () => (/* binding */ NotFoundComponent)
/* harmony export */ });
/* harmony import */ var _not_found_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./not-found.component.html?ngResource */ 4892);
/* harmony import */ var _not_found_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./not-found.component.scss?ngResource */ 8683);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1109);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



let NotFoundComponent = class NotFoundComponent {
};
NotFoundComponent = __decorate([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
        selector: 'app-not-found',
        template: _not_found_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_not_found_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], NotFoundComponent);



/***/ }),

/***/ 970:
/*!********************************************!*\
  !*** ./src/app/footer/footer.component.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FooterComponent": () => (/* binding */ FooterComponent)
/* harmony export */ });
/* harmony import */ var _footer_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./footer.component.html?ngResource */ 2811);
/* harmony import */ var _footer_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./footer.component.scss?ngResource */ 6767);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1109);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 5485);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




let FooterComponent = class FooterComponent {
    constructor(router) {
        this.router = router;
        this.isContactPage = false;
    }
    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__.NavigationEnd) {
                this.isContactPage = this.router.url === '/contact' ? true : false;
            }
        });
    }
};
FooterComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__.Router }
];
FooterComponent = __decorate([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-footer',
        template: _footer_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_footer_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], FooterComponent);



/***/ }),

/***/ 2126:
/*!************************************************!*\
  !*** ./src/app/game-jam/game-jam.component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameJamComponent": () => (/* binding */ GameJamComponent)
/* harmony export */ });
/* harmony import */ var _game_jam_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-jam.component.html?ngResource */ 9618);
/* harmony import */ var _game_jam_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game-jam.component.scss?ngResource */ 4114);
/* harmony import */ var _services_services_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../services/services.data */ 9010);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1109);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




let GameJamComponent = class GameJamComponent {
    constructor(dataService) {
        this.dataService = dataService;
    }
    ngOnInit() {
        this.dataService.setTitle("Game Jams");
        this.gameJams = this.dataService.game_jam;
        this.dataService.getAllGames();
    }
};
GameJamComponent.ctorParameters = () => [
    { type: _services_services_data__WEBPACK_IMPORTED_MODULE_2__.DataService }
];
GameJamComponent = __decorate([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: "app-game-jam",
        template: _game_jam_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_game_jam_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], GameJamComponent);



/***/ }),

/***/ 3482:
/*!********************************************!*\
  !*** ./src/app/header/header.component.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Star": () => (/* binding */ Star),
/* harmony export */   "Line": () => (/* binding */ Line),
/* harmony export */   "HeaderComponent": () => (/* binding */ HeaderComponent)
/* harmony export */ });
/* harmony import */ var _header_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header.component.html?ngResource */ 6727);
/* harmony import */ var _header_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header.component.scss?ngResource */ 9476);
/* harmony import */ var _services_services_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../services/services.data */ 9010);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1109);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8143);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 5485);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






// canvas dimensions
let width = window.innerWidth;
const height = 500;
// const height = 500;
class Star {
    constructor(modifer, posX, posY) {
        this.modifer = Math.random() * 2;
        this.x = posX ? posX : width * Math.random();
        this.y = posY ? posY : height * Math.random();
        this.vx = modifer ? this.modifer * modifer : this.modifer * this.modifer;
        this.vy = modifer ? this.modifer * modifer : this.modifer * this.modifer;
        this.radius = modifer ? this.modifer * modifer : this.modifer * 10 * Math.random();
        this.color = 'rgba(47, 81, 163, ' + this.modifer + ')';
        // console.log('rgba(' + getComputedStyle(document.body).getPropertyValue('--blue') + ', ' + this.modifer + ')');
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        let planetes = 10;
        for (let i; i < planetes; i++) {
            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.arc(this.x + 1, this.y + 2, 10, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    update() {
        this.x += this.vx;
        this.y -= this.vy;
        if (this.x > width) {
            this.x = -50;
        }
        if (this.y < -50) {
            this.y = height;
        }
    }
}
class Line {
    constructor() {
        this.modifer = Math.random() * 2;
        this.x = width * Math.random();
        this.y = height * Math.random();
        this.vx = this.modifer * this.modifer + 0.3;
        this.vy = this.modifer * this.modifer + 0.3;
        this.stroke = this.modifer * 10 * Math.random();
        this.color = 'rgba(20, 20, 20, ' + this.modifer + ')';
    }
    draw(ctx) {
        ctx.strokeStyle = 'lightgrey';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + (40 * this.modifer), this.y - (40 * this.modifer));
        ctx.stroke();
        ctx.lineWidth = this.modifer * 1.5;
    }
    update() {
        this.x += this.vx;
        this.y -= this.vy;
        if (this.x > width) {
            this.x = -50;
        }
        if (this.y < -50) {
            this.y = height;
        }
    }
}
let HeaderComponent = class HeaderComponent {
    constructor(ngZone, dataService, renderer, document, router) {
        this.ngZone = ngZone;
        this.dataService = dataService;
        this.renderer = renderer;
        this.document = document;
        this.router = router;
        this.openedBool = false;
        this.isActive = false;
        this.isDarkMode = false;
        // Particles
        this.maxParticles = 50;
        this.particles = [];
        this.backgroundParticles = [];
        // Lines
        this.maxLines = 35;
        this.lines = [];
        this.router.events.subscribe(event => {
            this.openedBool = false;
        });
    }
    // ngOnInit() {
    ngAfterViewInit() {
        this.ctx = this.canvasRef.nativeElement.getContext('2d');
        this.canvas = this.ctx.canvas;
        this.canvas.width = width;
        // Stars
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push(new Star());
        }
        // Shooting stars
        for (let i = 0; i < this.maxLines; i++) {
            this.lines.push(new Line());
        }
        // Background stars
        for (let i = 0; i < this.maxParticles; i++) {
            this.backgroundParticles.push(new Star(1));
        }
        this.running = true;
        this.ngZone.runOutsideAngular(() => this.update());
        // Dark mode check
        this.isDarkMode = localStorage.getItem('dark-mode') == 'true' ? true : false;
        if (this.isDarkMode) {
            this.setDarkMode();
        }
    }
    onWindowScroll() {
        this.openedBool = false;
        let scrollPosition = this.document.scrollingElement.scrollTop;
        if (scrollPosition > 270 && scrollPosition < 339) {
            this.position = '-' + (scrollPosition - 270);
        }
        if (scrollPosition > 339) {
            this.position = '-67';
        }
        if (scrollPosition < 270) {
            this.position = '0';
        }
    }
    draw(event) {
        if (event.target !== this.canvas) {
            return;
        }
        this.maxLines++;
        this.lines.push(new Star(null, event.clientX, event.clientY));
    }
    resize() {
        this.canvas.width = window.innerWidth;
        width = window.innerWidth;
    }
    OnDestroy() {
        this.running = false;
    }
    update() {
        if (!this.running) {
            return;
        }
        this.ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < this.maxLines; i++) {
            this.lines[i].update();
            this.lines[i].draw(this.ctx);
        }
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles[i].update();
            this.particles[i].draw(this.ctx);
            this.backgroundParticles[i].draw(this.ctx);
            this.backgroundParticles[i].update();
        }
        requestAnimationFrame(() => this.update());
    }
    toggleDarkMode() {
        this.isDarkMode = this.isDarkMode ? false : true;
        this.setDarkMode();
    }
    setDarkMode() {
        localStorage.setItem('dark-mode', this.isDarkMode.toString());
        this.renderer[this.isDarkMode ? 'addClass' : 'removeClass'](document.documentElement, 'dark-mode');
    }
};
HeaderComponent.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.NgZone },
    { type: _services_services_data__WEBPACK_IMPORTED_MODULE_2__.DataService },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Renderer2 },
    { type: Document, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Inject, args: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.DOCUMENT,] }] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__.Router }
];
HeaderComponent.propDecorators = {
    mainNav: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.ViewChild, args: ['mainNav',] }],
    canvasRef: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.ViewChild, args: ['skyCanvas',] }],
    onWindowScroll: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.HostListener, args: ['window:scroll', [],] }],
    draw: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.HostListener, args: ['mousemove', ['$event'],] }],
    resize: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.HostListener, args: ['window:resize', [],] }]
};
HeaderComponent = __decorate([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-header',
        template: _header_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_header_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], HeaderComponent);



/***/ }),

/***/ 5067:
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomeComponent": () => (/* binding */ HomeComponent)
/* harmony export */ });
/* harmony import */ var _home_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.component.html?ngResource */ 4715);
/* harmony import */ var _home_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.component.scss?ngResource */ 8670);
/* harmony import */ var rxjs_add_operator_filter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/add/operator/filter */ 7540);
/* harmony import */ var _services_services_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../services/services.data */ 9010);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 1109);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 9258);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};






let HomeComponent = class HomeComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.loading = false;
        this.resume = {
            introduction: "<p>Hi there, I’m Kevin Newman, a developer, designer and hobbyist living in Canada. I like to make responsive websites, captivating videos and 3D models. In my off time, you can usually find me playing/making some video games, working on a side project, or doodling some little drawings. I try to keep up with the current trends in technology by going to developer meetups in the area. </p><p>Currently working on a Unity couch co-op multiplayer game called Hammer Fight.",
            work: {
                jobs: [
                    {
                        showDetails: true,
                        logo: "./assets/company-logos/sonar.svg",
                        title: "Software Developer",
                        year: "Dec 2020 - Present",
                        employer: "Sonar Software",
                        employer_link: "http://sonar.software/",
                        employment_type: "Full-time",
                        location: "Remote, Canada",
                        desc: "",
                        points: `<ul>
                    <li>Continue development of dynamically created graphql query system</li>
                    <li>Automated BE to FE dynamic enum generation</li>
                    <li>Managed updates to marketing website, with push to nuxt.js</li>
                    <li>Moving regular components over to storyboard</li>
                    <li>Converted regular SCSS variable codebase to use CSS variables</li>
                    <li>Work with another team to bring on dynamic white labelling service of features</li>
                  </ul>`,
                        technology: "ES6, SCSS, Vue.js, PHP, Laravel, Graphql, SQL, Azure, CircleCI, Flutter",
                    },
                    {
                        showDetails: true,
                        logo: "./assets/company-logos/xello.svg",
                        title: "Full Stack Web Developer",
                        year: "Jan 2019 - Dec 2020",
                        employer: "Xello",
                        employer_link: "http://xello.world/",
                        employment_type: "Full-time",
                        location: "Toronto, CA",
                        desc: "",
                        points: `<ul>
                    <li>Maintain micro frontend shell application</li>
                    <li>Upgrade angularjs components, services, and unit tests to Angular and Jest</li>
                    <li>Localizing the existing product to the UK market with a different school system style</li>
                    <li>Created new stored procedures following existing conventions</li>
                    <li>Performance improvements to existing SQL queries</li>
                    <li>Created documentation site for product along with a content writer <a href="https://help.xello.world/">help.xello.world</a></li>
                    <li>Agile scrum sprints and demo at the end of sprint</li>
                    <li>Hackathons one day every sprint towards self learning: <a href="https://www.kevinnewman.ca/lightbox-quote-checker/">Lightbox</a> and <a href="https://github.com/HellooooNewman/helloooonewman-vscode-extension">Chrome Extension</a></li>
                    <li>Adding to and updating existing microservices architecture</li>
                    <li>Maintaining and scaling storybook components</li>
                    <li>Working towards making student side application a PWA</li>
                  </ul>`,
                        technology: "ES6, SCSS, Angular, NgRx, Rxjs, .NET, SQL, SlackBot API, Jest, Jenkins, Octopus, Azure",
                    },
                    {
                        showDetails: false,
                        logo: "./assets/company-logos/Wuzzals.svg",
                        title: "Full Stack Web Developer",
                        year: "Oct 2018 - Present",
                        employer: "Wuzzals",
                        employer_link: "https://www.wuzzals.com",
                        employment_type: "Contract",
                        location: "Toronto, CA",
                        desc: "",
                        points: `<ul>
                    <li>Update and maintain existing Laravel and Vue.js codebase</li>
                    <li>Document new and old processes for documentation</li>
                    <li>Create Photoshop Action scripts for automating cover creation process and dynamic resizing of images</li>
                    <li>Improve existing codebase to make components more reusable</li>
                    <li>Created trello board system for company to use and manage their workflow</li>
                    <li>Added comic books as a new type of book they offer to kids</li>
                    <li>General performance and design changes around the site</li>
                    <li>Managed support requests from users, writers, artists, and teachers</li>
                    </ul>`,
                        technology: "Vue, Laravel, Webpack, DigitalOcean, Photoshop Action Scripts, Docker, Git, SCSS, DigitalOcean",
                    },
                    {
                        showDetails: false,
                        logo: "./assets/company-logos/trailerworks.svg",
                        title: "Full Stack Web Developer",
                        year: "Aug 2018 - Jan 2019",
                        employer: "Trailerworks",
                        employer_link: "http://www.trailerworks.com",
                        employment_type: "Contract",
                        location: "Toronto, CA",
                        desc: "",
                        points: `<ul>
                    <li>Interim and current website in React</li>
                    <li>Technical estimates for RFPs</li>
                    <li>Manage existing Magento Ecommerce site</li>
                    <li>Shopify ecommerce honey product website for honey they make onsite</li>
                    </ul>`,
                        technology: "React, Redux, SVG, Adobe XD, Magento, SCSS, Git",
                    },
                    {
                        showDetails: false,
                        logo: "./assets/company-logos/Grassriots.png",
                        title: "Full Stack Web Developer",
                        year: "March 2018 - July 2018",
                        employer: "Grassriots",
                        employer_link: "http://www.grassriots.com/",
                        employment_type: "Contract",
                        location: "Toronto, CA",
                        points: `<ul>
                    <li>Created documentation/wikis for existing codebase and processes</li>
                    <li>Made application multilingual with ability to add or remove languages easily</li>
                    <li>Improved product development times from over a month to a week and half</li>
                    <li>Improve webpack config and processes to decrease development time and increase performance and reliability of app</li>
                    <li>Converted modules from ES5 prototypes to ES6 classes with babel</li>
                    <li>Clients: Choice Australia, Human Society International, Cystic Fibrosis Canada, Ecojustice, UNICEF Canada, World Vision</li>
                    </ul>`,
                        technology: "ES6, JQuery, Webpack, AWS EC2, PHP, .NET, Git, Node.js, Babel",
                    },
                    {
                        showDetails: false,
                        logo: "./assets/company-logos/GE.png",
                        title: "Frontend Developer",
                        year: "Oct 2017 - Feb 2018",
                        employer: "GE",
                        employer_link: "http://www.gegridsolutions.com/",
                        employment_type: "Contract",
                        location: "Markham, CA",
                        points: `<ul>
                    <li>Create 3D marketing apps with Babylon.js for different divisions of GE(Healthcare, Energy, Grid Solutions)</li>
                    <li>Prototype and compare different Frontend frameworks to GE's current software solution(Haxe)</li>
                    <li>Convert flash application meant for showing off all their marketing material at conferences to an HTML5 application with Vue.js that publishes to both web and desktop (Electron) and features offline storage</li>
                    </ul>`,
                        technology: "Babylon, Electron, Haxe, Vue, SVN, LESS, Webpack, Git",
                    },
                    {
                        showDetails: false,
                        logo: "./assets/company-logos/Indegene.png",
                        title: "Front-end Developer",
                        year: "Feb 2017 - Oct 2017",
                        employer: "Indegene",
                        employer_link: "https://www.indegene.com/",
                        employment_type: "Full-time",
                        location: "Oakville, CA",
                        points: `<ul>
                    <li>Angular 2 development of components</li>
                    <li>Front end theming of Ionic 3 hybrid web and android app</li>
                    <li>Work with Java Spring team to plan and create backend microservices</li>
                    <li>Manage custom offline android state</li>
                    <li>Worked with team to implement redux into existing application</li>
                    <li>Interviewing and onboarding new hires</li>
                    <li>Internalization of app</li>
                    <li>Support for Android 3.0 tablets</li>
                    </ul>`,
                        technology: "Angular 2, Ionic 3, RXjs, Cordova, Nodejs, Git, Gulp, Webpack, SCSS, Redux",
                    },
                    {
                        showDetails: false,
                        logo: "./assets/company-logos/echidna.png",
                        title: "Full Stack Web Developer",
                        year: "Feb 2015 - Feb 2017",
                        employer: "Digital Echidna",
                        employer_link: "http://www.echidna.ca/",
                        employment_type: "Full-time",
                        location: "London, CA",
                        points: `<ul>
                            <li>Front-end theming of Drupal sites</li>
                            <li>Back-end module development</li>
                            <li>Python site scraping</li>
                            <li>Drupal 8 code sprints : Ohio and Toronto</li>
                            <li>Manage and update CodeIgniter site</li>
                            <li>On board co-ops/interns/new hires</li>
                            <li>Meet AODA standards</li>`,
                        technology: "Drupal 7/8, JQuery, ES5, SCSS, Python, PHP, MySQL, Git",
                    },
                ],
            },
            skills: [
                {
                    title: "Code",
                    list: [
                        "HTML5 - PHP - ES6 - C# - Bash - Typescript",
                        "CSS3 - SCSS",
                        "CodeIgniter - Laravel - Wordpress - Drupal 7/8 - .NET Core",
                        "Angular - JQuery - Ionic - Vue - React - Electron",
                        "Highcharts - Babylon - RXjs",
                        "MVC - OOP - Rest API - Redux",
                        "Git - SVN",
                        "Gulp - Webpack - Grunt - Webhooks",
                    ],
                },
                {
                    title: "Tools",
                    list: [
                        "Mac - PC",
                        "Photoshop - Illustrator",
                        "Figma - AdobeXD",
                        "After Effects - Premiere",
                        "3ds Max - Blender",
                        "Github - Bitbucket - Gitlab",
                        "Unity",
                        "NPM - Bower - Yarn",
                        "AWS - Digital Ocean - Azure",
                    ],
                },
                {
                    title: "Design",
                    list: [
                        "Mobile/Web design",
                        "App design",
                        "Modeling - Animating - Rigging",
                        "Motion graphics",
                        "Character concepting",
                    ],
                },
            ],
            education: [
                {
                    program: "Interactive Media Design",
                    year: "Fanshawe - 2011-2013",
                },
                {
                    program: "3d Character Design & Animation",
                    year: "Fanshawe - 2013-2014",
                },
                {
                    program: "Interactive Media Specialist",
                    year: "Fanshawe - 2014-2015",
                },
            ],
        };
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dataService.setTitle("Home");
            this.projects$ = this.dataService.project.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(todos => todos.filter(item => item.promote === true)));
            this.dataService.getAllProjects();
        });
    }
};
HomeComponent.ctorParameters = () => [
    { type: _services_services_data__WEBPACK_IMPORTED_MODULE_3__.DataService }
];
HomeComponent = __decorate([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
        selector: "app-home",
        template: _home_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_home_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], HomeComponent);



/***/ }),

/***/ 4235:
/*!***********************************!*\
  !*** ./src/app/pipes/truncate.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TruncatePipe": () => (/* binding */ TruncatePipe)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1109);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let TruncatePipe = class TruncatePipe {
    transform(value, args) {
        const limit = args.length > 0 ? parseInt(args[0], 10) : 20;
        const trail = args.length > 1 ? args[1] : '...';
        return value.length > limit ? value.substring(0, limit) + trail : value;
    }
};
TruncatePipe = __decorate([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Pipe)({
        name: 'truncate'
    })
], TruncatePipe);



/***/ }),

/***/ 3872:
/*!************************************************************!*\
  !*** ./src/app/project-detail/project-detail.component.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectDetailComponent": () => (/* binding */ ProjectDetailComponent)
/* harmony export */ });
/* harmony import */ var _project_detail_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project-detail.component.html?ngResource */ 5460);
/* harmony import */ var _project_detail_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project-detail.component.scss?ngResource */ 5273);
/* harmony import */ var _services_services_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../services/services.data */ 9010);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 1109);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 5485);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 9258);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 1265);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};






let ProjectDetailComponent = class ProjectDetailComponent {
    constructor(dataService, route) {
        this.dataService = dataService;
        this.route = route;
        this.config = {
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            spaceBetween: 10,
            slidesPerView: 1,
            grabCursor: true,
            zoom: true
        };
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            window.scrollTo(0, 0);
            this.sub = this.route.params.subscribe(params => this.id = params['id']);
            this.project$ = this.dataService.project.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(projects => projects.find(p => p.id === this.id.toString())), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.tap)(project => this.dataService.setTitle(project.title)));
            this.dataService.getAllProjects();
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
};
ProjectDetailComponent.ctorParameters = () => [
    { type: _services_services_data__WEBPACK_IMPORTED_MODULE_2__.DataService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute }
];
ProjectDetailComponent = __decorate([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: 'app-project-detail',
        template: _project_detail_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_project_detail_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ProjectDetailComponent);



/***/ }),

/***/ 5609:
/*!************************************************!*\
  !*** ./src/app/projects/projects.component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectsComponent": () => (/* binding */ ProjectsComponent)
/* harmony export */ });
/* harmony import */ var _projects_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects.component.html?ngResource */ 5390);
/* harmony import */ var _projects_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects.component.scss?ngResource */ 1362);
/* harmony import */ var _services_services_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../services/services.data */ 9010);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1109);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




let ProjectsComponent = class ProjectsComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.loading = false;
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loading = true;
            this.dataService.setTitle("Projects");
            this.projects = this.dataService.project;
            this.dataService.getAllProjects();
        });
    }
};
ProjectsComponent.ctorParameters = () => [
    { type: _services_services_data__WEBPACK_IMPORTED_MODULE_2__.DataService }
];
ProjectsComponent = __decorate([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: "app-projects",
        template: _projects_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_projects_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ProjectsComponent);



/***/ }),

/***/ 4903:
/*!**************************************!*\
  !*** ./src/app/router.animations.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routerTransition": () => (/* binding */ routerTransition)
/* harmony export */ });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/animations */ 4117);

const routerTransition = (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('routerTransition', [
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('* <=> *', [
        // Initial state of new route
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.query)(':enter', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
            width: '100%',
            transform: 'translateX(-5%)',
            opacity: 0
        }), { optional: true }),
        // move page off screen right on leave
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.query)(':leave', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('500ms ease', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
            width: '100%',
            transform: 'translateX(5%)',
            opacity: 0,
        })), { optional: true }),
        // move page in screen from left to right
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.query)(':enter', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('500ms ease', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
            opacity: 1,
            transform: 'translateX(0%)'
        })), { optional: true })
    ])
]);


/***/ }),

/***/ 9010:
/*!*******************************************!*\
  !*** ./src/app/services/services.data.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataService": () => (/* binding */ DataService)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ 8394);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 1109);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ 8336);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 6671);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 8406);
/* harmony import */ var _assets_data_projects_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assets/data/projects.json */ 2456);
/* harmony import */ var _assets_data_games_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../assets/data/games.json */ 5603);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






let DataService = class DataService {
    constructor(http, titleService) {
        this.http = http;
        this.titleService = titleService;
        this.title = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
        this.smallNav = false;
        // Data storage
        this._project = (new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject([]));
        this.project = this._project.asObservable();
        this._game_jam = new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject([]);
        this.game_jam = this._game_jam.asObservable();
        /**
         * Sets title of the page
         * @param title page title
         */
        this.setTitle = (title) => {
            this.titleService.setTitle(`${title} - Kevin Newman`);
            this.title.next(title);
        };
        /**
         * Get all projects
         * @returns returns obersvable array of projects
         */
        this.getAllProjects = () => {
            if (this.dataStore.projects.length === 0) {
                this.dataStore.projects = _assets_data_projects_json__WEBPACK_IMPORTED_MODULE_0__;
                this._project.next(Object.assign({}, this.dataStore).projects);
            }
        };
        /**
         * Get all games from itch.io stored on my site
         * @returns returns observable array of games
         */
        this.getAllGames = () => {
            if (this.dataStore.game_jams.length === 0) {
                this.dataStore.game_jams = _assets_data_games_json__WEBPACK_IMPORTED_MODULE_1__;
                this._game_jam.next(Object.assign({}, this.dataStore).game_jams);
            }
        };
        this.dataStore = { projects: [], game_jams: [] };
    }
};
DataService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClient },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__.Title }
];
DataService = __decorate([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Injectable)()
], DataService);



/***/ }),

/***/ 7459:
/*!*************************************************************!*\
  !*** ./src/app/shared/placeholder/placeholder.component.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlaceholderComponent": () => (/* binding */ PlaceholderComponent)
/* harmony export */ });
/* harmony import */ var _placeholder_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./placeholder.component.html?ngResource */ 483);
/* harmony import */ var _placeholder_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./placeholder.component.scss?ngResource */ 4390);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1109);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



let PlaceholderComponent = class PlaceholderComponent {
};
PlaceholderComponent = __decorate([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
        selector: "placeholder-content",
        template: _placeholder_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_placeholder_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], PlaceholderComponent);



/***/ }),

/***/ 4466:
/*!*****************************************!*\
  !*** ./src/app/shared/shared.module.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SharedModule": () => (/* binding */ SharedModule)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1109);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 8143);
/* harmony import */ var _placeholder_placeholder_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./placeholder/placeholder.component */ 7459);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule)({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule],
        declarations: [_placeholder_placeholder_component__WEBPACK_IMPORTED_MODULE_0__.PlaceholderComponent],
        exports: [_placeholder_placeholder_component__WEBPACK_IMPORTED_MODULE_0__.PlaceholderComponent, _angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule],
    })
], SharedModule);



/***/ }),

/***/ 5297:
/*!********************************************************************!*\
  !*** ./src/app/social-media-links/social-media-links.component.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SocialMediaLinksComponent": () => (/* binding */ SocialMediaLinksComponent)
/* harmony export */ });
/* harmony import */ var _social_media_links_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./social-media-links.component.html?ngResource */ 4518);
/* harmony import */ var _social_media_links_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./social-media-links.component.scss?ngResource */ 8173);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1109);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



let SocialMediaLinksComponent = class SocialMediaLinksComponent {
};
SocialMediaLinksComponent = __decorate([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
        selector: 'app-social-media-links',
        template: _social_media_links_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_social_media_links_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], SocialMediaLinksComponent);



/***/ }),

/***/ 2340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
const environment = {
    production: true
};


/***/ }),

/***/ 4431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1109);
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ 4909);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 6747);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 2340);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
(0,_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__.platformBrowserDynamic)().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule);


/***/ }),

/***/ 8429:
/*!***********************************************!*\
  !*** ./src/app/app.component.scss?ngResource ***!
  \***********************************************/
/***/ ((module) => {

module.exports = "app-header {\n  position: fixed;\n  top: 0px;\n  z-index: 1;\n  width: 100%;\n  height: 0;\n}\n@media (max-width: 720px) {\n  app-header {\n    margin-top: -36px;\n  }\n}\nmain {\n  position: relative;\n  z-index: 0;\n  margin-top: 415px;\n  display: block;\n}\n@media (min-width: 720px) {\n  main {\n    margin-top: 465px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGVBQUE7RUFDQSxRQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSxTQUFBO0FBQ0o7QUFBSTtFQU5KO0lBT1EsaUJBQUE7RUFHTjtBQUNGO0FBQUE7RUFDSSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7QUFHSjtBQUZJO0VBTEo7SUFNUSxpQkFBQTtFQUtOO0FBQ0YiLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYXBwLWhlYWRlciB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHRvcDogMHB4O1xuICAgIHotaW5kZXg6IDE7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAwO1xuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3MjBweCl7XG4gICAgICAgIG1hcmdpbi10b3A6IC0zNnB4O1xuICAgIH1cbn1cblxubWFpbiB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHotaW5kZXg6IDA7XG4gICAgbWFyZ2luLXRvcDogNDE1cHg7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgQG1lZGlhIChtaW4td2lkdGg6IDcyMHB4KSB7XG4gICAgICAgIG1hcmdpbi10b3A6IDQ2NXB4O1xuICAgICAgICBcbiAgICB9XG59Il19 */";

/***/ }),

/***/ 5946:
/*!***********************************************************!*\
  !*** ./src/app/contact/contact.component.scss?ngResource ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = ".container {\n  height: 600px;\n  display: block;\n}\n@media (min-width: 700px) {\n  .container {\n    height: 400px;\n  }\n}\n.required:after {\n  content: \"*\";\n  color: red;\n  float: right;\n}\n.valid input, .valid textarea {\n  border-bottom-color: green;\n}\n.invalid input, .invalid textarea {\n  border-bottom-color: red;\n}\n.message {\n  font-size: 12px;\n  margin-top: -25px;\n  position: absolute;\n}\n.column:nth-child(2n) {\n  padding-right: 0;\n}\n.envelope {\n  position: absolute;\n  background: #f2f2f2;\n  padding: 20px;\n  margin-right: 0.5rem;\n}\n.envelope.is-sent {\n  -webkit-animation: launch 0.75s ease-in-out forwards;\n          animation: launch 0.75s ease-in-out forwards;\n}\n.envelope.failed-launch {\n  -webkit-animation: failed-launch 0.75s ease-in-out;\n          animation: failed-launch 0.75s ease-in-out;\n}\n.container {\n  position: relative;\n}\n@-webkit-keyframes launch {\n  0% {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n  10%, 15% {\n    transform: translateY(20px);\n  }\n  50%, 100% {\n    opacity: 0;\n    transform: translateY(-600px) scale(1);\n  }\n}\n@keyframes launch {\n  0% {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n  10%, 15% {\n    transform: translateY(20px);\n  }\n  50%, 100% {\n    opacity: 0;\n    transform: translateY(-600px) scale(1);\n  }\n}\n@-webkit-keyframes failed-launch {\n  0% {\n    opacity: 0;\n    transform: translateY(-600px) scale(0.6);\n  }\n  50% {\n    opacity: 0;\n    transform: translateY(0px) scale(0.6);\n  }\n  100% {\n    opacity: 1;\n    transform: translateY(0px) scale(1);\n  }\n}\n@keyframes failed-launch {\n  0% {\n    opacity: 0;\n    transform: translateY(-600px) scale(0.6);\n  }\n  50% {\n    opacity: 0;\n    transform: translateY(0px) scale(0.6);\n  }\n  100% {\n    opacity: 1;\n    transform: translateY(0px) scale(1);\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhY3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFFRSxhQUFBO0VBQ0EsY0FBQTtBQUFGO0FBQ0U7RUFKRjtJQUtJLGFBQUE7RUFFRjtBQUNGO0FBRUU7RUFDRSxZQUFBO0VBQ0EsVUFBQTtFQUNBLFlBQUE7QUFDSjtBQUdBO0VBQ0ksMEJBQUE7QUFBSjtBQUdBO0VBQ0ksd0JBQUE7QUFBSjtBQUdBO0VBQ0UsZUFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7QUFBRjtBQUdBO0VBQ0UsZ0JBQUE7QUFBRjtBQUdBO0VBQ0Usa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7RUFDQSxvQkFBQTtBQUFGO0FBQ0U7RUFDRSxvREFBQTtVQUFBLDRDQUFBO0FBQ0o7QUFDRTtFQUNFLGtEQUFBO1VBQUEsMENBQUE7QUFDSjtBQUdBO0VBQ0Usa0JBQUE7QUFBRjtBQUdBO0VBQ0U7SUFDRSxVQUFBO0lBRUEsaUNBQUE7RUFBRjtFQUVBO0lBR0UsMkJBQUE7RUFERjtFQUdBO0lBRUUsVUFBQTtJQUVBLHNDQUFBO0VBRkY7QUFDRjtBQWRBO0VBQ0U7SUFDRSxVQUFBO0lBRUEsaUNBQUE7RUFBRjtFQUVBO0lBR0UsMkJBQUE7RUFERjtFQUdBO0lBRUUsVUFBQTtJQUVBLHNDQUFBO0VBRkY7QUFDRjtBQUtBO0VBRUU7SUFDRSxVQUFBO0lBRUEsd0NBQUE7RUFKRjtFQU1BO0lBQ0UsVUFBQTtJQUVBLHFDQUFBO0VBSkY7RUFNQTtJQUNFLFVBQUE7SUFFQSxtQ0FBQTtFQUpGO0FBQ0Y7QUFaQTtFQUVFO0lBQ0UsVUFBQTtJQUVBLHdDQUFBO0VBSkY7RUFNQTtJQUNFLFVBQUE7SUFFQSxxQ0FBQTtFQUpGO0VBTUE7SUFDRSxVQUFBO0lBRUEsbUNBQUE7RUFKRjtBQUNGIiwiZmlsZSI6ImNvbnRhY3QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGFpbmVyIHtcblxuICBoZWlnaHQ6IDYwMHB4O1xuICBkaXNwbGF5OiBibG9jaztcbiAgQG1lZGlhIChtaW4td2lkdGg6IDcwMHB4KSB7XG4gICAgaGVpZ2h0OiA0MDBweDtcbiAgfVxufVxuXG4ucmVxdWlyZWQge1xuICAmOmFmdGVyIHtcbiAgICBjb250ZW50OiAnKic7XG4gICAgY29sb3I6IHJlZDtcbiAgICBmbG9hdDogcmlnaHQ7XG4gIH1cbn1cblxuLnZhbGlkIGlucHV0LCAudmFsaWQgdGV4dGFyZWEge1xuICAgIGJvcmRlci1ib3R0b20tY29sb3I6IGdyZWVuO1xufVxuXG4uaW52YWxpZCBpbnB1dCwgLmludmFsaWQgdGV4dGFyZWEge1xuICAgIGJvcmRlci1ib3R0b20tY29sb3I6IHJlZDtcbn1cblxuLm1lc3NhZ2Uge1xuICBmb250LXNpemU6IDEycHg7XG4gIG1hcmdpbi10b3A6IC0yNXB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG59XG5cbi5jb2x1bW46bnRoLWNoaWxkKDJuKSB7XG4gIHBhZGRpbmctcmlnaHQ6IDA7XG59XG5cbi5lbnZlbG9wZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYmFja2dyb3VuZDogI2YyZjJmMjtcbiAgcGFkZGluZzogMjBweDtcbiAgbWFyZ2luLXJpZ2h0OiAwLjVyZW07XG4gICYuaXMtc2VudCB7XG4gICAgYW5pbWF0aW9uOiBsYXVuY2ggMC43NXMgZWFzZS1pbi1vdXQgZm9yd2FyZHM7XG4gIH1cbiAgJi5mYWlsZWQtbGF1bmNoIHtcbiAgICBhbmltYXRpb246IGZhaWxlZC1sYXVuY2ggMC43NXMgZWFzZS1pbi1vdXQ7XG4gIH1cbn1cblxuLmNvbnRhaW5lciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuQGtleWZyYW1lcyBsYXVuY2gge1xuICAwJSB7XG4gICAgb3BhY2l0eTogMTtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKSBzY2FsZSgxKTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCkgc2NhbGUoMSk7XG4gIH1cbiAgMTAlLFxuICAxNSUge1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMHB4KTtcbiAgfVxuICA1MCUsXG4gIDEwMCUge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTYwMHB4KSBzY2FsZSgxKTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTYwMHB4KSBzY2FsZSgxKTtcbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIGZhaWxlZC1sYXVuY2gge1xuICBcbiAgMCUge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTYwMHB4KSBzY2FsZSgwLjYpO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNjAwcHgpIHNjYWxlKDAuNik7XG4gIH1cbiAgNTAlIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDBweCkgc2NhbGUoMC42KTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMHB4KSBzY2FsZSgwLjYpO1xuICB9XG4gIDEwMCUge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMHB4KSBzY2FsZSgxKTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMHB4KSBzY2FsZSgxKTtcbiAgfVxufSJdfQ== */";

/***/ }),

/***/ 8683:
/*!************************************************************************************!*\
  !*** ./src/app/errors/400/not-found-component/not-found.component.scss?ngResource ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJub3QtZm91bmQuY29tcG9uZW50LnNjc3MifQ== */";

/***/ }),

/***/ 6767:
/*!*********************************************************!*\
  !*** ./src/app/footer/footer.component.scss?ngResource ***!
  \*********************************************************/
/***/ ((module) => {

module.exports = ".contact-link:hover:after {\n  -webkit-animation: open_drawer 300ms ease-in-out;\n          animation: open_drawer 300ms ease-in-out;\n  -webkit-animation-fill-mode: forwards;\n          animation-fill-mode: forwards;\n  transform: translateX(0);\n}\n\n@-webkit-keyframes open_drawer {\n  to {\n    transform: translateX(50px);\n  }\n}\n\n@keyframes open_drawer {\n  to {\n    transform: translateX(50px);\n  }\n}\n\n.footer-background {\n  background: center center no-repeat;\n  background: url('assets/images/ground.svg');\n  background-size: cover;\n  background-repeat: no-repeat;\n  min-height: 46vh;\n  -webkit-background-size: cover;\n  -moz-background-size: cover;\n  -o-background-size: cover;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvb3Rlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFUTtFQUNJLGdEQUFBO1VBQUEsd0NBQUE7RUFDQSxxQ0FBQTtVQUFBLDZCQUFBO0VBQ0Esd0JBQUE7QUFEWjs7QUFNQTtFQUNJO0lBQ0ksMkJBQUE7RUFITjtBQUNGOztBQUFBO0VBQ0k7SUFDSSwyQkFBQTtFQUhOO0FBQ0Y7O0FBTUE7RUFDSSxtQ0FBQTtFQUNBLDJDQUFBO0VBQ0Esc0JBQUE7RUFDQSw0QkFBQTtFQUNBLGdCQUFBO0VBQ0EsOEJBQUE7RUFDQSwyQkFBQTtFQUNBLHlCQUFBO0FBSkoiLCJmaWxlIjoiZm9vdGVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRhY3QtbGluayB7XG4gICAgJjpob3ZlciB7XG4gICAgICAgICY6YWZ0ZXIge1xuICAgICAgICAgICAgYW5pbWF0aW9uOiBvcGVuX2RyYXdlciAzMDBtcyBlYXNlLWluLW91dDtcbiAgICAgICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5Aa2V5ZnJhbWVzIG9wZW5fZHJhd2VyIHtcbiAgICB0byB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCg1MHB4KTtcbiAgICB9XG59XG5cbi5mb290ZXItYmFja2dyb3VuZCB7XG4gICAgYmFja2dyb3VuZDogY2VudGVyIGNlbnRlciBuby1yZXBlYXQ7XG4gICAgYmFja2dyb3VuZDogdXJsKFwiLi4vLi4vYXNzZXRzL2ltYWdlcy9ncm91bmQuc3ZnXCIpO1xuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgICBtaW4taGVpZ2h0OiA0NnZoO1xuICAgIC13ZWJraXQtYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgICAtbW96LWJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICAgLW8tYmFja2dyb3VuZC1zaXplOiBjb3Zlcjtcbn1cbiJdfQ== */";

/***/ }),

/***/ 4114:
/*!*************************************************************!*\
  !*** ./src/app/game-jam/game-jam.component.scss?ngResource ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJnYW1lLWphbS5jb21wb25lbnQuc2NzcyJ9 */";

/***/ }),

/***/ 9476:
/*!*********************************************************!*\
  !*** ./src/app/header/header.component.scss?ngResource ***!
  \*********************************************************/
/***/ ((module) => {

module.exports = ".sky-header {\n  background: #fff;\n  position: relative;\n  z-index: 2;\n  display: flex;\n  height: 300px;\n  overflow: hidden;\n}\n.sky-header a {\n  text-indent: -99999999999px;\n}\n.sky-header .logo {\n  position: absolute;\n  top: 25%;\n  margin: 0 auto;\n  left: 0;\n  right: 0;\n  height: 100px;\n}\n.sky-header .logo:focus {\n  outline: none;\n}\n.github-link {\n  display: none;\n}\n#skyCanvas {\n  position: absolute;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  user-select: none;\n}\n#kevin-nav {\n  position: relative;\n  z-index: 2;\n  background: var(--blue);\n  height: 60px;\n}\n@media (min-width: 720px) {\n  #kevin-nav {\n    height: 80px;\n  }\n}\n#kevin-nav a {\n  position: absolute;\n  right: 10px;\n  color: #fff;\n}\n@media (min-width: 720px) {\n  #kevin-nav a {\n    right: auto;\n    position: relative;\n  }\n}\n#kevin-nav a:hover:after {\n  box-shadow: 0px -10px 40px 2px black;\n}\n#kevin-nav a:after {\n  transition: box-shadow ease-in-out 0.1s;\n  content: \"\";\n  box-shadow: 0px -10px 0px 0px black;\n  width: 100%;\n  position: relative;\n  display: block;\n  z-index: -1;\n}\n@media screen and (max-width: 720px) {\n  #kevin-nav h1 {\n    font-size: 1.4rem;\n  }\n}\n#kevin-nav app-social-media-links {\n  display: none;\n}\n@media (min-width: 720px) {\n  #kevin-nav app-social-media-links {\n    display: block;\n  }\n}\n#kevin-nav .mountains {\n  position: absolute;\n  height: 60px;\n  width: 100%;\n  background: url('assets/images/mountains.svg');\n  z-index: -1;\n  background-clip: padding-box;\n  top: -38px;\n  pointer-events: none;\n}\n#kevin-nav .container {\n  align-items: center;\n  display: flex;\n  justify-content: space-between;\n}\n#kevin-nav .container:after {\n  display: none;\n}\n#kevin-nav, .sky-header {\n  transition: height 0.4s;\n}\n#download-link {\n  width: 15px;\n}\n#main-nav {\n  width: 100%;\n  border-bottom: 1px solid var(--light-grey);\n  background: #fff;\n  background-size: cover !important;\n  top: 0px;\n  position: relative;\n  z-index: 2;\n  padding: 0.8rem 0;\n}\n#main-nav .swoop {\n  position: absolute;\n  top: -20px;\n}\n#main-nav #small-logo {\n  height: 40px;\n  padding-right: 20px;\n  border-right: 1px solid var(--light-grey);\n  margin-right: 20px;\n}\n@media (min-width: 720px) {\n  #main-nav .container {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n  }\n  #main-nav .container:after {\n    display: none;\n  }\n}\n#main-nav .menu-toggle {\n  height: 40px;\n  width: 40px;\n  position: absolute;\n  right: 16px;\n  top: 13px;\n  font-size: 39px;\n  color: var(--blue);\n  cursor: pointer;\n  transition: opacity 0.3s ease-in-out;\n}\n#main-nav .menu-toggle:hover {\n  opacity: 0.7;\n}\n@media (min-width: 720px) {\n  #main-nav .menu-toggle {\n    display: none;\n  }\n}\n#main-nav h3 {\n  margin: 0;\n  -webkit-user-select: auto;\n     -moz-user-select: auto;\n          user-select: auto;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  width: 65%;\n}\n#main-nav svg, #main-nav h3 {\n  float: left;\n  line-height: 1.7;\n}\n@media (min-width: 720px) {\n  #main-nav {\n    height: auto;\n    background: url('assets/images/nav-closed-2.svg') no-repeat;\n  }\n}\n#main-nav ul {\n  padding: 0px;\n  display: flex;\n  overflow: hidden;\n  justify-content: space-evenly;\n  max-height: 0;\n  transition: max-height 1s ease-in-out;\n  margin: 0;\n}\n#main-nav ul.opened {\n  max-height: 50px;\n}\n@media (min-width: 720px) {\n  #main-nav ul {\n    margin: 1.25rem 0;\n    height: auto;\n    margin: 0;\n    max-height: none;\n    justify-content: flex-end;\n  }\n}\n#main-nav ul li {\n  margin: 1.2rem 0 0 0;\n  display: inline-block;\n}\n@media (min-width: 720px) {\n  #main-nav ul li {\n    margin: 0;\n  }\n}\n#main-nav ul li:before {\n  content: \"\";\n}\n#main-nav ul li a {\n  font-weight: bold;\n  position: relative;\n}\n@media (min-width: 720px) {\n  #main-nav ul li a {\n    margin: 0 8px;\n  }\n  #main-nav ul li a:after {\n    display: block;\n  }\n}\n#main-nav ul li a.active-link::after {\n  display: block !important;\n  width: 100%;\n}\n#main-nav ul li a:hover::after {\n  width: 100%;\n}\n#main-nav ul li a::after {\n  display: none;\n  height: 2px;\n  width: 0;\n  background: var(--dark-blue);\n  content: \"\";\n  transition: 0.5s all ease;\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  position: absolute;\n  bottom: -0.25em;\n  left: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlYWRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0VBQ0EsYUFBQTtFQUNBLGFBQUE7RUFDQSxnQkFBQTtBQUNKO0FBQUk7RUFDSSwyQkFBQTtBQUVSO0FBQ0k7RUFDSSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxjQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7RUFDQSxhQUFBO0FBQ1I7QUFBUTtFQUNJLGFBQUE7QUFFWjtBQUdBO0VBQ0UsYUFBQTtBQUFGO0FBR0E7RUFDSSxrQkFBQTtFQUNBLHlCQUFBO0VBQ0Esc0JBQUE7RUFDQSxpQkFBQTtBQUFKO0FBR0E7RUFDSSxrQkFBQTtFQUNBLFVBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7QUFBSjtBQUNJO0VBTEo7SUFNUSxZQUFBO0VBRU47QUFDRjtBQURJO0VBQ0ksa0JBQUE7RUFDQSxXQUFBO0VBTUEsV0FBQTtBQUZSO0FBRlE7RUFKSjtJQUtRLFdBQUE7SUFDQSxrQkFBQTtFQUtWO0FBQ0Y7QUFIUTtFQUNJLG9DQUFBO0FBS1o7QUFGUTtFQUNJLHVDQUFBO0VBQ0EsV0FBQTtFQUNBLG1DQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLFdBQUE7QUFJWjtBQUNRO0VBREo7SUFFUSxpQkFBQTtFQUVWO0FBQ0Y7QUFDSTtFQUNJLGFBQUE7QUFDUjtBQUFRO0VBRko7SUFHUSxjQUFBO0VBR1Y7QUFDRjtBQUFJO0VBQ0ksa0JBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLDhDQUFBO0VBQ0EsV0FBQTtFQUNBLDRCQUFBO0VBQ0EsVUFBQTtFQUNBLG9CQUFBO0FBRVI7QUFFSTtFQUNJLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLDhCQUFBO0FBQVI7QUFDUTtFQUNJLGFBQUE7QUFDWjtBQUlBO0VBQ0ksdUJBQUE7QUFESjtBQUlBO0VBQ0ksV0FBQTtBQURKO0FBSUE7RUFDSSxXQUFBO0VBQ0EsMENBQUE7RUFDQSxnQkFBQTtFQUNBLGlDQUFBO0VBQ0EsUUFBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLGlCQUFBO0FBREo7QUFHSTtFQUNJLGtCQUFBO0VBQ0EsVUFBQTtBQURSO0FBSUk7RUFDSSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSx5Q0FBQTtFQUNBLGtCQUFBO0FBRlI7QUFNUTtFQURKO0lBRVEsYUFBQTtJQUNBLDhCQUFBO0lBQ0EsbUJBQUE7RUFIVjtFQUtVO0lBQ0ksYUFBQTtFQUhkO0FBQ0Y7QUFPSTtFQUNJLFlBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsU0FBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxvQ0FBQTtBQUxSO0FBT1E7RUFDSSxZQUFBO0FBTFo7QUFRUTtFQWZKO0lBZ0JRLGFBQUE7RUFMVjtBQUNGO0FBUUk7RUFDSSxTQUFBO0VBQ0EseUJBQUE7S0FBQSxzQkFBQTtVQUFBLGlCQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsVUFBQTtBQU5SO0FBU0k7RUFDSSxXQUFBO0VBQ0EsZ0JBQUE7QUFQUjtBQVVJO0VBcEVKO0lBcUVRLFlBQUE7SUFDQSwyREFBQTtFQVBOO0FBQ0Y7QUFTSTtFQUVJLFlBQUE7RUFDQSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSw2QkFBQTtFQUNBLGFBQUE7RUFDQSxxQ0FBQTtFQUNBLFNBQUE7QUFSUjtBQVVRO0VBQ0ksZ0JBQUE7QUFSWjtBQVdRO0VBZEo7SUFlUSxpQkFBQTtJQUNBLFlBQUE7SUFDQSxTQUFBO0lBQ0EsZ0JBQUE7SUFDQSx5QkFBQTtFQVJWO0FBQ0Y7QUFVUTtFQUNJLG9CQUFBO0VBQ0EscUJBQUE7QUFSWjtBQVVZO0VBSko7SUFLUSxTQUFBO0VBUGQ7QUFDRjtBQVNZO0VBQ0ksV0FBQTtBQVBoQjtBQVVZO0VBQ0ksaUJBQUE7RUFDQSxrQkFBQTtBQVJoQjtBQVNnQjtFQUhKO0lBSVEsYUFBQTtFQU5sQjtFQU9rQjtJQUNJLGNBQUE7RUFMdEI7QUFDRjtBQVFvQjtFQUNJLHlCQUFBO0VBQ0EsV0FBQTtBQU54QjtBQVdvQjtFQUNJLFdBQUE7QUFUeEI7QUFZZ0I7RUFDSSxhQUFBO0VBQ0EsV0FBQTtFQUNBLFFBQUE7RUFDQSw0QkFBQTtFQUNBLFdBQUE7RUFDQSx5QkFBQTtFQUNBLG1DQUFBO0VBQ0EsMkJBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxPQUFBO0FBVnBCIiwiZmlsZSI6ImhlYWRlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5za3ktaGVhZGVyIHtcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB6LWluZGV4OiAyO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgaGVpZ2h0OiAzMDBweDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIGEge1xuICAgICAgICB0ZXh0LWluZGVudDogLTk5OTk5OTk5OTk5cHg7XG4gICAgfVxuXG4gICAgLmxvZ28ge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMjUlO1xuICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIGhlaWdodDogMTAwcHg7XG4gICAgICAgICY6Zm9jdXMge1xuICAgICAgICAgICAgb3V0bGluZTogbm9uZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLmdpdGh1Yi1saW5rIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuI3NreUNhbnZhcyB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcbn1cblxuI2tldmluLW5hdiB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHotaW5kZXg6IDI7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tYmx1ZSk7XG4gICAgaGVpZ2h0OiA2MHB4O1xuICAgIEBtZWRpYSAobWluLXdpZHRoOiA3MjBweCkge1xuICAgICAgICBoZWlnaHQ6IDgwcHg7XG4gICAgfVxuICAgIGEge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHJpZ2h0OiAxMHB4O1xuXG4gICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiA3MjBweCkge1xuICAgICAgICAgICAgcmlnaHQ6IGF1dG87XG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIH1cbiAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgICY6aG92ZXI6YWZ0ZXIge1xuICAgICAgICAgICAgYm94LXNoYWRvdzogMHB4IC0xMHB4IDQwcHggMnB4IHJnYigwLCAwLCAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgICY6YWZ0ZXIge1xuICAgICAgICAgICAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyBlYXNlLWluLW91dCAwLjFzO1xuICAgICAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgICAgICBib3gtc2hhZG93OiAwcHggLTEwcHggMHB4IDBweCByZ2IoMCwgMCwgMCk7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgei1pbmRleDogLTE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoMSB7XG4gICAgICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDcyMHB4KSB7XG4gICAgICAgICAgICBmb250LXNpemU6IDEuNHJlbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcC1zb2NpYWwtbWVkaWEtbGlua3Mge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogNzIwcHgpIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLm1vdW50YWlucyB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgaGVpZ2h0OiA2MHB4O1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgYmFja2dyb3VuZDogdXJsKCcuLi8uLi9hc3NldHMvaW1hZ2VzL21vdW50YWlucy5zdmcnKTtcbiAgICAgICAgei1pbmRleDogLTE7XG4gICAgICAgIGJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XG4gICAgICAgIHRvcDogLTM4cHg7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIH1cblxuXG4gICAgLmNvbnRhaW5lciB7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgJjphZnRlciB7XG4gICAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4ja2V2aW4tbmF2LCAuc2t5LWhlYWRlciB7XG4gICAgdHJhbnNpdGlvbjogaGVpZ2h0IDAuNHM7XG59XG5cbiNkb3dubG9hZC1saW5rIHtcbiAgICB3aWR0aDogMTVweDtcbn1cblxuI21haW4tbmF2e1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1saWdodC1ncmV5KTtcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXIgIWltcG9ydGFudDtcbiAgICB0b3A6IDBweDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgei1pbmRleDogMjtcbiAgICBwYWRkaW5nOiAwLjgwcmVtIDA7XG5cbiAgICAuc3dvb3Age1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogLTIwcHg7XG4gICAgfVxuXG4gICAgI3NtYWxsLWxvZ28ge1xuICAgICAgICBoZWlnaHQ6IDQwcHg7XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDIwcHg7XG4gICAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIHZhcigtLWxpZ2h0LWdyZXkpO1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XG4gICAgfVxuXG4gICAgLmNvbnRhaW5lciB7XG4gICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiA3MjBweCkge1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgICAgICAgICAgICY6YWZ0ZXIge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAubWVudS10b2dnbGUge1xuICAgICAgICBoZWlnaHQ6IDQwcHg7XG4gICAgICAgIHdpZHRoOiA0MHB4O1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHJpZ2h0OiAxNnB4O1xuICAgICAgICB0b3A6IDEzcHg7XG4gICAgICAgIGZvbnQtc2l6ZTogMzlweDtcbiAgICAgICAgY29sb3I6IHZhcigtLWJsdWUpO1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4zcyBlYXNlLWluLW91dDtcblxuICAgICAgICAmOmhvdmVyIHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuNztcbiAgICAgICAgfVxuXG4gICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiA3MjBweCkge1xuICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGgzIHtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICB1c2VyLXNlbGVjdDogYXV0bztcbiAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHdpZHRoOiA2NSU7XG4gICAgfVxuXG4gICAgc3ZnLCBoMyB7XG4gICAgICAgIGZsb2F0OiBsZWZ0O1xuICAgICAgICBsaW5lLWhlaWdodDogMS43O1xuICAgIH1cblxuICAgIEBtZWRpYSAobWluLXdpZHRoOiA3MjBweCkge1xuICAgICAgICBoZWlnaHQ6IGF1dG87XG4gICAgICAgIGJhY2tncm91bmQ6IHVybChcIi4uLy4uL2Fzc2V0cy9pbWFnZXMvbmF2LWNsb3NlZC0yLnN2Z1wiKSBuby1yZXBlYXQ7XG4gICAgfVxuXG4gICAgdWwge1xuXG4gICAgICAgIHBhZGRpbmc6IDBweDtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XG4gICAgICAgIG1heC1oZWlnaHQ6IDA7XG4gICAgICAgIHRyYW5zaXRpb246IG1heC1oZWlnaHQgMXMgZWFzZS1pbi1vdXQ7XG4gICAgICAgIG1hcmdpbjogMDtcblxuICAgICAgICAmLm9wZW5lZCB7XG4gICAgICAgICAgICBtYXgtaGVpZ2h0OiA1MHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IDcyMHB4KSB7XG4gICAgICAgICAgICBtYXJnaW46IDEuMjVyZW0gMDtcbiAgICAgICAgICAgIGhlaWdodDogYXV0bztcbiAgICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICAgIG1heC1oZWlnaHQ6IG5vbmU7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICAgICAgICB9XG5cbiAgICAgICAgbGkge1xuICAgICAgICAgICAgbWFyZ2luOiAxLjJyZW0gMCAwIDA7XG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG5cbiAgICAgICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiA3MjBweCkge1xuICAgICAgICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJjpiZWZvcmUge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6XCJcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYSB7XG4gICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiA3MjBweCkge1xuICAgICAgICAgICAgICAgICAgICBtYXJnaW46IDAgOHB4O1xuICAgICAgICAgICAgICAgICAgICAmOmFmdGVyIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICYuYWN0aXZlLWxpbmsge1xuICAgICAgICAgICAgICAgICAgICAmOjphZnRlciB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAmOmhvdmVyIHtcbiAgICAgICAgICAgICAgICAgICAgJjo6YWZ0ZXIge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJjo6YWZ0ZXIge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDJweDtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDA7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHZhcigtLWRhcmstYmx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb246IDAuNXMgYWxsIGVhc2U7XG4gICAgICAgICAgICAgICAgICAgIC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgICAgICAgICAgICAgICAgICBiYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAtMC4yNWVtO1xuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ== */";

/***/ }),

/***/ 8670:
/*!*****************************************************!*\
  !*** ./src/app/home/home.component.scss?ngResource ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = ".job-information {\n  position: relative;\n}\n.job-information button {\n  top: 0;\n  position: absolute;\n  margin-top: 2rem;\n  right: 0;\n}\n@media screen and (max-width: 768px) {\n  .job-information button {\n    float: none;\n    margin: 1rem auto;\n    display: block;\n    position: relative;\n  }\n}\n.employer__name {\n  margin: 0 10px;\n}\n.employer__name, .employer__job-title {\n  display: inline-block;\n  margin-bottom: 7px;\n}\n.employer__type {\n  margin-left: 20px;\n  display: inline-block;\n}\n.employer__logo {\n  display: inline-block;\n  width: 40px;\n  height: 40px;\n  transform: translateY(12px);\n}\n.employer__year, .employer__location {\n  display: inline-block;\n  padding-right: 15px;\n}\n.job ul {\n  float: left;\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxrQkFBQTtBQUNKO0FBQUk7RUFDSSxNQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLFFBQUE7QUFFUjtBQURRO0VBTEo7SUFNUSxXQUFBO0lBQ0EsaUJBQUE7SUFDQSxjQUFBO0lBQ0Esa0JBQUE7RUFJVjtBQUNGO0FBQ0k7RUFDSSxjQUFBO0FBRVI7QUFBSTtFQUVJLHFCQUFBO0VBQ0Esa0JBQUE7QUFDUjtBQUNJO0VBQ0UsaUJBQUE7RUFDQSxxQkFBQTtBQUNOO0FBQ0k7RUFDSSxxQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsMkJBQUE7QUFDUjtBQUNJO0VBRUkscUJBQUE7RUFDQSxtQkFBQTtBQUFSO0FBSUE7RUFDSSxXQUFBO0VBQ0EsV0FBQTtBQURKIiwiZmlsZSI6ImhvbWUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuam9iLWluZm9ybWF0aW9uIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgYnV0dG9uIHtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIG1hcmdpbi10b3A6IDJyZW07XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweCkge1xuICAgICAgICAgICAgZmxvYXQ6IG5vbmU7XG4gICAgICAgICAgICBtYXJnaW46IDFyZW0gYXV0bztcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4uZW1wbG95ZXJfXyB7XG4gICAgJm5hbWUge1xuICAgICAgICBtYXJnaW46IDAgMTBweDtcbiAgICB9XG4gICAgJm5hbWUsXG4gICAgJmpvYi10aXRsZSB7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogN3B4O1xuICAgIH1cbiAgICAmdHlwZSB7XG4gICAgICBtYXJnaW4tbGVmdDogMjBweDtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICB9XG4gICAgJmxvZ28ge1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIHdpZHRoOiA0MHB4O1xuICAgICAgICBoZWlnaHQ6IDQwcHg7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMnB4KTtcbiAgICB9XG4gICAgJnllYXIsXG4gICAgJmxvY2F0aW9uIHtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAxNXB4O1xuICAgIH1cbn1cblxuLmpvYiB1bCB7XG4gICAgZmxvYXQ6IGxlZnQ7XG4gICAgd2lkdGg6IDEwMCU7XG59XG4iXX0= */";

/***/ }),

/***/ 5273:
/*!*************************************************************************!*\
  !*** ./src/app/project-detail/project-detail.component.scss?ngResource ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = ".project-detail-header {\n  height: 400px;\n  width: 100%;\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-position: center;\n  margin: -20px 0 20px 0;\n  background-color: #ccc;\n  position: relative;\n}\n.project-detail-header:after {\n  content: \"\";\n  position: absolute;\n  bottom: -1px;\n  width: 100%;\n  height: 77px;\n  background-image: url('assets/images/triangle.svg');\n  background-size: cover;\n  padding: 0;\n  padding-bottom: 10%;\n}\n.project-direction-btns {\n  height: 300px;\n}\n.project-direction-btns.project-next {\n  color: red;\n}\n.project-direction-btns.project-prev {\n  color: red;\n}\n.project-link {\n  position: absolute;\n  right: 8px;\n  top: -60px;\n}\n.container {\n  position: relative;\n}\n#project-summary {\n  position: relative;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3QtZGV0YWlsLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBQTtFQUNBLFdBQUE7RUFDQSw0QkFBQTtFQUNBLHNCQUFBO0VBQ0EsMkJBQUE7RUFDQSxzQkFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7QUFDSjtBQUNJO0VBQ0ksV0FBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsbURBQUE7RUFDQSxzQkFBQTtFQUNBLFVBQUE7RUFDQSxtQkFBQTtBQUNSO0FBR0E7RUFDSSxhQUFBO0FBQUo7QUFFSTtFQUNJLFVBQUE7QUFBUjtBQUdJO0VBQ0ksVUFBQTtBQURSO0FBS0E7RUFDSSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxVQUFBO0FBRko7QUFLQTtFQUNJLGtCQUFBO0FBRko7QUFLQTtFQUNJLGtCQUFBO0FBRkoiLCJmaWxlIjoicHJvamVjdC1kZXRhaWwuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucHJvamVjdC1kZXRhaWwtaGVhZGVyIHtcbiAgICBoZWlnaHQ6IDQwMHB4O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XG4gICAgbWFyZ2luOiAtMjBweCAwIDIwcHggMDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAgICY6YWZ0ZXIge1xuICAgICAgICBjb250ZW50OiBcIlwiO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGJvdHRvbTogLTFweDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogNzdweDtcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcuLi8uLi9hc3NldHMvaW1hZ2VzL3RyaWFuZ2xlLnN2ZycpO1xuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICBwYWRkaW5nLWJvdHRvbTogMTAlO1xuICAgIH1cbn1cblxuLnByb2plY3QtZGlyZWN0aW9uLWJ0bnMge1xuICAgIGhlaWdodDogMzAwcHg7XG5cbiAgICAmLnByb2plY3QtbmV4dCB7XG4gICAgICAgIGNvbG9yOiByZWQ7XG4gICAgfVxuXG4gICAgJi5wcm9qZWN0LXByZXYge1xuICAgICAgICBjb2xvcjogcmVkO1xuICAgIH1cbn1cblxuLnByb2plY3QtbGluayB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHJpZ2h0OiA4cHg7XG4gICAgdG9wOiAtNjBweDtcbn1cblxuLmNvbnRhaW5lciB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4jcHJvamVjdC1zdW1tYXJ5IHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4iXX0= */";

/***/ }),

/***/ 1362:
/*!*************************************************************!*\
  !*** ./src/app/projects/projects.component.scss?ngResource ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = ".column {\n  position: relative;\n}\n.column img {\n  width: 100%;\n  background: grey;\n  display: block;\n}\n@media (min-width: 720px) {\n  .project-holder::after {\n    content: \"\";\n    background-color: var(--light-grey);\n    position: absolute;\n    height: 50%;\n    width: 1px;\n    display: block;\n    right: 0;\n    top: 25%;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksa0JBQUE7QUFDSjtBQUFJO0VBQ0ksV0FBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQUVSO0FBTUk7RUFDSTtJQUNJLFdBQUE7SUFDQSxtQ0FBQTtJQUNBLGtCQUFBO0lBQ0EsV0FBQTtJQUNBLFVBQUE7SUFDQSxjQUFBO0lBQ0EsUUFBQTtJQUNBLFFBQUE7RUFIVjtBQUNGIiwiZmlsZSI6InByb2plY3RzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbHVtbiB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGltZyB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBiYWNrZ3JvdW5kOiBncmV5O1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICB9XG59XG4ucHJvamVjdC1ob2xkZXIge1xuICAgIC8vIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAvLyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgLy8gd2lkdGg6IDEwMCU7XG5cbiAgICBAbWVkaWEgKG1pbi13aWR0aDogNzIwcHgpIHtcbiAgICAgICAgJjo6YWZ0ZXIge1xuICAgICAgICAgICAgY29udGVudDogXCJcIjtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0LWdyZXkpO1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgaGVpZ2h0OiA1MCU7XG4gICAgICAgICAgICB3aWR0aDogMXB4O1xuICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICByaWdodDogMDtcbiAgICAgICAgICAgIHRvcDogMjUlO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19 */";

/***/ }),

/***/ 4390:
/*!**************************************************************************!*\
  !*** ./src/app/shared/placeholder/placeholder.component.scss?ngResource ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = ".timeline-item {\n  background: #fff;\n  border-radius: 3px;\n  padding: 12px;\n  width: 100%;\n  min-height: 200px;\n}\n\n@-webkit-keyframes placeHolderShimmer {\n  0% {\n    background-position: -50% 0;\n  }\n  100% {\n    background-position: 50% 0;\n  }\n}\n\n@keyframes placeHolderShimmer {\n  0% {\n    background-position: -50% 0;\n  }\n  100% {\n    background-position: 50% 0;\n  }\n}\n\n.animated-background {\n  -webkit-animation-duration: 1s;\n          animation-duration: 1s;\n  -webkit-animation-fill-mode: forwards;\n          animation-fill-mode: forwards;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  -webkit-animation-name: placeHolderShimmer;\n          animation-name: placeHolderShimmer;\n  -webkit-animation-timing-function: linear;\n          animation-timing-function: linear;\n  background: #f6f7f8;\n  background: linear-gradient(to right, #eeeeee 8%, #eaeaea 18%, #eeeeee 33%);\n  background-size: 50% 100px;\n  height: 200px;\n  position: relative;\n}\n\n.background-masker {\n  background: #fff;\n  position: absolute;\n}\n\n.background-masker.header-top, .background-masker.header-bottom, .background-masker.content-top, .background-masker.subheader-bottom, .background-masker.divider, .background-masker.header-left, .background-masker.header-right, .background-masker.subheader-right {\n  top: 0;\n  left: calc(287px + 1rem);\n  right: 0;\n  height: 31px;\n}\n\n.background-masker.divider {\n  top: 0;\n  left: 287px;\n  right: 0;\n  height: 200px;\n  width: 1rem;\n}\n\n.background-masker.header-bottom {\n  top: 18px;\n  height: 31px;\n}\n\n.background-masker.subheader-right {\n  top: 31px;\n  height: 31px;\n}\n\n.background-masker.header-right {\n  width: auto;\n  left: 700px;\n  right: 0;\n}\n\n.background-masker.subheader-right {\n  width: auto;\n  left: 700px;\n  right: 0;\n  left: 287px;\n}\n\n.background-masker.subheader-bottom {\n  top: 30px;\n  height: 10px;\n}\n\n.background-masker.content-second-line, .background-masker.content-third-line, .background-masker.content-second-end, .background-masker.content-third-end, .background-masker.content-first-end {\n  top: 40px;\n  left: 0;\n  right: 0;\n  height: 31px;\n}\n\n.background-masker.content-top {\n  height: 20px;\n  top: 180px;\n}\n\n@media screen and (max-width: 768px) {\n  .background-masker.content-top {\n    height: 20px;\n    top: 132px;\n    left: 150px;\n  }\n\n  .background-masker.subheader-right {\n    width: 100%;\n    right: 0;\n    left: 0;\n    top: 152px;\n    height: 10px;\n  }\n\n  .background-masker.divider {\n    top: 122px;\n    left: 0;\n    right: 0;\n    height: 10px;\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsYWNlaG9sZGVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxXQUFBO0VBQ0EsaUJBQUE7QUFDSjs7QUFFQTtFQUNJO0lBQ0ksMkJBQUE7RUFDTjtFQUVFO0lBQ0ksMEJBQUE7RUFBTjtBQUNGOztBQVBBO0VBQ0k7SUFDSSwyQkFBQTtFQUNOO0VBRUU7SUFDSSwwQkFBQTtFQUFOO0FBQ0Y7O0FBR0E7RUFDSSw4QkFBQTtVQUFBLHNCQUFBO0VBQ0EscUNBQUE7VUFBQSw2QkFBQTtFQUNBLDJDQUFBO1VBQUEsbUNBQUE7RUFDQSwwQ0FBQTtVQUFBLGtDQUFBO0VBQ0EseUNBQUE7VUFBQSxpQ0FBQTtFQUNBLG1CQUFBO0VBQ0EsMkVBQUE7RUFDQSwwQkFBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtBQURKOztBQUlBO0VBQ0ksZ0JBQUE7RUFDQSxrQkFBQTtBQURKOztBQUVJO0VBUUksTUFBQTtFQUNBLHdCQUFBO0VBQ0EsUUFBQTtFQUNBLFlBQUE7QUFQUjs7QUFTSTtFQUNJLE1BQUE7RUFDQSxXQUFBO0VBQ0EsUUFBQTtFQUNBLGFBQUE7RUFDQSxXQUFBO0FBUFI7O0FBU0k7RUFDSSxTQUFBO0VBQ0EsWUFBQTtBQVBSOztBQVNJO0VBQ0ksU0FBQTtFQUNBLFlBQUE7QUFQUjs7QUFTSTtFQUNJLFdBQUE7RUFDQSxXQUFBO0VBQ0EsUUFBQTtBQVBSOztBQVNJO0VBQ0ksV0FBQTtFQUNBLFdBQUE7RUFDQSxRQUFBO0VBQ0EsV0FBQTtBQVBSOztBQVNJO0VBQ0ksU0FBQTtFQUNBLFlBQUE7QUFQUjs7QUFTSTtFQUtJLFNBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLFlBQUE7QUFYUjs7QUFhSTtFQUNJLFlBQUE7RUFDQSxVQUFBO0FBWFI7O0FBZUE7RUFDSTtJQUNJLFlBQUE7SUFDQSxVQUFBO0lBQ0EsV0FBQTtFQVpOOztFQWVFO0lBQ0ksV0FBQTtJQUNBLFFBQUE7SUFDQSxPQUFBO0lBQ0EsVUFBQTtJQUNBLFlBQUE7RUFaTjs7RUFlRTtJQUNJLFVBQUE7SUFDQSxPQUFBO0lBQ0EsUUFBQTtJQUNBLFlBQUE7SUFDQSxXQUFBO0VBWk47QUFDRiIsImZpbGUiOiJwbGFjZWhvbGRlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi50aW1lbGluZS1pdGVtIHtcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICBwYWRkaW5nOiAxMnB4O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1pbi1oZWlnaHQ6IDIwMHB4O1xufVxuXG5Aa2V5ZnJhbWVzIHBsYWNlSG9sZGVyU2hpbW1lciB7XG4gICAgMCUge1xuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAtNTAlIDA7XG4gICAgfVxuXG4gICAgMTAwJSB7XG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDUwJSAwO1xuICAgIH1cbn1cblxuLmFuaW1hdGVkLWJhY2tncm91bmQge1xuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMXM7XG4gICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XG4gICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7XG4gICAgYW5pbWF0aW9uLW5hbWU6IHBsYWNlSG9sZGVyU2hpbW1lcjtcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBsaW5lYXI7XG4gICAgYmFja2dyb3VuZDogI2Y2ZjdmODtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICNlZWVlZWUgOCUsICNlYWVhZWEgMTglLCAjZWVlZWVlIDMzJSk7XG4gICAgYmFja2dyb3VuZC1zaXplOiA1MCUgMTAwcHg7XG4gICAgaGVpZ2h0OiAyMDBweDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5iYWNrZ3JvdW5kLW1hc2tlciB7XG4gICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgJi5oZWFkZXItdG9wLFxuICAgICYuaGVhZGVyLWJvdHRvbSxcbiAgICAmLmNvbnRlbnQtdG9wLFxuICAgICYuc3ViaGVhZGVyLWJvdHRvbSxcbiAgICAmLmRpdmlkZXIsXG4gICAgJi5oZWFkZXItbGVmdCxcbiAgICAmLmhlYWRlci1yaWdodCxcbiAgICAmLnN1YmhlYWRlci1yaWdodCB7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgbGVmdDogY2FsYygyODdweCArIDFyZW0pO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgaGVpZ2h0OiAzMXB4O1xuICAgIH1cbiAgICAmLmRpdmlkZXIge1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IDI4N3B4O1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgaGVpZ2h0OiAyMDBweDtcbiAgICAgICAgd2lkdGg6IDFyZW07XG4gICAgfVxuICAgICYuaGVhZGVyLWJvdHRvbSB7XG4gICAgICAgIHRvcDogMThweDtcbiAgICAgICAgaGVpZ2h0OiAzMXB4O1xuICAgIH1cbiAgICAmLnN1YmhlYWRlci1yaWdodCB7XG4gICAgICAgIHRvcDogMzFweDtcbiAgICAgICAgaGVpZ2h0OiAzMXB4O1xuICAgIH1cbiAgICAmLmhlYWRlci1yaWdodCB7XG4gICAgICAgIHdpZHRoOiBhdXRvO1xuICAgICAgICBsZWZ0OiA3MDBweDtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgfVxuICAgICYuc3ViaGVhZGVyLXJpZ2h0IHtcbiAgICAgICAgd2lkdGg6IGF1dG87XG4gICAgICAgIGxlZnQ6IDcwMHB4O1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgbGVmdDogMjg3cHg7XG4gICAgfVxuICAgICYuc3ViaGVhZGVyLWJvdHRvbSB7XG4gICAgICAgIHRvcDogMzBweDtcbiAgICAgICAgaGVpZ2h0OiAxMHB4O1xuICAgIH1cbiAgICAmLmNvbnRlbnQtc2Vjb25kLWxpbmUsXG4gICAgJi5jb250ZW50LXRoaXJkLWxpbmUsXG4gICAgJi5jb250ZW50LXNlY29uZC1lbmQsXG4gICAgJi5jb250ZW50LXRoaXJkLWVuZCxcbiAgICAmLmNvbnRlbnQtZmlyc3QtZW5kIHtcbiAgICAgICAgdG9wOiA0MHB4O1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgaGVpZ2h0OiAzMXB4O1xuICAgIH1cbiAgICAmLmNvbnRlbnQtdG9wIHtcbiAgICAgICAgaGVpZ2h0OiAyMHB4O1xuICAgICAgICB0b3A6IDE4MHB4O1xuICAgIH1cbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgICAuYmFja2dyb3VuZC1tYXNrZXIuY29udGVudC10b3Age1xuICAgICAgICBoZWlnaHQ6IDIwcHg7XG4gICAgICAgIHRvcDogMTMycHg7XG4gICAgICAgIGxlZnQ6IDE1MHB4O1xuICAgIH1cblxuICAgIC5iYWNrZ3JvdW5kLW1hc2tlci5zdWJoZWFkZXItcmlnaHQge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHRvcDogMTUycHg7XG4gICAgICAgIGhlaWdodDogMTBweDtcbiAgICB9XG5cbiAgICAuYmFja2dyb3VuZC1tYXNrZXIuZGl2aWRlciB7XG4gICAgICAgIHRvcDogMTIycHg7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICBoZWlnaHQ6IDEwcHg7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cbn1cbiJdfQ== */";

/***/ }),

/***/ 8173:
/*!*********************************************************************************!*\
  !*** ./src/app/social-media-links/social-media-links.component.scss?ngResource ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = "#social-links {\n  float: right;\n  margin: 0;\n}\n#social-links li:before {\n  content: \"\";\n}\n#social-links li a svg {\n  fill: white;\n  transition: fill 100ms ease-in-out;\n  height: 22px;\n  padding: 3px;\n}\n#social-links li a svg:hover {\n  fill: var(--dark-blue);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNvY2lhbC1tZWRpYS1saW5rcy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFlBQUE7RUFDQSxTQUFBO0FBQ0o7QUFFUTtFQUNJLFdBQUE7QUFBWjtBQUdZO0VBQ0ksV0FBQTtFQUNBLGtDQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7QUFEaEI7QUFHZ0I7RUFDSSxzQkFBQTtBQURwQiIsImZpbGUiOiJzb2NpYWwtbWVkaWEtbGlua3MuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjc29jaWFsLWxpbmtzIHtcbiAgICBmbG9hdDogcmlnaHQ7XG4gICAgbWFyZ2luOiAwO1xuXG4gICAgbGkge1xuICAgICAgICAmOmJlZm9yZSB7XG4gICAgICAgICAgICBjb250ZW50OiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIGEge1xuICAgICAgICAgICAgc3ZnIHtcbiAgICAgICAgICAgICAgICBmaWxsOiB3aGl0ZTtcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiBmaWxsIDEwMG1zIGVhc2UtaW4tb3V0O1xuICAgICAgICAgICAgICAgIGhlaWdodDogMjJweDtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAzcHg7XG5cbiAgICAgICAgICAgICAgICAmOmhvdmVyIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsbDogdmFyKC0tZGFyay1ibHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0= */";

/***/ }),

/***/ 2105:
/*!***********************************************************!*\
  !*** ./src/app/contact/contact.component.html?ngResource ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = "<div class=\"container\">\n  <div class=\"column six\">\n    <h1>Contact</h1>\n  </div>\n</div>\n";

/***/ }),

/***/ 4892:
/*!************************************************************************************!*\
  !*** ./src/app/errors/400/not-found-component/not-found.component.html?ngResource ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = "<div class=\"container\" style=\"text-align: center;\" >\n    <p>Looks like you're in the wrong spot. Need some help there? 🤔</p>\n    <p>Click<a routerLink=\"/\"><strong> here</strong></a> to go back to the homepage.</p>\n    <br>\n    <br>\n    <br>\n    <br>\n    <br>\n</div>";

/***/ }),

/***/ 2811:
/*!*********************************************************!*\
  !*** ./src/app/footer/footer.component.html?ngResource ***!
  \*********************************************************/
/***/ ((module) => {

module.exports = "<div class=\"container\">\n  <br>\n  <br>\n  <br>\n  <br>\n  <p>\n    Thanks for coming by. <strong>Have a nice day</strong>\n  </p>\n  <a *ngIf=\"!isContactPage\"\n     class=\"button button-primary contact-link\"\n     routerLink=\"/contact\">Contact Me</a>\n</div>\n<p>\n  Designed and developed by Kevin Newman\n</p>\n<span lazy-load-images>\n  <div class=\"footer-background\"\n       [class.is-contact-page]=\"isContactPage\"></div>\n</span>\n";

/***/ }),

/***/ 9618:
/*!*************************************************************!*\
  !*** ./src/app/game-jam/game-jam.component.html?ngResource ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = "<div class=\"container\">\n  <div class=\"project-holder\"\n       *ngIf=\"(gameJams | async).length === 0\">\n    <placeholder-content></placeholder-content>\n    <placeholder-content></placeholder-content>\n    <placeholder-content></placeholder-content>\n  </div>\n  <div *ngIf=\"(gameJams | async).length\">\n    <h2 style=\"text-align: center;\"><em>What is a Game Jam?</em></h2>\n    <p>\n      A game jam is a hackathon for video games. It is a gathering of\n      people for the purpose of planning, designing, and creating one or\n      more games within a short span of time, usually ranging between 24\n      and 72 hours, and some even longer.\n      <a style=\"text-decoration:underline\"\n         href=\"https://en.wikipedia.org/wiki/Game_jam\"\n         target=\"_blank\">Wikipedia</a>\n    </p>\n    <a href=\"{{ gameJam.url }}\"\n       target=\"_blank\"\n       class=\"row\"\n       *ngFor=\"let gameJam of (gameJams | async)\">\n      <div class=\"gameJams-holder\">\n        <div class=\"four column img-holder\">\n          <img loading=\"lazy\"\n               src=\"{{ gameJam.cover_url }}\"\n               alt=\"{{ gameJam.title }}\" />\n        </div>\n        <div class=\"eight column\">\n          <h3>{{ gameJam.title }}</h3>\n          <p [innerHtml]=\"\n                            gameJam.short_text.length > 320\n                                ? (gameJam.short_text | slice: 0:320) + '...'\n                                : gameJam.short_text\n                        \"></p>\n        </div>\n      </div>\n    </a>\n  </div>\n</div>\n";

/***/ }),

/***/ 6727:
/*!*********************************************************!*\
  !*** ./src/app/header/header.component.html?ngResource ***!
  \*********************************************************/
/***/ ((module) => {

module.exports = "<div class=\"sky-header\">\n\n  <canvas #skyCanvas\n          id=\"skyCanvas\"\n          height=\"300px\"></canvas>\n  <a routerLink='/'\n     aria-label=\"Home\">\n    Home\n    <svg class=\"logo\"\n         xmlns=\"http://www.w3.org/2000/svg\"\n         viewBox=\"0 0 153.15 134.9\">\n      <path fill=\"#2e50a2\"\n            d=\"M66.23,23H100L123,50.7V22.86h30.1V0H40.06V29.13H34.52C1.59,29.13-4.09,59.77,0,67.38-.09,75,1.59,105.63,34.52,105.63h5.54V134.9H153.15V112H123L99.9,84.2l.06,27.73H66.23M40,83.75s-.87,0-5.29,0-11,.26-11.39-16.41C23.74,50.71,30.43,51,34.69,51a36.87,36.87,0,0,1,5.29.18V83.75Z\" />\n    </svg>\n  </a>\n  <button class=\"dark-mode__btn dark-mode__btn--dark\"\n          (click)=\"toggleDarkMode()\"\n          *ngIf=\"!isDarkMode\">Dark Mode!⛺️🌝</button>\n  <button class=\"dark-mode__btn dark-mode__btn--light\"\n          (click)=\"toggleDarkMode()\"\n          *ngIf=\"isDarkMode\">Light Mode!🚣‍♀️🌞</button>\n</div>\n\n<nav id=\"kevin-nav\">\n  <div class=\"mountains\"></div>\n  <div class=\"container\">\n    <h1>Kevin Newman</h1>\n    <a href=\"https://github.com/HellooooNewman/\"\n       class=\"github-link\">github.com/HellooooNewman</a>\n    <a href=\"./assets/pdf/KevinNewmanResume.pdf\"\n       class=\"dl-resume\"\n       target=\"_blank\">\n      <svg xmlns=\"http://www.w3.org/2000/svg\"\n           xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n           version=\"1.1\"\n           id=\"download-link\"\n           x=\"0px\"\n           y=\"0px\"\n           viewBox=\"0 0 29.978 29.978\"\n           style=\"enable-background:new 0 0 29.978 29.978;\"\n           xml:space=\"preserve\"\n           width=\"100%\"\n           height=\"100%\">\n        <g>\n          <path d=\"M25.462,19.105v6.848H4.515v-6.848H0.489v8.861c0,1.111,0.9,2.012,2.016,2.012h24.967c1.115,0,2.016-0.9,2.016-2.012   v-8.861H25.462z\"\n                fill=\"#ffffff\" />\n          <path d=\"M14.62,18.426l-5.764-6.965c0,0-0.877-0.828,0.074-0.828s3.248,0,3.248,0s0-0.557,0-1.416c0-2.449,0-6.906,0-8.723   c0,0-0.129-0.494,0.615-0.494c0.75,0,4.035,0,4.572,0c0.536,0,0.524,0.416,0.524,0.416c0,1.762,0,6.373,0,8.742   c0,0.768,0,1.266,0,1.266s1.842,0,2.998,0c1.154,0,0.285,0.867,0.285,0.867s-4.904,6.51-5.588,7.193   C15.092,18.979,14.62,18.426,14.62,18.426z\"\n                fill=\"#ffffff\" />\n        </g>\n      </svg>\n\n      Download Resume\n    </a>\n    <app-social-media-links></app-social-media-links>\n  </div>\n</nav>\n\n<nav id=\"main-nav\"\n     [style.top]=\"position + 'px'\">\n  <div class=\"container\">\n    <div class=\"column md-ten xs-ten\">\n      <a routerLink='/'\n         title=\"Homepage\">\n        <svg id=\"small-logo\"\n             xmlns=\"http://www.w3.org/2000/svg\"\n             viewBox=\"0 0 153.15 134.9\">\n          <path fill=\"#2e50a2\"\n                d=\"M66.23,23H100L123,50.7V22.86h30.1V0H40.06V29.13H34.52C1.59,29.13-.09,59.77,0,67.38-.09,75,1.59,105.63,34.52,105.63h5.54V134.9H153.15V112H123L99.9,84.2l.06,27.73H66.23M40,83.75s-.87,0-5.29,0-11,.26-11.39-16.41C23.74,50.71,30.43,51,34.69,51a36.87,36.87,0,0,1,5.29.18V83.75Z\" />\n        </svg>\n      </a>\n      <h3>{{ dataService.title | async }}</h3>\n    </div>\n    <div class=\"menu-toggle\"\n         (click)=\"openedBool = !openedBool\">\n      <svg xmlns=\"http://www.w3.org/2000/svg\"\n           viewBox=\"0 0 24 24\"\n           enable-background=\"new 0 0 24 24\"\n           width=\"100%\"\n           height=\"100%\">\n        <g>\n          <path d=\"M24,3c0-0.6-0.4-1-1-1H1C0.4,2,0,2.4,0,3v2c0,0.6,0.4,1,1,1h22c0.6,0,1-0.4,1-1V3z\"\n                fill=\"#2e50a2\" />\n          <path d=\"M24,11c0-0.6-0.4-1-1-1H1c-0.6,0-1,0.4-1,1v2c0,0.6,0.4,1,1,1h22c0.6,0,1-0.4,1-1V11z\"\n                fill=\"#2e50a2\" />\n          <path d=\"M24,19c0-0.6-0.4-1-1-1H1c-0.6,0-1,0.4-1,1v2c0,0.6,0.4,1,1,1h22c0.6,0,1-0.4,1-1V19z\"\n                fill=\"#2e50a2\" />\n        </g>\n      </svg>\n    </div>\n    <ul class=\"nine md-eleven column\"\n        [ngClass]=\"{'opened': openedBool}\">\n      <li><a routerLink=\"/\"\n           routerLinkActive=\"active-link\"\n           [routerLinkActiveOptions]=\"{exact: true}\">Home</a></li>\n      <li><a routerLink=\"/projects\"\n           routerLinkActive=\"active-link\">Projects</a></li>\n      <li><a routerLink=\"/game-jams\"\n           routerLinkActive=\"active-link\">Game Jams</a></li>\n      <li><a routerLink=\"/contact\"\n           routerLinkActive=\"active-link\">Contact</a></li>\n    </ul>\n  </div>\n</nav>\n";

/***/ }),

/***/ 4715:
/*!*****************************************************!*\
  !*** ./src/app/home/home.component.html?ngResource ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = "<div class=\"container\">\n  <h2>\n    <span>Introduction</span>\n    <hr />\n  </h2>\n  <div [innerHtml]=\"resume.introduction\"></div>\n</div>\n<div class=\"container\">\n  <h2>\n    <span>Work</span>\n    <hr />\n  </h2>\n</div>\n<div class=\"container job\">\n  <div class=\"columns twelve\"\n       *ngFor=\"let job of resume.work.jobs\">\n    <div class=\"job-information\">\n      <a href=\"{{ job.employer_link }}\"\n         rel=\"noopener\"\n         target=\"_blank\">\n        <img loading=\"lazy\"\n             class=\"employer__logo\"\n             src=\"{{ job.logo }}\"\n             alt=\"{{ job.employer }}\" />\n        <h3 class=\"employer__name\">{{ job.employer }}</h3>\n      </a>\n      <h4 class=\"employer__job-title\">{{ job.title }}</h4>\n      <h5 class=\"employer__type\">{{ job.employment_type }}</h5>\n      <div>\n        <h5 class=\"employer__year\">{{ job.year }}</h5>\n        <h5 class=\"employer__location\">{{ job.location }}</h5>\n\n      </div>\n      <button (click)=\"job.showDetails = !job.showDetails\">\n        {{job.showDetails ? 'View Less' : 'View More'}}\n      </button>\n    </div>\n    <div *ngIf=\"job.showDetails\">\n      <div class=\"details\"\n           [innerHTML]=\"job.points\"></div>\n      <p>{{ job.technology }}</p>\n    </div>\n  </div>\n</div>\n\n<div class=\"container side-projects\"\n     *ngIf=\"(projects$ | async).length\">\n  <h2>\n    <span>Projects</span><span><a routerLink=\"/projects\">View All</a></span>\n    <hr />\n  </h2>\n  <a [attr.href]=\"'project/' + project.id\"\n     [routerLink]=\"['/project', project.id]\"\n     class=\"six columns\"\n     *ngFor=\"let project of (projects$ | async)\">\n    <div class=\"project-holder\"></div>\n    <div class=\"img-holder\">\n      <img src=\"{{ project.thumbnail_img }}\"\n           alt=\"{{ project.title }}\"\n           loading=\"lazy\" />\n    </div>\n    <h3>{{ project.title }}</h3>\n    <p [innerHtml]=\"project.body | truncate: [400, '...']\"></p>\n  </a>\n</div>\n<div class=\"container skills\">\n  <h2>\n    <span>Skills</span>\n    <hr />\n  </h2>\n  <div class=\"four columns\"\n       *ngFor=\"let skill of resume.skills\">\n    <h3>{{ skill.title }}</h3>\n    <ul>\n      <li *ngFor=\"let item of skill.list\">{{ item }}</li>\n    </ul>\n  </div>\n</div>\n<div class=\"container education\">\n  <h2>\n    <span>Education</span>\n    <hr />\n  </h2>\n  <div class=\"four columns\"\n       *ngFor=\"let school of resume.education\">\n    <h3>{{ school.program }}</h3>\n    <p>{{ school.year }}</p>\n  </div>\n</div>\n";

/***/ }),

/***/ 5460:
/*!*************************************************************************!*\
  !*** ./src/app/project-detail/project-detail.component.html?ngResource ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = "<ng-container *ngIf=\"project$ | async as project\">\n    <div\n        class=\"project-detail-header\"\n        [style.background-image]=\"'url(' + project?.main_img + ')'\"\n    ></div>\n    <div class=\"container\">\n        <a\n            href=\"{{ project.project_url }}\"\n            *ngIf=\"project.project_url != ''\"\n            class=\"project-link button button-primary\"\n            target=\"_blank\"\n            >Project Link</a\n        >\n        <div class=\"row\">\n            <div class=\"eight column\" id=\"project-summary\">\n                <h3>Project Summary</h3>\n                <div style=\"margin-bottom: 10px;\">\n                    <span style=\"font-weight:bold;\">Year </span>\n                    <span\n                        >{{ project.start_date }} - {{ project.end_date }}</span\n                    >\n                </div>\n                <p [innerHtml]=\"project.body\"></p>\n            </div>\n            <div class=\"four column\" *ngIf=\"project.tasks.length != 0\">\n                <h3>Features</h3>\n                <ul>\n                    <li *ngFor=\"let task of project.tasks\">\n                        {{ task }}\n                    </li>\n                </ul>\n            </div>\n            <!-- <a routerLink='/project/{{prev(Project.id}}' (click)=\"project = prevProject\" class=\"project-direction-btns project-prev\" [style.background-image]=\"'url(http:/' + prev(Project.main_img + ')'\">\n        {{prev(Project.title}}\n        Previous Project\n      </a>\n      <a routerLink='/project/{{next(Project.id}}' (click)=\"changeProject(nextProject)\" class=\"project-direction-btns project-next\" [style.background-image]=\"'url(http:/' + next(Project.main_img + ')'\">\n        {{next(Project.title}}\n        Next Project\n      </a> -->\n        </div>\n        <div class=\"row\">\n            <div *ngIf=\"project.videos.length !== 0\">\n                <video\n                    id=\"video\"\n                    preload=\"auto\"\n                    controls\n                    poster=\"http:/{{ project.main_img }}\"\n                    preload\n                    playsinline\n                    controlsList=\"nodownload\"\n                >\n                    <source\n                        *ngFor=\"let video of project.videos\"\n                        src=\"{{ video.url }}\"\n                        type=\"video/mp4\"\n                    />\n                    Your browser does not support the video tag.\n                </video>\n            </div>\n\n            <swiper [config]=\"config\" *ngIf=\"project.gallery.length != 0\">\n                <div class=\"swiper-wrapper\">\n                    <img\n                        class=\"swiper-slide\"\n                        *ngFor=\"let image of project.gallery\"\n                        [src]=\"image.url\"\n                        alt=\"image.alt\"\n                        loading=\"lazy\"\n                    />\n                </div>\n                <div class=\"swiper-pagination\"></div>\n                <div class=\"swiper-button-next swiper-button-white\"></div>\n                <div class=\"swiper-button-prev swiper-button-white\"></div>\n            </swiper>\n        </div>\n    </div>\n</ng-container>\n";

/***/ }),

/***/ 5390:
/*!*************************************************************!*\
  !*** ./src/app/projects/projects.component.html?ngResource ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = "<div class=\"container\">\n  <div class=\"project-holder\"\n       *ngIf=\"(projects | async).length === 0\">\n    <placeholder-content></placeholder-content>\n    <placeholder-content></placeholder-content>\n    <placeholder-content></placeholder-content>\n  </div>\n  <div *ngIf=\"(projects | async).length\">\n    <a routerLink=\"/project/{{ project.id }}\"\n       class=\"row\"\n       *ngFor=\"let project of (projects | async)\">\n      <div class=\"project-holder\">\n        <div class=\"four column img-holder\">\n          <img src=\"{{ project.thumbnail_img }}\"\n               alt=\"{{ project.title }}\"\n               loading=\"lazy\" />\n        </div>\n        <div class=\"eight column\">\n          <h3>{{ project.title }}</h3>\n          <p [innerHtml]=\"\n                            project.body.length > 320\n                                ? (project.body | slice: 0:320) + '...'\n                                : project.body\n                        \"></p>\n        </div>\n      </div>\n    </a>\n  </div>\n</div>\n";

/***/ }),

/***/ 483:
/*!**************************************************************************!*\
  !*** ./src/app/shared/placeholder/placeholder.component.html?ngResource ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = "<div class=\"timeline-item\">\n    <div class=\"animated-background\">\n        <div class=\"background-masker header-right\"></div>\n        <div class=\"background-masker divider\"></div>\n        <div class=\"background-masker subheader-right\"></div>\n        <div class=\"background-masker content-top\"></div>\n    </div>\n</div>\n";

/***/ }),

/***/ 4518:
/*!*********************************************************************************!*\
  !*** ./src/app/social-media-links/social-media-links.component.html?ngResource ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = "<ul id=\"social-links\">\n  <li>\n    <a href=\"https://github.com/HellooooNewman\"\n       target=\"_blank\"\n       title=\"Github\"\n       rel=\"noopener\">\n      <svg aria-labelledby=\"simpleicons-github-icon\"\n           role=\"img\"\n           viewBox=\"0 0 24 24\"\n           xmlns=\"http://www.w3.org/2000/svg\">\n        <title id=\"simpleicons-github-icon\">GitHub icon</title>\n        <path\n              d=\"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12\" />\n      </svg>\n    </a>\n  </li>\n  <li>\n    <a href=\"https://twitter.com/Helloooo_Newman\"\n       target=\"_blank\"\n       title=\"Twitter\"\n       rel=\"noopener\">\n      <svg aria-labelledby=\"simpleicons-twitter-icon\"\n           role=\"img\"\n           viewBox=\"0 0 24 24\"\n           xmlns=\"http://www.w3.org/2000/svg\">\n        <title id=\"simpleicons-twitter-icon\">Twitter icon</title>\n        <path\n              d=\"M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z\" />\n      </svg>\n    </a>\n  </li>\n  <li>\n    <a href=\"https://www.linkedin.com/in/helloooonewman/\"\n       target=\"_blank\"\n       title=\"Linkedin\"\n       rel=\"noopener\">\n      <svg aria-labelledby=\"simpleicons-linkedin-icon\"\n           role=\"img\"\n           viewBox=\"0 0 24 24\"\n           xmlns=\"http://www.w3.org/2000/svg\">\n        <title id=\"simpleicons-linkedin-icon\">LinkedIn icon</title>\n        <path\n              d=\"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z\" />\n      </svg>\n    </a>\n  </li>\n  <li>\n    <a href=\"https://helloooonewman.itch.io/\"\n       target=\"_blank\"\n       title=\"Itch.io\"\n       rel=\"noopener\">\n      <svg role=\"img\"\n           xmlns=\"http://www.w3.org/2000/svg\"\n           viewBox=\"0 0 24 24\">\n        <title>Itch.io icon</title>\n        <path\n              d=\"M3.129 1.338c-1.047 0.622-3.109 2.991-3.129 3.612v1.029c0 1.304 1.219 2.45 2.325 2.45 1.329 0 2.436-1.101 2.436-2.408 0 1.307 1.069 2.408 2.398 2.408s2.364-1.101 2.364-2.408c0 1.307 1.137 2.408 2.466 2.408h0.024c1.329 0 2.466-1.101 2.466-2.408 0 1.307 1.035 2.408 2.364 2.408s2.398-1.101 2.398-2.408c0 1.307 1.107 2.408 2.436 2.408 1.107 0 2.325-1.146 2.325-2.45v-1.029c-0.020-0.621-2.082-2.991-3.129-3.612-3.254-0.114-5.51-0.134-8.871-0.133s-7.945 0.053-8.871 0.133zM9.506 7.815c-0.133 0.23-0.288 0.428-0.467 0.601l-0.001 0.001c-0.502 0.49-1.189 0.794-1.947 0.794-0.001 0-0.002 0-0.003 0-0.759 0-1.447-0.303-1.949-0.795l0 0c-0.182-0.178-0.32-0.368-0.446-0.59l-0.001 0c-0.126 0.222-0.302 0.412-0.485 0.59-0.502 0.491-1.19 0.794-1.949 0.794-0.001 0-0.002 0-0.003 0h0c-0.091 0-0.186-0.025-0.263-0.052-0.107 1.112-0.152 2.175-0.168 2.95l-0 0.004c-0.002 0.394-0.004 0.717-0.006 1.167 0.021 2.334-0.231 7.564 1.029 8.849 1.953 0.455 5.546 0.663 9.151 0.664h0.001c3.605-0.001 7.198-0.209 9.151-0.664 1.26-1.285 1.008-6.516 1.029-8.849-0.002-0.45-0.004-0.773-0.006-1.167l-0-0.004c-0.016-0.775-0.061-1.838-0.168-2.95-0.077 0.026-0.172 0.052-0.263 0.052-0.001 0-0.002 0-0.002 0-0.759 0-1.447-0.303-1.949-0.795l0.001 0c-0.182-0.178-0.358-0.368-0.485-0.59l-0.001-0c-0.127 0.222-0.265 0.412-0.446 0.59-0.502 0.491-1.19 0.795-1.948 0.795-0.001 0-0.002 0-0.003 0h0c-0.758 0-1.445-0.304-1.947-0.795-0.179-0.174-0.334-0.372-0.461-0.589l-0.007-0.013c-0.132 0.23-0.286 0.428-0.463 0.602l-0 0c-0.502 0.491-1.19 0.795-1.949 0.795-0.001 0-0.002 0-0.003 0h0c-0.026 0-0.053-0.001-0.079-0.002h-0.001c-0.026 0.001-0.053 0.002-0.080 0.002-0.001 0-0.002 0-0.003 0-0.759 0-1.447-0.303-1.949-0.795l0.001 0c-0.178-0.174-0.331-0.372-0.456-0.589l-0.007-0.013zM7.502 10.406l-0 0.001h0.001c0.794 0.002 1.498 0 2.372 0.953 0.687-0.072 1.406-0.108 2.125-0.107h0.001c0.719-0.001 1.437 0.035 2.125 0.107 0.873-0.953 1.578-0.952 2.372-0.953h0.001l-0-0.001c0.375 0 1.875 0 2.92 2.935l1.122 4.026c0.832 2.995-0.266 3.069-1.636 3.071-2.031-0.076-3.156-1.551-3.156-3.026-1.124 0.184-2.436 0.276-3.748 0.276h-0.001c-1.312 0-2.624-0.092-3.748-0.276 0 1.475-1.125 2.95-3.156 3.026-1.37-0.003-2.468-0.076-1.636-3.071l1.123-4.026c1.045-2.935 2.545-2.935 2.92-2.935zM12 12.713v0.001c-0.002 0.002-2.138 1.964-2.523 2.662l1.399-0.056v1.22c0 0.057 0.561 0.034 1.123 0.008h0.001c0.562 0.026 1.123 0.049 1.123-0.008v-1.22l1.399 0.056c-0.384-0.698-2.523-2.662-2.523-2.662v-0.001l-0 0z\" />\n      </svg>\n    </a>\n  </li>\n</ul>\n";

/***/ }),

/***/ 5603:
/*!************************************!*\
  !*** ./src/assets/data/games.json ***!
  \************************************/
/***/ ((module) => {

module.exports = JSON.parse('[{"title":"Night Crawl","cover_url":"https://img.itch.zone/aW1hZ2UvMjc3MzIwLzEzNDQ1NDIucG5n/315x250%23c/Evh5T8.png","created_at":"2018-07-08 21:49:35","downloads_count":0,"id":277320,"min_price":0,"p_android":false,"p_linux":false,"p_osx":false,"p_windows":false,"published":false,"published_at":"","purchases_count":0,"short_text":"Don&#039;t let your lights go out. Find the pattern and destroy the enemies before they destroy your lights.","type":"html","url":"https://helloooonewman.itch.io/night-crawl","views_count":0}]');

/***/ }),

/***/ 2456:
/*!***************************************!*\
  !*** ./src/assets/data/projects.json ***!
  \***************************************/
/***/ ((module) => {

module.exports = JSON.parse('[{"title":"Confederation College","id":"24","thumbnail_img":"/api/sites/default/files/styles/thumbnail/public/image/project/confederation-cover.png.jpeg?itok=9skXUUAN","main_img":"/api/sites/default/files/styles/max_1300x1300/public/image/project/confederation-cover.png.jpeg?itok=uxmu-0cp","body":"This was a site rebuild of Confederation College\'s main site. We used Drupal 7 for the main site.","project_type":"Web","project_url":"http://www.confederationcollege.ca/","work_type":"","promote":false,"start_date":"Jan 2015","end_date":"Oct 2016","roles":"","gallery":[{"url":"https://www.kevinnewman.ca/api/sites/default/files/styles/max_1300x1300/public/image/project/www.confederationcollege.ca_.png.jpeg?itok=22TFaKCD","alt":"confederation college homepage"},{"url":"https://www.kevinnewman.ca/api/sites/default/files/styles/max_1300x1300/public/image/project/www.confederationcollege.ca_fort-frances.png.jpeg?itok=U0lNLJL0","alt":"confederation college campuses"},{"url":"https://www.kevinnewman.ca/api/sites/default/files/styles/max_1300x1300/public/image/project/www.confederationcollege.ca_program_dental-hygiene.png.jpeg?itok=YqbcrNZq","alt":"confederation college program"},{"url":"https://www.kevinnewman.ca/api/sites/default/files/styles/max_1300x1300/public/image/project/www.confederationcollege.ca_programs-courses_full-time-programs_filter-area-group%3Dbusiness%2Ccommunity-services%26filter-credential%3Dconfederation-college-board-of-governor-s-certificate.png.jpeg?itok=Lx2d4DRn","alt":"confederation college program search"}],"tasks":["Drupal 7 Site Build","Migration","Oracle Database connection","Client side searching of programs"],"videos":[]},{"title":"Hammer Fight","id":"20","thumbnail_img":"/api/sites/default/files/styles/thumbnail/public/image/project/14907101_1122689457826766_5304685546434170384_n.jpg.jpeg?itok=hrY8Q67s","main_img":"/api/sites/default/files/styles/max_1300x1300/public/image/project/14907101_1122689457826766_5304685546434170384_n.jpg.jpeg?itok=hovcSk5U","body":"Hammer Fight is a couch co op multiplayer that pits 2 - 4 players against each other in a death arena style setting. It places you on a foreign world where you are pitted to death against your fellow astronauts. You are tasked with a anti-gravity hammer and some your quick reflexes. You must now survive in this a death arena. Only 1 colour can survive.</p>\\n\\nThis initially started off as a game jam with 2 other friends of mine. We thought it was fun and took it a little further. We ended up showing it at Forest City Comicon in London Ontario. </p>","project_type":"3D","project_url":false,"work_type":"Team","promote":true,"start_date":"Jun 2016","end_date":"Jan 2016","roles":"Lead Developer, Team Lead","gallery":[],"tasks":["Game development","Main Programmer","Level design","Conference setup"],"videos":[]},{"title":"Hypoglycemia App","id":"9","thumbnail_img":"/api/sites/default/files/styles/thumbnail/public/image/project/hypo.jpg.jpeg?itok=DTzva7KI","main_img":"/api/sites/default/files/styles/max_1300x1300/public/image/project/hypo.jpg.jpeg?itok=prpAD6nl","body":"This was a thesis project for school, I partnered with Digital Echidna to work on the app. They did the initial design. I worked on the back-end API and the app. I used Drupal for the back-end and used AngularJS and Ionic for the front-end then wrapped it up with PhoneGap.</p>","project_type":"Web","project_url":"http://kevinnewman.ca/hypomini/","work_type":"School","promote":false,"start_date":"Jan 2015","end_date":"Jan 2015","roles":"Developer","gallery":[{"url":"https://www.kevinnewman.ca/api/sites/default/files/styles/max_1300x1300/public/image/project/hypo_0.jpg.jpeg?itok=EnjuLpCj","alt":"Hypoglycemia App"},{"url":"https://www.kevinnewman.ca/api/sites/default/files/styles/max_1300x1300/public/image/project/hypo0.jpg.jpeg?itok=zhdtoQKd","alt":"Hypoglycemia App"},{"url":"https://www.kevinnewman.ca/api/sites/default/files/styles/max_1300x1300/public/image/project/hypo1.jpg.jpeg?itok=4zQ844Vb","alt":"Hypoglycemia App"},{"url":"https://www.kevinnewman.ca/api/sites/default/files/styles/max_1300x1300/public/image/project/hypo2.jpg.jpeg?itok=6zKB1F0V","alt":"Hypoglycemia App"}],"tasks":["Drupal backend","AngularJS, Ionic 1, PhoneGap"],"videos":[]},{"title":"Indegene Omnipresence","id":"21","thumbnail_img":"/api/sites/default/files/styles/thumbnail/public/image/project/indegene.png.jpeg?itok=viSHH91H","main_img":"/api/sites/default/files/styles/max_1300x1300/public/image/project/indegene.png.jpeg?itok=0rhpkOFV","body":"This was an Ionic app I worked on with a team. It\'s a presentation and video sharing app built for Android and web. It was made to replace an existing flash app Indegene Life Systems Pvt ltd had for mobile and web. I had joined the project about 6 months into development. At this point the bare bones of the app was already set in place with Ionic and Angular 2. I worked on app scaling, new feature development and general UI implementation.</p>","project_type":"Web","project_url":"https://play.google.com/store/apps/details?id=com.indegene.io&hl=en","work_type":"Work","promote":false,"start_date":"Feb 2017","end_date":"Oct 2017","roles":"Developer","gallery":[{"url":"https://www.kevinnewman.ca/api/sites/default/files/styles/max_1300x1300/public/image/project/indegene_0.png.jpeg?itok=v7cf_ny4","alt":"indegene omnipresence heathcare app home screen"}],"tasks":["Offline sync","HTML presentations","Call center routing","Web-socket instant messaging"],"videos":[]},{"title":"Lightbox Quote Checker","id":"53","thumbnail_img":"/api/sites/default/files/styles/thumbnail/public/image/project/Screen%20Shot%202019-11-18%20at%208.05.10%20PM.png.jpeg?itok=SWJjVJ80","main_img":"/api/sites/default/files/styles/max_1300x1300/public/image/project/Screen%20Shot%202019-11-18%20at%208.05.10%20PM.png.jpeg?itok=QoCwOq5-","body":"Tells you whether the message you want to type will work with the letters and length of the sign. Will also allow for substitutions of characters.</p>\\n\\nThis was a project I made working at Xello as part of their \\"Successful Futures Day\\". I got the slack bot working in the first day and worked towards the react site in the next few days. </p>\\n\\nIntegrates into Slack as a bot <a href=\\"https://github.com/HellooooNewman/Lightbox-Quote-Checker\\">Here</a></p>\\n\\n<h2>Features:</h2>\\n\\n<ul><li>Text alternatives (3 = E)</li>\\n\\t<li>Character limits = (only 3 E’s)</li>\\n\\t<li>Sentence length check (40 characters)</li>\\n\\t<li>Invalid character check (A-Z, 0-9, #&amp;@)</li>\\n\\t<li>Word length check(Max 10 letters per word)</li>\\n\\t<li>Too many line breaks in the sentence(Max 3 line breaks)</li>\\n</ul>","project_type":"Web","project_url":"https://www.kevinnewman.ca/lightbox-quote-checker/","work_type":"Personal","promote":true,"start_date":"Nov 2019","end_date":"Nov 2019","roles":"Designer, Developer","gallery":[],"tasks":["Design","Slackbot","React Site","Automated Tests (Jest, Enzyme)","Node.js Server"],"videos":[{"url":"https://www.kevinnewman.ca/api/sites/default/files/video/project/quote.mp4"}]},{"title":"Metrick System / Trailerworks","id":"52","thumbnail_img":"/api/sites/default/files/styles/thumbnail/public/image/project/trailerworks.com_.png.jpeg?itok=K7OfWebm","main_img":"/api/sites/default/files/styles/max_1300x1300/public/image/project/trailerworks.com_.png.jpeg?itok=viW80Os_","body":"I worked with the Metrick System to build out two new client facing sites to rebrand both of their businesses. The first was <a href=\\"http://www.metricksystem.com\\">metricksystem.com</a>, which was designed to be a simple layout built in React that would highlight unique case studies they had, as well as managing their past case studies. </p>\\n\\nThe second site, <a href=\\"http://www.trailerworks.com\\">trailerworks.com</a>, was built on top of the existing React site but enhanced to feature dynamic layouts of case studies, drawing SVGs, light and dark theme of site as well as new and improved site look.</p>\\n\\nI helped to launch the <a href=\\"http://www.randomactsofmusic.ca\\">randomactsofmusic.ca</a> which featured the Yamaha: Going Solo Series site, with weekly updates relating to their YouTube channel.</p>","project_type":"Web","project_url":"http://www.trailerworks.com","work_type":"Work","promote":false,"start_date":"Sep 2019","end_date":"Dec 2018","roles":"Lead Developer","gallery":[{"url":"https://www.kevinnewman.ca/api/sites/default/files/styles/max_1300x1300/public/image/project/trailerworks.com__2.png.jpeg?itok=FrzFsA0z","alt":"homepage"},{"url":"https://www.kevinnewman.ca/api/sites/default/files/styles/max_1300x1300/public/image/project/trailerworks.com_case-studies_yamaha.png.jpeg?itok=y1n6sdsD","alt":"Case study"},{"url":"https://www.kevinnewman.ca/api/sites/default/files/styles/max_1300x1300/public/image/project/trailerworks.com_case-studies_yamaha%20%282%29.png.jpeg?itok=5XCqUR5n","alt":"Menu"},{"url":"https://www.kevinnewman.ca/api/sites/default/files/styles/max_1300x1300/public/image/project/trailerworks.com_case-studies_yamaha%20%281%29.png.jpeg?itok=_00OcNaf","alt":"Footer"}],"tasks":["React site build","Redux: light/dark theme, case studies, mailing list","Dynamically drawn svgs","Templated case studies section","Documentation for maintaining site, hosting and code","Help package 300 jars of honey"],"videos":[]},{"title":"Tesla","id":"12","thumbnail_img":"/api/sites/default/files/styles/thumbnail/public/image/project/tesla.png.jpeg?itok=h28sI2fi","main_img":"/api/sites/default/files/styles/max_1300x1300/public/image/project/tesla.png.jpeg?itok=uM5wfsQA","body":"I was partnered with another student to create a new UI for Tesla\'s dashboard, user dashboard and smartphone app. The theme we went with was dots and lines. I did the user dashboard and smartphone app.</p>","project_type":"Design","project_url":"http://kevinnewman.ca/tesla/","work_type":"School","promote":false,"start_date":"Jan 2014","end_date":"Jan 2014","roles":"Designer","gallery":[{"url":"https://www.kevinnewman.ca/api/sites/default/files/styles/max_1300x1300/public/image/project/tesla.jpg.jpeg?itok=7r4dUic1","alt":"tesla"},{"url":"https://www.kevinnewman.ca/api/sites/default/files/styles/max_1300x1300/public/image/project/tesla0.jpg.jpeg?itok=CANPovTz","alt":"tesla"},{"url":"https://www.kevinnewman.ca/api/sites/default/files/styles/max_1300x1300/public/image/project/tesla1.jpg.jpeg?itok=N0z3OU_m","alt":"tesla"},{"url":"https://www.kevinnewman.ca/api/sites/default/files/styles/max_1300x1300/public/image/project/tesla2.jpg.jpeg?itok=PsfTLnrw","alt":"tesla"}],"tasks":["app design","concepting"],"videos":[]},{"title":"TVO Kids","id":"22","thumbnail_img":"/api/sites/default/files/styles/thumbnail/public/image/project/tvokids-cover.png.jpeg?itok=DJCx1kHP","main_img":"/api/sites/default/files/styles/max_1300x1300/public/image/project/tvokids-cover.png.jpeg?itok=NRP9-9fP","body":"This was a rebuild of tvokids.com from a flash site to modern HTML5 site. It\'s a Drupal 7 site build using a custom built theme with a heavy javascript front-end. I was a part of a team while working on this at Digital Echidna. I mainly worked on the client side search, videos page and detail pages.</p>","project_type":"Web","project_url":"https://tvokids.com/","work_type":"Work","promote":false,"start_date":"Jan 2015","end_date":"Jan 2015","roles":"Developer","gallery":[{"url":"https://www.kevinnewman.ca/api/sites/default/files/styles/max_1300x1300/public/image/project/tvokids.com_preschool_1.png.jpeg?itok=Eu8Mi2ri","alt":"TVO kids pre school"},{"url":"https://www.kevinnewman.ca/api/sites/default/files/styles/max_1300x1300/public/image/project/tvokids.com_school-age_apps_1.png.jpeg?itok=HCalLYeh","alt":"tvokids school age apps"},{"url":"https://www.kevinnewman.ca/api/sites/default/files/styles/max_1300x1300/public/image/project/tvokids.com_school-age_arthur-0_1.png.jpeg?itok=Kbeng8Qh","alt":"tvokids school age arthur"},{"url":"https://www.kevinnewman.ca/api/sites/default/files/styles/max_1300x1300/public/image/project/tvokids.com_school-age_games_1.png.jpeg?itok=Rlb3ND-2","alt":"tvokids games"}],"tasks":["Client side filtering","Fun and vibrant feel","Responsive website with lots of touch options"],"videos":[]},{"title":"U of T KPE","id":"23","thumbnail_img":"/api/sites/default/files/styles/thumbnail/public/image/project/uoft-kpe-cover.png.jpeg?itok=FaDtrIF-","main_img":"/api/sites/default/files/styles/max_1300x1300/public/image/project/uoft-kpe-cover.png.jpeg?itok=rOn7QtZH","body":"This was a rebuild of an existing site that required migration of their old content to there new site. This was a full Drupal 8 site build while Drupal 8 was still in development. This added some complexity because Drupal 8 wasn\'t widely used so there was a bit of research that needed to be done into custom modules. We followed a brand guideline placed out by U of T.</p>","project_type":"Web","project_url":"https://kpe.utoronto.ca/","work_type":"Work","promote":false,"start_date":"Jun 2015","end_date":"Dec 2015","roles":"Team Lead","gallery":[{"url":"https://www.kevinnewman.ca/api/sites/default/files/styles/max_1300x1300/public/image/project/kpe.utoronto.ca_.png.jpeg?itok=73LuEPmR","alt":"u of t kpe university of toronto"},{"url":"https://www.kevinnewman.ca/api/sites/default/files/styles/max_1300x1300/public/image/project/kpe.utoronto.ca_academics-research_bachelor-kinesiology-bkin.png.jpeg?itok=4zQgN2p_","alt":"u of t kpe bachelor of kinesiology"},{"url":"https://www.kevinnewman.ca/api/sites/default/files/styles/max_1300x1300/public/image/project/kpe.utoronto.ca_events.png.jpeg?itok=jgDx6YYN","alt":"u of t kpe event calendar"},{"url":"https://www.kevinnewman.ca/api/sites/default/files/styles/max_1300x1300/public/image/project/kpe.utoronto.ca_facility-notices.png.jpeg?itok=EkvWxmcQ","alt":"u of t kpe facility notices"},{"url":"https://www.kevinnewman.ca/api/sites/default/files/styles/max_1300x1300/public/image/project/kpe.utoronto.ca_sport-and-fitness_baseball-fastpitch-softball.png.jpeg?itok=QpFEpKEx","alt":"u of t kpe baseball"}],"tasks":["Drupal 8 site build","Module development","Theming"],"videos":[]},{"title":"Ye Olde Dragon","id":"19","thumbnail_img":"/api/sites/default/files/styles/thumbnail/public/image/project/dragon_0.jpg.jpeg?itok=dZiQbymY","main_img":"/api/sites/default/files/styles/max_1300x1300/public/image/project/dragon_0.jpg.jpeg?itok=CYGAZA1Y","body":"This was made for a 3d mini competition for the website www.gameartisans.org. The competition was to make a low poly dragon character that was under 15000 tris with the use of 3 maps: spec, diffuse, and normal map at 2048 texture size.</p>","project_type":"3D, Design","project_url":"https://p3d.in/dgBVe","work_type":"Personal","promote":false,"start_date":"Jan 2014","end_date":"Jan 2014","roles":"Designer","gallery":[{"url":"https://www.kevinnewman.ca/api/sites/default/files/styles/max_1300x1300/public/image/project/dragon0.jpg.jpeg?itok=9bTu_1rZ","alt":"Ye Olde Dragon"},{"url":"https://www.kevinnewman.ca/api/sites/default/files/styles/max_1300x1300/public/image/project/dragon1.jpg.jpeg?itok=vKWMaX6I","alt":"Ye Olde Dragon"},{"url":"https://www.kevinnewman.ca/api/sites/default/files/styles/max_1300x1300/public/image/project/dragon2.jpg.jpeg?itok=S9W1V2l6","alt":"Ye Olde Dragon"}],"tasks":[],"videos":[]}]');

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map