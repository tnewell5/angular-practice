angular.module('toDoList', []);

angular.module('toDoList').controller('ToDoController', function($scope, ToDoService) {
  $scope.items = ToDoService.getToDos();
  $scope.actions = {
    addToDo: addToDo
  };

  function addToDo(newToDo) {
    var tempObj = {
      description: newToDo,
      checked: false
    };

    $scope.items.push(tempObj);
    $scope.newToDo = '';
    ToDoService.addToDo(tempObj);
  }

});

angular.module("toDoList").directive("toDoItem", function(ToDoService) {
  return {
    restrict: "E",
    scope: {
      item: "="
    },
    template: `
      <div>
        <input type='checkbox' ng-checked="item.checked" />
        <span>{{ item.description }}</span>
      </div>
    `,
    link: function(scope, element) {
      element.on('click', function(event) {
        scope.item.checked = !scope.item.checked;
        ToDoService.changeStatus(scope.item);
        scope.$digest();
      });
    }
  }
});

angular.module('toDoList').service('ToDoService', function() {

  return {
    getToDos: getToDos,
    addToDo: addToDo,
    changeStatus: changeStatus
  };

  function getToDos() {
    return JSON.parse(localStorage.getItem("toDos"));
  }

  function addToDo(newToDo) {
    let toDos = JSON.parse(localStorage.getItem("toDos")) || [];
    toDos.push(newToDo);
    localStorage.setItem("toDos", JSON.stringify(toDos));
  }

  function changeStatus(item) {
    let toDos = JSON.parse(localStorage.getItem("toDos")) || [];
    for (let i = 0; i < toDos.length; i ++) {
      if (toDos[i].description === item.description) {
        toDos[i].checked = item.checked;
      }
    }
    localStorage.setItem("toDos", JSON.stringify(toDos));

  }
});
