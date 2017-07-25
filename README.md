# React component to create **pagination** from your list

- Here is available a short [Demo](https://codesandbox.io/s/mw2Ojlm73).
- [Usage with Redux](https://codesandbox.io/s/pYADWOoAV).

<p align="center">
  <a href="https://www.npmjs.com/package/react-pagimagic" target="_blank"><img src="https://img.shields.io/npm/v/react-pagimagic.svg"></a>
  <a href="https://travis-ci.org/ivanzusko/react-pagimagic" target="_blank">
    <img src="https://travis-ci.org/ivanzusko/react-pagimagic.svg?branch=master" alt="travis-web"/>
  </a>
  <img src="https://img.shields.io/npm/dt/react-pagimagic.svg" alt="total downloads" />
  <img src="https://img.shields.io/github/issues/ivanzusko/react-pagimagic.svg" alt="opened issues" />
  <img src="https://img.shields.io/github/issues-closed-raw/ivanzusko/react-pagimagic.svg" alt="closed issues" />
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
Or, if you don't need any default arrows or some text (like `prev` or `next`) than just pass `arrow` property alone (or as anything else except of **function** or any **falsy** value).

```javascript
  return (
    <Pagimagic
      ...
      // like this:
      arrow
      // or even like this
      arrow="jo-ho-ho"
      // but not like this:
      arrow=""
    />
  );
}
```
It will render absolutely empty spans with just a class name, so you will be able change **css** or just live it as is. If `arrow` accept your function to render component - it still will rendered your arrow component in your way. If you pass a falsy value to `arrow` property(e.g. `arrow=""`) - then you will get `prev`/`next` labels instead of arrows.

Also you can use very primitive default styles by passing `useDefaultStyles` property:

```javascript
const YourComponent = (props) => {
  ...

  return (
    <Pagimagic
      ...
      useDefaultStyles
    />
  );
}
```

And this is basically it. By default you will get list of items(your custom logic not related to Pagimagic) and ready-to-use pagination without styling, so you shouldn't think about overriding styles. Just apply any styles you like.

Pagimagic will render following elements with such classes:
- `.Pagimagic` for main wrapper (around list and pagination itself).
- `.Pagimagic.your-className` for main wrapper, in case if you've passed your own class via `className` property. If you passed your own `className` then all further element will have both and native classes and generated from yours (E.g. `.Pagimagic__nav-item` will have aditional class: `your-className__nav-item`).
- `.Pagimagic__nav` for pagination navigation.
- `.Pagimagic__nav-item` for pagination buttons.
- - `.Pagimagic__nav-item active` for active pagination button.
- - `.Pagimagic__nav-item--prev` and `.Pagimagic__nav-item--next` for _previous_ and _next_ arrows.
- if you didn't pass a custom **arrow** to the `.Pagimagic`, then `span.Pagimagic__nav-arrow` will be rendered inside `.Pagimagic__nav-item--prev` and `.Pagimagic__nav-item--next`.

## With application state manager (e.g. Redux)
In order to have more control on how the `currentPageIndex` is changing, you may use `changePageIndex` prop, which will provide you the possibility to change the `currentPageIndex` externally (by default **Pagimagic** is handling pagination by itself, internally handling changing of the current page index). Just pass inside you action creator, so it will be called whenever user will decide to click either paginator or prev/next arrows.

Redux [example](https://codesandbox.io/s/G5Z82ZXoK)


## More info
Property | Type | isRequired | Default value | Description
:---|:---|:---|:---|:---
`list` | Array<any> | yes | - | You need to pass an array with elements, so Pagimagic will know, how many pages and pagination buttons build.
`itemsPerPage` | Number | yes | - | How many elements will be shown on one page.
`currentPageIndex` | Number | yes | - | Index of the page which is shown initialy.
`changePageIndex` | Function | no | - | In case of using some application state manager(e.g. [Redux](http://redux.js.org/)) you may need possibility to pass your specific logic for changing `currentPageIndex` in your application store. For example, you may want to change in your store `currentPageIndex` whenever user clicks on paginators/arrows.
`maximumVisiblePaginators` | Number | yes | - | How many pagination buttons should be displayed. **E.g.:** there are 10 pages, and `maximumVisiblePaginators` is set to 3, so there will be shown only 3 pagination buttons + arrow prev and arrow next, and 7 pagination buttons will be hidden.
`renderChildren` | Function | yes | - | The way how your list should be build. `Pagimagic` will display your list acording to your logic, and will handle only pagination computation and creation.
`className` | String | no | `Pagimagic` | If you want to have aditionaly your className.
`arrow` | any | no | `span.Pagimagic__nav-arrow` | By default the `span` will be rendered inside the `div.Pagimagic__nav-item--prev` and `div.Pagimagic__nav-item--next` with text **prev** and **next** respectively. If you don't need this text inside - just pass any **not** function and **not** falsy value inside the `arrow` property, or just live it alone like in the example above.
`useDefaultStyles` | Boolean | no | `false` | You can use very basic default styles by passing `useDefaultStyles` property. Without passing this prop you will get naked pagination. 

## Demo
- Here is available a short [Demo](https://codesandbox.io/s/mw2Ojlm73).
- [Usage with Redux](https://codesandbox.io/s/pYADWOoAV).

## History
You can get the [CHANGELOG](https://github.com/ivanzusko/react-pagimagic/blob/master/CHANGELOG.md)

## License
Licensed under [MIT](https://opensource.org/licenses/MIT) license.
