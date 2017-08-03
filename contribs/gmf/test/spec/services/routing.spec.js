goog.require('gmf.RoutingService');

describe('gmf.RoutingService', () => {
  let $httpBackend;

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('Should get a route', () => {
    let gmfOsrmBackendUrl;
    let gmfRoutingService;
    const successResponse = {
      route: true
    };

    inject(($injector) => {
      $httpBackend = $injector.get('$httpBackend');
      gmfRoutingService = $injector.get('gmfRoutingService');
      gmfOsrmBackendUrl = $injector.get('gmfRoutingOptions').backendUrl;
    });

    const coordinates = /** @type {Array.<ol.Coordinate>} */ [[6.455, 46.648], [6.532, 6.532]];
    const coordString = `${coordinates[0][0]},${coordinates[0][1]};${coordinates[1][0]},${coordinates[1][1]}`;
    const config = {
      profile: 'jetpack',
      options: {
        option: 'value'
      }
    };
    const requestUrl = `${gmfOsrmBackendUrl}route/v1/${config.profile}/${coordString}?option=${config.options.option}`;

    $httpBackend.when('GET', requestUrl).respond(successResponse);
    $httpBackend.expectGET(requestUrl);
    gmfRoutingService.getRoute(coordinates, config);
    $httpBackend.flush();
  });

  it('Should get a nearest object', () => {
    let gmfOsrmBackendUrl;
    let gmfRoutingService;
    const successResponse = {
      nearest: 'Streetname'
    };

    inject(($injector) => {
      $httpBackend = $injector.get('$httpBackend');
      gmfRoutingService = $injector.get('gmfRoutingService');
      gmfOsrmBackendUrl = $injector.get('gmfRoutingOptions').backendUrl;
    });

    const coordinate = /** @type {ol.Coordinate} */ [6.455, 46.648];
    const coordString = `${coordinate[0]},${coordinate[1]}`;
    const config = {
      options: {
        option: 'value'
      }
    };
    const requestUrl = `${gmfOsrmBackendUrl}nearest/v1/car/${coordString}?option=${config.options.option}`;

    $httpBackend.when('GET', requestUrl).respond(successResponse);
    $httpBackend.expectGET(requestUrl);
    gmfRoutingService.getNearest(coordinate, config);
    $httpBackend.flush();
  });
});
