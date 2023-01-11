import React from "react";

export default function DishTable(props) {
  const { dishes } = props;
  const showImage = (images) => {
    return images.map((image) => {
      return `${image.image_url}\n`;
    });
  };
  const showDishes = () => {
    if (dishes?.length > 0) {
      return dishes[0].dishs.map((dish) => {
        return (
          <tr>
            <td>{dish.id}</td>
            <td>{dish.dishe_name}</td>
            <td>{dish.dishe_description}</td>
            <td>{dish.dishe_price}</td>
            <td>{showImage(dish.images)}</td>
            <td className="d-flex">
              <button
                onClick={() => props.handleUpdateDish(dish)}
                type="button"
                className="btn btn-success mx-2"
              >
                EDIT
              </button>
              <button
                onClick={() => props.handleDeleteDish(dish.id)}
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
            <th>DESCRIPTION</th>
            <th>PRICE</th>
            <th>IMAGES</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>{showDishes()}</tbody>
      </table>
    </div>
  );
}
