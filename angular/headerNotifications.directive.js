// name function 
(function (currentPath) {
    // directive declaration ('directive name', [class usaded usando injetor de dependencia])
    app.directive('headerNotifications', ['$routeParams', 'moduleService', 'modalService', '$resource',
        function ($routeParams, moduleService, modalService, $resource) {
            return {
                //div by Elemente 'EA' (Element or Atribute)
                restrict: 'E',
                //By user
                scope: {
                    moduleId: '='
                },
                replace: true,
                // Replate .js file name on path to u html can pass write a html
                templateUrl: currentPath.replace('headerNotifications.directive.js', 'headerNotifications.html'),
                //Controler class(declaration)
                controller: function () { },
                //parameters
                link: function (scope, element, attrs) {

                    // new array
                    scope.notificationsList = [];
                    //
                    scope.loading = false;

                    //is var !undefined? after use an class to show
                    scope.hasHeaderNotification = (scope.moduleId != undefined);

                    scope.openHeader = function (buttonId) {

                        // Check if notification header window is closed
                        if (element.find('#notificationButton' + buttonId).attr('aria-expanded') === 'false') {

                            scope.loading = true;

                            var resource = $resource('/api/events/:eventId/notifications', { eventId: $routeParams.eventId }, {
                                'query': { method: 'GET', isArray: true }
                            });

                            // Get last 10 notifications
                            resource.query({ count: 0, take: 10 }, function (notifications) {

                                scope.notificationsList = notifications;
                                scope.loading = false;

                            }, function () {
                                scope.loading = false;
                            });
                        }
                    }

                    scope.viewAllNotifications = function () {

                        // Notification Module Id is required
                        // Exit function if not specified.
                        if (!scope.moduleId)
                            return


                        var resourceModule = $resource('/api/events/:eventId/notifications', { eventId: $routeParams.eventId }, {
                            'query': { method: 'GET' }
                        });


                        // Get last 10 notifications
                        resourceModule.query({ id: scope.moduleId }, function (module) {

                            scope.moduleView = module;

                            var infoOptions = { module: module, scope: scope }
                            moduleService.moduleMoreInfo(infoOptions);

                            scope.loading = false;

                        }, function () {
                            scope.loading = false;
                        });
                    }

                    scope.openNotification = function (notification) {

                        scope.notificationDetails = notification;

                        modalService.open({
                            animation: true,
                            appendTo: $('.event-page'),
                            templateUrl: '/app/event/modules/notifications/notificationDetails.html',
                            controller: ['$uibModalInstance', '$scope', function ($uibModalInstance, $scope) {
                                //$scope informação entre os domínios de um controller 
                                $scope.close = function () {
                                    $uibModalInstance.dismiss('cancel');
                                }
                            }],
                            size: 'md',
                            backdrop: 'static',
                            scope: scope
                        });
                    }
                }
            };
        }]);
})(
    (function () {
        // The currently executing  file will always be the last one in the s array
        // Get the current file path to be replaced to TemplateUrl
        // This is an alternative to make TemplateUrl work as dynamic.
        var s = document.getElementsByTagName("");
        var currentPath = s[s.length - 1].src;

        return currentPath;
    })()
);