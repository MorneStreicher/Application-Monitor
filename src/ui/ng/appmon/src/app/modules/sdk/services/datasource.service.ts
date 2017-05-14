import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'

export class DatasourceQueryResult {
  success: Boolean;
  message: String;
  records: Array<any>;
  start_index:Number;
  has_more_records: Boolean;
  has_previous_records: Boolean;

  constructor() {
    this.success = true;
    this.message = null;
    this.records = [];
    this.has_more_records = false;
    this.has_previous_records = false;
    this.start_index = 0;
  }

  fromResponse(response:Response, start_index?:Number) {
    if (response.ok) {
      this.success = true;
      this.records=response.json().data.records;
      this.has_more_records=response.json().data.has_more_records;
      this.has_previous_records = (start_index > 0);
      this.start_index = start_index || 0;
    } else {
      this.success=false;
      this.message=response.statusText;
    }
  }

  fromError(error:any) {
    this.success=false;
    this.message=`${error}`;
  }
}

export interface IDatasource {
  query(dict_filter:object, order_by?:String, start_index?:Number, count?:Number): Promise<DatasourceQueryResult>;
}

export class Datasource implements IDatasource {

  constructor(private http: Http, private name:String, private entity:String) {
  }

  query(dict_filter = {}, order_by?:String, start_index?:Number, count?:Number): Promise<DatasourceQueryResult> {
    return new Promise(resolve => {
      let result = new DatasourceQueryResult();
      let value = {
        "filter": dict_filter,
        "order_by": order_by,
        "start_index": start_index,
        "count": count
      };
      let body = JSON.stringify(value);
      let headers = new Headers({ 'Content-Type': 'application/json'});
      let options = new RequestOptions({ headers: headers });
      this.http.post(`http://localhost:8085/service/Datasource/${this.name}/${this.entity}/query`, body, headers).subscribe(
        (data:Response) => {
          // For Success Response
          result.fromResponse(data, start_index);
          resolve(result);
        },
        (err:any) => {
          // For Error Response
          result.fromError(err);
          resolve(result);
        }
      );
    });
  }

}

@Injectable()
export class DatasourceFactoryService {
  constructor (private http: Http) {
  }

  getFor(name:String, entity:String) {
    return new Datasource(this.http, name, entity);
  }
}
