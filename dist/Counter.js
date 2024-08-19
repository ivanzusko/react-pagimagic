import React from 'react';
import glue from './glue';
const Counter = ({ className, from, listLength, all, }) => {
    const to = from + listLength - 1;
    return (React.createElement("div", { className: glue('Pagimagic', className)(['__counter']) },
        `${from}${from === to ? '' : '-' + to}`,
        " of ",
        all));
};
export default Counter;
