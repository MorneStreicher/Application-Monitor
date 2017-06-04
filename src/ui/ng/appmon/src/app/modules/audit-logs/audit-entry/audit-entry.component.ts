import { Component, OnInit } from '@angular/core';
import {SdkDialogComponent} from "../../sdk/sdkdialog/sdkdialog.component";

@Component({
  selector: 'app-audit-entry',
  templateUrl: './audit-entry.component.html',
  styleUrls: ['./audit-entry.component.css']
})
export class AuditEntryComponent  implements SdkDialogComponent {

  public obj = {data:{}};

  constructor() { }

  setData(data: any) {
    this.obj.data = data;
  }
}
