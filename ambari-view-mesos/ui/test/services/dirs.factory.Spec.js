describe('DirsFactory', function() {
  var DirsFactory, httpBackend;

  beforeEach(module('MesosMetricsApp'));

  beforeEach(inject(function($injector) {
    httpBackend = $injector.get('$httpBackend');
    DirsFactory = $injector.get('DirsFactory');
  }));

  it('on get() get a file listing for a directory', function() {
    httpBackend.expectGET('/api/v1/views/MESOS/versions/0.1.0/instances/mesos/resources/proxy/json?url=http://testHost:5051/files/browse.json?path=/mnt/mesos/slaves/8893ed00-cc33-4a54-a645-35c5894a9295-S3/frameworks/9ee58c9f-ca44-4956-9530-b6c2b1e19b39-0000/executors/kibana.0b9e0471-dba5-11e5-bce5-0242275c4668/runs/a40cf12f-f70f-467a-abcc-0389c9df644dundefined')
      .respond({});

    var VERSION = '0.1.0';
    var hostname = 'testHost';
    var port = '5051';

    var executorUrl = '/api/v1/views/MESOS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=http://' + hostname + ':' + port + '/files/browse.json?path=';
    var executorDir = '/mnt/mesos/slaves/8893ed00-cc33-4a54-a645-35c5894a9295-S3/frameworks/9ee58c9f-ca44-4956-9530-b6c2b1e19b39-0000/executors/kibana.0b9e0471-dba5-11e5-bce5-0242275c4668/runs/a40cf12f-f70f-467a-abcc-0389c9df644dundefined';
    // 'undefined' in the end of this ^

    DirsFactory.get(executorUrl, executorDir)
      .then(function(response) {
        expect(response.data).toEqual({});
      });

    httpBackend.flush();
  });
});
