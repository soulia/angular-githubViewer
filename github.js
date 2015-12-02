// AgnularJS: Get Started - Services, A GitHub Service
// Never make $http calls directly from inside a controller or model - encapsulate in a service

(function() {
    
    // design pattern: Revealing Module
    var github = function($http){
      
      var getUser = function(username){
        return $http.get("https://api.github.com/users/" + username)
            .then(function(response){
                return response.data;
            });
      };
      
      var getRepos = function(user){
         return  $http.get(user.repos_url) 
            .then(function(response) {
                return response.data;
            });
      };
      
      return {
          getUser: getUser,
          getRepos: getRepos
      };
        
    };
    
    var module = angular.module("githubViewer");
    
    // We now need to register this service so that other components can use it
    // There are many ways to register a service. Here's one straight forward way...
    module.factory("github", github);
    
})();