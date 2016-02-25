describe('MetricsForMasterFactory', function() {
  var MetricsForMasterFactory, httpBackend;

  beforeEach(module('MesosMetricsApp'));

  beforeEach(inject(function($injector) {
    httpBackend = $injector.get('$httpBackend');
    MetricsForMasterFactory = $injector.get('MetricsForMasterFactory');
    spyOn(console, 'log');
  }));

  it('on get() get a snapshot of the current metrics', function() {
    httpBackend.expectGET('/api/v1/views/MESOS/versions/0.1.0/instances/mesos/resources/proxy/json?url=http://testHost:5050/metrics/snapshot')
      .respond({'matriceForMaster':[]});

    var VERSION = '0.1.0';
    var masterHost = 'testHost';

    MetricsForMasterFactory.get(VERSION, masterHost)
      .then(function(response) {
        expect(response.data).toEqual({'matriceForMaster':[]});
      });

    httpBackend.flush();
  });
});
