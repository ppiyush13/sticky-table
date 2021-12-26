import React from 'react';
import { Virtuoso } from 'react-virtuoso';

export const Rows = ({ virtual, rows, prepareRow }) => {
  const rowRenderer = (index, hide) => {
    const row = rows[index];
    prepareRow(row);
    return (
      <div
        {...row.getRowProps()}
        className={row.original.groupRow ? 'tr group' : 'tr'}
      >
        {row.cells.map((cell) => (
          <div
            {...cell.getCellProps([
              {
                style: {
                  display: hide === true ? 'none' : 'flex',
                },
              },
            ])}
            className='td'
          >
            {cell.render('Cell')}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <>{rowRenderer(0, true)}</>
      {virtual ? (
        <>
          <Virtuoso
            overscan={1000}
            defaultItemHeight={29}
            useWindowScroll={true}
            data={rows}
            itemContent={rowRenderer}
          />
        </>
      ) : (
        rows.map((row, index) => rowRenderer(index))
      )}
    </>
  );
};
