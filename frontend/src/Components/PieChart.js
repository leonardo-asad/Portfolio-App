import React from "react";
import Box from '@mui/material/Box';
import Chart from "react-apexcharts";
import useMediaQuery from '@mui/material/useMediaQuery';


function getValue(holding_object) {
  const shares = parseFloat(holding_object.shares)
  const price = parseFloat(holding_object.price)
  const value = shares * price
  return Math.round(value)
}

export default function PieChart(props) {
  const matches = useMediaQuery('(min-width:920px)');
  const width = matches ? 350 : 300;

  const holdings = props.holdings

  const symbols = holdings.map(({ticker}) => ticker)

  const values = holdings.map((holding_object) => getValue(holding_object))

  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      height: 1,
      padding: 1,
      borderRadius: 3,
      boxShadow: 3
    }}
    >
      <Chart
        options={{ labels: symbols }}
        series={values}
        type="pie"
        width={width}
      />
    </Box>
  );
}
