(function (currentScriptPath) {
    app.directive('headerRegister', ['moduleService',
        function (moduleService) {
            return {
                restrict: 'E',
                scope: {
                    moduleList: '=',//Ligações
                    eventId: '@',//Atributos
                },
                replace: true,
                // Replate .js file name on path to html
                templateUrl: currentScriptPath.replace('headerRegister.directive.js', 'headerRegister.html'),
                controller: function () { },
                link: function (scope, element, attrs) {

                    scope.moduleService = moduleService;

                    scope.hasHeaderRegister = (scope.moduleList != undefined && scope.moduleList.length > 0);
                    scope.hasMultipleRegisters = (scope.hasHeaderRegister && scope.moduleList.length > 1);
                }
            };
        }]);
})(
    (function () {
        // The currently executing script file will always be the last one in the scripts array
        // Get the current file path to be replaced to TemplateUrl
        // This is an alternative to make TemplateUrl work as dynamic.
        var scripts = document.getElementsByTagName("script");
        var currentScriptPath = scripts[scripts.length - 1].src;

        return currentScriptPath;
    })()
);