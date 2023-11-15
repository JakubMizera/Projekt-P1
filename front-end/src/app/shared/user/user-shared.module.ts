import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomHeaderComponent } from './custom-header/custom-header.component';
import { UserCustomContainerComponent } from './user-custom-container/user-custom-container.component';

@NgModule({
    declarations: [
        CustomHeaderComponent,
        UserCustomContainerComponent
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        CustomHeaderComponent,
        UserCustomContainerComponent
    ]
})
export class UserSharedModule { }
