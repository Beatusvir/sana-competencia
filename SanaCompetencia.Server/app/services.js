'use strict'

app.factory('backendHubProxy', ['$rootScope', 'backendServerUrl', function ($rootScope, backendServerUrl) {
  $rootScope.pollInterval = 5000 // Tiempo para refrescar la información
  $rootScope.cycleInterval = 120000 // Tiempo para cambiar diario o mensual
  $rootScope.monthly = false // Para identificar si la información sera diaria o mensual

  // Subscripcion a SignalR
  function backendFactory(serverUrl, hubName) {
    var connection = $.hubConnection(backendServerUrl)
    var proxy = connection.createHubProxy(hubName)
    var bar = $('#time-left')

    // Callback cuando se conecta al Hub
    connection.start().done(function () {
      proxy.invoke('SendData')
      progressBarStart()
      // Cada cuanto tiempo se refresca la información
      setInterval(function () {
        progressBarRestart()
        $rootScope.monthly = !$rootScope.monthly
        if ($rootScope.monthly) {
          $rootScope.setTitle("ACUMULADO MENSUAL")
          proxy.invoke('SendDataMonthly')
        } else {
          $rootScope.setTitle("ACUMULADO DIARIO")
          proxy.invoke('SendData')
        }
      }, $rootScope.cycleInterval - 1000)
    })

    function progressBarStart() {
      $rootScope.progressBarInterval = setInterval(function () {
        var bar_value = bar.attr('aria-valuenow')
        var width = (bar_value * 100) / ($rootScope.cycleInterval / 1000)
        var new_value = (bar_value - 1)
        var width_value = width + '%'
        bar.attr('aria-valuenow', new_value)
        bar.animate({ width: width_value }, {
          duration: 1000,
          easing: 'linear'
        })
      }, 1000)
    }

    function progressBarRestart() {
      clearInterval($rootScope.progressBarInterval)
      bar.attr('aria-valuenow', ($rootScope.cycleInterval / 1000))
      bar.animate({ width: '100%' })
      progressBarStart()
    }

    // Métodos a utilizar (on, invoke)
    return {
      on: function (eventName, callback) {
        proxy.on(eventName, function (result) {
          $rootScope.$apply(function () {
            if (callback) {
              callback(result)
            }
          })
        })
      },
      invoke: function (methodName, callback) {
        proxy.invoke(methodName)
          .done(function (result) {
            $rootScope.$apply(function () {
              if (callback) {
                callback(result)
              }
            })
          })
      }
    }
  }

  return backendFactory
}])