define(['underscore'], function (_) {
  _.mixin({
    // _.get() https://gist.github.com/markoshust/8adf8303753a74d2105b
    // Deep search in object and returns a value
    // Ex. _.get(object, "a.b.c");
    // Returns object.a[b].c value
    "getDeep": function (obj, key) {
      var type = typeof key;

      if (typeof obj === 'undefined' || type === 'undefined') {
        return undefined;
      }
      if (type == 'string' || type == "number") {
        key = ("" + key).replace(/\[(.*?)\]/, /\[(.*?)\]/, function (m, key) { //handle case where [1] may occur
          return '.' + key.replace(/["']/g, /["']/g, ""); //strip quotes
        }).split('.');
      }
      for (var i = 0, l = key.length; i < l; i++) {
        if (typeof obj !== 'undefined' && _.has(obj, key[i])) {
          obj = obj[key[i]];
        } else {
          return undefined;
        }
      }

      return obj;
    },

    // _.set() http://adameivy.com/undermore/
    // Deep search in object and sets a value
    // Ex. _.set(object, "a.b.c", 5);
    // Sets object.a[b].c = 5
    "setDeep": function (obj, chain, value) {
      var key = obj, length = null;

      if (typeof chain === 'string') {
        chain = chain.split('.');
      }

      length = chain.length - 1;

      for (var i = 0; i < length; i++) {
        if (typeof key[chain[i]] === 'undefined' || key[chain[i]] === null) {
          key[chain[i]] = {};
        }

        key = key[chain[i]];
      }

      key[chain[length]] = value;

      return obj;
    }
  });
});