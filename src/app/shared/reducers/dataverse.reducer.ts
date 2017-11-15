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
import { Dataverse } from '../models/asterixDB.model';
import * as DataverseAction from '../actions/dataverse.actions';

export type Action = DataverseAction.All;

/*
** Interfaces for dataverses in store/state
*/
export interface State {
  loaded: boolean,
  loading: boolean,
  dataverses: Dataverse[]
};

const initialState: State = {
  loaded: false,
  loading: false,
  dataverses: []
};

/*
** Reducer function for dataverses in store/state
*/
export function dataverseReducer(state = initialState, action: Action) {
  switch (action.type) {

    /*
    * Change the load state to true to signaling
    * that a SELECT Query is ongoing
    */
    case DataverseAction.SELECT_DATAVERSES: {
        return Object.assign({}, state, { loading: true });
    }

    /*
    * Change the load state to false, and loaded to true to signaling
    * that a SELECT Query is success and there is dataverses available in the
    * store
    */
    case DataverseAction.SELECT_DATAVERSES_SUCCESS: {


      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        dataverses: action.payload //  _.sortBy(_.values(action.payload), 'dataverseName')
      })
    }

    /*
    * Just returns the current store/state object
    */
    default:
      return state;
  }
}
