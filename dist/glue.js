(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.glue = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var glue = function glue(className, johnny) {
    return function (mods) {
      var arr = johnny ? [className, johnny] : [className];

      if (mods) {
        return arr.reduce(function (memo, item) {
          var cry = mods.reduce(function (memo1, item1) {
            memo1.push(item + item1);

            return memo1;
          }, []);
          var res = memo.concat(cry);

          return res;
        }, []).join(' ');
      }

      return arr.join(' ');
    };
  };

  exports.default = glue;
});