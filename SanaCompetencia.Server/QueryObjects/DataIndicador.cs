using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SanaCompetencia.DAL;

namespace SanaCompetencia.Server.QueryObjects
{
    public class DataIndicador
    {
        private readonly COBECAEntities _entities;

        public DataIndicador()
        {
            _entities = new COBECAEntities();
        }

        public ICollection<Data> Get(string type)
        {
            var timeStart = new DateTime(DateTime.Today.Year, DateTime.Today.Month, DateTime.Today.Day, 0, 0, 0).TimeOfDay;
            var timeEnd = new DateTime(DateTime.Today.Year, DateTime.Today.Month, DateTime.Today.Day, 23, 59, 59).TimeOfDay;
            var today = DateTime.Today;
            return _entities.data_indicador
                .Where(x => x.protocolo == type && x.fecha == today && x.hora >= timeStart && x.hora <= timeEnd)
                .GroupBy(x => x.cod_drogueria)
                .Select(g => new Data
                {
                    CodigoDrogueria = g.Key,
                    Valor = g.Sum(x => x.valor),
                    Tipo = type,
                    Drogueria = g.FirstOrDefault().Drogueria.siglas.Trim()
                }).ToList();
        }

        public ICollection<Data> GetStacked(string type)
        {
            var monthStart = new DateTime(DateTime.Today.Year, DateTime.Today.Month, 1).Date;
            var monthEnd = new DateTime(DateTime.Today.Year, DateTime.Today.Month,
                DateTime.Now.AddMonths(1).AddSeconds(-1).Day).Date;
            return _entities.data_indicador
                .Where(x => x.protocolo == type && x.fecha >= monthStart && x.fecha <= monthEnd)
                .GroupBy(x => x.cod_drogueria)
                .Select(g => new Data
                {
                    CodigoDrogueria = g.Key,
                    Valor = g.Sum(x => x.valor),
                    Tipo = type,
                    Drogueria = g.FirstOrDefault().Drogueria.siglas.Trim()
                }).ToList();
        }
    }
}