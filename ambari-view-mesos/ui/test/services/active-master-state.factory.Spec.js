describe('ActiveMasterSlavesFactory', function() {
    var ActiveMasterSlavesFactory, httpBackend;

    beforeEach(function(){
        module('MesosMetricsApp')

        httpBackend = $injector.get('$httpBackend');
        ActiveMasterSlavesFactory = $injector.get('ActiveMasterSlavesFactory');
        spyOn(consol, 'log');
    });

    //beforeEach(inject(function($inject){
    //
    //}));

    it('on get() list running deployments', function() {
        httpBackend.expectGET('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://testHost:8080/v2/deployments')
            .respond({'deployments':[]});

        var hostName = 'testHost';

        ActiveMasterSlavesFactory.get(hostName)
            .then(function(response) {
                expect(response.data).toEqual({'deployments':[]});
            });

        httpBackend.flush();
    });
});