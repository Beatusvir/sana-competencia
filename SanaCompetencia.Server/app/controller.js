'use strict'

app.controller('DataController', ['$rootScope', '$scope', 'backendHubProxy', function ($rootScope, $scope, backendHubProxy) {
  $rootScope.pollInterval = 5000 // Tiempo para refrescar la información
  $scope.cycleInterval = 120000 // Tiempo para cambiar diario o mensual
  $rootScope.monthly = false // Para identificar si la información sera diaria o mensual
  var dataHub = backendHubProxy(backendHubProxy.defaultServer, 'dataHub')

  $scope.title = "ACUMULADO DIARIO"
  var bar = $('#time-left')
  $rootScope.setTitle = function (title) {
    $scope.title = title
  }

  $scope.progressBarRestart = function () {
    clearInterval($scope.progressBarInterval)
    bar.attr('aria-valuenow', ($scope.cycleInterval / 1000))
    bar.animate({ width: '100%' })
    $scope.progressBarStart()
  }

  $scope.progressBarStart = function () {
    $scope.progressBarInterval = setInterval(function () {
      var bar_value = bar.attr('aria-valuenow')
      var width = (bar_value * 100) / ($scope.cycleInterval / 1000)
      var new_value = (bar_value - 1)
      var width_value = width + '%'
      bar.attr('aria-valuenow', new_value)
      bar.animate({ width: width_value }, {
        duration: 1000,
        easing: 'linear'
      })
    }, 1000)
  }

  // Cada cuanto tiempo se cambia entre diario y mensual
  $scope.progressBarStart()
  var cycleInterval = setInterval(function () {
    $scope.progressBarRestart()
    $rootScope.monthly = !$rootScope.monthly
    $scope.monthly = $rootScope.monthly
  }, $scope.cycleInterval)

  // Objeto inicial para cada indicador
  $scope.recepcion = [
    { drogueria: 3, valor: 0, nombre: 'MAFARTA' },
    { drogueria: 4, valor: 0, nombre: 'DROMERCA' },
    { drogueria: 7, valor: 0, nombre: 'OCCIDENTE' },
    { drogueria: 13, valor: 0, nombre: 'COBECA CENTRO' },
    { drogueria: 14, valor: 0, nombre: 'COBECA BQTO' },
    { drogueria: 16, valor: 0, nombre: 'ORIENTE' }
  ]
  $scope.almacen = $scope.recepcion
  $scope.cesta = $scope.recepcion
  $scope.bulto = $scope.recepcion
  $scope.trafico = $scope.recepcion
  $scope.devolucion = $scope.recepcion

  // Callback de SignalR por cada indicador, si hay información se borra el arreglo actual y se actualiza
  dataHub.on('broadcastRecepcion', function (data) {
    if (data.length > 0 && data.length <= 6) {
      $scope.recepcion = [];
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
    if (data.length > 0 && data.length <= 6) {
      $scope.almacen = []
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
    if (data.length > 0 && data.length <= 6) {
      $scope.cesta = []
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
    if (data.length > 0 && data.length <= 6) {
      $scope.bulto = []
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
    if (data.length > 0 && data.length <= 6) {
      $scope.devolucion = [];
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
    if (data.length > 0 && data.length <= 6) {
      $scope.trafico = [];
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