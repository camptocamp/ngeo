// The MIT License (MIT)
//
// Copyright (c) 2017-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import angular from 'angular';

/**
 * @typedef {Object} Coordinates
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef {Object} EventHandlers
 * @property {function(Coordinates, JQueryEventObject): void} [start]
 * @property {function(Coordinates, JQueryEventObject): void} [end]
 * @property {function(JQuery.TriggeredEvent<?, undefined, ?, ?>|JQueryEventObject): void} [cancel]
 * @property {function(Coordinates, JQueryEventObject): void} [move]
 */

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('ngeoMiscSwipe', []);

/**
 * ===========================================
 * NOTE: It is an inversed copy of ngSwipe.
 * Angular ngSwipe assumes that vertical
 * swipe is a scroll.
 * For more details:
 * https://docs.angularjs.org/api/ngTouch/service/$swipe
 * ===========================================
 */

/**
 * @ngdoc service
 * @name $verticalSwipe
 *
 * @description
 * The `$verticalSwipe` service is a service that abstracts the messier details of hold-and-drag swipe
 * behavior, to make implementing swipe-related directives more convenient.
 *
 * Requires the {@link ngTouch `ngTouch`} module to be installed.
 *
 * `$verticalSwipe` is used by the `ngeoSwipeUp` and `ngeoSwipeDown` directives.
 *
 * # Usage
 * The `$verticalSwipe` service is an object with a single method: `bind`. `bind` takes an element
 * which is to be watched for swipes, and an object with four handler functions. See the
 * documentation for `bind` below.
 */
myModule.factory('$verticalSwipe', [
  function () {
    // The total distance in any direction before we make the call on swipe vs. scroll.
    const MOVE_BUFFER_RADIUS = 10;

    /** @type {Object<string, Object<string, string>>} */
    const POINTER_EVENTS = {
      mouse: {
        start: 'mousedown',
        move: 'mousemove',
        end: 'mouseup',
      },
      touch: {
        start: 'touchstart',
        move: 'touchmove',
        end: 'touchend',
        cancel: 'touchcancel',
      },
      pointer: {
        start: 'pointerdown',
        move: 'pointermove',
        end: 'pointerup',
        cancel: 'pointercancel',
      },
    };

    /**
     * @param {JQueryEventObject} event
     * @return {Coordinates}
     */
    function getCoordinates(event) {
      let uiEvent;
      const touchEvent = /** @type {TouchEvent} */ (event.originalEvent);
      if (touchEvent.changedTouches && touchEvent.changedTouches.length > 0) {
        uiEvent = touchEvent.changedTouches[0];
      } else {
        uiEvent = /** @type {MouseEvent} */ (event.originalEvent);
      }
      return {
        x: uiEvent.clientX,
        y: uiEvent.clientY,
      };
    }

    /**
     * @param {string[]} pointerTypes
     * @param {string} eventType
     */
    function getEvents(pointerTypes, eventType) {
      /** @type {string[]} */
      const res = [];
      angular.forEach(pointerTypes, (pointerType) => {
        const eventName = POINTER_EVENTS[pointerType][eventType];
        if (eventName) {
          res.push(eventName);
        }
      });
      return res.join(' ');
    }

    return {
      /**
       * @ngdoc method
       * @name $verticalSwipe#bind
       * @param {JQuery} element Element.
       * @param {EventHandlers} eventHandlers Event handlers object with callbacks
       * @param {string[]} pointerTypes Types of pointer
       *
       * @description
       * The main method of `$verticalSwipe`. It takes an element to be watched for swipe motions, and an
       * object containing event handlers.
       * The pointer types that should be used can be specified via the optional
       * third argument, which is an array of strings `'mouse'`, `'touch'` and `'pointer'`. By default,
       * `$verticalSwipe` will listen for `mouse`, `touch` and `pointer` events.
       *
       * The four events are `start`, `move`, `end`, and `cancel`. `start`, `move`, and `end`
       * receive as a parameter a coordinates object of the form `{ x: 150, y: 310 }` and the raw
       * `event`. `cancel` receives the raw `event` as its single parameter.
       *
       * `start` is called on either `mousedown`, `touchstart` or `pointerdown`. After this event,
       * `$verticalSwipe` is watching for `touchmove`, `mousemove` or `pointermove` events. These events are
       * ignored until the total distance moved in either dimension exceeds a small threshold.
       *
       * Once this threshold is exceeded, either the vertical or vertical delta is greater.
       * - If the vertical distance is greater, this is a swipe and `move` and `end` events follow.
       * - If the horizontal distance is greater, this is a scroll, and we let the browser take over.
       *   A `cancel` event is sent.
       *
       * `move` is called on `mousemove`, `touchmove` and `pointermove` after the above logic has determined
       * that a swipe is in progress.
       *
       * `end` is called when a swipe is successfully completed with a `touchend`, `mouseup` or `pointerup`.
       *
       * `cancel` is called either on a `touchcancel` or `pointercancel`  from the browser, or when we begin
       * scrolling as described above.
       *
       */
      bind(element, eventHandlers, pointerTypes) {
        // Absolute total movement, used to control swipe vs. scroll.
        /** @type {number} */
        let totalX;
        /** @type {number} */
        let totalY;
        // Coordinates of the start position.
        /** @type {{x: number, y: number}} */
        let startCoords;
        // Last event's position.
        /** @type {{x: number, y: number}} */
        let lastPos;
        // Whether a swipe is active.
        let active = false;

        pointerTypes = pointerTypes || ['mouse', 'touch', 'pointer'];
        element.on(
          getEvents(pointerTypes, 'start'),
          /**
           * @param {JQueryEventObject} event
           */
          (event) => {
            startCoords = getCoordinates(event);
            active = true;
            totalX = 0;
            totalY = 0;
            lastPos = startCoords;
            if (eventHandlers.start) {
              eventHandlers.start(startCoords, event);
            }
          }
        );
        const events = getEvents(pointerTypes, 'cancel');
        if (events) {
          element.on(events, (event) => {
            active = false;
            if (eventHandlers.cancel) {
              eventHandlers.cancel(event);
            }
          });
        }

        element.on(
          getEvents(pointerTypes, 'move'),
          /**
           * @param {JQueryEventObject} event
           */
          (event) => {
            if (!active) {
              return;
            }

            // Android will send a touchcancel if it thinks we're starting to scroll.
            // So when the total distance (+ or - or both) exceeds 10px in either direction,
            // we either:
            // - On totalX > totalY, we send preventDefault() and treat this as a swipe.
            // - On totalY > totalX, we let the browser handle it as a scroll.

            if (!startCoords) {
              return;
            }
            const coords = getCoordinates(event);

            totalX += Math.abs(coords.x - lastPos.x);
            totalY += Math.abs(coords.y - lastPos.y);

            lastPos = coords;

            if (totalX < MOVE_BUFFER_RADIUS && totalY < MOVE_BUFFER_RADIUS) {
              return;
            }

            // One of totalX or totalY has exceeded the buffer, so decide on swipe vs. scroll.
            if (totalX > totalY) {
              // Allow native scrolling to take over.
              active = false;
              if (eventHandlers.cancel) {
                eventHandlers.cancel(event);
              }
              return;
            } else {
              // Prevent the browser from scrolling.
              event.preventDefault();
              if (eventHandlers.move) {
                eventHandlers.move(coords, event);
              }
            }
          }
        );

        element.on(
          getEvents(pointerTypes, 'end'),
          /**
           * @param {JQueryEventObject} event
           */
          (event) => {
            if (!active) {
              return;
            }
            active = false;
            if (eventHandlers.end) {
              eventHandlers.end(getCoordinates(event), event);
            }
          }
        );
      },
    };
  },
]);

/**
 * @private
 * @hidden
 * @param {string} directiveName Directive name
 * @param {number} direction Direction
 * @param {string} eventName Event name
 */
function makeSwipeDirective_(directiveName, direction, eventName) {
  myModule.directive(directiveName, [
    '$parse',
    '$verticalSwipe',
    function ($parse, $verticalSwipe) {
      // The maximum horizontal delta for a swipe should be less than 75px.
      const MAX_HORIZONTAL_DISTANCE = 75;
      // Horizontal distance should not be more than a fraction of the vertical distance.
      const MAX_HORIZONTAL_RATIO = 0.3;
      // At least a 30px lateral motion is necessary for a swipe.
      const MIN_VERTICAL_DISTANCE = 30;

      return function (scope, element, attr) {
        const swipeHandler = $parse(attr[directiveName]);

        /** @type {{x: number, y: number}} */
        let startCoords;
        /** @type {boolean} */
        let valid;

        /**
         * @param {{x: number, y: number}} coords
         */
        function validSwipe(coords) {
          // Check that it's within the coordinates.
          // Absolute vertical distance must be within tolerances.
          // Horizontal distance, we take the current X - the starting X.
          // This is negative for downward swipes and positive for upward swipes.
          // After multiplying by the direction (-1 for down, +1 for up), legal swipes
          // (ie. same direction as the directive wants) will have a positive delta and
          // illegal ones a negative delta.
          // Therefore this delta must be positive, and larger than the minimum.
          if (!startCoords) {
            return false;
          }
          const deltaY = (coords.y - startCoords.y) * direction;
          const deltaX = Math.abs(coords.x - startCoords.x);
          return (
            valid && // Short circuit for already-invalidated swipes.
            deltaX < MAX_HORIZONTAL_DISTANCE &&
            deltaY > 0 &&
            deltaY > MIN_VERTICAL_DISTANCE &&
            deltaX / deltaY < MAX_HORIZONTAL_RATIO
          );
        }

        const pointerTypes = ['touch'];
        if (angular.isDefined(attr.ngeoSwipeDisableMouse)) {
          pointerTypes.push('mouse');
        }
        $verticalSwipe.bind(
          element,
          {
            'start':
              /**
               * @param {{x: number, y: number}} coords
               * @param {void} event
               */
              function (coords, event) {
                startCoords = coords;
                valid = true;
              },
            'cancel':
              /**
               * @param {void} event
               */
              function (event) {
                valid = false;
              },
            'end':
              /**
               * @param {{x: number, y: number}} coords
               * @param {void} event
               */
              function (coords, event) {
                if (validSwipe(coords)) {
                  scope.$apply(() => {
                    element.triggerHandler(eventName);
                    swipeHandler(scope, {$event: event});
                  });
                }
              },
          },
          pointerTypes
        );
      };
    },
  ]);
}

// Down is negative Y-coordinate, up is positive.
makeSwipeDirective_('ngeoSwipeDown', 1, 'swipedown');
makeSwipeDirective_('ngeoSwipeUp', -1, 'swipeup');

export default myModule;
