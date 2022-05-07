import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddTradeForm from './AddTradeForm';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function marketValueRow(shares, price) {
  return shares * price;
}


function createRow(holding_object) {
  const ticker = holding_object.ticker;
  const shares = ccyFormat(parseFloat(holding_object.shares));
  const price = ccyFormat(parseFloat(holding_object.price));
  const change = ccyFormat(parseFloat(holding_object.change));
  const change_percent = ccyFormat(parseFloat(holding_object.change_percent));
  const value = ccyFormat(marketValueRow(shares, price));
  return { ticker, shares, price, change, change_percent, value };
}

function total(items) {
  return items.map(({ value }) => parseFloat(value)).reduce((sum, i) => sum + i, 0);
}

function weight(holding, total) {

  const value = parseFloat(holding.value);

  const weight = ccyFormat((value / total)*100)

  return { ...holding, weight }
}

export default function HoldingsTable(props) {

  let rows = props.holdings.map(holding => createRow(holding));

  const holdingsSubtotal = ccyFormat(total(rows));

  rows = rows.map(row => weight(row, holdingsSubtotal))

  return (
    <Box sx={{ m: 5 }} >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="left">
                Symbol
              </StyledTableCell>
              <StyledTableCell align="right">
                Price
              </StyledTableCell>
              <StyledTableCell align="right">
                $ Change
              </StyledTableCell>
              <StyledTableCell align="right">
                % Change
              </StyledTableCell>
              <StyledTableCell align="right">
                Shares
              </StyledTableCell>
              <StyledTableCell align="right">
                $ Market Value
              </StyledTableCell>
              <StyledTableCell align="right">
                % Weight
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.ticker}>
                <StyledTableCell align="left">{row.ticker}</StyledTableCell>
                <StyledTableCell align="right">{row.price}</StyledTableCell>
                <StyledTableCell align="right">{row.change}</StyledTableCell>
                <StyledTableCell align="right">{row.change_percent}</StyledTableCell>
                <StyledTableCell align="right">{row.shares}</StyledTableCell>
                <StyledTableCell align="right">{row.value}</StyledTableCell>
                <StyledTableCell align="right">{row.weight}</StyledTableCell>
              </StyledTableRow>
            ))}

            <StyledTableRow>
              <StyledTableCell rowSpan={1} colSpan={4} />
              <StyledTableCell align='right'><strong>Total</strong></StyledTableCell>
              <StyledTableCell align='right'><strong>{holdingsSubtotal}</strong></StyledTableCell>
              <StyledTableCell />
            </StyledTableRow>
          </TableBody>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell colSpan={7} >
                New Order
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell sx={{p: 1}} colSpan={7}>
                <AddTradeForm
                handleAddTrade={props.handleAddTrade}
                />
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
  );
}
