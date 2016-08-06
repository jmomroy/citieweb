angular
  .module('appCitie')
  .controller('appController', ['$scope', '$location',
    function($scope, $location) {
    	$scope.class_body = "";
    	$scope.class_wrapper = "";
    	$scope.user = {};
    	$scope.rol = {};
    	$scope.getCurrentUser = function() {
	    	$scope.user = User.getCurrent(function(user) {
	 			$scope.class_body = "hold-transition skin-blue sidebar-mini";
	 			$scope.class_wrapper = "wrapper";
	 			console.log(user);
		    	$scope.rol = Rol.findById({id: user.fkRolId});
		    	console.log($scope.rol);
		    }, function(err) {
	      		$scope.class_body = "hold-transition login-page";
	 			$scope.class_wrapper = "";
		    });	
	    }

	    $scope.getIncludeHeader = function () {
	    	if($location.$$path != '/login' && $location.$$path != '/register'){
	          	return "views/template/header.html";
	        }
	        return "";
	    }
	    $scope.getIncludeMenu = function () {
	    	if($location.$$path != '/login' && $location.$$path != '/register'){
	          	return "views/template/menu.html";
	        }
	        return "";
	    }
	    $scope.getIncludeFooter = function () {
	    	if($location.$$path != '/login' && $location.$$path != '/register'){
	          	return "views/template/footer.html";
	        }
	        return "";
	    }

	    $scope.logout = function() {
	      User.logout(function() {
	        $location.path("/login");
	      });
	    };

	    $scope.goIndex = function (index) {
	    	$location.path("/" + index);
	    }
	    $scope.imageUpload = function(element){
	    	console.log(element);
	    	var idBox = element.getAttribute("data-ref");
	        var reader = new FileReader();
	        reader.onload = function(e){
	          var photo = document.getElementById(idBox);
	          AppServices.subirImagen2(photo.files[0])
	          .success(function (data) {
	            console.log(data);
	            var imagen = data.result.files.key[0];
	            var url = "/api/containers/container1/download/" + imagen.name;
	            var input = $("#" + idBox + "_text");
	            input.val(url);
	            input.trigger('input');
	            var img = $("#" + idBox + "_preview");
	            document.getElementById(idBox + "_preview").src = url;
	          });
	        };
	        reader.readAsDataURL(element.files[0]);
	      }
	    //$scope.getCurrentUser();
  	}])
	.directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);;
