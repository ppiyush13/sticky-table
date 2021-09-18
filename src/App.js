import styled from "styled-components";
import data from "./data.json";
import { useTable, useBlockLayout } from "react-table";
import { useSticky } from "react-table-sticky";
import { useEffect, useRef } from "react";
import { Rows } from "./rows";
//import IScroll from 'iscroll/build/iscroll-probe';
import IScroll from "./iScroll-min/iScroll";

let overflow = "auto";
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
    id: "name",
    Header: "Name",
    accessor: "name",
    sticky: "left",
    width: 100,
  },
  {
    id: "email",
    Header: "email",
    accessor: "email",
    width: 300,
    //sticky: 'left',
  },
  {
    id: "name2",
    Header: "Name 2",
    accessor: "name",
  },
  {
    id: "email2",
    Header: "email 2",
    accessor: "email",
    width: 300,
  },
  {
    id: "name3",
    Header: "Name 3",
    accessor: "name",
    width: 300,
  },
  {
    id: "email3",
    Header: "email 3",
    accessor: "email",
    width: 300,
  },
];

export const App = () => {
  const { tableData, groupCounts } = groupData(data.slice(0, 100));
  const ref = useRef();
  const headerRef = useRef();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: tableData,
      },
      useBlockLayout,
      useSticky
    );
  useEffect(() => {
    const el = ref.current;
    //iscroll
    const iscroller = new IScroll(el, {
      // disableMouse: false,
      // disablePointer: false,
      // disableTouch: false,
      mouseWheel: true,
      scrollX: true,
      freeScroll: false,
      probeType: 3,
      keyBindings: true,
      eventPassthrough: "vertical",
      onTranslate: (x) => {
        headerRef.current.scrollTo(x, 0);
        el.scrollTo(x, 0);
      },
    });
  }, [ref]);

  // Render the UI for your table
  return (
    <Styles>
      <div style={{ height: 100 }}>Before table</div>
      <div {...getTableProps()} className="table sticky" style={{}}>
        <div className={"header"} ref={headerRef}>
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column) => (
                <div {...column.getHeaderProps()} className="th">
                  {column.render("Header")}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div ref={ref} className={"body"} {...getTableBodyProps()}>
          <Rows virutal rows={rows} prepareRow={prepareRow} />
        </div>
      </div>
    </Styles>
  );
};

const Styles = styled.div`
  .table {
    border: 1px solid #ddd;

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
      &.group {
        background-color: wheat;
        position: sticky;
        top: 30px;
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
        box-shadow: 0px 3px 3px #ccc;
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
        box-shadow: 2px 0px 3px #ccc;
      }

      [data-sticky-first-right-td] {
        box-shadow: -2px 0px 3px #ccc;
      }
    }
  }
`;
