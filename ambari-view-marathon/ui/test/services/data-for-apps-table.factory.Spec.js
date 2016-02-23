describe('DataForAppsTableFactory', function() {
  var DataForAppsTableFactory, httpBackend;

  beforeEach(module('MarathonApp'));

  beforeEach(inject(function($injector) {
    httpBackend = $injector.get('$httpBackend');
    DataForAppsTableFactory = $injector.get('DataForAppsTableFactory');
  }));

  it('on get() returns the data', function() {
    httpBackend.expectGET('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://testHost:8080/v2/apps').respond({'apps':[{'testApp1':{}},{'testApp2':{}}]});
    var hostName = 'testHost';

    DataForAppsTableFactory.get(hostName)
      .then(function(result) {
          expect(result).toEqual([{'testApp1':{}},{'testApp2':{}}]);
      });

    httpBackend.flush();
  });

});
