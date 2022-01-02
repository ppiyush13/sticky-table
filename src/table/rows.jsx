import React from 'react';
import { Virtuoso } from 'react-virtuoso';

export const Rows = ({ virtual, rows, prepareRow }) => {
  const rowRenderer = (index) => {
    const row = rows[index];
    prepareRow(row);

    return (
      <div
        {...row.getRowProps()}
        className={row.original.groupRow ? 'tr group' : 'tr'}
      >
        {row.cells.map((cell) => (
          <div {...cell.getCellProps()} className="td">
            {cell.render('Cell')}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {virtual ? (
        <>
          <Virtuoso
            overscan={1000}
            defaultItemHeight={35}
            useWindowScroll={true}
            data={rows}
            itemContent={rowRenderer}
            // components={{
            //   ScrollSeekPlaceholder: ({ height }) => {
            //     return (
            //       <div
            //         style={{
            //           height,
            //           borderBottom: '1px solid #ddd',
            //           padding: '0.5rem 1rem',
            //         }}
            //       >
            //         loading ...
            //       </div>
            //     );
            //   },
            // }}
            // scrollSeekConfiguration={{
            //   enter: (velocity) => Math.abs(velocity) > 500,
            //   exit: (velocity) => Math.abs(velocity) < 10,
            // }}
          />
        </>
      ) : (
        rows.map((row, index) => rowRenderer(index))
      )}
    </>
  );
};
