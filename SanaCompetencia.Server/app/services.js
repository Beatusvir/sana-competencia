'use strict'

app.factory('backendHubProxy', ['$rootScope', 'backendServerUrl', function ($rootScope, backendServerUrl) {
  // Subscripcion a SignalR
  function backendFactory(serverUrl, hubName) {
    var connection = $.hubConnection(backendServerUrl)
    var proxy = connection.createHubProxy(hubName)

    // Callback cuando se conecta al Hub
    connection.start().done(function () {
      proxy.invoke('SendData')
      // Cada cuanto tiempo se refresca la información
      setInterval(function () {
        if ($rootScope.monthly) {
          $rootScope.setTitle("ACUMULADO MENSUAL")
          proxy.invoke('SendDataMonthly')
        } else {
          $rootScope.setTitle("ACUMULADO DIARIO")
          proxy.invoke('SendData')
        }
      }, $rootScope.pollInterval)
    })

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