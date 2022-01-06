import React from "react";

export default function (props) {
  const delivery = props.delivery;

  return (
    <tr>
      <td>{delivery.created_at}</td>
      <td>{delivery.quantity}</td>
      <td>{delivery.delivery_manager}</td>
      <td>{delivery.state}</td>
    </tr>
  );
}
