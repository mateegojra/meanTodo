var scothcTodo = angular.module('scotchTodo', []);

function mainController($scope, $http)
{
    $scope.formData = {};
    $http.get('/api/todos').success(d => {
        $scope.todos = d;
        console.log(d);
    });

    $scope.createTodo = function(){
        console.log($scope.formData);
        if(!$scope.formData.text)
            return;
        $http.post('/api/todos', $scope.formData).
        success(d => {
            $scope.formData = {};
            $scope.todos = d;
        });
    }

    $scope.deleteTodo = function(id){
        $http.delete('/api/todos/'+id).success(d => {
            $scope.todos = d;
        });
    }
}