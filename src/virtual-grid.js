import { Grid } from 'react-virtual-grid';
import styled from 'styled-components';

const columnCount = 20;
const rowCount = 4000;

const VirtualGrid = () => {
  const calculateColumnWidth = (column) => {
    // calculate the width, or null if you're not sure yet because data hasn't loaded
    return 128;
  }

  const calculateRowHeight = (row) => {
    // calculate the height, or null if you're not sure yet because data hasn't loaded
    return 32;
  }

  const renderCell = (pane, row, rowData, column, columnData) => {
    const [ colIndex, colLeft, width ] = columnData;
    const [ rowIndex, rowTop, height ] = rowData;

    const cellNumber = (rowIndex * columnCount) + colIndex;

    const left = column < 1 ? 0 : colLeft;
    const top = row < 1 ? 0 : rowTop;

    const attrs = { left, top, width, height, position: 'absolute' };

    const title = rowIndex + '-' + colIndex;

    return (
      <div key={rowIndex + '-' + colIndex}
           style={attrs}>{title}</div>
    );
  }

  return (
    <Container>
      <Grid columnCount={columnCount}
        rowCount={rowCount}
        estimatedColumnWidth={128}
        estimatedRowHeight={32}
        renderCell={renderCell}
        columnWidth={calculateColumnWidth}
        rowHeight={calculateRowHeight} 
      />
    </Container>
  );
}

export default VirtualGrid;

const Container = styled.div`
  background-color: #000;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border: 1px solid transparent;
  position: absolute;
  overflow: hidden;
  box-sizing: border-box;
`;
