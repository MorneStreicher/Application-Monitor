import {Component, Inject, ViewChild} from '@angular/core';
import { GridOptions, GridPanel } from "ag-grid";
import { SdkGridComponent } from "../sdk/components/sdkgrid.component";
import { DataSet } from "../sdk/model/dataset";
import {DatasourceFactoryService} from "../sdk/services/datasource.service";
import {ComponentType, MD_DIALOG_DATA, MdDialog, MdDialogConfig, MdDialogRef} from "@angular/material";
import {
  SdkDialogButton, SdkDialogComponent, SdkDialogConfig,
  SdkDialogManagerComponent
} from "../sdk/sdkdialog/sdkdialog.component";
import {Dialog1Component} from "./dialog1/dialog1.component";
import {SdkDialogService} from "../sdk/sdkdialog/sdk-dialog.service";

@Component({
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

  constructor(private dialog: SdkDialogService) {
  }

  ngOnInit() {
  }

  openDialog() {

    let config = new SdkDialogConfig();
    config.mdDialogConfig.disableClose = true;
    config.mdDialogConfig.width="800px";
    config.mdDialogConfig.height="600px";

    config.title = "My test dialog instance";
    config.component = <any>Dialog1Component;
    config.data = "Hello from me!";
    config.buttonConfig.push(new SdkDialogButton("OK", true));
    config.buttonConfig.push(new SdkDialogButton("Cancel", false));

    this.dialog.open(config);
  }
}
