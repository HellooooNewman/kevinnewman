import { Component } from '@angular/core';

@Component({
  selector: 'placeholder-content',
  template: `
<div class="timeline-item">
    <div class="animated-background">
        <div class="background-masker header-right"></div>
        <div class="background-masker divider"></div>
        <div class="background-masker subheader-right"></div>
        <div class="background-masker content-top"></div>
    </div>
</div>
  `,
  styles: [`
  .timeline-item {
    background: #fff;
    border-bottom: 1px solid grey;
    border-radius: 3px;
    padding: 12px;
    width: 100%;
    min-height: 200px;
}

@keyframes placeHolderShimmer{
  0%{
      background-position: -50% 0
  }
  100%{
      background-position: 50% 0
  }
}

.animated-background {
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: #f6f7f8;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 50% 100px;
  height: 200px;
  position: relative;
}

.background-masker {
  background: #fff;
  position: absolute;
}

/* Every thing below this is just positioning */

.background-masker.header-top,
.background-masker.header-bottom,
.background-masker.content-top,
.background-masker.subheader-bottom,
.background-masker.divider,
.background-masker.header-left,
.background-masker.header-right,
.background-masker.subheader-right {
  top: 0;
  left: calc(287px + 1rem);
  right: 0;
  height: 31px;
}

.background-masker.divider {
  top: 0;
  left: 287px;
  right: 0;
  height: 200px;
  width: 1rem;
}

.background-masker.header-bottom {
  top: 18px;
  height: 31px;
}

.background-masker.subheader-right {
  top: 31px;
  height: 31px;
}


.background-masker.header-right,
.background-masker.subheader-right {
  width: auto;
  left: 700px;
  right: 0;
}

.background-masker.subheader-right {
  left: 287px;
}

.background-masker.subheader-bottom {
  top: 30px;
  height: 10px;
}


.background-masker.content-second-line,
.background-masker.content-third-line,
.background-masker.content-second-end,
.background-masker.content-third-end,
.background-masker.content-first-end {
  top: 40px;
  left: 0;
  right: 0;
  height: 31px;
}

.background-masker.content-top {
  height: 20px;
  top: 180px;
}
  `]
})
export class PlaceholderContent {
}
