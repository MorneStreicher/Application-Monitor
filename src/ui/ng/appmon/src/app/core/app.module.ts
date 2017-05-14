import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MdButtonModule, MdCheckboxModule, MdToolbarModule, MdIconModule, MdSidenavModule } from '@angular/material';

import { SdkModule } from "../modules/sdk/sdk.module";
import { ApplicationsModule } from "../modules/applications/applications.module";
import { ApplicationsComponent } from "../modules/applications/applications.component";

import { AppComponent } from './app.component';

const appRoutes: Routes = [
  { path: 'applications', component: ApplicationsComponent },

  { path: '',
    redirectTo: '/applications',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    RouterModule.forRoot(appRoutes),

    SdkModule.forRoot(),
    ApplicationsModule.forRoot(),

    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdIconModule,
    MdSidenavModule
  ],
  providers: [

  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
