import { NgModule } from "@angular/core";
import { ContactComponent } from "./contact-page/contact.component";
import { CommonModule } from "@angular/common";
import { ContactRoutingModule } from "./contact-routing.module";
import { MaterialModule } from "src/app/shared/material/material.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        ContactComponent,
    ],
    imports: [
        CommonModule,
        ContactRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ],
    exports: [
        ContactComponent,
    ]
})
export class ContactModule { }