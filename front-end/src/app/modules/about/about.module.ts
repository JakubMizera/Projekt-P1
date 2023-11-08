import { NgModule } from "@angular/core";
import { AboutUsComponent } from "./about-us/about-us.component";
import { CommonModule } from "@angular/common";
import { AboutRoutingModule } from "./about-routing.module";

@NgModule({
    declarations: [
        AboutUsComponent,
    ],
    imports: [
        CommonModule,
        AboutRoutingModule,
    ],
    exports: [
        AboutUsComponent,
    ]
})
export class AboutModule { }