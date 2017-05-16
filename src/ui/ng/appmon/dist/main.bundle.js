webpackJsonp([1,4],{

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sdk_components_sdkgrid_component__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sdk_model_dataset__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sdk_services_datasource_service__ = __webpack_require__(94);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApplicationsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ApplicationsComponent = (function () {
    function ApplicationsComponent(datasource_service_factory) {
        this.datasource_service_factory = datasource_service_factory;
    }
    ApplicationsComponent.prototype.ngOnInit = function () {
        var gridOptions;
        gridOptions = {
            rowSelection: 'single',
            getRowStyle: function (params) {
                if (params.data.id == "1") {
                    return {
                        'background-color': 'red',
                        'color': 'white'
                    };
                }
                else if (params.data.id == "2") {
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
                headerName: "ID",
                field: "id",
                width: 100
            },
            {
                headerName: "Name 2",
                field: "name",
                width: 300
            }
        ];
        this.grid.agGrid.gridOptions = gridOptions;
        var datasource = this.datasource_service_factory.getFor("Application", "Entity");
        var dataset = new __WEBPACK_IMPORTED_MODULE_2__sdk_model_dataset__["a" /* DataSet */](datasource);
        this.grid.setRowCount(300);
        this.grid.setDataSet(dataset);
    };
    return ApplicationsComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('grid'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__sdk_components_sdkgrid_component__["a" /* SdkGridComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__sdk_components_sdkgrid_component__["a" /* SdkGridComponent */]) === "function" && _a || Object)
], ApplicationsComponent.prototype, "grid", void 0);
ApplicationsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__(309),
        styles: [__webpack_require__(304)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__sdk_services_datasource_service__["a" /* DatasourceFactoryService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__sdk_services_datasource_service__["a" /* DatasourceFactoryService */]) === "function" && _b || Object])
], ApplicationsComponent);

var _a, _b;
//# sourceMappingURL=applications.component.js.map

/***/ }),

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ag_grid_angular__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ag_grid_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ag_grid_angular__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SdkGridComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SdkGridComponent = (function () {
    function SdkGridComponent() {
        this.leftButtonDisabled = true;
        this.rightButtonDisabled = true;
        this.showToolDiv = true;
        this.start_index = 0;
        this.row_count = null;
    }
    SdkGridComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.agGrid.rowSelected.subscribe(function (o) {
            _this.agGrid.api.refreshRows([o.node]);
        });
        this.agGrid.rowDoubleClicked.subscribe(function (o) {
            console.log(o);
        });
    };
    SdkGridComponent.prototype.setRowCount = function (count) {
        this.row_count = count;
    };
    SdkGridComponent.prototype.setDataSet = function (dataset) {
        var _this = this;
        this.dataset = dataset;
        this.dataset.datasetLoaded.subscribe(function (queryResult) {
            _this.populateGrid();
            _this.agGrid.api.hideOverlay();
        });
        dataset.query(0, this.row_count);
    };
    SdkGridComponent.prototype.populateGrid = function () {
        var r = this.dataset.getDatasourceQueryResult();
        var rowData = r.records;
        this.agGrid.api.setRowData(rowData);
        this.setPagingButtons(r.has_more_records, r.has_previous_records);
    };
    SdkGridComponent.prototype.setPagingButtons = function (has_more_records, has_previous_records) {
        this.rightButtonDisabled = !has_more_records;
        this.leftButtonDisabled = !has_previous_records;
    };
    SdkGridComponent.prototype.rightButtonClick = function () {
        this.setPagingButtons(false, false);
        var r = this.dataset.getDatasourceQueryResult();
        this.start_index = this.start_index + (r ? r.records.length.valueOf() : 0);
        this.agGrid.api.showLoadingOverlay();
        this.dataset.query(this.start_index, this.row_count);
    };
    SdkGridComponent.prototype.leftButtonClick = function () {
        this.setPagingButtons(false, false);
        var r = this.dataset.getDatasourceQueryResult();
        this.start_index = this.start_index - (this.row_count ? this.row_count.valueOf() : 0);
        this.start_index = this.start_index < 0 ? 0 : this.start_index;
        this.agGrid.api.showLoadingOverlay();
        this.dataset.query(this.start_index, this.row_count);
    };
    return SdkGridComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('agGrid'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ag_grid_angular__["AgGridNg2"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ag_grid_angular__["AgGridNg2"]) === "function" && _a || Object)
], SdkGridComponent.prototype, "agGrid", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('toolDiv'),
    __metadata("design:type", Object)
], SdkGridComponent.prototype, "toolDiv", void 0);
SdkGridComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'sdk-grid',
        template: __webpack_require__(310),
        styles: [__webpack_require__(305)]
    }),
    __metadata("design:paramtypes", [])
], SdkGridComponent);

var _a;
//# sourceMappingURL=sdkgrid.component.js.map

/***/ }),

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_sdkgrid_component__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ag_grid_angular_main__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ag_grid_angular_main___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ag_grid_angular_main__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_datasource_service__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__(143);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SdkModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var SdkModule = SdkModule_1 = (function () {
    function SdkModule() {
    }
    SdkModule.forRoot = function () {
        return {
            ngModule: SdkModule_1
        };
    };
    return SdkModule;
}());
SdkModule = SdkModule_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3_ag_grid_angular_main__["AgGridModule"].withComponents([]),
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["a" /* MdButtonModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["d" /* MdIconModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__components_sdkgrid_component__["a" /* SdkGridComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__components_sdkgrid_component__["a" /* SdkGridComponent */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__services_datasource_service__["a" /* DatasourceFactoryService */]
        ]
    })
], SdkModule);

var SdkModule_1;
//# sourceMappingURL=sdk.module.js.map

/***/ }),

/***/ 214:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 214;


/***/ }),

/***/ 215:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_core_app_module__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(230);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_core_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(8);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(308),
        styles: [__webpack_require__(303)]
    }),
    __metadata("design:paramtypes", [])
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_material__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modules_sdk_sdk_module__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__modules_applications_applications_module__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__modules_applications_applications_component__ = __webpack_require__(144);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var appRoutes = [
    {
        path: 'applications',
        component: __WEBPACK_IMPORTED_MODULE_10__modules_applications_applications_component__["a" /* ApplicationsComponent */]
    },
    {
        path: '',
        redirectTo: '/applications',
        pathMatch: 'full'
    },
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_router__["a" /* RouterModule */].forRoot(appRoutes),
            __WEBPACK_IMPORTED_MODULE_8__modules_sdk_sdk_module__["a" /* SdkModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_9__modules_applications_applications_module__["a" /* ApplicationsModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_material__["a" /* MdButtonModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_material__["b" /* MdCheckboxModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_material__["c" /* MdToolbarModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_material__["d" /* MdIconModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_material__["e" /* MdSidenavModule */]
        ],
        providers: [],
        bootstrap: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__applications_component__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sdk_sdk_module__ = __webpack_require__(146);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApplicationsModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ApplicationsModule = ApplicationsModule_1 = (function () {
    function ApplicationsModule() {
    }
    ApplicationsModule.forRoot = function () {
        return {
            ngModule: ApplicationsModule_1
        };
    };
    return ApplicationsModule;
}());
ApplicationsModule = ApplicationsModule_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3__sdk_sdk_module__["a" /* SdkModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__applications_component__["a" /* ApplicationsComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__applications_component__["a" /* ApplicationsComponent */]
        ]
    })
], ApplicationsModule);

var ApplicationsModule_1;
//# sourceMappingURL=applications.module.js.map

/***/ }),

/***/ 229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_datasource_service__ = __webpack_require__(94);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataSet; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DataSet = (function () {
    function DataSet(datasource) {
        this.datasource = datasource;
        this.datasetLoaded = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.selectedIdChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.filter = null;
        this.order_by = null;
        this.result = new __WEBPACK_IMPORTED_MODULE_1__services_datasource_service__["b" /* DatasourceQueryResult */]();
        this.selectedId = null;
    }
    DataSet.prototype.setSelectedId = function (id) {
        if (this.selectedId != id) {
            this.selectedIdChanged.emit(id);
        }
        this.selectedId = id;
    };
    DataSet.prototype.getSelectedId = function () {
        return this.selectedId;
    };
    DataSet.prototype.query = function (start_index, count) {
        var _this = this;
        this.datasource.query(this.filter, this.order_by, start_index, count).then(function (result) {
            if (result.success) {
                _this.result = result;
                _this.datasetLoaded.emit(_this.result);
                _this.setSelectedId(null);
            }
            else {
                console.error(result);
            }
        });
    };
    DataSet.prototype.update = function (entry) {
        throw "TODO";
    };
    DataSet.prototype.getDatasourceQueryResult = function () {
        return this.result;
    };
    return DataSet;
}());

__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], DataSet.prototype, "datasetLoaded", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], DataSet.prototype, "selectedIdChanged", void 0);
//# sourceMappingURL=dataset.js.map

/***/ }),

/***/ 230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 303:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(39)(false);
// imports


// module
exports.push([module.i, ".app-container {\r\n  position: absolute;\r\n  width:100%;\r\n  height:100%;\r\n  border:0px;\r\n  background-color: lightgray;\r\n}\r\n\r\n.router-container {\r\n  position: absolute;\r\n  width: 100%;\r\n  top: 64px;\r\n  bottom: 3px;\r\n}\r\n\r\n.sidenav-container {\r\n  position: absolute;\r\n  width:250px;\r\n  height:100%;\r\n  border:1px;\r\n  background-color: lightgray;\r\n  overflow: hidden;\r\n}\r\n\r\n.toolbar-icon {\r\n  padding: 0 14px;\r\n}\r\n\r\n.flex-spacer {\r\n  -webkit-box-flex: 1;\r\n      -ms-flex: 1 1 auto;\r\n          flex: 1 1 auto;\r\n}\r\n\r\n.pointer {\r\n  cursor: pointer;\r\n}\r\n\r\n.menu-button {\r\n  width: 100%;\r\n  text-align: left;\r\n}\r\n\r\n.sidenav-link-item {\r\n  width: 100%;\r\n  height: 40px;\r\n  border: 1px gray;\r\n  background-color: lightgray;\r\n  padding-left: 30px;\r\n  vertical-align: middle;\r\n  line-height: 40px;\r\n  cursor: pointer;\r\n}\r\n\r\n.sidenav-link-item:hover {\r\n  background-color: LightSteelBlue;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 304:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(39)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 305:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(39)(false);
// imports


// module
exports.push([module.i, ".grid-div-show-toolbar {\r\n  position: absolute;\r\n  left: 0px;\r\n  right: 0px;\r\n  top: 0px;\r\n  bottom: 35px;\r\n}\r\n\r\n.tool-div-show-toolbar {\r\n  position: absolute;\r\n  left: 0px;\r\n  right: 0px;\r\n  height: 35px;\r\n  bottom: 0;\r\n}\r\n\r\n.grid-div-hide-toolbar {\r\n  position: absolute;\r\n  left: 0px;\r\n  right: 0px;\r\n  top: 0px;\r\n  bottom: 0px;\r\n}\r\n\r\n.tool-div-hide-toolbar {\r\n  display: none;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 308:
/***/ (function(module, exports) {

module.exports = "<md-sidenav-container class=\"app-container\">\n  <md-sidenav #sidenav_id mode=\"side\" opened=\"true\" class=\"sidenav-container\">\n\n    <!-- sidenav content -->\n    <button md-button class=\"menu-button\">Applications</button>\n    <button md-button class=\"menu-button\">Audit logs</button>\n    <button md-button class=\"menu-button\">Performance counters</button>\n\n  </md-sidenav>\n\n  <!-- primary content -->\n  <md-toolbar color=\"primary\">\n    <md-icon class=\"toolbar-icon pointer\" (click)=\"sidenav_id.toggle()\">menu</md-icon>\n      <span>Application Monitor</span>\n  </md-toolbar>\n\n  <div class = \"router-container\">\n    <router-outlet></router-outlet>\n  </div>\n\n</md-sidenav-container>\n\n"

/***/ }),

/***/ 309:
/***/ (function(module, exports) {

module.exports = "<sdk-grid #grid style=\"width: 100%; height: 100%;\">\n</sdk-grid>\n"

/***/ }),

/***/ 310:
/***/ (function(module, exports) {

module.exports = "<div [ngClass]=\"showToolDiv ? 'grid-div-show-toolbar' : 'grid-div-hide-toolbar'\">\n  <ag-grid-angular #agGrid style=\"width: 100%; height: 100%;\" class=\"ag-fresh\">\n  </ag-grid-angular>\n</div>\n\n<div #toolDiv [ngClass]=\"showToolDiv ? 'tool-div-show-toolbar' : 'tool-div-hide-toolbar'\">\n  <button md-button [disabled]=\"leftButtonDisabled\" (click)=\"leftButtonClick()\"><md-icon>keyboard_arrow_left</md-icon> Previous</button>\n  <button md-button [disabled]=\"rightButtonDisabled\" (click)=\"rightButtonClick()\">Next <md-icon>keyboard_arrow_right</md-icon></button>\n</div>\n"

/***/ }),

/***/ 366:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(215);


/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(93);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DatasourceQueryResult; });
/* unused harmony export Datasource */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatasourceFactoryService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DatasourceQueryResult = (function () {
    function DatasourceQueryResult() {
        this.success = true;
        this.message = null;
        this.records = [];
        this.has_more_records = false;
        this.has_previous_records = false;
        this.start_index = 0;
    }
    DatasourceQueryResult.prototype.fromResponse = function (response, start_index) {
        if (response.ok) {
            this.success = true;
            this.records = response.json().data.records;
            this.has_more_records = response.json().data.has_more_records;
            this.has_previous_records = (start_index > 0);
            this.start_index = start_index || 0;
        }
        else {
            this.success = false;
            this.message = response.statusText;
        }
    };
    DatasourceQueryResult.prototype.fromError = function (error) {
        this.success = false;
        this.message = "" + error;
    };
    return DatasourceQueryResult;
}());

var Datasource = (function () {
    function Datasource(http, name, entity) {
        this.http = http;
        this.name = name;
        this.entity = entity;
    }
    Datasource.prototype.query = function (dict_filter, order_by, start_index, count) {
        var _this = this;
        if (dict_filter === void 0) { dict_filter = {}; }
        return new Promise(function (resolve) {
            var result = new DatasourceQueryResult();
            var value = {
                "filter": dict_filter,
                "order_by": order_by,
                "start_index": start_index,
                "count": count
            };
            var body = JSON.stringify(value);
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ 'Content-Type': 'application/json' });
            var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
            _this.http.post("/service/Datasource/" + _this.name + "/" + _this.entity + "/query", body, headers).subscribe(function (data) {
                // For Success Response
                result.fromResponse(data, start_index);
                resolve(result);
            }, function (err) {
                // For Error Response
                result.fromError(err);
                resolve(result);
            });
        });
    };
    return Datasource;
}());

var DatasourceFactoryService = (function () {
    function DatasourceFactoryService(http) {
        this.http = http;
    }
    DatasourceFactoryService.prototype.getFor = function (name, entity) {
        return new Datasource(this.http, name, entity);
    };
    return DatasourceFactoryService;
}());
DatasourceFactoryService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], DatasourceFactoryService);

var _a;
//# sourceMappingURL=datasource.service.js.map

/***/ })

},[366]);
//# sourceMappingURL=main.bundle.js.map