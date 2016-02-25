describe('ActiveMasterSlavesFactory', function() {
  var ActiveMasterSlavesFactory, httpBackend;

  beforeEach(module('MesosMetricsApp'));

  beforeEach(inject(function($injector) {
    httpBackend = $injector.get('$httpBackend');
    ActiveMasterSlavesFactory = $injector.get('ActiveMasterSlavesFactory');
  }));

  //beforeEach(inject(function($inject){
  //
  //}));

  it('on get() get information about registered slaves', function() {
    httpBackend.expectGET('/api/v1/views/MESOS/versions/0.1.0/instances/mesos/resources/proxy/json?url=http://testMaster:5050/slaves')
      .respond({'slaves':[]});

    var VERSION = '0.1.0';
    var activeMaster = 'testMaster';

    ActiveMasterSlavesFactory.get(VERSION, activeMaster)
      .then(function(response) {
        expect(response.data).toEqual({'slaves':[]});
      });

    httpBackend.flush();
  });
});
