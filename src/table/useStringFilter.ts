import { matchSorter } from 'match-sorter';
import { useCallback } from 'react';
import { IdType, Row } from 'react-table';

export const useStringFilter = <T extends object>() => {
  return useCallback(
    (rows: Row<T>[], columnIds: IdType<T>[], query: string) => {
      const keys = columnIds.map((id) => `values.${id}`);
      return matchSorter(rows, query, {
        keys,
        threshold: matchSorter.rankings.CONTAINS,
      });
    },
    [],
  );
};
