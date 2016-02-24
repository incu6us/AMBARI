describe('HostNameFactory', function() {
  var HostNameFactory, httpBackend;

  beforeEach(module('MarathonApp'));

  beforeEach(inject(function($injector) {
    httpBackend = $injector.get('$httpBackend');
    HostNameFactory = $injector.get('HostNameFactory');
  }));

  it('on get() returns the data', function() {
    httpBackend.expectGET('/api/v1/clusters').respond({"items":[{"Clusters":{"cluster_name":"clusterTest"}}]});
    httpBackend.expectGET('/api/v1/clusters/clusterTest/components/MARATHON').respond({"host_components":[{"HostRoles":{"host_name":"hostTest"}}]});
    HostNameFactory.get()
      .then(function (result) {
        expect(result).toEqual("hostTest");
    });
  });

});
