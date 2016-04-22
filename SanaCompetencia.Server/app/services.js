'use strict'

app.factory('backendHubProxy', ['$rootScope', 'backendServerUrl', function ($rootScope, backendServerUrl) {
  function backendFactory(serverUrl, hubName) {
    var connection = $.hubConnection(backendServerUrl)
    var proxy = connection.createHubProxy(hubName)

    connection.start().done(function () {
      setInterval(function () {
        console.log($rootScope.monthly)
        if ($rootScope.monthly) {
          proxy.invoke('SendDataMonthly')
        } else {
          proxy.invoke('SendData')
        }
      }, 5000)
      // proxy.invoke('SendData')
    })

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
          .error(function (data) {
            console.error(data)
          })
      }
    }
  }

  return backendFactory
}])