import { Component, ViewChild } from '@angular/core';
import { GridOptions } from "ag-grid";
import { SdkGridComponent } from "../sdk/components/sdkgrid.component";
import { DataSet } from "../sdk/model/dataset";
import { DatasourceFactoryService } from "../sdk/services/datasource.service";
import {MdSelectAdapter} from "../sdk/adapter/md-select.adapter";
import {AgRendererComponent} from "ag-grid-angular";
import {SdkDialogService} from "../sdk/sdkdialog/sdk-dialog.service";
import {AuditEntryComponent} from "./audit-entry/audit-entry.component";
import {SdkDialogButton, SdkDialogConfig} from "../sdk/sdkdialog/sdkdialog.component";

@Component({
  template: `<button md-button (click)="onClick();">View</button>`,
  styles : [
    `button {
      min-height: 18px !important;
      min-width: 46px !important;
      font-size: 10px !important;
      line-height: 0px;
    }`
  ]

})
export class ViewCellComponent implements AgRendererComponent {
  private params:any;

  constructor(private dialog:SdkDialogService) {

  }

  agInit(params:any):void {
    console.log(params);
    this.params = params;
  }

  onClick() {
    console.log("Clicked:", this.params);

    let config = new SdkDialogConfig();
    config.mdDialogConfig.disableClose = true;
    config.mdDialogConfig.width="800px";
    config.mdDialogConfig.height="600px";

    config.title = "Audit log entry";
    config.component = <any>AuditEntryComponent;
    config.data = this.params.data;
    config.buttonConfig.push(new SdkDialogButton("OK", true));

    this.dialog.open(config);
  }
}

@Component({
  templateUrl: './audit-logs.component.html',
  styleUrls: [ './audit-logs.component.css' ]
})
export class AuditLogsComponent {
  @ViewChild('grid') grid: SdkGridComponent;

  appOptions = [ ];

  constructor(private datasource_service_factory: DatasourceFactoryService) {
  }

  ngOnInit() {

    //
    //
    //
    let gridOptions: GridOptions;
    gridOptions = {
      rowSelection: 'single',

      getRowStyle: function(params) {
        if (params.data.level == 2) {
          return {
            'background-color': 'yellow'
          };
        } else if (params.data.level == 3) {
          return {
            'background-color': '#FF7F50'
          };
        } else if (params.data.level == 4) {
          return {
            'background-color': 'red'
          };
        }
        return null;
      }
    };

    gridOptions.columnDefs = [
      {
        headerName: "Date / time",
        field: "datetime_logged",
        width: 200
      },
      {
        headerName: "Level",
        field: "level_description",
        width: 80
      },
      {
        headerName: "Description",
        field: "log_description",
        width: 500
      },
      {
        headerName: "",
        field: "",
        width: 60,
        cellRendererFramework: ViewCellComponent
      }
    ];
    this.grid.agGrid.gridOptions = gridOptions;

    //
    // Application dropdown
    //
    let datasourceApps = this.datasource_service_factory.getFor("Application", "Entity");
    let datasetApps = new DataSet(datasourceApps);
    datasetApps.setRecordDecorator(v=> {
      v.fullName = v.name + " - " + (v.entity || "");
    });
    let a = new MdSelectAdapter(this.appOptions, datasetApps, "id", "fullName");
    datasetApps.query();

    //
    // Grid
    //
    let datasource = this.datasource_service_factory.getFor("AuditLogEntry", "Entity");
    let dataset = new DataSet(datasource);
    this.grid.setRowCount(300);
    this.grid.setDataSet(dataset, true);
  }
}
