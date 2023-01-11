import React from "react";
import { Link } from "react-router-dom";
export default function TableSpaComponent(props) {
  const renderImage = (images) => {
    return images.map((image) => {
      return `${image.image_url}\n`;
    });
  };
  const showSpas = () => {
    if (props.spas?.length > 0) {
      return props.spas[0].spas.map((spa) => {
        return (
          <tr key={spa.id}>
            <td style={{ width: "100px", textAlign: "center" }}>{spa.id}</td>
            <td style={{ width: "100px", textAlign: "center" }}>
              <Link to={`${spa.id}`}>{spa.spa_name}</Link>
            </td>
            <td style={{ width: "100px", textAlign: "center" }}>
              {renderImage(spa.images)}
            </td>
            <td>{spa.spa_description}</td>
            <td>
              <button
                onClick={() => props.handleUpdateSpa(spa)}
                type="button"
                className="btn btn-success"
              >
                EDIT
              </button>
              <button
                onClick={() => props.handleDeleteSpa(spa.id)}
                type="button"
                className="btn btn-danger"
              >
                DELETE
              </button>
            </td>
          </tr>
        );
      });
    }
  };
  return (
    <div>
      <table
        className="table table-hover"
        style={{ height: "700px", overflowY: "scroll" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>IMAGES</th>
            <th>DESCRIPTION</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>{showSpas()}</tbody>
      </table>
    </div>
  );
}
