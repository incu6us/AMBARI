describe('RestartAppFactory', function() {
  var RestartAppFactory, httpBackend;

  beforeEach(module('MarathonApp'));

  beforeEach(inject(function($injector) {
    httpBackend = $injector.get('$httpBackend');
    RestartAppFactory = $injector.get('RestartAppFactory');
    spyOn(console, 'log');
  }));

  it('on post() restarts the app', function() {
    httpBackend.expectPOST('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://testHost:8080/v2/apps/testID/restart', data, config)
      .respond({'appProps':[]});

    var hostName = 'testHost';
    var appID = 'testID';
    var data = {};
    var config = {
      headers: {
        'X-Requested-By': hostName,
        'X-Requested-With': 'XMLHttpRequest'
      }
    };

    RestartAppFactory.post(hostName, appID)
      .then(function() {
        expect(console.log).toHaveBeenCalled();
      });

    httpBackend.flush();
  });

});
