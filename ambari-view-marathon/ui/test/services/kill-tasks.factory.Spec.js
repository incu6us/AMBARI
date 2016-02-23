describe('KillTasksFactory', function() {
  var KillTasksFactory, httpBackend;

  beforeEach(module('MarathonApp'));

  beforeEach(inject(function($injector) {
    httpBackend = $injector.get('$httpBackend');
    KillTasksFactory = $injector.get('KillTasksFactory');
    spyOn(console, 'log');
  }));

  it('on post() kill taks with NO scaling', function() {
    httpBackend.expectPOST('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://testHost:8080/v2/tasks/delete?scale=false', tasksToKill, config)
      .respond({"httpStatusCode":200});

    var hostName = 'testHost';
    var shouldScale = false;
    var tasksToKill = 'testTask';
    var config = {
      headers: {
        'X-Requested-By': hostName,
        'X-Requested-With': 'XMLHttpRequest'
      }
    };

    KillTasksFactory.post(hostName, tasksToKill, shouldScale)
      .then(function() {
        expect(console.log).toHaveBeenCalled();
      });

    httpBackend.flush();
  });


  it('on post() kill taks with scaling', function() {
    httpBackend.expectPOST('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://testHost:8080/v2/tasks/delete?scale=true', tasksToKill, config)
      .respond({"httpStatusCode":200});

    var hostName = 'testHost';
    var shouldScale = true;
    var tasksToKill = 'testTask';
    var config = {
      headers: {
        'X-Requested-By': hostName,
        'X-Requested-With': 'XMLHttpRequest'
      }
    };

    KillTasksFactory.post(hostName, tasksToKill, shouldScale)
      .then(function() {
        expect(console.log).toHaveBeenCalled();
      });

    httpBackend.flush();
  });

});
