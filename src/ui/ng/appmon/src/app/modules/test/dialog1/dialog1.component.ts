import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SdkDialogComponent} from "../../sdk/sdkdialog/sdkdialog.component";


@Component({
  templateUrl: './dialog1.component.html',
  styleUrls: ['./dialog1.component.css']
})
export class Dialog1Component implements SdkDialogComponent {
  public obj = {
    data:""
  };

  constructor() {
    console.log("in Dialog1Component constructor");
    this.obj.data = "1";
  }

  setData(data: any) {
    this.obj.data = data;
  }

}
