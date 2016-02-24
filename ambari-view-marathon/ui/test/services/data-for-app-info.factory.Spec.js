describe('DataForAppInfoFactory', function() {
  var DataForAppInfoFactory, httpBackend;

  beforeEach(module('MarathonApp'));

  beforeEach(inject(function($injector) {
    httpBackend = $injector.get('$httpBackend');
    DataForAppInfoFactory = $injector.get('DataForAppInfoFactory');
  }));

  it('on get() returns the data', function() {
    httpBackend.expectGET('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://testHost:8080/v2/apps/testID?embed=app.taskStats').respond({"tasks":[]});
    var hostName = 'testHost';
    var appID = 'testID';

    DataForAppInfoFactory.get(hostName, appID)
      .then(function(result) {
          expect(result).toEqual({"tasks":[]});
      });
    httpBackend.flush();
  });

});
