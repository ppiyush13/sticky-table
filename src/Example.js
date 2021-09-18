import React from 'react';
import cx from 'classnames';
import { Grid } from 'react-virtual-grid';
import styles from './Example.module.css';

const CELL_SIZE = 64;

function toColor(number) {
  const num = number >>> 0;

  const b = num & 0xFF;
  const g = (num & 0xFF00) >>> 8;
  const r = (num & 0xFF0000) >>> 16;

  return [ r, g, b ];
}

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columnCount: 5,
      rowCount: 100,
      fixedLeftColumnCount: 1,
      fixedRightColumnCount: 0,
      fixedHeaderCount: 1,
      fixedFooterCount: 0
    };
  }

  render() {

    const rowHeight = CELL_SIZE;
    const columnWidth = CELL_SIZE;

    return (
      <div className={cx('table-view', styles.container)}>
        <Grid ref={this.bindGrid}
              columnCount={this.state.columnCount}
              rowCount={this.state.rowCount}
              estimatedColumnWidth={columnWidth}
              estimatedRowHeight={rowHeight}
              fixedLeftColumnCount={this.state.fixedLeftColumnCount}
              fixedRightColumnCount={this.state.fixedRightColumnCount}
              fixedHeaderCount={this.state.fixedHeaderCount}
              fixedFooterCount={this.state.fixedFooterCount}
              renderCell={this.renderCell}
              columnWidth={this.calculateColumnWidth}
              rowHeight={this.calculateRowHeight} />
      </div>
    );
  }

  calculateColumnWidth = (column) => {
    return 300 + 100 * Math.random();
  }

  calculateRowHeight = (row) => {
    return CELL_SIZE + 30 * Math.random();
  }

  renderCell = (pane, row, rowData, column, columnData) => {
    const [ colIndex, colLeft, width ] = columnData;
    const [ rowIndex, rowTop, height ] = rowData;
    const backgroundColor = 'transparent';
    const isFixed = column === 0 || row === 0 || column === this.state.columnCount - 1 || row === this.state.rowCount - 1;
    const left = column < 1 ? 0 : colLeft;
    const top = 0;
    const attrs = { left, top, width, height, backgroundColor };

    const title = rowIndex + '-' + colIndex;

    const classes = cx(styles.cell,
                       column === 0 && styles.cellLeft,
                       column === 1 && styles.bodyLeft,
                       row === 0 && column > 1 && styles.cellTop,
                       row === 0 && column === 1 && styles.cellTopFirst,
                       row === this.state.rowCount - 1 && column > 1 && styles.cellBottom,
                       row === this.state.rowCount - 1 && column === 0 && styles.cellBottomFixed,
                       row === this.state.rowCount - 1 && column === 1 && styles.cellBottomFirst,
                       column === this.state.columnCount - 1 && styles.cellRight,
                       isFixed && styles.fixed);

    return (
      <div key={rowIndex + '-' + colIndex}
           style={attrs}
           className={classes}>{title}</div>
    );
  }
}
