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
import { Dataset } from '../models/asterixDB.model';
import * as DatasetAction from '../actions/dataset.actions';

export type Action = DatasetAction.All;

/*
** Interfaces for datasets in store/state
*/
export interface State {
  loaded: boolean,
  loading: boolean,
  datasets: Dataset[]
};

const initialState: State = {
  loaded: false,
  loading: false,
  datasets: []
};

/*
** Reducer function for datasets in store/state
*/
export function datasetReducer(state = initialState, action: Action) {
  switch (action.type) {

    /*
    * Change the load state to true to signaling
    * that a SELECT Query is ongoing
    */
    case DatasetAction.SELECT_DATASETS: {
        return Object.assign({}, state, { loading: true });
    }

    /*
    * Change the load state to false, and loaded to true to signaling
    * that a SELECT Query is success and there is datasets available in the
    * store
    */
    case DatasetAction.SELECT_DATASETS_SUCCESS: {
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        datasets: action.payload
      })
    }

    /*
    * Just returns the current store/state object
    */
    default:
      return state;
  }
}
