import { Observable, MonoTypeOperatorFunction, EMPTY } from "rxjs";
import { catchError, endWith, ignoreElements, takeUntil } from "rxjs/operators";

/**
 * Operator to make an observable complete prematurely if/when another
 * "controller" observable completes.
 * @param controller The controller observable
 */
export function completeWhen<T>(
  controller: Observable<unknown>
): MonoTypeOperatorFunction<T> {
  return (observable: Observable<T>) => {
    return observable.pipe(
      takeUntil(
        controller.pipe(
          ignoreElements(),
          catchError(() => EMPTY),
          endWith(true)
        )
      )
    );
  };
}
