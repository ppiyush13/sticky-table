import { Table } from './table/Table';

export const App = () => {
  return (
    <div>
      <div style={{ height: 500 }}>before table</div>
      <Table />
      <div style={{ height: 500 }}>after table</div>
    </div>
  );
};
