// Immediately invoked function expression (IIFE)

(function() {

    var app = angular.module("githubViewer");

    // $location is used with fragment identifier -> "userDetails"
    var MainController = function(
        $scope,
        $interval, $location) {

        var onError = function(reason) {
            $scope.error = "Fail!";
        };

        var decrementCountdown = function() {
            $scope.countdown -= 1;
            if ($scope.countdown < 1) {
                $scope.search($scope.username);
            }
        };

        var countdownInterval = null;
        var startCountdown = function() {
            countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
        };

        $scope.search = function(username) {
            if (countdownInterval) {
                $interval.cancel(countdownInterval);
                $scope.countdown = null;
            }
            $location.path("/user/" + username);  // <-- changes the client fragment to #/user/fred
        };

        $scope.username = "angular";
        $scope.countdown = 5;
        startCountdown();

    };

    app.controller("MainController", MainController);

})();