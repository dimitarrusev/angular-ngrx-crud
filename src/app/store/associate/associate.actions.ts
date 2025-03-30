import { createAction, props } from '@ngrx/store';
import { Associate } from '../model/Associate.model';

export const LOAD_ASSOCIATES = '[associate page] load associates';
export const LOAD_ASSOCIATES_SUCCESS =
  '[associate page] load associates success';
export const LOAD_ASSOCIATES_FAIL = '[associate page] load associates fail';

export const ADD_ASSOCIATE = '[associate page] add associate';
export const ADD_ASSOCIATE_SUCCESS = '[associate page] add associate success';

export const GET_ASSOCIATE = '[associate page] get associate';
export const GET_ASSOCIATE_SUCCESS = '[associate page] get associate success';

export const UPDATE_ASSOCIATE = '[associate page] update associate';
export const UPDATE_ASSOCIATE_SUCCESS =
  '[associate page] update associate success';

export const DELETE_ASSOCIATE = '[associate page] delete associate';
export const DELETE_ASSOCIATE_SUCCESS =
  '[associate page] delete associate success';

export const OPEN_DIALOG = '[associate page] open dialog';

export const loadAssociates = createAction(LOAD_ASSOCIATES);
export const loadAssociatesSuccess = createAction(
  LOAD_ASSOCIATES_SUCCESS,
  props<{ list: Associate[] }>()
);
export const loadAssociatesFail = createAction(
  LOAD_ASSOCIATES_FAIL,
  props<{ errorMessage: string }>()
);

export const addAssociate = createAction(
  ADD_ASSOCIATE,
  props<{ associate: Associate }>()
);
export const addAssociateSuccess = createAction(
  ADD_ASSOCIATE_SUCCESS,
  props<{ associate: Associate }>()
);

export const getAssociate = createAction(
  GET_ASSOCIATE,
  props<{ id: number }>()
);
export const getAssociateSuccess = createAction(
  GET_ASSOCIATE_SUCCESS,
  props<{ associate: Associate }>()
);

export const updateAssociate = createAction(
  UPDATE_ASSOCIATE,
  props<{ associate: Associate }>()
);
export const updateAssociateSuccess = createAction(
  UPDATE_ASSOCIATE_SUCCESS,
  props<{ associate: Associate }>()
);

export const deleteAssociate = createAction(
  DELETE_ASSOCIATE,
  props<{ id: number }>()
);
export const deleteAssociateSuccess = createAction(
  DELETE_ASSOCIATE_SUCCESS,
  props<{ id: number }>()
);

export const openDialog = createAction(OPEN_DIALOG);
