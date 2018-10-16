import { TruncatePipe } from './../pipes/truncate';
import { Project } from './../interfaces/common';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/filter';
import { DataService } from './../services/services.data';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public projects: Observable<Project[]>;

  config: SwiperOptions = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    slidesPerView: 2,
    spaceBetween: 10,
    grabCursor: true,
  };

  public resume = {
    introduction: "<p>Hi there, I’m Kevin Newman, a developer, designer and hobbyist living in Canada. I like to make responsive websites, captivating videos and 3D models. In my off time, you can usually find me playing/making some video games, working on a side project, or doodling some little drawings. I try to keep up with the current trends in technology by going to developer meetups in the area. </p><p>Currently working on a Unity game couch co-op multiplayer game. More to come soon.</p>",
    work: {
      jobs: [{
        title: "Full Stack Web Developer",
        year: "March 2018 - July 2018",
        employer: "Grassriots",
        employer_link: "http://www.grassriots.com/",
        location: "Toronto, CA",
        points: [
          "Created documentation/wikis for existing code and processes",
          "Made application multilingual with ability to add or remove languages easily",
          "Improved product development and deployment times from over a month to a week and half",
          "Improve webpack config and processes to decrease development time and increase performance and reliability of app",
          "Clients: Choice Australia, Human Society International, Cystic Fibrosis Canada, Ecojustice, UNICEF Canada, World Vision"
        ],
        technology: "ES6, HTML, SCSS, PHP"
      },
      {
        title: "3D Frontend Developer",
        year: "Oct 2017 - Feb 2018",
        employer: "GE",
        employer_link: "http://www.gegridsolutions.com/",
        location: "Markham, CA",
        points: [
          "Create 3D marketing web apps with Babylon for different divisions of GE",
          "Prototype and compare different Frontend frameworks to GE's current software solution",
          "Convert flash application to HTML5 application with Vue that publishes to web and desktop (Electron)"
        ],
        technology: "Babylon, Electron, Haxe, Vue, SVN, LESS"
      },
      {
        title: "Front-end Developer",
        year: "Feb 2017 - Oct 2017",
        employer: "Indegene",
        employer_link: "https://www.indegene.com/",
        location: "Oakville, CA",
        points: [
          "Angular 2 development of components",
          "Front end theming of Ionic 3 hybrid web and android app",
          "Work with Java Spring team to plan and change backend services",
          "Manage offline android state",
          "Worked with team to implement redux into existing application",
          "Interviewing and onboarding new hires",
          "Internalization of app"
        ],
        technology: "Angular 2, Ionic 3, RXjs, Cordova, Nodejs, Git, Gulp, Webpack, SCSS"
      },
      {
        title: "Full Stack Web Developer",
        year: "Feb 2015 - Feb 2017",
        employer: "Digital Echidna",
        employer_link: "http://www.echidna.ca/",
        location: "London, CA",
        points: [
          "Front-end theming of Drupal sites",
          "Back-end module development",
          "Python site scraping",
          "Drupal 8 code sprints : Ohio and Toronto",
          "Manage and update CodeIgniter site",
          "Onboard co-ops and new hires",
          "Meet AODA standards"
        ],
        technology: "Drupal 7/8, JQuery, SCSS, Python, PHP, MySQL"
      }]
    },
    skills: [
      {
        title: "Code",
        list: [
          "HTML5 - PHP - ES6 - C# - Bash - Typescript",
          "CSS3 - SCSS - LESS",
          "CodeIgniter - Laravel - Wordpress - Drupal7/8",
          "Angular 2 - JQuery - Ionic - Vue - React",
          "Highcharts - Babylon - RXjs",
          "MVC - OOP - Rest API - Redux",
          "Git - SVN",
          "Gulp - Webpack - Grunt",
          "NPM - Bower - Yarn"
        ]
      },
      {
        title: "Tools",
        list: [
          "PC - Mac",
          "Photoshop - Illustrator",
          "Sketch - AdobeXD",
          "After Effects - Premiere",
          "3ds Max - 4D Cinema - Blender",
          "Github - Bitbucket - Gitlab",
          "Unity"
        ]
      },
      {
        title: "Design",
        list: [
          "Mobile/Web design",
          "App design",
          "Modeling - Animating - Rigging",
          "Motion graphics",
          "Character concepting"
        ]
      }],
    education: [{
      program: "Interactive Media Design",
      year: "Fanshawe - 2011 -2013"
    },
    {
      program: "3d Character Design &amp; Animation",
      year: "Fanshawe - 2013 -2014"
    },
    {
      program: "Interactive Media Specialist",
      year: "Fanshawe - 2014 - 2015"
    }]
  };

  constructor(private titleService: Title,
    private dataService: DataService) { }

  async ngOnInit() {
    this.dataService.setTitle('Home');

    if (!this.dataService.projectsLoaded) {
      this.dataService.getAllProjects();
    }
    this.projects = await this.dataService.project.map(project =>
      project.filter(item => {
        if (item.promote === 'True') {
          return item;
        }
      })
    );
  }
}
