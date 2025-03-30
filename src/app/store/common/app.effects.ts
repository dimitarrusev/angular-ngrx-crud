import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { emptyAction, showAlert } from './app.actions';

@Injectable()
export class AppEffects {
  private actions$ = inject(Actions);
  private snackBar = inject(MatSnackBar);

  _showAlert = createEffect(() =>
    this.actions$.pipe(
      ofType(showAlert),
      exhaustMap((action) => {
        return this.showSnackBarAlert(action.message, action.resultType)
          .afterDismissed()
          .pipe(
            map(() => {
              return emptyAction();
            })
          );
      })
    )
  );

  showSnackBarAlert(message: string, resultType: string = 'fail') {
    return this.snackBar.open(message, 'OK', {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 3000,
      panelClass: resultType === 'success' ? 'green-snackbar' : 'red-snackbar',
    });
  }
}
