import { Component, ViewChild } from '@angular/core';
import { GridOptions, GridPanel } from "ag-grid";
import { SdkGridComponent } from "../sdk/components/sdkgrid.component";
import { DataSet } from "../sdk/model/dataset";
import {DatasourceFactoryService} from "../sdk/services/datasource.service";

@Component({
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent {
  @ViewChild('grid') grid: SdkGridComponent;

  constructor(private datasource_service_factory: DatasourceFactoryService) {
  }

  ngOnInit() {
    let gridOptions: GridOptions;
    gridOptions = {
      rowSelection: 'single',

      getRowStyle: function(params) {
        if (params.data.id == "1") {
          return {
            'background-color': 'red',
            'color': 'white'
          };
        } else if (params.data.id == "2") {
          return {
            'background-color': 'green',
            'color': 'blue'
          };
        }
        return null;
      }
    };

    gridOptions.columnDefs = [
      {
        headerName: "App type",
        field: "app_type",
        width: 100
      },
      {
        headerName: "Domain",
        field: "app_domain",
        width: 100
      },
      {
        headerName: "Name",
        field: "name",
        width: 150
      },
      {
        headerName: "Entity",
        field: "entity",
        width: 150
      },
      {
        headerName: "Last heartbeat",
        field: "last_heartbeat",
        width: 180
      },
      {
        headerName: "Current Activity",
        field: "current_activity",
        width: 250
      }
    ];
    this.grid.agGrid.gridOptions = gridOptions;

    let datasource = this.datasource_service_factory.getFor("Application", "Entity");
    let dataset = new DataSet(datasource);
    this.grid.setRowCount(300);
    this.grid.setDataSet(dataset);
    this.grid.showToolDiv = false;
  }
}
