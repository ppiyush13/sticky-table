import { Grid } from "react-tablize";

export default () => {
  return (
    <Grid columnCount={1000} rowCount={10} columnWidth={100} rowHeight={40}>
      {(cellProps) => `${cellProps.absRowIndex}, ${cellProps.absColIndex}`}
    </Grid>
  );
};
