import { useRef } from 'react';
import styled from 'styled-components/macro';
import { Table } from './table/Table';
import { useColumns } from './useColumns';
import { Search } from './search/Search';
import { Content } from './Content';
import data from './data.json';

export const App = () => {
  const columns = useColumns();
  const tableRef = useRef(null);
  const onSearchChange = (filterValue) => {
    tableRef.current.setGlobalFilter(filterValue);
  };

  return (
    <Page>
      <Content>This content will scroll out of the view</Content>
      <Search onSearchChange={onSearchChange} />
      <Table
        ref={tableRef}
        stickHeaderTop={'4rem'}
        columns={columns}
        data={data.slice(200)}
      />
      <Content>This content will appear after scrolling table</Content>
    </Page>
  );
};

const Page = styled.main`
  max-width: 72rem;
  margin: auto;
`;
