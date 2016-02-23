describe('NewAppFactory', function() {
  var NewAppFactory, httpBackend;

  beforeEach(module('MarathonApp'));

  beforeEach(inject(function($injector) {
    httpBackend = $injector.get('$httpBackend');
    NewAppFactory = $injector.get('NewAppFactory');
    spyOn(console, 'log');
  }));

  it('on post() creates a new app', function() {
    httpBackend.expectPOST('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://testHost:8080/v2/apps', data, config)
      .respond({'appProps':[]});

    var hostName = 'testHost';
    var data = {'props':[]};
    var config = {
      headers: {
        'X-Requested-By': hostName,
        'X-Requested-With': 'XMLHttpRequest'
      }
    };

    NewAppFactory.post(hostName, data)
      .then(function() {
        expect(console.log).toHaveBeenCalled();
      });

    httpBackend.flush();
  });

});
