# CHANGELOG

## v1.1.3
- Added pagination breaker: `<` 1 ... 4 **6** 7 ... 13 `>`

## v1.0.0
- `className` which you pass as a property now will render in all components side by side with `Pagimagic` class. E.g: if you are passing __your-class__ via `className`, than whole block will have `class="Pagimagic your-class"` and in same maner the others will render: `Pagimagic__nav` will become `class="Pagimagic__nav your-class__nav"` and so on.

- `arrow`. If you don't need any default arrows or some text (like `prev` or `next`) than just pass `arrow` property alone (or as anything else except of **function** or any **falsy** value). It will render absolutely empty spans with just a class name, so you will be able change **css** or just live it as is. If `arrow` accept your function to render component - it still will rendered your arrow component in your way. If you pass a falsy value to `arrow` property(e.g. `arrow=""`) - then you will get `prev`/`next` labels instead of arrows.
