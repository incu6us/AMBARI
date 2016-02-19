describe('ToolbarCtrl', function() {
  var ToolbarCtrl, $controller, $mdDialog;

  beforeEach(module('MarathonApp'));

  beforeEach(inject(function($injector) {
    $controller = $injector.get('$controller');
    $mdDialog = $injector.get('$mdDialog');

    ToolbarCtrl = $controller('ToolbarCtrl', {});

    spyOn($mdDialog, 'show');
  }));

  afterEach(function() {

  });

  it('on newAppModal() should call $mdDialog', function() {
    ToolbarCtrl.newAppModal();
    expect($mdDialog.show).toHaveBeenCalled();
  });

});
