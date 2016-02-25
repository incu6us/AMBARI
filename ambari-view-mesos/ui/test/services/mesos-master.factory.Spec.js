describe('MesosMasterFactory', function() {
  var MesosMasterFactory, httpBackend;

  beforeEach(module('MesosMetricsApp'));

  beforeEach(inject(function($injector) {
    httpBackend = $injector.get('$httpBackend');
    MesosMasterFactory = $injector.get('MesosMasterFactory');
  }));

  it('on get() get information about master', function() {
    httpBackend.expectGET('/api/v1/clusters/testCluster/services/MESOS/components/MESOS_MASTER')
      .respond({'masterInfo':[]});

    var clusterName = 'testCluster';

    MesosMasterFactory.get(clusterName)
      .then(function(response) {
        expect(response.data).toEqual({'masterInfo':[]});
      });

    httpBackend.flush();
  });
});
