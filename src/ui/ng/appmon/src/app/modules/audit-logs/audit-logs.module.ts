import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AuditLogsComponent, ViewCellComponent} from "./audit-logs.component";
import { SdkModule } from "../sdk/sdk.module";
import {MdButtonModule, MdIconModule, MdInputModule, MdSelectModule} from "@angular/material";
import { AuditEntryComponent } from './audit-entry/audit-entry.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    BrowserModule,
    SdkModule,
    MdSelectModule,
    MdButtonModule,
    MdInputModule,
    FlexLayoutModule,
    FormsModule,
    MdIconModule
  ],
  declarations: [
    AuditLogsComponent,
    ViewCellComponent,
    AuditEntryComponent
  ],
  exports: [
    AuditLogsComponent
  ],
  entryComponents: [
    ViewCellComponent,
    AuditEntryComponent
  ]
})
export class AuditLogsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuditLogsModule
    }
  }
}
