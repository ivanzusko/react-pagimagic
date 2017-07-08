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
import Pagination from 'react-pagimagic';
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
    <Pagination
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

## License
Licensed under [MIT](https://opensource.org/licenses/MIT) license.
