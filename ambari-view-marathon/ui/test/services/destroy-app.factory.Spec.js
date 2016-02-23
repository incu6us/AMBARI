describe('DestroyAppFactory', function() {
  var DestroyAppFactory, httpBackend;

  beforeEach(module('MarathonApp'));

  beforeEach(inject(function($injector) {
    httpBackend = $injector.get('$httpBackend');
    DestroyAppFactory = $injector.get('DestroyAppFactory');
    spyOn(console, 'log');
  }));

  it('on del() destroy the app', function() {
    httpBackend.expectDELETE('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://testHost:8080/v2/apps/testID', config)
      .respond({"httpStatusCode":200});

    var hostName = 'testHost';
    var appID = 'testID';
    var config = {
      headers: {
        'X-Requested-By': hostName,
        'X-Requested-With': 'XMLHttpRequest'
      }
    };

    DestroyAppFactory.del(hostName, appID)
      .then(function() {
        expect(console.log).toHaveBeenCalled();
      });

    httpBackend.flush();
  });

});
