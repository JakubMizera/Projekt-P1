import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomHeaderComponent } from './custom-header/custom-header.component';
import { UserCustomContainerComponent } from './user-custom-container/user-custom-container.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [
        CustomHeaderComponent,
        UserCustomContainerComponent,
        UserHeaderComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
    ],
    exports: [
        CustomHeaderComponent,
        UserCustomContainerComponent,
        UserHeaderComponent,
    ]
})
export class UserSharedModule { }
