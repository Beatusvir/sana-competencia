//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SanaCompetencia.DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class Drogueria
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Drogueria()
        {
            this.data_indicador = new HashSet<data_indicador>();
        }
    
        public int cod_drogueria { get; set; }
        public string desc_drogueria { get; set; }
        public string siglas { get; set; }
        public string rif { get; set; }
        public string nit { get; set; }
        public string Telefono { get; set; }
        public string direccion { get; set; }
        public string cod_pais { get; set; }
        public string cod_estado { get; set; }
        public string cod_municipio { get; set; }
        public string cod_parroquia { get; set; }
        public Nullable<byte> activo { get; set; }
        public string ip_config { get; set; }
        public Nullable<int> puerto { get; set; }
        public Nullable<System.Guid> rowguid { get; set; }
        public string nombre_abrev { get; set; }
        public Nullable<byte> drog_externa { get; set; }
        public Nullable<byte> automatizada { get; set; }
        public string ip_pccorreo_1 { get; set; }
        public string ip_pccorreo_2 { get; set; }
        public byte activo_web { get; set; }
        public Nullable<System.DateTime> guardado_web { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<data_indicador> data_indicador { get; set; }
    }
}
