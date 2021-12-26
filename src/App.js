import styled from 'styled-components';
import data from './data.json';
import { useTable, useBlockLayout } from 'react-table';
import { useSticky } from 'react-table-sticky';
import { Rows } from './rows';
import { useVirtualScroll } from './iScroll-min/useVirtualScroll';

const columns = [
  // {
  //   Header: 'Age',
  //   accessor: 'age',
  // },
  {
    id: 'name',
    Header: 'Name',
    accessor: 'name',
    sticky: 'left',
    width: 150,
  },
  {
    id: 'email',
    Header: 'email',
    accessor: 'email',
    width: 300,
    //sticky: 'left',
  },
  {
    id: 'name2',
    Header: 'Name 2',
    accessor: 'name',
  },
  {
    id: 'email2',
    Header: 'email 2',
    accessor: 'email',
    width: 300,
  },
  {
    id: 'name3',
    Header: 'Name 3',
    accessor: 'name',
    width: 300,
  },
  {
    id: 'email3',
    Header: 'email 3',
    accessor: 'email',
    width: 300,
  },
  {
    id: 'name4',
    Header: 'Name 3',
    accessor: 'name',
    width: 300,
  },
  {
    id: 'email4',
    Header: 'email 3',
    accessor: 'email',
    width: 300,
  },
  {
    id: 'name5',
    Header: 'Name 3',
    accessor: 'name',
    width: 300,
  },
  {
    id: 'email5',
    Header: 'email 3',
    accessor: 'email',
    width: 300,
  },
  {
    id: 'name6',
    Header: 'Name 3',
    accessor: 'name',
    width: 300,
  },
  {
    id: 'email6',
    Header: 'email 3',
    accessor: 'email',
    width: 300,
  },
  {
    id: 'name7',
    Header: 'Name 3',
    accessor: 'name',
    width: 300,
  },
  {
    id: 'email7',
    Header: 'email 3',
    accessor: 'email',
    width: 300,
  },
  {
    id: 'name8',
    Header: 'Name 3',
    accessor: 'name',
    width: 300,
  },
  {
    id: 'email8',
    Header: 'email 3',
    accessor: 'email',
    sticky: 'right',
    width: 200,
  },
];

export const App = () => {
  const { bodyRef, headerRef, verticalScrollerRef } = useVirtualScroll();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: data.slice(0, 100),
      },
      useBlockLayout,
      useSticky
    );
  const prepareTableRow = (idx) => {
    prepareRow(rows[idx]);
    return rows[idx].getRowProps();
  };

  const width = rows.length ? prepareTableRow(0).style.width : 0;

  // Render the UI for your table
  return (
    <Styles>
      <div {...getTableProps()} className='table sticky' style={{}}>
        <div className={'header'} ref={headerRef}>
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className='tr'>
              {headerGroup.headers.map((column) => (
                <div {...column.getHeaderProps()} className='th'>
                  {column.render('Header')}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div ref={bodyRef} className={'body'} {...getTableBodyProps()}>
          <Rows virtual={true} rows={rows} prepareRow={prepareRow} />
        </div>
        <div
          ref={verticalScrollerRef}
          style={{ position: 'sticky', bottom: '0', overflowX: 'auto' }}
        >
          <div style={{ height: 1, overflowX: 'auto', width }}></div>
        </div>
      </div>
      <div style={{ height: 500 }}>after table</div>
    </Styles>
  );
};

const Styles = styled.div`
  .table {
    border: 1px solid #ddd;

    .tr {
      &.group {
        background-color: wheat;
        position: sticky;
      }
    }

    .th,
    .td {
      padding: 5px;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      overflow: hidden;

      .resizer {
        display: inline-block;
        width: 5px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;

        &.isResizing {
          background: red;
        }
      }
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
  }
`;
