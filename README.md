# realtime.js

## Quick Use

    <script type="text/javascript" src="realtime.min.js"></script>

## About 

realtime.js allows you to write JavaScript for elements that have not yet been created.

## Usage

    realtime({selector}).act({callback})

*selector* - A [Sizzle supported selector](https://github.com/jquery/sizzle/wiki/Sizzle-Documentation) (Sizzle powers jQuery; if it is a jQuery selector, it is a Sizzle selector)  
*callback* - The function to call when a created element matches the selector (it is called with the `this` keyword bound to the matched element)

Whenever an element that matches the selector enters the DOM, the callback is called on it.

[Read More](https://github.com/tomasreimers/realtime.js/blob/master/DOCS.md)

## Developing with realtime.js

 - `/sizzle/sizzle.js` - Sizzle
 - `/realtime.js` - realtime

    <script type="text/javascript" src="sizzle.js"></script>
    <script type="text/javascript" src="realtime.js"></script>

## Implementation

realtime.js is implemented using [MutationObservers](https://developer.mozilla.org/en-US/docs/DOM/MutationObserver); if the browser does not support mutation observers, realtime.js will fallback to checking the page for new items every second.

## Support

 - Firefox 17+
 - Chrome 23+
 - Safari 5+
 - Opera 11+
 - IE 9+

## Testing and Benchmarkings

 - Simply download the repo and open up `test/test.html` to make sure that realtime.js works.

## Use of Open Source Software

Everything in the `Sizzle/` submodule is part of the [Sizzle project](https://github.com/jquery/sizzle/) copyrighted by the jQuery Foundation and licensed under an MIT license.

## Copyright and License

(C) Tomas Reimers, 2012

Licensed under the MIT License (see LICENSE.txt in this repository).