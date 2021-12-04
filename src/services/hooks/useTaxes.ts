import { useQuery } from 'react-query';
import api from "../../services/api";

type Tax = {
  id: string,
  reference: string,
  type: string,
  value: number,
  das_value:number,
  das_perc: number,
  inss_value: number,
  inss_perc: number,
  irrf_value: number,
  irrf_perc: number,
}

type GetTaxesResponse = {
  totalCount: number;
  taxes: Tax[];
}

export async function getTaxes(page: number): Promise<GetTaxesResponse>{
  
    const data = await api.get("/fechamento", {
      params:{
        pagina: page,
      }
    })
    
    const taxes = data.data.data.map(tax => {
      return {
        id: tax.id,
        reference: tax.referencia.substr(4,2) + "/" +tax.referencia.substr(0,4),
        type: tax.tipo,
        value: tax.valor_faturado,
        das_value: tax.valor_das,
        das_perc: tax.aliquota_das,
        inss_value: tax.valor_inss,
        inss_perc: tax.aliquota_inss,
        irrf_value: tax.valor_irff,
        irrf_perc: tax.aliquota_irrf
      };
    });

    const totalCount = data.data.meta.total_linhas;

    return { 
      taxes,
      totalCount
     };
}

export function useTaxes(page: number){
  return useQuery(['taxes-list', page], () => getTaxes(page) , {
    staleTime: 1000 * 5, //5 seconds
  })
}