import { Component, ViewChild } from '@angular/core';
import { GridOptions, GridPanel } from "ag-grid";
import { SdkGridComponent } from "../sdk/components/sdkgrid.component";
import { DataSet } from "../sdk/model/dataset";
import { DatasourceFactoryService } from "../sdk/services/datasource.service";
import {MdSelectAdapter} from "../sdk/adapter/md-select.adapter";

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
