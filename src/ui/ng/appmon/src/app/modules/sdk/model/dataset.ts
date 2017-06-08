import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DatasourceQueryResult, IDatasource } from '../services/datasource.service'

export class DataSet {
  @Output() datasetLoaded = new EventEmitter<DatasourceQueryResult>();
  @Output() selectedIdChanged = new EventEmitter<String>();

  private recordDecorator: (record:any) => void;

  filter :any;
  order_by: String;

  private result: DatasourceQueryResult;
  private selectedId:String;

  constructor(private datasource:IDatasource) {
    this.filter = {};
    this.order_by = null;
    this.result = new DatasourceQueryResult();
    this.selectedId = null;

    this.recordDecorator = () => {};
  }

  setRecordDecorator(callback: (record:any) => void) {
    this.recordDecorator = callback;
  }

  public setSelectedId(id:String) {
    if (this.selectedId != id) {
      this.selectedIdChanged.emit(id);
    }
    this.selectedId = id;
  }

  public getSelectedId():String {
    return this.selectedId;
  }

  public query(start_index?:Number, count?:Number) {
    this.datasource.query(this.filter, this.order_by, start_index, count).then((result:DatasourceQueryResult) => {
      if (result.success) {
        this.result = result;
        this.result.records.forEach(v=>{
          this.recordDecorator(v);
        });
        this.datasetLoaded.emit(this.result);
        this.setSelectedId(null);
      } else {
        console.error(result);
      }
    });
  }

  public update(entry:any) {
    throw "TODO";
  }

  public getDatasourceQueryResult():DatasourceQueryResult {
    return this.result;
  }
}
