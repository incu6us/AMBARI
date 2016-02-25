describe('ClusterNameFactory', function() {
  var ClusterNameFactory, httpBackend;

  beforeEach(module('MesosMetricsApp'));

  beforeEach(inject(function($injector) {
    httpBackend = $injector.get('$httpBackend');
    ClusterNameFactory = $injector.get('ClusterNameFactory');
  }));

  it('on get() returns the data', function() {
    httpBackend.expectGET('/api/v1/clusters').respond({"items":[{"Clusters":{"cluster_name":"clusterTest"}}]});
    ClusterNameFactory.get()
      .then(function (result) {
        expect(result).toEqual("clusterTest");
    });
  });

});
