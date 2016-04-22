using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace SanaCompetencia.Server.Hubs
{
    [HubName("dataHub")]
    public class DataHub : Hub
    {
        public void SendData()
        {
            Clients.All.broadcastRecepcion(new QueryObjects.DataIndicador().Get("EO_RC"));
            Clients.All.broadcastDevolucion(new QueryObjects.DataIndicador().Get("EO_DEV"));
            Clients.All.broadcastTrafico(new QueryObjects.DataIndicador().Get("EO_TRAFICO"));
            Clients.All.broadcastBulto(new QueryObjects.DataIndicador().Get("EO_BULTOS"));
            Clients.All.broadcastCestas(new QueryObjects.DataIndicador().Get("EO_CESTAS"));
            Clients.All.broadcastAlmacen(new QueryObjects.DataIndicador().Get("EO_ALMACEN"));
        }
        public void SendDataMonthly()
        {
            Clients.All.broadcastRecepcion(new QueryObjects.DataIndicador().GetStacked("EO_RC"));
            Clients.All.broadcastDevolucion(new QueryObjects.DataIndicador().GetStacked("EO_DEV"));
            Clients.All.broadcastTrafico(new QueryObjects.DataIndicador().GetStacked("EO_TRAFICO"));
            Clients.All.broadcastBulto(new QueryObjects.DataIndicador().GetStacked("EO_BULTOS"));
            Clients.All.broadcastCestas(new QueryObjects.DataIndicador().GetStacked("EO_CESTAS"));
            Clients.All.broadcastAlmacen(new QueryObjects.DataIndicador().GetStacked("EO_ALMACEN"));
        }
    }
}