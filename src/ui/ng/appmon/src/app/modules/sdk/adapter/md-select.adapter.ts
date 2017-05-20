
import {MdSelect} from "@angular/material";
import {DataSet} from "../model/dataset";
import {DatasourceQueryResult} from "../services/datasource.service";

export class MdSelectAdapter {

  constructor(private options_array:Array<any>, private dataset: DataSet, private idFieldName:string, private valueFieldName:string) {

    this.dataset.datasetLoaded.subscribe((queryResult:DatasourceQueryResult) => {
      this.options_array.splice(0, this.options_array.length);
      queryResult.records.forEach((value) => {
        let option = {
          id: value[this.idFieldName],
          value: value[this.valueFieldName]
        };
        this.options_array.push(option);
      })
    });

  }

}
