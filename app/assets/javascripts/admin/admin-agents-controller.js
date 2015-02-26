var app = angular.module('adminAgents',['ui.bootstrap', 'angularFileUpload', 'services']);

app.controller('AdminAgentsController', ['$scope', '$modal', 'Realtors', 'RealtorService',
	function ($scope, $modal, Realtors, RealtorService) {
		$scope.orderByField = 'name';
      	$scope.reverseSort = false;
		$scope.loading = true;
		$scope.currentPage = 1;
  		$scope.numPerPage = 10;
  		$scope.maxSize = 5;

  		$scope.init = function () {
			$scope.agents = Realtors.query(function () {
				$scope.loading = false;

				var begin = (($scope.currentPage - 1) * $scope.numPerPage);
			    var end = begin + $scope.numPerPage;
			    
			    $scope.filteredAgents = $scope.agents.slice(begin, end);
			});
		};

		$scope.numPages = function () {
		    return Math.ceil($scope.agents.length / $scope.numPerPage);
		};
		  
		$scope.$watch('currentPage + numPerPage', function() {
		    var begin = (($scope.currentPage - 1) * $scope.numPerPage);
		    var end = begin + $scope.numPerPage;
		    
		    if($scope.agents) {
			    $scope.filteredAgents = $scope.agents.slice(begin, end);
			}
		});

		$scope.columnFilter = function (name) {
			$scope.orderByField = name; 
			$scope.reverseSort = !$scope.reverseSort;
		};

		$scope.updateSortArrow = function (column) {
			return {
				'fa fa-sort':$scope.orderByField != column,
				'fa fa-sort-up':!$scope.reverseSort && $scope.orderByField == column, 
				'fa fa-sort-down':$scope.reverseSort && $scope.orderByField == column
			};
		};

		$scope.removeAgent = function (realtorId) {
			var response = confirm("Are you sure you want to remove this agent?");
			if (response == true) {
			    RealtorService.delete({ id: realtorId }, function () {
		        	$scope.init();
		        });
			}
		};

		$scope.openModal = function (currentAgent) {
      		var modalInstance = $modal.open({
		      templateUrl: 'edit-agent.html',
		      controller: 'EditAgentController',
		      size: 'lg',
		      resolve: {
		        agent: function () {
		          return currentAgent;
		        }
		      }
		    });

		    modalInstance.result.then(function () {
			  $scope.loading = true;
			  $scope.init();
		    }, function () {
			  $scope.init();
		    });
      	};

      	$scope.init();
	}
]);