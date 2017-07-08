# React component to create **pagination** from your list

If you want to create your own __npm__ package, here is one simple way.

<p align="center">
  <a href="https://www.npmjs.com/package/react-pagimagic" target="_blank"><img src="https://img.shields.io/npm/v/react-pagimagic.svg"></a>
  <a href="https://travis-ci.org/ivanzusko/react-pagimagic" target="_blank">
    <img src="https://travis-ci.org/ivanzusko/react-pagimagic.svg?branch=master" alt="travis-web"/>
  </a>
  <img src="https://img.shields.io/npm/dt/react-pagimagic.svg" alt="total downloads" />
  <a href="https://opensource.org/licenses/MIT" target="_blank"><img src="https://img.shields.io/npm/l/react-pagimagic.svg"></a>
</p>

## Installation

Just run:

```
yarn install react-pagimagic
```

or

```
npm install react-pagimagic
```

## Get started

First of all you need to import it:
```javascript
import Pagimagic from 'react-pagimagic';
```

Than, let's assume there is a list of something, which should be splited on pages and paginated:
```javascript
const YourComponent = (props) => {
  // let's assume that the users list is passing here:
  const { users } = props;

  // your logic how the list should be displayed
  yourRenderLogic = list => {
    return list.map(item => {
      return (
        <div key={item.name}>
          {item.name}
        </div>
      );
    });
  }

  return (
    <Pagimagic
      list={users}
      itemsPerPage={10}
      currentPageIndex={0}
      className="your-class-if-its-necessary"
      maximumVisiblePaginators={3}
      renderChildren={this.yourRenderLogic}
    />
  );
}
```

Also you can pass your own component which will play role of the arrows. Just pass it in the `arrow` property:

```javascript
// import from elsewhere:
import MyArrowComponent from './somewhere/MyArrowComponent';
// or create:
const MyArrowComponent = () => <span>ARROW</span>;

const YourComponent = (props) => {
  ...

  return (
    <Pagimagic
      ...
      arrow={MyArrowComponent}
    />
  );
}
```

And this is basically it. By default you will get list of items(your custom logic not related to Pagimagic) and ready-to-use pagination without styling, so you shouldn't think about overriding styles. Just apply any styles you like.

Pagimagic will render following elements with such classes:
- `.Pagimagic` for main wrapper (around list and pagination itself).
- `.Pagimagic.your-className` for main wrapper, in case if you've passed your own class via `className` property.
- `.Pagimagic-nav` for pagination navigation.
- `.Pagimagic-nav-item` for pagination buttons.
- - `.Pagimagic-nav-item active` for active pagination button.
- - `.Pagimagic-nav-item--prev` and `.Pagimagic-nav-item--next` for _previous_ and _next_ arrows.
- if you didn't pass a custom **arrow** to the `.Pagimagic`, then `span.Pagimagic-nav-arrow` will be rendered inside `.Pagimagic-nav-item--prev` and `.Pagimagic-nav-item--next`.

## License
Licensed under [MIT](https://opensource.org/licenses/MIT) license.
