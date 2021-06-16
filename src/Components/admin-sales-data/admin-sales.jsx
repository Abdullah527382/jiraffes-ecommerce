/*
    Following guide: https://www.youtube.com/watch?v=e4en8kRqwe8
    - Can edit styles further
    - Need to edit actual data with backend-implementation
    - Structured in a bar graph using the recharts library from react
    - Hovering over the graph will tell you the value
    File created by Abdullah 

*/

import React, { PureComponent } from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
  Label,
  BarChart,
  Bar,
} from "recharts";

class CustomizedAxisTick extends PureComponent {
  render() {
    const { x, y, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          fontSize={11}
          x={0}
          y={0}
          dy={5}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
        >
          {payload.value}
        </text>
      </g>
    );
  }
}

class AdminSales extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch("/api/items")
      .then((res) => res.json())
      .then((items) => this.populateData(items));
  }

  populateData = (data) => {
    this.setState({
      items: data.map(({ name, quantity }) => ({
        name,
        value: quantity,
      })),
      loading: false,
    });
  };

  render() {
    const { items, loading } = this.state;
    return loading ? (
      <p>Loading...</p>
    ) : (
      <ResponsiveContainer
        width="100%"
        height={500}
        style={{ padding: "45px" }}
      >
        <BarChart data={items}>
          <Area dataKey="value" stroke="#2451B7" />
          <XAxis dataKey="name" tick={<CustomizedAxisTick />} height={60}>
            <Label value="Item" offset={0} position="insideBottom" />
          </XAxis>
          <Bar dataKey="value" fill="#8884d8" />
          <YAxis
            label={{
              value: "Total Sales",
              angle: -90,
              position: "insideLeft",
            }}
            dataKey="value"
            domain={[
              0,
              // (dataMax) =>
              //   Math.max.apply(
              //     Math,
              //     items.map(function(o) {
              //       return o.quantity;
              //     })
              //   ),
              500,
            ]}
          />
          <Tooltip />
          <CartesianGrid opacity={0.5} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default AdminSales;
