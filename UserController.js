// Immediately invoked function expression (IIFE)

(function() {

    var app = angular.module("githubViewer");

    var UserController = function($scope, github, $routeParams) {

        var onError = function(reason) {
            $scope.error = "Fail!";
        };

        var onUserComplete = function(data) {
            $scope.user = data;
            github.getRepos($scope.user).then(onRepos, onError);
        };

        var onRepos = function(data) {
            $scope.repos = data;

        };

        $scope.username = $routeParams.username;
        $scope.repoSortOrder = "-stargazers_count";
        github.getUser($scope.username).then(onUserComplete, onError);
    };

    // register the controller
    app.controller("UserController", UserController);

})();