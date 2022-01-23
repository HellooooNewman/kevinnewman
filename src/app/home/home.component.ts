import { Project } from "./../interfaces/common"
import { Observable } from "rxjs/Rx"
import "rxjs/add/operator/filter"
import { DataService } from "./../services/services.data"
import { Component, OnInit } from "@angular/core"
import { map } from "rxjs/operators"

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  public projects$: Observable<Project[]>
  loading: boolean = false

  public resume = {
    introduction: "resume.introduction",
    work: {
      jobs: [
        {
          showDetails: true,
          logo: "./assets/company-logos/sonar.svg",
          title: "softwareDeveloper",
          employer: "Sonar Software",
          employer_link: "http://sonar.software/",
          employment_type: "fullTime",
          location: "remote",
          technology: "ES6, SCSS, Vue.js, PHP, Laravel, Graphql, SQL, Azure, CircleCI, Flutter",
        },
        {
          showDetails: false,
          logo: "./assets/company-logos/xello.svg",
          title: "fullStackWebDeveloper",
          employer: "Xello",
          employer_link: "http://xello.world/",
          employment_type: "fullTime",
          location: "Toronto, CA",
          technology: "ES6, SCSS, Angular, NgRx, Rxjs, .NET, SQL, SlackBot API, Jest, Jenkins, Octopus, Azure",
        },
        {
          showDetails: false,
          logo: "./assets/company-logos/Wuzzals.svg",
          title: "fullStackWebDeveloper",
          employer: "Wuzzals",
          employer_link: "https://www.wuzzals.com",
          employment_type: "contract",
          location: "Toronto, CA",
          technology:
            "Vue, Laravel, Webpack, DigitalOcean, Photoshop Action Scripts, Docker, Git, SCSS, DigitalOcean",
        },
        {
          showDetails: false,
          logo: "./assets/company-logos/trailerworks.svg",
          title: "fullStackWebDeveloper",
          employer: "Trailerworks",
          employer_link: "http://www.trailerworks.com",
          employment_type: "contract",
          location: "Toronto, CA",
          technology: "React, Redux, SVG, Adobe XD, Magento, SCSS, Git",
        },
        {
          showDetails: false,
          logo: "./assets/company-logos/Grassriots.png",
          title: "fullStackWebDeveloper",
          employer: "Grassriots",
          employer_link: "http://www.grassriots.com/",
          employment_type: "contract",
          location: "Toronto, CA",
          technology: "ES6, JQuery, Webpack, AWS EC2, PHP, .NET, Git, Node.js, Babel",
        },
        {
          showDetails: false,
          logo: "./assets/company-logos/GE.png",
          title: "frontendDeveloper",
          employer: "GE",
          employer_link: "http://www.gegridsolutions.com/",
          employment_type: "contract",
          location: "Markham, CA",
          technology: "Babylon, Electron, Haxe, Vue, SVN, LESS, Webpack, Git",
        },
        {
          showDetails: false,
          logo: "./assets/company-logos/Indegene.png",
          title: "frontendDeveloper",
          employer: "Indegene",
          employer_link: "https://www.indegene.com/",
          employment_type: "fullTime",
          location: "Oakville, CA",
          technology:
            "Angular 2, Ionic 3, RXjs, Cordova, Nodejs, Git, Gulp, Webpack, SCSS, Redux",
        },
        {
          showDetails: false,
          logo: "./assets/company-logos/echidna.png",
          title: "fullStackWebDeveloper",
          employer: "Digital Echidna",
          employer_link: "http://www.echidna.ca/",
          employment_type: "fullTime",
          location: "London, CA",
          technology:
            "Drupal 7/8, JQuery, ES5, SCSS, Python, PHP, MySQL, Git",
        },
      ],
    },
    skills: [
      {
        title: "code",
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
        title: "tools",
        list: [
          "Mac - PC",
          "VS Code",
          "Photoshop - Illustrator",
          "Figma",
          "After Effects - Premiere",
          "Blender",
          "Github - Bitbucket - Gitlab",
          "Unity",
          "NPM - Bower - Yarn",
          "AWS - Digital Ocean - Azure",
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
  ) { }

  async ngOnInit() {
    this.dataService.setTitle("home")
    this.projects$ = this.dataService.project.pipe(
      map(todos => todos.filter(item => item.promote === true))
    );
    this.dataService.getAllProjects()
  }
}
