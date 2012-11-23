/* 
 * realtime.js
 * 
 * (C) Tomas Reimers, 2012
 * 
 * A library for manipulating the DOM as it loads.
 */
(function (window, undefined){
     "use strict";

     /* 
      * Main namespace, function (shortcut to realtime.addTarget), and object holding all pertinent information)
      */

     var realtime = function (selector){
          return realtime.addTarget(selector);
     };

     /* 
      * Config options
      * 
      * realtime.config.noConflict (Boolean) - if enabled it doesn't set rt as a shortcut for the realtime obj 
      */

     realtime.config = {
          noConflict: false
     };


     /* 
      * An array of targets and associated actions for when you encounter them
      * 
      * Members should look like:
      * {
      *     selector: (string),
      *     actions: [
      *          (function),
      *          ...
      *     ]
      * }
      */

     realtime.targets = [];

     /*
      * Constructor for prototype of realtime.targets member
      */ 

     realtime.targetProto = function (selector){
          // create standard name to access this by (for functions defined inside of this one)
          var self = this;
          // selector to match elements against
          self.selector = selector;
          // actions to execute on matched elements
          self.actions = [];
          /* when to remove this item
           * 
           * undefined - never
           * 1 - on first find
           */
          self.detachOn = undefined;
          self.detach = function (){
               for (var i = 0; i < realtime.targets.length; i++){
                    if (realtime.targets[i] === self){
                         // drop actions to make sure there are no further actions
                         self.actions.length = 0;
                         // remove self
                         realtime.targets.splice(i, 1);
                         // no need to keep searching
                         return;
                    }
               }
          };
          // adds function to actions
          self.act = function (callback){
               self.actions.push(callback);
               // return self to allow chaining
               return self;
          };
          // executes actions on that element
          self.executeOn = function (element){
               for (var i = 0; i < self.actions.length; i++){
                    self.actions[i].call(element);
               }
               if (self.detachOn === 1){
                    self.detach();
               }
               return self;
          };
          // finds all elements that match the selector that are currently loaded
          self.now = function (){
               var results = Sizzle(self.selector);
               for (var i = 0; i < results.length; i++){
                    self.executeOn(results[i]);
               }
               return self;
          };
          // detach on modification functions
          self.untilFound = function (){
               self.detachOn = 1;
               return self;
          };
          // convenience functions 
          self.style = function (property, newValue){
               // convert css property to js property
               property = property.toLowerCase().replace(/-([a-z])/g, function (match, letter){
                    return letter.toUpperCase();
               });
               if (typeof(newValue) === 'function'){
                    return self.act(function (){
                         this.style[property] = newValue(this);
                    });
               }
               else {
                    return self.act(function (){
                         this.style[property] = newValue;
                    });
               }
          };
          self.attribute = function (attribute, newValue){
               if (typeof(newValue) === 'function'){
                    return self.act(function (){
                         this.setAttribute(attribute, newValue(this));
                    });
               }
               else {
                    return self.act(function (){
                         this.setAttribute(attribute, newValue);
                    });
               }
          };
          self.content = function (newValue){
               if (typeof(newValue) === 'function'){
                    return self.act(function (){
                         this.innerHTML = newValue(this);
                    });
               }
               else {
                    return self.act(function (){
                         this.innerHTML = newValue;
                    });
               }
          };
     };

     /*
      * Adds a target to watch for
      */ 

     realtime.addTarget = function (selector){
          var target = new realtime.targetProto(selector);
          realtime.targets.push(target);
          return target;
     };

     /*
      * The handler for a single element
      */ 

     realtime.elementHandler = function (element){
          console.log(element);
          // child nodes already in element when it is loaded into the document are not considered mutations to the document
          for (var i = 0; i < element.childNodes; i++){
              if (element.childNodes[i].nodeType === 1){
                  realtime.elementHandler(element.childNodes[i]);    
              }
          }
          for (var i = 0; i < realtime.targets.length; i++){
               if (Sizzle.matchesSelector(element, realtime.targets[i].selector)){
                    realtime.targets[i].executeOn(element);
               }
          }
     };

     /*
      * The handler for a record element
      */ 

     // OLD WHITESPACE VALIDATION (for reference)
     // var whitespace = /^\s*$/;
     // !(mutation.addedNodes[i].nodeType === 3 && whitespace.test(mutation.addedNodes[i].nodeValue))

     realtime.recordHandler = function (mutations){
          // iterate thru each mutation
          mutations.forEach(function(mutation) {
               // handle each added node
               for (var i = 0; i < mutation.addedNodes.length; i++){
                    // don't waste time on whitespace nodes
                    if (mutation.addedNodes[i].nodeType === 1){
                         realtime.elementHandler(mutation.addedNodes[i]);    
                    }
               }
          });
     };

     /*
      * Fallback for browser which don't have mutation observers, simply matches all elements which I haven't already detected
      */ 

     realtime.fallbackHandler = function (){
          // match all previously unmatched elements
          Sizzle(":not([data-SeenByrealtime])").forEach(function (element){
               realtime.elementHandler(element);
               element.setAttribute('data-SeenByrealtime', 'true');
          });
     };


     /*
      * Attempt to bind item to mutation observer
      */

     var MutationObs = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

     if (typeof(MutationObs) !== 'undefined'){
          var observer = new MutationObs(realtime.recordHandler);
          observer.observe(window.document, {
               childList: true,
               subtree: true
          });
     }
     // no support for event, and must fallback
     else {
          // define that everything loaded so far has been seen by realtime (even though it hasn't) to prevent realtime from reporting it is new later on
          Sizzle("*").forEach(function (element){
               element.setAttribute('data-SeenByrealtime', 'true');
          });
          setInterval(realtime.fallbackHandler, 1000);
     }

     // convinience shortcut
     window.realtime = realtime;
     if (!realtime.config.noConflict){
          window.rt = realtime;
     }
})(window);