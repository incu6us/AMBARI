describe('MesosSlaveFactory', function() {
  var MesosSlaveFactory, httpBackend;

  beforeEach(module('MesosMetricsApp'));

  beforeEach(inject(function($injector) {
    httpBackend = $injector.get('$httpBackend');
    MesosSlaveFactory = $injector.get('MesosSlaveFactory');
  }));

  it('on get() get information about slave', function() {
    httpBackend.expectGET('/api/v1/clusters/testCluster/services/MESOS/components/MESOS_SLAVE')
      .respond({'slaveInfo':[]});

    var clusterName = 'testCluster';

    MesosSlaveFactory.get(clusterName)
      .then(function(response) {
        expect(response.data).toEqual({'slaveInfo':[]});
      });

    httpBackend.flush();
  });
});
