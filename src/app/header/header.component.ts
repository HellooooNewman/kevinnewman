import { SocialMediaLinksComponent } from './../social-media-links/social-media-links.component';
import { DataService } from './../services/services.data';
import { Component, OnInit, ViewChild, ElementRef, NgZone, HostListener, Inject, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';

// canvas dimensions
let width = window.innerWidth;
const height = 500;
// const height = 500;

export class Star {
  public modifer;
  public x: any;
  public y: any;
  public vx: any;
  public vy: any;
  public radius: any;
  public color: String;

  constructor(modifer?: any, posX?: number, posY?: number) {
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

export class Line {
  public modifer;
  public x: any;
  public y: any;
  public vx: any;
  public vy: any;
  public stroke: any;
  public color: String;

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

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('mainNav') mainNav: ElementRef;
  public position: string;

  // Canvas
  @ViewChild('skyCanvas') canvasRef: ElementRef;
  public ctx: CanvasRenderingContext2D;
  public canvas;
  private running: boolean;
  openedBool: boolean = false;
  isActive: boolean = false;

  // Particles
  private maxParticles = 50;
  private particles = [];
  private backgroundParticles = [];

  // Lines
  private maxLines = 35;
  private lines = [];

  constructor(public ngZone: NgZone,
    public dataService: DataService,
    @Inject(DOCUMENT) private document: Document,
    private router: Router) {
    this.router.events.subscribe(event => {
      this.openedBool = false;
    });
  }

  ngOnInit() {
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
  }

  @HostListener('window:scroll', [])
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

  @HostListener('click', ['$event'])
  draw(event) {
    if (event.target !== this.canvas) {
      return;
    }

    this.maxLines++;
    this.lines.push(new Star(null, event.clientX, event.clientY));
  }

  @HostListener('window:resize', [])
  resize() {
    this.canvas.width = window.innerWidth;
    width = window.innerWidth;
  }

  OnDestroy() {
    this.running = false;
  }

  private update() {
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
}
