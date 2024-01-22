import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseBaseComponent } from 'src/app/shared/user/course-base-component/course-base.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent extends CourseBaseComponent implements OnInit {
  constructor(snackBar: MatSnackBar){
    super(snackBar)
  }

  ngOnInit(): void {
    this.initMap();
  }

}
