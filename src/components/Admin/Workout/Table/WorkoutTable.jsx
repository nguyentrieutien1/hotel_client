import React from "react";

export default function WorkoutTable(props) {
  const { workouts } = props;
  const showImage = (images) => {
    return images.map((image) => {
      return `${image.image_url}\n`;
    });
  };
  const showWorkouts = () => {
    if (workouts?.length > 0) {
      return workouts[0].workouts.map((workout) => {
        return (
          <tr>
            <td>{workout.id}</td>
            <td>{workout.workout_name}</td>
            <td>{workout.workout_description}</td>
            <td>{showImage(workout.images)}</td>
            <td>{workout.workout_price}</td>
            <td>
              <button
                onClick={() => props.handleUpdate(workout)}
                type="button"
                class="btn btn-default"
              >
                EDIT
              </button>{" "}
              <button
                onClick={() => props.handleOnDelete(workout.id)}
                type="button"
                class="btn btn-default"
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
            <th>IMAGES</th>
            <th>PRICE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>{showWorkouts()}</tbody>
      </table>
    </div>
  );
}
