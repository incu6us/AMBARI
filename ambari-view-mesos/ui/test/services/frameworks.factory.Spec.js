describe('FrameworksFactory', function() {
  var FrameworksFactory, httpBackend;

  beforeEach(module('MesosMetricsApp'));

  beforeEach(inject(function($injector) {
    httpBackend = $injector.get('$httpBackend');
    FrameworksFactory = $injector.get('FrameworksFactory');
  }));

  it('on get() get information about state of master', function() {
    httpBackend.expectGET('/api/v1/views/MESOS/versions/0.1.0/instances/mesos/resources/proxy/json?url=testMaster/state.json')
      .respond({'masterInfo':[]});

    var VERSION = '0.1.0';
    var stateUrl = 'testMaster/state.json';

    FrameworksFactory.get(VERSION, stateUrl)
      .then(function(response) {
        expect(response.data).toEqual({'masterInfo':[]});
      });

    httpBackend.flush();
  });
});
