'use strict'

app.controller('DataController', ['$rootScope', '$scope', 'backendHubProxy', function ($rootScope, $scope, backendHubProxy) {
  $rootScope.monthly = false
  var dataHub = backendHubProxy(backendHubProxy.defaultServer, 'dataHub')

  setInterval(function () {
    $rootScope.monthly = !$rootScope.monthly
    $scope.monthly = $rootScope.monthly
  }, 120000)

  $scope.recepcion = [
    { drogueria: 3, valor: 0, nombre: 'San Cristóbal' },
    { drogueria: 4, valor: 0, nombre: 'Mérida' },
    { drogueria: 7, valor: 0, nombre: 'Occidente' },
    { drogueria: 13, valor: 0, nombre: 'Centro' },
    { drogueria: 14, valor: 0, nombre: 'Barquisimeto' },
    { drogueria: 16, valor: 0, nombre: 'Oriente' }
  ]
  $scope.almacen = $scope.recepcion
  $scope.cesta = $scope.recepcion
  $scope.bulto = $scope.recepcion
  $scope.trafico = $scope.recepcion
  $scope.devolucion = $scope.recepcion

  dataHub.on('broadcastRecepcion', function (data) {
    $scope.recepcion = [];
    if (data.length < 6) {
      $scope.recepcionLength = 6 - data.length
      $scope.recepcionArray = []
      for (var i = 0; i < $scope.recepcionLength; i++) {
        $scope.recepcionArray.push(i)
      }
    }
    data.forEach(function (recepcion) {
      $scope.recepcion.push(recepcion)
    })
  })

  dataHub.on('broadcastAlmacen', function (data) {
    $scope.almacen = [];
    if (data.length < 6) {
      $scope.almacenLength = 6 - data.length
      $scope.almacenArray = []
      for (var i = 0; i < $scope.almacenLength; i++) {
        $scope.almacenArray.push(i)
      }
    }
    data.forEach(function (almacen) {
      $scope.almacen.push(almacen)
    })
  })

  dataHub.on('broadcastCestas', function (data) {
    $scope.cesta = [];
    if (data.length < 6) {
      $scope.cestaLength = 6 - data.length
      $scope.cestaArray = []
      for (var i = 0; i < $scope.cestaLength; i++) {
        $scope.cestaArray.push(i)
      }
    }
    data.forEach(function (cesta) {
      $scope.cesta.push(cesta)
    })
  })

  dataHub.on('broadcastBulto', function (data) {
    $scope.bulto = [];
    if (data.length < 6) {
      $scope.bultoLength = 6 - data.length
      $scope.bultoArray = []
      for (var i = 0; i < $scope.bultoLength; i++) {
        $scope.bultoArray.push(i)
      }
    }
    data.forEach(function (bulto) {
      $scope.bulto.push(bulto)
    })
  })

  dataHub.on('broadcastDevolucion', function (data) {
    $scope.devolucion = [];
    if (data.length < 6) {
      $scope.devolucionLength = 6 - data.length
      $scope.devolucionArray = []
      for (var i = 0; i < $scope.devolucionLength; i++) {
        $scope.devolucionArray.push(i)
      }
    }
    data.forEach(function (devolucion) {
      $scope.devolucion.push(devolucion)
    })
  })

  dataHub.on('broadcastTrafico', function (data) {
    $scope.trafico = [];
    if (data.length < 6) {
      $scope.traficoLength = 6 - data.length
      $scope.traficoArray = []
      for (var i = 0; i < $scope.traficoLength; i++) {
        $scope.traficoArray.push(i)
      }
    }
    data.forEach(function (trafico) {
      $scope.trafico.push(trafico)
    })
  })

}])