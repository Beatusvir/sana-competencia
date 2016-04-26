'use strict'

app.controller('DataController', ['$rootScope', '$scope', 'backendHubProxy', function ($rootScope, $scope, backendHubProxy) {
  var dataHub = backendHubProxy(backendHubProxy.defaultServer, 'dataHub')
  $rootScope.setTitle = function (title) {
    $scope.title = title
  }
  $scope.title = "ACUMULADO DIARIO"

  // Cada cuanto tiempo se cambia entre diario y mensual

  // Objeto inicial para cada indicador
  $scope.recepcionArray = initArray([])
  $scope.almacenArray = initArray([])
  $scope.cestaArray = initArray([])
  $scope.bultoArray = initArray([])
  $scope.devolucionArray = initArray([])
  $scope.traficoArray = initArray([])

  function initArray(array) {
    var result = []
    var length = 6 - array.length
      for (var i = 0; i < length; i++) {
        result.push(i)
      }
      return result
  }
  // Callback de SignalR por cada indicador, si hay información se borra el arreglo actual y se actualiza
  dataHub.on('broadcastRecepcion', function (data) {
    if (data.length > 0 && data.length <= 6) {
      $scope.recepcion = [];
      $scope.recepcionArray = initArray(data)
    }
    data.forEach(function (recepcion) {
      $scope.recepcion.push(recepcion)
    })
  })

  dataHub.on('broadcastAlmacen', function (data) {
    if (data.length > 0 && data.length <= 6) {
      $scope.almacen = []
      $scope.almacenArray = initArray(data)
    }
    data.forEach(function (almacen) {
      $scope.almacen.push(almacen)
    })
  })

  dataHub.on('broadcastCestas', function (data) {
    if (data.length > 0 && data.length <= 6) {
      $scope.cesta = []
      $scope.cestaArray = initArray(data)
    }
    data.forEach(function (cesta) {
      $scope.cesta.push(cesta)
    })
  })

  dataHub.on('broadcastBulto', function (data) {
    if (data.length > 0 && data.length <= 6) {
      $scope.bulto = []
      $scope.bultoArray = initArray(data)
    }
    data.forEach(function (bulto) {
      $scope.bulto.push(bulto)
    })
  })

  dataHub.on('broadcastDevolucion', function (data) {
    if (data.length > 0 && data.length <= 6) {
      $scope.devolucion = [];
      $scope.devolucionArray = initArray(data)
    }
    data.forEach(function (devolucion) {
      $scope.devolucion.push(devolucion)
    })
  })

  dataHub.on('broadcastTrafico', function (data) {
    if (data.length > 0 && data.length <= 6) {
      $scope.trafico = [];
      $scope.traficoArray = initArray(data)
    }
    data.forEach(function (trafico) {
      $scope.trafico.push(trafico)
    })
  })

}])