import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useTable, useBlockLayout } from 'react-table';
import { useSticky } from 'react-table-sticky';
import data from '../data.json';
import { Rows } from '../rows';

const groupData = (data) => {
  const groupedData = data.reduce((acc, cur) => {
    if (!acc[cur.age]) acc[cur.age] = [];
    acc[cur.age].push(cur);

    return acc;
  }, {});

  const sortedData = Object.entries(groupedData).sort(
    (entryA, entryB) => entryA[0] - entryB[0]
  );

  const groupCounts = sortedData.map(([key, values]) => values.length + 1);
  const tableData = sortedData
    .map(([key, value]) => {
      return [
        {
          name: key,
          groupRow: true,
        },
        ...value,
      ];
    })
    .flat();

  return { groupCounts, tableData };
};

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
    width: 100,
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
];

export const Bounded = () => {
  const ref = useRef();
  const { tableData } = groupData(data.slice(0, 1000));

  let top = true;
  useEffect(() => {
    document
      .querySelector('.body > div:last-child')
      .addEventListener('scroll', (event) => {
        //console.log(event.currentTarget.scrollTop);
        if (event.currentTarget.scrollTop > 100) {
          if (top) {
            //console.log('scroll into view');
            window.scrollTo({
              top: 108,
              left: 0,
              behavior: 'smooth',
            });
            top = false;
          }
        } else {
          if (!top) {
            //console.log('scroll to top');
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth',
            });
            top = true;
          }
        }
      });
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: tableData,
      },
      useBlockLayout,
      useSticky
    );
  return (
    <Styles>
      <div style={{ height: 100 }}></div>
      <div {...getTableProps()} className='table sticky' style={{}}>
        <div className={'header'}>
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
        <div className={'body'} {...getTableBodyProps()}>
          <Rows virtual={true} rows={rows} prepareRow={prepareRow} />
        </div>
      </div>
      <div style={{ height: 1000 }}>after table</div>
    </Styles>
  );
};

const Styles = styled.div`
  .table {
    border: 1px solid #ddd;
    height: 900px;

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
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

      :last-child {
        border-right: 0;
      }

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
        height: 100vh;
        position: relative;
        z-index: 0;
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
