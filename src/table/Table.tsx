import {
  CSSProperties,
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { useTable, useBlockLayout, useGlobalFilter, Column } from 'react-table';
import styled from 'styled-components/macro';
import { useSticky } from 'react-table-sticky';
import { Rows } from './Rows';
import { useVirtualScroll } from './useVirtualScroll';
import { useStringFilter } from './useStringFilter';

export interface TablePropsType<T extends object> {
  columns: Column<T>[];
  data: T[];
  stickHeaderTop: CSSProperties['top'];
}

export interface TableRefType {
  setGlobalFilter: (filterValue: string) => void;
}

export const TableComponent = <D extends object>(
  { columns, data, stickHeaderTop }: TablePropsType<D>,
  ref: ForwardedRef<TableRefType>,
) => {
  const { bodyRef, headerRef, horizontalScrollerRef } = useVirtualScroll();
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      globalFilter: useStringFilter<D>(),
    },
    useBlockLayout,
    useSticky,
    useGlobalFilter,
  );

  useImperativeHandle(ref, () => ({
    setGlobalFilter,
  }));

  const prepareTableRow = (idx: number) => {
    prepareRow(rows[idx]);
    return rows[idx].getRowProps();
  };

  const width = rows.length ? prepareTableRow(0).style?.width : 0;

  /* Render the UI for your table */
  return (
    <>
      <TableWrapper {...getTableProps()} className="table sticky">
        <div
          className={'header'}
          ref={headerRef}
          style={{ top: stickHeaderTop }}
        >
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column) => (
                <div {...column.getHeaderProps()} className="th">
                  {column.render('Header')}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div ref={bodyRef} className={'body'} {...getTableBodyProps()}>
          <div style={{ width }}></div>
          <Rows virtual={rows.length > 0} rows={rows} prepareRow={prepareRow} />
        </div>
        <div
          ref={horizontalScrollerRef}
          style={{
            position: 'sticky',
            bottom: '0',
            overflowX: 'auto',
          }}
        >
          <div style={{ height: 1, overflowX: 'auto', width }}></div>
        </div>
      </TableWrapper>
    </>
  );
};

export const Table = forwardRef(TableComponent);

const TableWrapper = styled.div`
  border: 1px solid #ddd;

  .tr {
    &.group {
      background-color: wheat;
      position: sticky;
    }
  }

  .th,
  .td {
    padding: 0.5rem 1rem;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
    overflow: hidden;
  }

  &.sticky {
    .header,
    .footer {
      position: sticky;
      z-index: 1;
      width: fit-content;
      overflow: hidden;
    }

    .header {
      top: 0;
      width: 100%;
      background-color: #fff;
      box-shadow: 0px 1px 2px #aaa;
    }

    .footer {
      bottom: 0;
      box-shadow: 0px -3px 3px #ccc;
    }

    .body {
      position: relative;
      z-index: 0;
      overflow-x: hidden;
      overflow-y: hidden;
    }

    .group {
      z-index: 5;
      [data-sticky-td] {
        background-color: wheat;
      }
    }

    [data-sticky-td] {
      position: sticky;
      background-color: #fff;
    }

    [data-sticky-last-left-td] {
      box-shadow: 0px 0px 2px #aaa;
    }

    [data-sticky-first-right-td] {
      box-shadow: -2px 0px 3px #ccc;
    }
  }
`;
