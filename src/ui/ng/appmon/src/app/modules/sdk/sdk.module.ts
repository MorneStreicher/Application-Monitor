import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SdkGridComponent } from "./components/sdkgrid.component";
import {AgGridModule} from "ag-grid-angular/main";
import { DatasourceFactoryService } from './services/datasource.service';

import { MdButtonModule, MdCheckboxModule, MdToolbarModule, MdIconModule, MdSidenavModule } from '@angular/material';

@NgModule({
  imports: [
    BrowserModule,
    AgGridModule.withComponents(
      []
    ),
    MdButtonModule,
    MdIconModule
  ],
  declarations: [
    SdkGridComponent
  ],
  exports: [
    SdkGridComponent
  ],
  providers: [
    DatasourceFactoryService
  ]
})
export class SdkModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SdkModule
    }
  }
}
