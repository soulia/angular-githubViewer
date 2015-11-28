// Immediately invoked function expression (IIFE)

(function() {

    var app = angular.module("githubViewer", []);

    var MainController = function($scope, $http, $interval, $log) {

        var onError = function(reason) {
            $scope.error = "Fail!";
        };

        var onUserComplete = function(response) {
            $scope.user = response.data;
            $http.get($scope.user.repos_url)
                .then(onRepos, onError);
        };

        var onRepos = function(response) {
            $scope.repos = response.data;
            //  console.log("repos: " + response.data);
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
            $log.info("Searching for " + username);
            $http.get("https://api.github.com/users/" + username)
                .then(onUserComplete, onError);
            if(countdownInterval) {
                $interval.cancel(countdownInterval);
                $scope.countdown = null;
            }
        };

        // $http.get("https://api.github.com/users/angular")
        //     .then(onUserComplete, onError);

        // $http.get("https://api.github.com/users/soulia")
        //     .then(function(response) {
        //         $scope.user = response.data;
        //     }, onError);

        var item = {
            description: "First Bid Item",
            value: "$42",
            currentBid: "$24",
            imageSrc: "https://avatars.githubusercontent.com/u/7284495?v=3"
        };

        $scope.mainTitle = "Uber Bidder";
        $scope.username = "angular";
        $scope.item = item;
        $scope.repoSortOrder = "-stargazers_count";
        $scope.countdown = 5;
        startCountdown();

    };

    // app.controller("MainController", ["$scope", "$http", "$interval", MainController]);
    app.controller("MainController", MainController);

})();