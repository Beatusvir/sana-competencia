using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;

namespace SanaCompetencia.Server
{
    public class Data
    {
        [JsonProperty(PropertyName = "tipo")]
        public string Tipo { get; set; }

        [JsonProperty(PropertyName = "nombre")]
        public string Drogueria { get; set; }

        [JsonProperty(PropertyName = "id")]
        public int CodigoDrogueria { get; set; }

        [JsonProperty(PropertyName = "valor")]
        public decimal Valor { get; set; }
    }
}