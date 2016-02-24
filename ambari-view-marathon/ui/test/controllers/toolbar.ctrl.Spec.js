describe('ToolbarCtrl', function() {
  var ToolbarCtrl, $controller, $mdDialog;

  beforeEach(module('MarathonApp'));

  beforeEach(inject(function($injector) {
    $controller = $injector.get('$controller');
    $mdDialog = $injector.get('$mdDialog');
    spyOn($mdDialog, 'show');

    ToolbarCtrl = $controller('ToolbarCtrl', {});
  }));

  it('on newAppModal() should call $mdDialog', function() {
    ToolbarCtrl.newAppModal();
    expect($mdDialog.show).toHaveBeenCalled();
  });

});
