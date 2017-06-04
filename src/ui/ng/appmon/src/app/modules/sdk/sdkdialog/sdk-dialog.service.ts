import { Injectable } from '@angular/core';
import {MdDialog, MdDialogRef} from "@angular/material";
import {SdkDialogConfig, SdkDialogManagerComponent} from "./sdkdialog.component";

@Injectable()
export class SdkDialogService {
  constructor(private dialog: MdDialog) {
  }

  open(config: SdkDialogConfig) {
    config.mdDialogConfig.data = config;

    let dialogRef:MdDialogRef<any> = this.dialog.open(SdkDialogManagerComponent, config.mdDialogConfig);
  }
}
