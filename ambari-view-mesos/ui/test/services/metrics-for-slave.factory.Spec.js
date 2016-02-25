describe('MetricsForSlaveFactory', function() {
  var MetricsForSlaveFactory, httpBackend;

  beforeEach(module('MesosMetricsApp'));

  beforeEach(inject(function($injector) {
    httpBackend = $injector.get('$httpBackend');
    MetricsForSlaveFactory = $injector.get('MetricsForSlaveFactory');
    spyOn(console, 'log');
  }));

  it('on get() get a snapshot of the current metrics', function() {
    httpBackend.expectGET('/api/v1/views/MESOS/versions/0.1.0/instances/mesos/resources/proxy/json?url=http://testHost:5051/metrics/snapshot')
      .respond({'matriceForSlave':[]});

    var VERSION = '0.1.0';
    var slaveHost = 'testHost';

    MetricsForSlaveFactory.get(VERSION, slaveHost)
      .then(function(response) {
        expect(response.data).toEqual({'matriceForSlave':[]});
      });

    httpBackend.flush();
  });
});
