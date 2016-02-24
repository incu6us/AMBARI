describe('AppDeploymentFactory', function() {
  var AppDeploymentFactory, httpBackend;

  beforeEach(module('MarathonApp'));

  beforeEach(inject(function($injector) {
    httpBackend = $injector.get('$httpBackend');
    AppDeploymentFactory = $injector.get('AppDeploymentFactory');
    spyOn(console, 'log');
  }));

  it('on get() list running deployments', function() {
    httpBackend.expectGET('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://testHost:8080/v2/deployments')
      .respond({'deployments':[]});

    var hostName = 'testHost';

    AppDeploymentFactory.get(hostName)
      .then(function(response) {
        expect(response.data).toEqual({'deployments':[]});
      });

    httpBackend.flush();
  });


  it('on stop() cancel the deployment of the app', function() {
    httpBackend.expectDELETE('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://testHost:8080/v2/deployments/testID', config)
      .respond({"httpStatusCode":200});

    var hostName = 'testHost';
    var deployId = 'testID';
    var config = {
      headers: {
        'X-Requested-By': hostName,
        'X-Requested-With': 'XMLHttpRequest'
      }
    };

    AppDeploymentFactory.stop(hostName, deployId)
      .then(function() {
        expect(console.log).toHaveBeenCalled();
      });

    httpBackend.flush();
  });


  it('on rollback() rollback the deployment of the app', function() {
    httpBackend.expectDELETE('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://testHost:8080/v2/deployments/testID?force=true', config)
      .respond({"httpStatusCode":200});

    var hostName = 'testHost';
    var deployId = 'testID';
    var config = {
      headers: {
        'X-Requested-By': hostName,
        'X-Requested-With': 'XMLHttpRequest'
      }
    };

    AppDeploymentFactory.rollback(hostName, deployId)
      .then(function(response) {
        expect(console.log).toHaveBeenCalled();
      });

    httpBackend.flush();
  });

});
