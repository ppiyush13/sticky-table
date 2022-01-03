import { matchSorter } from 'match-sorter';
import { IdType, Row } from 'react-table';

export const globalFilter = <D extends object>(
  rows: Row<D>[],
  columnIds: IdType<D>[],
  filterValue: string,
) => {
  const keys = columnIds.map((id) => `values.${id}`);
  return matchSorter(rows, filterValue, {
    keys,
    threshold: matchSorter.rankings.CONTAINS,
  });
};
