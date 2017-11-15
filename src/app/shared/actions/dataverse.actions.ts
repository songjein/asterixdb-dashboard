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
import { AsterixDBQueryMessage, Dataverse } from '../models/asterixDB.model';

/*
* Definition of Dataverses Actions
*/
export const CREATE_DATAVERSE          = '[Dataverse Collection] Create Dataverse';
export const CREATE_DATAVERSE_SUCCESS  = '[Dataverse Collection] Create Dataverse Success';
export const CREATE_DATAVERSE_FAIL     = '[Dataverse Collection] Create Dataverse Fail';
export const UPDATE_DATAVERSE          = '[Dataverse Collection] Update Dataverse';
export const UPDATE_DATAVERSE_SUCCESS  = '[Dataverse Collection] Update Dataverse Success';
export const UPDATE_DATAVERSE_FAIL     = '[Dataverse Collection] Update Dataverse Fail';
export const DELETE_DATAVERSE          = '[Dataverse Collection] Delete Dataverse';
export const DELETE_DATAVERSE_SUCCESS  = '[Dataverse Collection] Delete Dataverse Success';
export const DELETE_DATAVERSE_FAIL     = '[Dataverse Collection] Delete Dataverse Fail';
export const SELECT_DATAVERSES         = '[Dataverse Collection] Select Dataverses';
export const SELECT_DATAVERSES_SUCCESS = '[Dataverse Collection] Select Dataverses Success';
export const SELECT_DATAVERSES_FAIL    = '[Dataverse Collection] Select Dataverses Fail';

/*
* Select Dataverses
*/
export class SelectDataverses implements Action {
  readonly type = SELECT_DATAVERSES;
  constructor(public payload: string) {}
}

export class SelectDataversesSuccess implements Action {
  readonly type = SELECT_DATAVERSES_SUCCESS;
  constructor(public payload: AsterixDBQueryMessage[]) {}
}

export class SelectDataversesFail implements Action {
  readonly type = SELECT_DATAVERSES_FAIL;
  constructor(public payload: AsterixDBQueryMessage[]) {}
}

/*
* Create Dataverse
*/
export class CreateDataverse implements Action {
  readonly type = CREATE_DATAVERSE;
  constructor(public payload: Dataverse) {}
}

export class CreateDataverseSuccess implements Action {
  readonly type = CREATE_DATAVERSE_SUCCESS;
  constructor(public payload: Dataverse[]) {}
}

export class CreateDataverseFail implements Action {
  readonly type = CREATE_DATAVERSE_FAIL;
  constructor(public payload: Dataverse) {}
}

/*
* Update Dataverse
*/
export class UpdateDataverse implements Action {
  readonly type = UPDATE_DATAVERSE;
  constructor(public payload: Dataverse) {}
}

export class UpdateDataverseSuccess implements Action {
  readonly type = UPDATE_DATAVERSE_SUCCESS;
  constructor(public payload: Dataverse[]) {}
}

export class UpdateDataverseFail implements Action {
  readonly type = UPDATE_DATAVERSE_FAIL;
  constructor(public payload: Dataverse) {}
}

/*
* Remove Dataverse
*/
export class DeleteDataverse implements Action {
  readonly type = DELETE_DATAVERSE;
  constructor(public payload: Dataverse) {}
}

export class DeleteDataverseSuccess implements Action {
  readonly type = DELETE_DATAVERSE_SUCCESS;
  constructor(public payload: Dataverse[]) {}
}

export class DeleteDataverseFail implements Action {
  readonly type = DELETE_DATAVERSE_FAIL;
  constructor(public payload: Dataverse) {}
}

/*
* Exports of datasverses actions
*/
export type All = SelectDataverses |
  SelectDataversesSuccess |
  SelectDataversesFail |
  CreateDataverse |
  CreateDataverseSuccess |
  CreateDataverseFail |
  UpdateDataverse |
  UpdateDataverseSuccess |
  UpdateDataverseFail |
  DeleteDataverse |
  DeleteDataverseSuccess |
  DeleteDataverseFail;
