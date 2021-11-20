import {Stack} from '@chakra-ui/react';
import { RiCurrencyLine, RiDashboardLine, RiFileChartLine, RiListCheck2 } from 'react-icons/ri';
import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

export function SideBarNav(){
  return(
    <Stack spacing="12" align="flex-start" >
      <NavSection title="GERAL">
        <NavLink icon={RiDashboardLine}>Dashboard</NavLink>
        <NavLink icon={RiCurrencyLine}>Faturamentos</NavLink>
        <NavLink icon={RiFileChartLine}>Fechamentos</NavLink>
        <NavLink icon={RiListCheck2}>Tabelas Simples Nacional</NavLink>
        <NavLink icon={RiListCheck2}>Tabelas IRRF</NavLink>
        <NavLink icon={RiListCheck2}>Tabelas INSS</NavLink>
      </NavSection>
    </Stack>
  );
}