var scothcTodo = angular.module('scotchTodo', []);

function mainController($scope, $http)
{
    $scope.editRec = false;
    $scope.editId = null;
    $scope.formData = {text: 'Write Some thing here'};
    
    $http.get('/api/todos').success(d => {
        $scope.todos = d;
        console.log(d);
    });

    $scope.createTodo = function(){
        if(!$scope.formData.text)
            return;
        if($scope.formData.id){
        $http.post('/api/todo/'+$scope.formData.id, $scope.formData).
        success(d => {
            $scope.formData = {};
            $scope.todos = d;
        });
        }
        else{
            $http.post('/api/todos/', $scope.formData).
            success(d => {
                $scope.formData = {};
                $scope.todos = d;
        });
        }
    }

    $scope.editTodo = function(c, td)
    {
        console.log(c);
        if(c)
        {
            $scope.formData.text = td.text;
            $scope.formData.id = td._id;
        }
        else
        {
            $scope.formData = {};
        }
    }

    $scope.deleteTodo = function(id){
        $http.delete('/api/todos/'+id).success(d => {
            $scope.todos = d;
        });
    }

    $scope.updateTodo = function(id){
        $http.post('/api/todo/'+id, $scope.formData).
        success(d => {
            $scope.todos = d;
        })
    }
}