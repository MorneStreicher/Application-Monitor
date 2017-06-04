import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TestComponent} from "./test.component";
import { SdkModule } from "../sdk/sdk.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MdButtonModule, MdDialogModule, MdIconModule, MdToolbarModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { SdkDialogManagerComponent } from '../sdk/sdkdialog/sdkdialog.component';
import { Dialog1Component } from './dialog1/dialog1.component';
import {SdkDialogService} from "../sdk/sdkdialog/sdk-dialog.service";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MdDialogModule,

    MdButtonModule,
    MdToolbarModule,
    MdIconModule,

    SdkModule
  ],
  declarations: [
    TestComponent,
    SdkDialogManagerComponent,
    Dialog1Component
  ],
  exports: [
    TestComponent
  ],
  entryComponents: [
    Dialog1Component,
    SdkDialogManagerComponent
  ],
  providers : [
    SdkDialogService
  ]
})
export class TestModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TestModule
    }
  }
}
