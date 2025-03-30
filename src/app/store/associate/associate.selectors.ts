import {
  createFeature,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { AssociateModel } from '../model/Associate.model';

const getAssociateState = createFeatureSelector<AssociateModel>('associate');

export const getAssociatesList = createSelector(getAssociateState, (state) => {
  return state.list;
});

export const getAssociate = createSelector(getAssociateState, (state) => {
  return state.associateObj;
});
