import { useQuery } from 'react-query';
import api from "../../services/api";

type Income = {
  id: string,
  reference: string,
  value: number,
}

type GetIncomesResponse = {
  totalCount: number;
  incomes: Income[];
}

export async function getIncomes(page: number): Promise<GetIncomesResponse>{
  
    const data = await api.get("/faturamento", {
      params:{
        pagina: page,
      }
    })
    
    const incomes = data.data.data.map(income => {
      return {
        id: income.id,
        reference: income.referencia.substr(4,2) + "/" +income.referencia.substr(0,4),
        value: income.valor_faturado
      };
    });

    const totalCount = data.data.meta.total_linhas;

    return { 
      incomes,
      totalCount
     };
}

export function useIncomes(page: number){
  return useQuery(['incomes-list', page], () => getIncomes(page) , {
    staleTime: 1000 * 5, //5 seconds
  })
}