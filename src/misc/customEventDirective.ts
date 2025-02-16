import angular, {IDirective} from 'angular';

/**
 * @type {angular.IModule}
 */
const myModule = angular.module('ngeoEvent', []);

/**
 * This directive makes a bridge between custom events and AngularJS.
 * It allows to listen to custom events and react to changes with AngularJS.
 * Example:
 *   <my-emitter
 *    ngeo-event
 *    ngeo-event-model=myEventValue
 *    ngeo-event-on="'my-event-name'"
 *    ngeo-event-cb="ctrl.myCallback(myEventValue, 'an arg')"/>
 * @returns {angular.IDirective} Directive Definition Object.
 */
const ngeoEventDirective = () => {
  return {
    restrict: 'A',
    scope: {
      'model': '=ngeoEventModel',
      'on': '<ngeoEventOn',
      'cb': '&ngeoEventCb',
    },
    link: function (scope: angular.IScope, element: HTMLElement[]) {
      // @ts-ignore: scope.on
      const eventName = `${scope.on}`;
      // @ts-ignore: scope.cb
      const cb = scope.cb as () => void;
      if (!eventName) {
        console.error('Missing event name, did you forget the quotes around the "on" attribute?');
        return;
      }
      if (!cb) {
        console.error('Missing callback, did you forget the callback "cb" attribute?');
        return;
      }
      // On event listened, update the model with the value and
      // let AngularJs know the value by running an apply.
      // then run a second apply to call the callback with the updated model.
      element[0].addEventListener(eventName, (event: Event) => {
        const cEvent: CustomEvent = event as CustomEvent;
        scope.$apply(() => {
          // @ts-ignore: scope.cb
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          scope.model = cEvent.detail;
        });
        scope.$apply(() => {
          cb();
        });
      });
    },
  } as IDirective;
};

myModule.directive('ngeoEvent', ngeoEventDirective);
export default myModule;
