import styled from 'styled-components/macro';
import { Table } from './table/Table';
import { useColumns } from './useColumns';
import { Search } from './search/Search';
import data from './data.json';

export const App = () => {
  const columns = useColumns();

  return (
    <div style={{ maxWidth: 1024, margin: 'auto' }}>
      <Content>
        <ContentText>This content will scroll out of the view</ContentText>
      </Content>
      <Search />
      <Table columns={columns} data={data.slice(200)} />
      <Content>
        <ContentText>
          This content will appear after scrolling table
        </ContentText>
      </Content>
    </div>
  );
};

const Content = styled.div`
  padding: 1rem 0;
`;

const ContentText = styled.div`
  background-color: gainsboro;
  padding: 0.5rem 1rem;
`;
