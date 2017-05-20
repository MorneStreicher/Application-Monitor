import { Component, ViewChild } from '@angular/core';
import { GridOptions, GridPanel, RowNode } from "ag-grid";
import { DatasourceQueryResult, IDatasource } from "../services/datasource.service";
import { AgGridNg2 } from "ag-grid-angular";
import {DataSet} from "../model/dataset";

@Component({
  selector: 'sdk-grid',
  templateUrl: './sdkgrid.component.html',
  styleUrls: ['./sdkgrid.component.css']
})
export class SdkGridComponent {
  @ViewChild('agGrid') public agGrid: AgGridNg2;
  @ViewChild('toolDiv') public toolDiv: HTMLDivElement;

  private dataset : DataSet;
  public leftButtonDisabled = true;
  public rightButtonDisabled = true;
  public showToolDiv = true;

  private start_index:number;
  private row_count?:Number;

  constructor() {
    this.start_index = 0;
    this.row_count = null;
  }

  ngOnInit() {
    this.agGrid.rowSelected.subscribe((o) => {
      this.agGrid.api.refreshRows([o.node])
    });

    this.agGrid.rowDoubleClicked.subscribe((o) => {
      console.log(o);
    });
  }

  ngAfterViewInit() {
    this.agGrid.api.hideOverlay();
  }

  public setRowCount(count:Number) {
    this.row_count = count;
  }

  public setDataSet(dataset: DataSet, query_data:boolean = true) {
    this.dataset = dataset;
    this.dataset.datasetLoaded.subscribe((queryResult:DatasourceQueryResult) => {
      this.populateGrid();
      this.agGrid.api.hideOverlay();
    });
    if (query_data) {
      dataset.query(0, this.row_count);
    }
  }

  private populateGrid() {
    let r = this.dataset.getDatasourceQueryResult();
    let rowData = r.records;
    this.agGrid.api.setRowData(rowData);
    this.setPagingButtons(r.has_more_records, r.has_previous_records);
  }

  private setPagingButtons(has_more_records:Boolean, has_previous_records: Boolean) {
    this.rightButtonDisabled = !has_more_records;
    this.leftButtonDisabled = !has_previous_records;
  }

  public rightButtonClick () {
    this.setPagingButtons(false, false);
    let r = this.dataset.getDatasourceQueryResult();
    this.start_index = this.start_index + (r ?  r.records.length.valueOf() : 0)
    this.agGrid.api.showLoadingOverlay();
    this.dataset.query(this.start_index, this.row_count);
  }

  public leftButtonClick () {
    this.setPagingButtons(false, false);
    let r = this.dataset.getDatasourceQueryResult();
    this.start_index = this.start_index - (this.row_count ? this.row_count.valueOf() : 0)
    this.start_index = this.start_index < 0 ? 0 : this.start_index
    this.agGrid.api.showLoadingOverlay();
    this.dataset.query(this.start_index, this.row_count);
  }
}
