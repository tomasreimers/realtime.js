# realtime.js

## About 

At the moment, we write JavaScript for what is already loaded into the DOM. Think about why you might wrap your code in a `$(document).ready()` function, because if you didn't your JavaScript would execute before your DOM was loaded, and then it would end up affecting nothing that was about to load. 

While that is fine, it can become probablematic; it becomes especially probablematic for libraries manipulate DOM elements. Consider this, I want to make a library which takes any div that has the class `data-list-view` and I want to add some extra functionality. At the moment, that is very difficult, because while you may be able to affect all the DOM elements when your script loads or even when the DOM finishes loading, your library won't affect any divs loaded after that (think dynamically created content or ajax navigation).

`realtime.js` is my solution to that. It allows you to create rules to apply to elements the moment they are created. This means that you could use it to make a library that effects the DOM, or you could simply use it for your own projects (because it works as the elements are created, you can actually place this before your DOM is loaded; as your DOM loads, it will apply your rules to the elements.

## Usage

    realtime({selector}).act({callback})

*selector* - A [Sizzle supported selector](https://github.com/jquery/sizzle/wiki/Sizzle-Documentation) (Sizzle is what runs jQuery; if it is a jQuery selector, it is a Sizzle selector)  
*callback* - The function to call when an element is matched (it is called with the `this` keyword bound to the matched element

Whenever an element which matches the selector enters the DOM, the callback is called on it.

[Read More](https://github.com/tomasreimers/realtime.js/blob/master/DOCS.md)

## Necessary Files

 - `/sizzle/sizzle.js` - Sizzle
 - `/realtime.js` - realtime

    <script type="text/javascript" src="sizzle.js"></script>
    <script type="text/javascript" src="realtime.js"></script>

## Implementation

realtime.js is implemented using [MutationObservers](https://developer.mozilla.org/en-US/docs/DOM/MutationObserver); additionally, the browser does not support mutation observers, realtime.js will fallback to simply checking the page for new items every second.

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