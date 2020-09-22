import { of, Subject } from "rxjs";
import { completeWhen } from "./complete-when";
import { toArray } from "rxjs/operators";

test("works when controller never completes", async function () {
  const controller = new Subject<void>();
  const array = await of(1, 2, 3, 4)
    .pipe(completeWhen(controller), toArray())
    .toPromise();
  expect(array).toEqual([1, 2, 3, 4]);
});

test("works when controller completes before source", async function () {
  const controller = new Subject<void>();
  const src = new Subject<number>();

  const output: number[] = [];
  const observer = {
    next: (x: number) => output.push(x),
    complete: jest.fn(),
    error: jest.fn(),
  };
  src.pipe(completeWhen(controller)).subscribe(observer);
  src.next(1);
  src.next(2);
  expect(observer.complete).not.toHaveBeenCalled();
  controller.complete();
  expect(observer.complete).toHaveBeenCalled();
  src.next(3);
  src.complete();
  expect(output).toEqual([1, 2]);
});

test("works when controller errors source completes", async function () {
  const controller = new Subject<void>();
  const src = new Subject<number>();

  const output: number[] = [];
  const observer = {
    next: (x: number) => output.push(x),
    complete: jest.fn(),
    error: jest.fn(),
  };
  src.pipe(completeWhen(controller)).subscribe(observer);
  src.next(1);
  src.next(2);
  expect(observer.complete).not.toHaveBeenCalled();
  controller.error(new Error("meh"));
  expect(observer.complete).toHaveBeenCalled();
  src.next(3);
  src.complete();
  expect(output).toEqual([1, 2]);
});

test("works when controller emits items", async function () {
  const controller = new Subject<void>();
  const src = new Subject<number>();

  const output: number[] = [];
  const observer = {
    next: (x: number) => output.push(x),
    complete: jest.fn(),
    error: jest.fn(),
  };
  src.pipe(completeWhen(controller)).subscribe(observer);
  src.next(1);
  src.next(2);
  controller.next();
  src.next(3);
  src.complete();
  expect(output).toEqual([1, 2, 3]);
});
