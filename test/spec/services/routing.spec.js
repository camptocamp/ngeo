goog.require('ngeo.RoutingService');

describe('ngeo.RoutingService', () => {
  let $httpBackend;

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('Should get a route', () => {
    let ngeoOsrmBackendUrl;
    let ngeoRoutingService;
    const successResponse = {
      route: true
    };

    inject(($injector) => {
      $httpBackend = $injector.get('$httpBackend');
      ngeoRoutingService = $injector.get('ngeoRoutingService');
      ngeoOsrmBackendUrl = $injector.get('ngeoRoutingOptions').backendUrl;
    });

    const coordinates = /** @type {Array.<ol.Coordinate>} */ [[6.455, 46.648], [6.532, 6.532]];
    const coordString = `${coordinates[0][0]},${coordinates[0][1]};${coordinates[1][0]},${coordinates[1][1]}`;
    const config = {
      profile: 'jetpack',
      options: {
        option: 'value'
      }
    };
    const requestUrl = `${ngeoOsrmBackendUrl}route/v1/${config.profile}/${coordString}?option=${config.options.option}`;

    $httpBackend.when('GET', requestUrl).respond(successResponse);
    $httpBackend.expectGET(requestUrl);
    ngeoRoutingService.getRoute(coordinates, config);
    $httpBackend.flush();
  });

  it('Should get a nearest object', () => {
    let ngeoOsrmBackendUrl;
    let ngeoRoutingService;
    const successResponse = {
      nearest: 'Streetname'
    };

    inject(($injector) => {
      $httpBackend = $injector.get('$httpBackend');
      ngeoRoutingService = $injector.get('ngeoRoutingService');
      ngeoOsrmBackendUrl = $injector.get('ngeoRoutingOptions').backendUrl;
    });

    const coordinate = /** @type {ol.Coordinate} */ [6.455, 46.648];
    const coordString = `${coordinate[0]},${coordinate[1]}`;
    const config = {
      options: {
        option: 'value'
      }
    };
    const requestUrl = `${ngeoOsrmBackendUrl}nearest/v1/car/${coordString}?option=${config.options.option}`;

    $httpBackend.when('GET', requestUrl).respond(successResponse);
    $httpBackend.expectGET(requestUrl);
    ngeoRoutingService.getNearest(coordinate, config);
    $httpBackend.flush();
  });
});
