import { TruncatePipe } from "./../pipes/truncate"
import { Project } from "./../interfaces/common"
import { Observable } from "rxjs/Rx"
import "rxjs/add/operator/filter"
import { DataService } from "./../services/services.data"
import { Component, OnInit, HostListener } from "@angular/core"
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

    // @HostListener('window:onbeforeprint', ['$event.target'])
    // onPrint() {
    //   console.log(`You clicked on`);
    //   for(let project of this.projects) {
    //     project.showDetails = true;
    //   }
    // }

    public resume = {
        introduction:
            "<p>Hi there, I’m Kevin Newman, a developer, designer and hobbyist living in Canada. I like to make responsive websites, captivating videos and 3D models. In my off time, you can usually find me playing/making some video games, working on a side project, or doodling some little drawings. I try to keep up with the current trends in technology by going to developer meetups in the area. </p><p>Currently working on a Unity couch co-op multiplayer game called Hammer Fight.",
        work: {
            jobs: [
                {
                    showDetails: true,
                    logo: "./assets/company-logos/xello.svg",
                    title: "Frontend Web Developer",
                    year: "Jan 2019 - Present",
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
                    <li>Created documentation site for product along with a content writer http://help.xello.world/</li>
                    <li>Agile scrum sprints and demo at the end of sprint</li>
                    <li>Hackathons one day every day sprint towards self learning</li>
                    <li>Adding to and updating existing microservices architecture</li>
                    </ul>`,
                    technology: "ES6, SCSS, Angular, NgRx, Rxjs, .NET, SQL, SlackBot API, Jest, Jenkins, Octopus",
                },
                {
                    showDetails: true,
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
                    <li>Managed support requests from users, writers, artists, teachers</li>
                    </ul>`,
                    technology:
                        "Vue, Laravel, Webpack, DigitalOcean, Photoshop Action Scripts, Docker, Git, SCSS",
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
                    title: "3D Frontend Developer",
                    year: "Oct 2017 - Feb 2018",
                    employer: "GE",
                    employer_link: "http://www.gegridsolutions.com/",
                    employment_type: "Contract",
                    location: "Markham, CA",
                    points: `<ul>
                    <li>Create 3D marketing apps with Babylon for different divisions of GE(Healthcare, Energy, Grid Solutions)</li>
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
                    technology:
                        "Angular 2, Ionic 3, RXjs, Cordova, Nodejs, Git, Gulp, Webpack, SCSS, Redux",
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
                    technology:
                        "Drupal 7/8, JQuery, ES5, SCSS, Python, PHP, MySQL, Git",
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
    }

    constructor(
        private dataService: DataService
    ) {}

    async ngOnInit() {
        this.dataService.setTitle("Home")
        this.loading = true
        if (!this.dataService.projectsLoaded) {
            this.dataService.getFeaturedProjects()
            this.loading = false
        }
        this.projects = await this.dataService.project.map(_project =>
            _project.filter(item => {
                if (item.promote === "True") {
                    return item
                }
            })
        )
    }
}
