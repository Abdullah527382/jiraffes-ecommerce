import React from "react";
import AdminSales from "../../Components/admin-sales-data/admin-sales";
import AdminAddItemForm from "../../Components/admin-add-item/admin-add-item";
import MessagesToAdmin from "../../Components/messages-to-admin/messages-to-admin";
/*
    An admin page consists of admin exclusive abilities, these include:
    - Sales data of every item, ordered 
    - Structured in a bar graph using the recharts library from react
    - Hovering over the graph will tell you the value
    File created by Abdullah 
*/

class AdminDashboard extends React.Component {
  render() {
    return (
      <div className="sales-page">
        <h1> Sales Data </h1>
        <AdminSales />
        <AdminAddItemForm />
        <MessagesToAdmin />
      </div>
    );
  }
}

export default AdminDashboard;
