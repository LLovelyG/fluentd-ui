(function(){
  "use strict";
  var POLLING_INTERVAL = 3 * 1000;
  var POLLING_URL = "/polling/alerts";

  $(function(){
    var alert = new Vue({
      el: "#alert",
      data: {
        "alerts": []
      },

      created: function(){
        var self = this;
        var fetch = function(){
          self.fetchAlertsData().then(function(alerts){
            self.alerts = alerts;
          });
        };
        fetch();
        setInterval(fetch, POLLING_INTERVAL);
      },

      computed: {
        alertsCount: {
          $get: function(){ return this.alerts.length; }
        },
        hasAlerts: {
          $get: function(){ return this.alertsCount > 0; }
        }
      },

      methods: {
        fetchAlertsData: function() {
          return new Promise(function(resolve, reject) {
            $.getJSON(POLLING_URL, resolve).fail(reject);
          });
        }
      }
    });
  });
})();