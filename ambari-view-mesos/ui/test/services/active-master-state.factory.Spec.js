describe('ActiveMasterStateFactory', function() {
  var ActiveMasterStateFactory, httpBackend;

  beforeEach(module('MesosMetricsApp'));

  beforeEach(inject(function($injector) {
    httpBackend = $injector.get('$httpBackend');
    ActiveMasterStateFactory = $injector.get('ActiveMasterStateFactory');
  }));

  it('on get() get information about state of master', function() {
    httpBackend.expectGET('/api/v1/views/MESOS/versions/0.1.0/instances/mesos/resources/proxy/json?url=http://testMaster:5050/master/state.json')
      .respond({'masterInfo':[]});

    var VERSION = '0.1.0';
    var activeMaster = 'testMaster';

    ActiveMasterStateFactory.get(VERSION, activeMaster)
      .then(function(response) {
        expect(response.data).toEqual({'masterInfo':[]});
      });

    httpBackend.flush();
  });
});
