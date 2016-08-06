var appServices = angular.module('appServices',['ngResource']);

appServices
	.factory('AppServices', function($http, $resource, $cookieStore){
		var token = "";
		var idUser = "";
		var server = "/api/";
		return {
			subirImagen: function (foto, nombreFile) {
				var fd = new FormData();
				foto.file.name = nombreFile;
				console.log(foto.file);
				fd.append('key',foto.file);
				return $http.post(
					'/api/containers/container1/upload',
					//server + service + "/subirImagen",
					//"http://localhost:8080/upload-image-brand",
					fd,
					{
						headers: {'Content-Type': undefined},
						transformRequest: angular.identity
				});
			},
			subirImagen2: function (foto) {
				var fd = new FormData();
				foto.filename = "XD";
				foto.name = "XDDD";
				console.log(foto);
				fd.append('key',foto);
				return $http.post(
					'/api/containers/container1/upload',
					//server + service + "/subirImagen",
					//"http://localhost:8080/upload-image-brand",
					fd,
					{
						headers: {'Content-Type': undefined},
						transformRequest: angular.identity
				});
			},
			getUserLogged: function () {
				token = $cookieStore.get("e_session_").id;
				idUser = $cookieStore.get("e_session_").idUser;
				return $http({
					url: server + 'Users/' + idUser,
					method: 'GET',
					params: {
						access_token: token
					}
				});
			},
			getParamsByGrupo: function (grupo) {
				return $http({
					url: "/s/parametros/getParamsByGrupo",
					method: "GET",
					params: {
						grupo: grupo
					}
				});
			},
			loadData: function () {
				return $http({
					url: "http://slcp.mtc.gob.pe/",
					method: "POST",
					data: 
						"ScriptManager=UpdatePanel|ibtnBusqNroDoc"
						+ "rbtnlBuqueda=0"
						+ "&ddlTipoDocumento=2"
						+"&txtNroDocumento=70274350"
						+"&__ASYNCPOST=true"
						+"&ibtnBusqNroDoc.x=6"
						+"&ibtnBusqNroDoc.y=8"
				});
			}
		}
	});