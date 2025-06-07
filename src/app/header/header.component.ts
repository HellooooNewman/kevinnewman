import { DataService } from './../services/services.data';
import { Component, ViewChild, ElementRef, NgZone, HostListener, Inject, ViewEncapsulation, AfterViewInit, Renderer2, OnDestroy, ChangeDetectorRef, OnInit } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { Router, NavigationEnd } from '@angular/router';
import { Star } from '../interfaces/star';
import { Line } from '../interfaces/line';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationToggleComponent } from '../translation-toggle/translation-toggle.component';
import { SocialMediaLinksComponent } from '../social-media-links/social-media-links.component';
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Constants for canvas and scroll thresholds
const CANVAS_HEIGHT = 500;
const SCROLL_THRESHOLD_1 = 270;
const SCROLL_THRESHOLD_2 = 339;

// canvas dimensions
let width = window.innerWidth;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, RouterModule, TranslateModule, TranslationToggleComponent, SocialMediaLinksComponent, AsyncPipe],
})
export class HeaderComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild('mainNav') mainNav: ElementRef;
  public position: string;

  // Canvas
  @ViewChild('skyCanvas') canvasRef: ElementRef;
  public ctx: CanvasRenderingContext2D | null = null;
  public canvas: HTMLCanvasElement | null = null;
  private running: boolean = false;
  openedBool: boolean = false;
  isActive: boolean = false;
  isDarkMode: boolean = false;

  // Particles
  private maxParticles: number = 50;
  private particles: Star[] = [];
  private backgroundParticles: Star[] = [];

  // Lines
  private maxLines: number = 35;
  private lines: (Line | Star)[] = [];

  // Moon properties
  private moonX: number = window.innerWidth - 200; // Start at the far right edge
  private moonY: number = 90; // High in the sky
  private moonRadius: number = 60; // Large moon
  private moonSpeed: number = 0.04; // Very slow

  private lastTimestamp: number = performance.now();

  constructor(
    public ngZone: NgZone,
    public dataService: DataService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.router.events.subscribe(event => {
      this.openedBool = false;
    });
  }

  ngOnInit() {
    // Initialize dark mode from localStorage if present
    const stored = localStorage.getItem('dark-mode');
    if (stored !== null) {
      this.isDarkMode = stored === 'true';
      this.cdr.markForCheck();
    }
  }

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
    this.lastTimestamp = performance.now();
    this.ngZone.runOutsideAngular(() => this.update(this.lastTimestamp));

    // Dark mode check: system preference, then fallback to light
    const stored = localStorage.getItem('dark-mode');
    if (stored === 'true' || stored === 'false') {
      this.isDarkMode = stored === 'true';
    } else {
      this.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    this.setDarkMode();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.openedBool = false;

    // Use named constants for scroll thresholds
    let scrollPosition = this.document.scrollingElement.scrollTop;
    if (scrollPosition > SCROLL_THRESHOLD_1 && scrollPosition < SCROLL_THRESHOLD_2) {
      this.position = '-' + (scrollPosition - SCROLL_THRESHOLD_1);
    }

    if (scrollPosition > SCROLL_THRESHOLD_2) {
      this.position = '-67';
    }

    if (scrollPosition < SCROLL_THRESHOLD_1) {
      this.position = '0';
    }
  }

  @HostListener('mousemove', ['$event'])
  draw(event: MouseEvent): void {
    if (event.target !== this.canvas) {
      return;
    }

    // Add a new Star at the mouse position, accounting for scroll
    const scrollY = window.scrollY || this.document.scrollingElement.scrollTop || 0;
    this.maxLines++;
    this.lines.push(new Star(undefined, event.clientX, event.clientY + scrollY));
  }

  @HostListener('window:resize', [])
  resize(): void {
    if (this.canvas) {
      this.canvas.width = window.innerWidth;
    }
    width = window.innerWidth;
  }

  ngOnDestroy(): void {
    // Stop the animation loop when the component is destroyed
    this.running = false;
  }

  private update = (timestamp: number = performance.now()): void => {
    if (!this.running || !this.ctx) {
      return;
    }

    // Normalize to 60fps
    const delta = (timestamp - this.lastTimestamp) / 16.67;
    this.lastTimestamp = timestamp;

    this.ctx.clearRect(0, 0, window.innerWidth, CANVAS_HEIGHT);

    // Draw the moon (before stars/lines)
    this.ctx.save();
    this.ctx.globalAlpha = 0.35;
    this.ctx.beginPath();
    this.ctx.arc(this.moonX, this.moonY, this.moonRadius, 0, 2 * Math.PI);
    this.ctx.fillStyle = '#444'; // darker grey
    this.ctx.shadowColor = '#222';
    this.ctx.shadowBlur = 30;
    this.ctx.fill();
    this.ctx.restore();

    // Move the moon slowly
    this.moonX += this.moonSpeed * delta;
    if (this.moonX - this.moonRadius > window.innerWidth) {
      this.moonX = -this.moonRadius; // Loop to left
    }

    // Draw and update lines (shooting stars)
    for (let i = 0; i < this.maxLines; i++) {
      this.lines[i].update(delta);
      this.lines[i].draw(this.ctx);
    }

    // Draw and update stars
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles[i].update(delta);
      this.particles[i].draw(this.ctx);
      this.backgroundParticles[i].draw(this.ctx);
      this.backgroundParticles[i].update(delta);
    }
    requestAnimationFrame(this.update);
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.setDarkMode();
    this.cdr.detectChanges();
  }

  setDarkMode() {
    localStorage.setItem('dark-mode', this.isDarkMode.toString());
    this.renderer[this.isDarkMode ? 'addClass' : 'removeClass'](document.documentElement, 'dark-mode');
  }
}
