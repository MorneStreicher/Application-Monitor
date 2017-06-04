import {
  Component, ComponentFactoryResolver, Inject, Injector, OnInit, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogConfig, MdDialogRef} from "@angular/material";

export interface SdkDialogComponent {
  setData(data: any);
}

export class SdkDialogButton {


  constructor(
    public name:string="Default button name",
    public autoClose:boolean = false) {

  }
}

export class SdkDialogConfig {
  public mdDialogConfig: MdDialogConfig;
  public title = "Application";
  public component: SdkDialogComponent;
  public data: any;
  public buttonConfig:SdkDialogButton [];

  constructor () {
    this.mdDialogConfig = new MdDialogConfig()
    this.buttonConfig = [];
  }
}

@Component({
  templateUrl: './sdkdialog.component.html',
  styleUrls: ['./sdkdialog.component.css']
})
export class SdkDialogManagerComponent  {
  @ViewChild("divContent", {read: ViewContainerRef}) divContent: ViewContainerRef;
  buttonConfig = [];

  constructor(
    private dialogRef: MdDialogRef<any>,
    @Inject(MD_DIALOG_DATA) private config: SdkDialogConfig,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector) {
  }

  ngOnInit() {
    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(<any>this.config.component);
    let comp = componentFactory.create(this.injector);
    (<SdkDialogComponent>comp.instance).setData(this.config.data);
    this.divContent.insert(comp.hostView);

    for (let i in this.config.buttonConfig) {
      this.buttonConfig.push(this.config.buttonConfig[i]);
    }
  }

  onButtonClick(buttonConfig:SdkDialogButton) {
    console.log(buttonConfig);

    if (buttonConfig.autoClose) {
      this.dialogRef.close();
    }
  }
}
