# RxJS completeWhen Operator
_by David Björkevik_

An RxJS operator that causes an observable to complete early if/when another
controlling observable completes.

This is very useful to easliy limit the lifetime of a pipe, for instance when
writing user interface modules:  Set up a simple Subject called "destroyed" for
your UI component and call its `.complete()`-method upon component destruction.
Now you may use `.pipe(completeWhen(destroyed))` to make sure your subscriptions
are cancelled when your component is destroyed.

## Installation
```shell script
npm install rxjs-complete-when
```
