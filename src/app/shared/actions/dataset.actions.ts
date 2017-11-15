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
import { AsterixDBQueryMessage, Dataset } from '../models/asterixDB.model';

/*
* Definition of Datasets Actions
*/
export const CREATE_DATASET           = '[Dataset Collection] Create Dataset';
export const CREATE_DATASET_SUCCESS   = '[Dataset Collection] Create Dataset Success';
export const CREATE_DATASET_FAIL      = '[Dataset Collection] Create Dataset Fail';
export const UPDATE_DATASET           = '[Dataset Collection] Update Dataset';
export const UPDATE_DATASET_SUCCESS   = '[Dataset Collection] Update Dataset Success';
export const UPDATE_DATASET_FAIL      = '[Dataset Collection] Update Dataset Fail';
export const DELETE_DATASET           = '[Dataset Collection] Delete Dataset';
export const DELETE_DATASET_SUCCESS   = '[Dataset Collection] Delete Dataset Success';
export const DELETE_DATASET_FAIL      = '[Dataset Collection] Delete Dataset Fail';
export const SELECT_DATASETS          = '[Dataset Collection] Select Dataset';
export const SELECT_DATASETS_SUCCESS  = '[Dataset Collection] Select Dataset Success';
export const SELECT_DATASETS_FAIL     = '[Dataset Collection] Select Dataset Fail';

/*
* Select Datasets
*/
export class SelectDatasets implements Action {
  readonly type = SELECT_DATASETS;
  constructor(public payload: string) {}
}

export class SelectDatasetsSuccess implements Action {
  readonly type = SELECT_DATASETS_SUCCESS;
  constructor(public payload: AsterixDBQueryMessage[]) {}
}

export class SelectDatasetsFail implements Action {
  readonly type = SELECT_DATASETS_FAIL;
  constructor(public payload: AsterixDBQueryMessage[]) {}
}

/*
* Create Dataset
*/
export class CreateDataset implements Action {
  readonly type = CREATE_DATASET;
  constructor(public payload: Dataset) {}
}

export class CreateDatasetSuccess implements Action {
  readonly type = CREATE_DATASET_SUCCESS;
  constructor(public payload: Dataset[]) {}
}

export class CreateDatasetFail implements Action {
  readonly type = CREATE_DATASET_FAIL;
  constructor(public payload: Dataset) {}
}

/*
* Update Dataset
*/
export class UpdateDataset implements Action {
  readonly type = UPDATE_DATASET;
  constructor(public payload: Dataset) {}
}

export class UpdateDatasetSuccess implements Action {
  readonly type = UPDATE_DATASET_SUCCESS;
  constructor(public payload: Dataset[]) {}
}

export class UpdateDatasetFail implements Action {
  readonly type = UPDATE_DATASET_FAIL;
  constructor(public payload: Dataset) {}
}

/*
* Remove Dataset
*/
export class DeleteDataset implements Action {
  readonly type = DELETE_DATASET;
  constructor(public payload: Dataset) {}
}

export class DeleteDatasetSuccess implements Action {
  readonly type = DELETE_DATASET_SUCCESS;
  constructor(public payload: Dataset[]) {}
}

export class DeleteDatasetFail implements Action {
  readonly type = DELETE_DATASET_FAIL;
  constructor(public payload: Dataset) {}
}

/*
* Exports of datasets actions
*/
export type All = SelectDatasets |
  SelectDatasetsSuccess |
  SelectDatasetsFail |
  CreateDataset |
  CreateDatasetSuccess |
  CreateDatasetFail |
  UpdateDataset |
  UpdateDatasetSuccess |
  UpdateDatasetFail |
  DeleteDataset |
  DeleteDatasetSuccess |
  DeleteDatasetFail;
