/*
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import { Action } from '@ngrx/store';
import { AsterixDBQueryMessage, Datatype } from '../models/asterixDB.model';

/*
* Definition of Datatypes Actions
*/
export const CREATE_DATATYPE          = '[Datatype Collection] Create Datatype';
export const CREATE_DATATYPE_SUCCESS  = '[Datatype Collection] Create Datatype Success';
export const CREATE_DATATYPE_FAIL     = '[Datatype Collection] Create Datatype Fail';
export const UPDATE_DATATYPE          = '[Datatype Collection] Update Datatype';
export const UPDATE_DATATYPE_SUCCESS  = '[Datatype Collection] Update Datatype Success';
export const UPDATE_DATATYPE_FAIL     = '[Datatype Collection] Update Datatype Fail';
export const DELETE_DATATYPE          = '[Datatype Collection] Delete Datatype';
export const DELETE_DATATYPE_SUCCESS  = '[Datatype Collection] Delete Datatype Success';
export const DELETE_DATATYPE_FAIL     = '[Datatype Collection] Delete Datatype Fail';
export const SELECT_DATATYPES         = '[Datatype Collection] Select Datatypes';
export const SELECT_DATATYPES_SUCCESS = '[Datatype Collection] Select Datatypes Success';
export const SELECT_DATATYPES_FAIL    = '[Datatype Collection] Select Datatypes Fail';

/*
* Select Datatypes
*/
export class SelectDatatypes implements Action {
  readonly type = SELECT_DATATYPES;
  constructor(public payload: string) {}
}

export class SelectDatatypesSuccess implements Action {
  readonly type = SELECT_DATATYPES_SUCCESS;
  constructor(public payload: AsterixDBQueryMessage[]) {}
}

export class SelectDatatypesFail implements Action {
  readonly type = SELECT_DATATYPES_FAIL;
  constructor(public payload: AsterixDBQueryMessage[]) {}
}

/*
* Create Datatype
*/
export class CreateDatatype implements Action {
  readonly type = CREATE_DATATYPE;
  constructor(public payload: Datatype) {}
}

export class CreateDatatypeSuccess implements Action {
  readonly type = CREATE_DATATYPE_SUCCESS;
  constructor(public payload: Datatype[]) {}
}

export class CreateDatatypeFail implements Action {
  readonly type = CREATE_DATATYPE_FAIL;
  constructor(public payload: Datatype) {}
}

/*
* Update Datatype
*/
export class UpdateDatatype implements Action {
  readonly type = UPDATE_DATATYPE;
  constructor(public payload: Datatype) {}
}

export class UpdateDatatypeSuccess implements Action {
  readonly type = UPDATE_DATATYPE_SUCCESS;
  constructor(public payload: Datatype[]) {}
}

export class UpdateDatatypeFail implements Action {
  readonly type = UPDATE_DATATYPE_FAIL;
  constructor(public payload: Datatype) {}
}

/*
* Remove Datatype
*/
export class DeleteDatatype implements Action {
  readonly type = DELETE_DATATYPE;

  constructor(public payload: Datatype) {}
}

export class DeleteDatatypeSuccess implements Action {
  readonly type = DELETE_DATATYPE_SUCCESS;

  constructor(public payload: Datatype[]) {}
}

export class DeleteDatatypeFail implements Action {
  readonly type = DELETE_DATATYPE_FAIL;

  constructor(public payload: Datatype) {}
}

/*
* Exports of datastypes actions
*/
export type All = SelectDatatypes |
  SelectDatatypesSuccess |
  SelectDatatypesFail |
  CreateDatatype |
  CreateDatatypeSuccess |
  CreateDatatypeFail |
  UpdateDatatype |
  UpdateDatatypeSuccess |
  UpdateDatatypeFail |
  DeleteDatatype |
  DeleteDatatypeSuccess |
  DeleteDatatypeFail;
