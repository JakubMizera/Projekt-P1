import { NgModule } from "@angular/core";
import { ContactComponent } from "./contact-page/contact.component";
import { CommonModule } from "@angular/common";
import { ContactRoutingModule } from "./contact-routing.module";

@NgModule({
    declarations: [
        ContactComponent,
    ],
    imports: [
        CommonModule,
        ContactRoutingModule,
    ],
    exports: [
        ContactComponent,
    ]
})
export class ContactModule { }