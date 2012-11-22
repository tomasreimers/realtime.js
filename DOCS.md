# Documentation

## Basics

    var realtime_rule = realtime({selector});
    realtime_rule.act({callback 1});
    realtime_rule.act({callback 2});

### realtime

*selector* (string) - A [Sizzle supported selector](https://github.com/jquery/sizzle/wiki/Sizzle-Documentation) (Sizzle is what runs jQuery; if it is a jQuery selector, it is a Sizzle selector)

Returns a realtime rule which affects how DOM elements are manipulated as they load

### act

*callback* (function) - The function to call when an element is matched (it is called with the `this` keyword bound to the matched element)

Whenever an element which matches the selector enters the DOM, the callback is called on it.

## Detaching

    var realtime_rule = realtime({selector});
    realtime_rule.act({callback});
    realtime_rule.detach();

Detaching a rule means that it will no longer effect elements that enter the DOM.

## Until

Additionally, you can set realtime up to automatically detach:

    var realtime_rule = realtime({selector});
    realtime_rule.act({callback});
    realtime_rule.untilFound();

`.untilFound` means that the rule will be automatically detached after realtime has found one element that matches the selector.
    
## Now
    
    var realtime_rule = realtime({selector});
    realtime_rule.act({callback});
    realtime_rule.now();

You can call now on a realtime rule to make it take effect on all the elements currenly in the DOM (whether they have previously been affected or not).

## Convenience Functions

Although you can do this with `.act()`, realtime provides a couple convenience functions to make editing of certain properties easier.

    var realtime_rule = realtime({selector});
    var realtime_rule.style({property}, {value});
    var realtime_rule.attribute({property}, {value});
    var realtime_rule.content({value});

### style

*property* (string) - css property to affect
*value* (string OR function) - the value of the css property; if it is a function, it should accept one argument (the HTML elements that was matched), and the return value will be used.

### attribute

*property* (string) - attribute to affect
*value* (string OR function) - the value to set the attribute equal to; if it is a function, it should accept one argument (the HTML elements that was matched), and the return value will be used.

### content

*value* (string OR function) - the new inner html for the element; if it is a function, it should accept one argument (the HTML elements that was matched), and the return value will be used.

## Chaining

ALL of methods in a realtime rule return the rule, this allows for jQuery-like chaining:

    realtime({selector}).untilFound.act({callback});

or 

    realtime({selector})
        .content('Hello, world!')
        .act({callback 1})
        .act({callback 2})
        .now();

## Alias

Unless you change the `realtime.config.noConflict` setting to be true, realtime is availiable under the alias `rt`.

    rt('.nav-list').act(function (){
        this.style.color = '#FF0000';
    });