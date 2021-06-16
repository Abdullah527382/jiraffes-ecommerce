import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// Generate Order Data
function createData(id, date, name, shipTo, orderNumber, amount) {
  return { id, date, name, shipTo, orderNumber, amount };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', '4594  Fort Street Kensington NSW 2113', '123', 312.44),
  createData(1, '16 Mar, 2019', 'Paul McCartney', '4653  Berry Street Redfern NSW 4223', '223', 866.99),
  createData(2, '16 Mar, 2019', 'Tom Scholz', '2145  Douglas Dairy Road Lidcombe NSW 3423', '232', 100.81),
  createData(3, '16 Mar, 2019', 'Michael Jackson', '575  Pearl Street Chatswood NSW 5322', '232233', 654.39),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', '2048  Paradise Lane Kensington NSW 2113', '8312', 212.79),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <h1>Recent Orders</h1>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Order Number</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.orderNumber}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
