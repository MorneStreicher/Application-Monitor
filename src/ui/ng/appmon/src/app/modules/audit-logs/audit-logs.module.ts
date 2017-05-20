import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuditLogsComponent } from "./audit-logs.component";
import { SdkModule } from "../sdk/sdk.module";
import { MdSelectModule } from "@angular/material";

@NgModule({
  imports: [
    BrowserModule,
    SdkModule,
    MdSelectModule
  ],
  declarations: [
    AuditLogsComponent
  ],
  exports: [
    AuditLogsComponent
  ]
})
export class AuditLogsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuditLogsModule
    }
  }
}
