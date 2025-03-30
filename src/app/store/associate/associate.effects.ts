import { Injectable, inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, exhaustMap, of, map, switchMap } from 'rxjs';

import {
  loadAssociates,
  loadAssociatesSuccess,
  loadAssociatesFail,
  addAssociate,
  addAssociateSuccess,
  getAssociate,
  getAssociateSuccess,
  updateAssociate,
  updateAssociateSuccess,
  deleteAssociate,
  deleteAssociateSuccess,
} from './associate.actions';

import { AssociateService } from '../../services/associate.service';
import { showAlert } from '../common/app.actions';

@Injectable()
export class AssociateEffects {
  /* constructor(
    private actions$: Actions,
    private associateService: AssociateService
  ) {} */

  private actions$ = inject(Actions);
  private associateService = inject(AssociateService);

  _loadAssociates = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAssociates),
      exhaustMap((action) => {
        return this.associateService.getAssociates().pipe(
          map((associatesList) => {
            return loadAssociatesSuccess({ list: associatesList });
          }),
          catchError((error) =>
            of(loadAssociatesFail({ errorMessage: error.message }))
          )
        );
      })
    )
  );

  _addAssociate = createEffect(() =>
    this.actions$.pipe(
      ofType(addAssociate),
      switchMap((action) => {
        return this.associateService.addAssociate(action.associate).pipe(
          switchMap((associate) => {
            return of(
              addAssociateSuccess({ associate: action.associate }),
              showAlert({
                message: 'Successfully added associate',
                resultType: 'success',
              })
            );
          }),
          catchError((error) =>
            of(
              showAlert({
                message: 'Failed to add associate',
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _getAssociate = createEffect(() =>
    this.actions$.pipe(
      ofType(getAssociate),
      exhaustMap((action) => {
        return this.associateService.getAssociate(action.id).pipe(
          map((associate) => {
            return getAssociateSuccess({ associate: associate });
          }),
          catchError((error) =>
            of(
              showAlert({
                message: `Failed to get associate: ${error.message}`,
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _updateAssociate = createEffect(() =>
    this.actions$.pipe(
      ofType(updateAssociate),
      switchMap((action) => {
        return this.associateService.updateAssociate(action.associate).pipe(
          switchMap((associate) => {
            return of(
              updateAssociateSuccess({ associate: action.associate }),
              showAlert({
                message: 'Successfully updated associate',
                resultType: 'success',
              })
            );
          }),
          catchError((error) =>
            of(
              showAlert({
                message: 'Failed to update associate',
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _deleteAssociate = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteAssociate),
      switchMap((action) => {
        return this.associateService.deleteAssociate(action.id).pipe(
          switchMap((associate) => {
            return of(
              deleteAssociateSuccess({ id: action.id }),
              showAlert({
                message: 'Successfully deleted associate',
                resultType: 'success',
              })
            );
          }),
          catchError((error) =>
            of(
              showAlert({
                message: 'Failed to delete associate',
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );
}
