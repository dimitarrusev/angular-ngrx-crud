import { createReducer, on } from '@ngrx/store';
import { associateState } from './associate.state';
import {
  addAssociateSuccess,
  deleteAssociateSuccess,
  getAssociateSuccess,
  loadAssociatesFail,
  loadAssociatesSuccess,
  openDialog,
  updateAssociateSuccess,
} from './associate.actions';

const _associateReducer = createReducer(
  associateState,
  on(loadAssociatesSuccess, (state, action) => {
    return {
      ...state,
      list: [...action.list],
      errorMessage: '',
    };
  }),
  on(loadAssociatesFail, (state, action) => {
    return {
      ...state,
      list: [],
      errorMessage: action.errorMessage,
    };
  }),
  on(addAssociateSuccess, (state, action) => {
    const maxId = Math.max(...state.list.map((item) => item.id));
    const newAssociate = { ...action.associate };
    newAssociate.id = maxId + 1;

    return {
      ...state,
      list: [...state.list, newAssociate],
      errorMessage: '',
    };
  }),
  on(getAssociateSuccess, (state, action) => {
    return {
      ...state,
      associateObj: action.associate,
      errorMessage: '',
    };
  }),
  on(updateAssociateSuccess, (state, action) => {
    const updatedAssociatesList = state.list.map((associate) => {
      return associate.id === action.associate.id
        ? action.associate
        : associate;
    });

    return {
      ...state,
      list: updatedAssociatesList,
      errorMessage: '',
    };
  }),
  on(deleteAssociateSuccess, (state, action) => {
    const updatedAssociatesList = state.list.filter(
      (item) => item.id !== action.id
    );

    return {
      ...state,
      list: updatedAssociatesList,
      errorMessage: '',
    };
  }),
  on(openDialog, (state, action) => {
    return {
      ...state,
      associateObj: {
        id: 0,
        name: '',
        email: '',
        phone: '',
        type: 'CUSTOMER',
        address: '',
        associateGroup: 'Level-1',
        status: true,
      },
    };
  })
);

export function associateReducer(state: any, action: any) {
  return _associateReducer(state, action);
}
