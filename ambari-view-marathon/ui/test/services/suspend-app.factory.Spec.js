describe('SuspendAppFactory', function() {
  var SuspendAppFactory, httpBackend;

  beforeEach(module('MarathonApp'));

  beforeEach(inject(function($injector) {
    httpBackend = $injector.get('$httpBackend');
    SuspendAppFactory = $injector.get('SuspendAppFactory');
    spyOn(console, 'log');
  }));

  it('on put() changes configs of the app', function() {
    httpBackend.expectPUT('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://testHost:8080/v2/apps/testID?force=true', data, config)
      .respond({'appProps':[]});

    var hostName = 'testHost';
    var appID = 'testID';
    var data = {'props':[]};
    var config = {
      headers: {
        'X-Requested-By': hostName,
        'X-Requested-With': 'XMLHttpRequest'
      }
    };

    SuspendAppFactory.put(hostName, appID, data)
      .then(function() {
        expect(console.log).toHaveBeenCalled();
      });

    httpBackend.flush();
  });


  it('on verison() get versions of the app', function() {
    httpBackend.expectGET('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://testHost:8080/v2/apps/testID/versions', config)
      .respond({'versions':[{'props':[]}]});

    var hostName = 'testHost';
    var appID = 'testID';
    var config = {
      headers: {
        'X-Requested-By': hostName,
        'X-Requested-With': 'XMLHttpRequest'
      }
    };

    SuspendAppFactory.version(hostName, appID)
      .then(function(response) {
        expect(response).toEqual({'props':[]});
      });

    httpBackend.flush();
  });


  it('on get() get the configuration of the app', function() {
    httpBackend.expectGET('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://testHost:8080/v2/apps/testID/versions/testVersion', config)
      .respond({'props':[]});

    var hostName = 'testHost';
    var appID = 'testID';
    var appVersion = 'testVersion';
    var config = {
      headers: {
        'X-Requested-By': hostName,
        'X-Requested-With': 'XMLHttpRequest'
      }
    };

    SuspendAppFactory.get(hostName, appID, appVersion)
      .then(function(response) {
        expect(response).toEqual({'props':[]});
      });

    httpBackend.flush();
  });

});
