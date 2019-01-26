import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { PlaceholderComponent } from "./placeholder/placeholder.component"

@NgModule({
    imports: [CommonModule],
    declarations: [PlaceholderComponent],
    exports: [PlaceholderComponent, CommonModule],
})
export class SharedModule {}
