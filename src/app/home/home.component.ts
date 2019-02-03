import { TruncatePipe } from "./../pipes/truncate"
import { Project } from "./../interfaces/common"
import { Observable } from "rxjs/Rx"
import "rxjs/add/operator/filter"
import { DataService } from "./../services/services.data"
import { Component, OnInit } from "@angular/core"
import { Title } from "@angular/platform-browser"

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
    public projects: Observable<Project[]>
    loading: boolean = false
    config: SwiperOptions = {
        pagination: ".swiper-pagination",
        paginationClickable: true,
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
        slidesPerView: 2,
        spaceBetween: 10,
        grabCursor: true,
    }

    public resume = {
        introduction:
            "<p>Hi there, I’m Kevin Newman, a developer, designer and hobbyist living in Canada. I like to make responsive websites, captivating videos and 3D models. In my off time, you can usually find me playing/making some video games, working on a side project, or doodling some little drawings. I try to keep up with the current trends in technology by going to developer meetups in the area. </p><p>Currently working on a Unity couch co-op multiplayer game called Hammer Fight.",
        work: {
            jobs: [
                {
                    logo: "./assets/company-logos/xello.svg",
                    title: "Frontend Web Developer",
                    year: "Jan 2019 - Present",
                    employer: "Xello",
                    employer_link: "http://xello.world/",
                    location: "Toronto, CA",
                    desc: "",
                    points: `<ul>
                    <li>Frontend development of Angular 2+ applications as well as maintance of AngularJs apps</li>
                    <li>Unit test code to ensure quality</li>
                    <li>2 weeks sprints in an agile setting</li>
                    </ul>`,
                    technology: "ES6, HTML, SCSS, Angular 2+, ",
                },
                {
                    logo: "./assets/company-logos/Wuzzals.svg",
                    title: "Full Stack Web Developer",
                    year: "Oct 2018 - Present",
                    employer: "Wuzzals",
                    employer_link: "https://www.wuzzals.com",
                    location: "Toronto, CA",
                    desc: "",
                    points: `<ul>
                    <li>Laravel REST api, Vue.js frontend</li>
                    <li>Feature development and maintenance(nginx, redis)</li>
                    <li>HTML5 animations using CSS3, SVGs, Canvas, Greensock for covers</li>
                    <li>Manage support requests from users (Writers, Artists, Students, Teachers)</li>
                    </ul>`,
                    technology:
                        "ES6, HTML, SCSS, Vue, Laravel, Redux, PHP, React Native",
                },
                {
                    logo: "./assets/company-logos/trailerworks.svg",
                    title: "Full Stack Web Developer",
                    year: "Aug 2018 - Jan 2019",
                    employer: "Trailerworks",
                    employer_link: "http://www.trailerworks.com",
                    location: "Toronto, CA",
                    desc: "",
                    points: `<ul>
                    <li>Interim and current website in React</li>
                    <li>Technical estimates for RFPs</li>
                    <li>Manage exiting Magento Ecommerce site</li>
                    <li>Shopify ecommerce bees website</li>
                    </ul>`,
                    technology: "React, Node, Magento",
                },
                {
                    logo: "./assets/company-logos/Grassriots.png",
                    title: "Full Stack Web Developer",
                    year: "March 2018 - July 2018",
                    employer: "Grassriots",
                    employer_link: "http://www.grassriots.com/",
                    location: "Toronto, CA",
                    points: `<ul>
                    <li>Created documentation/wikis for existing code and processes</li>
                    <li>Made application multilingual with ability to add or remove languages easily</li>
                    <li>Improved product development and deployment times from over a month to a week and half</li>
                    <li>Improve webpack config and processes to decrease development time and increase performance and reliability of app</li>
                    <li>Clients: Choice Australia, Human Society International, Cystic Fibrosis Canada, Ecojustice, UNICEF Canada, World Vision</li>
                    </ul>`,
                    technology: "ES6, HTML, SCSS, PHP",
                },
                {
                    logo: "./assets/company-logos/GE.png",
                    title: "3D Frontend Developer",
                    year: "Oct 2017 - Feb 2018",
                    employer: "GE",
                    employer_link: "http://www.gegridsolutions.com/",
                    location: "Markham, CA",
                    points: `<ul>
                    <li>Create 3D marketing web apps with Babylon for different divisions of GE</li>
                    <li>Prototype and compare different Frontend frameworks to GE's current software solution</li>
                    <li>Convert flash application to HTML5 application with Vue that publishes to web and desktop (Electron)</li>
                    </ul>`,
                    technology: "Babylon, Electron, Haxe, Vue, SVN, LESS",
                },
                {
                    logo: "./assets/company-logos/Indegene.png",
                    title: "Front-end Developer",
                    year: "Feb 2017 - Oct 2017",
                    employer: "Indegene",
                    employer_link: "https://www.indegene.com/",
                    location: "Oakville, CA",
                    points: `<ul>
                    <li>Angular 2 development of components</li>
                    <li>Front end theming of Ionic 3 hybrid web and android app</li>
                    <li>Work with Java Spring team to plan and change backend services</li>
                    <li>Manage offline android state</li>
                    <li>Worked with team to implement redux into existing application</li>
                    <li>Interviewing and onboarding new hires</li>
                    <li>Internalization of app</li>
                    </ul>`,
                    technology:
                        "Angular 2, Ionic 3, RXjs, Cordova, Nodejs, Git, Gulp, Webpack, SCSS",
                },
                {
                    logo: "./assets/company-logos/echidna.png",
                    title: "Full Stack Web Developer",
                    year: "Feb 2015 - Feb 2017",
                    employer: "Digital Echidna",
                    employer_link: "http://www.echidna.ca/",
                    location: "London, CA",
                    points: `<ul>
                            <li>Front-end theming of Drupal sites</li>
                            <li>Back-end module development</li>
                            <li>Python site scraping</li>
                            <li>Drupal 8 code sprints : Ohio and Toronto</li>
                            <li>Manage and update CodeIgniter site</li>
                            <li>Onboard co-ops and new hires</li>
                            <li>Meet AODA standards</li>`,
                    technology:
                        "Drupal 7/8, JQuery, ES5, SCSS, Python, PHP, MySQL",
                },
            ],
        },
        skills: [
            {
                title: "Code",
                list: [
                    "HTML5 - PHP - ES6 - C# - Bash - Typescript",
                    "CSS3 - SCSS - LESS",
                    "CodeIgniter - Laravel - Wordpress - Drupal 7/8",
                    "Angular 2 - JQuery - Ionic - Vue - React",
                    "Highcharts - Babylon - RXjs",
                    "MVC - OOP - Rest API - Redux",
                    "Git - SVN",
                    "Gulp - Webpack - Grunt - Webhooks",
                    "NPM - Bower - Yarn",
                    "AWS - Digital Ocean",
                ],
            },
            {
                title: "Tools",
                list: [
                    "PC - Mac",
                    "Photoshop - Illustrator",
                    "Sketch - AdobeXD",
                    "After Effects - Premiere",
                    "3ds Max - Blender",
                    "Github - Bitbucket - Gitlab",
                    "Unity",
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
                year: "Fanshawe - 2011 -2013",
            },
            {
                program: "3d Character Design & Animation",
                year: "Fanshawe - 2013 -2014",
            },
            {
                program: "Interactive Media Specialist",
                year: "Fanshawe - 2014 - 2015",
            },
        ],
    }

    constructor(
        private titleService: Title,
        private dataService: DataService
    ) {}

    async ngOnInit() {
        this.dataService.setTitle("Home")
        this.loading = true
        if (!this.dataService.projectsLoaded) {
            this.dataService.getFeaturedProjects()
            this.loading = false
        }
        this.projects = await this.dataService.featured.map(project =>
            project.filter(item => {
                if (item.promote === "True") {
                    return item
                }
            })
        )
    }
}
