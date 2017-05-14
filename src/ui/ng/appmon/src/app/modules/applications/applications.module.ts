import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApplicationsComponent } from "./applications.component";
import { SdkModule } from "../sdk/sdk.module";

@NgModule({
  imports: [
    BrowserModule,
    SdkModule
  ],
  declarations: [
    ApplicationsComponent
  ],
  exports: [
    ApplicationsComponent
  ]
})
export class ApplicationsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ApplicationsModule
    }
  }
}
