import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  totalContext: {
    flex: 1,
  },
});

export default function TotalSales() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <h1>Total Sales</h1>
      <Typography component="p" variant="h4">
        $10,911.89
      </Typography>
      <Typography color="textSecondary" className={classes.totalContext}>
        on 20 April, 2021
      </Typography>
      <div>
        <Link color="primary" href="#">
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
