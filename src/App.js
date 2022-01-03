import { useRef, useEffect } from 'react';
import styled from 'styled-components/macro';
import { Table } from './table/Table';
import { columns } from './table-columns';
import { Search } from './search/Search';
import { Content } from './Content';
import data from './table-data.json';

export const App = () => {
  const tableRef = useRef(null);
  const onSearchChange = (filterValue) => {
    tableRef.current.setGlobalFilter(filterValue);
  };

  useEffect(() => {
    tableRef.current.setGlobalFilter('');
  }, []);

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
