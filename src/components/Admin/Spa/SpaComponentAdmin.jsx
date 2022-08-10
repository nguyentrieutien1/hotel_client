import React from "react";
import FormSpaComponent from "./Form/FormSpaComponent";
import TableSpaComponent from "./Table/TableSpaComponent";

export default function SpaComponentAdmin(props) {
  return (
    <div>
      <div className="row">
        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <FormSpaComponent
            handleChangeSpa={props.handleChangeSpa}
            handleCreateSpa={props.handleCreateSpa}
            inputElement={props.inputElement}
          />
        </div>

        <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
          <TableSpaComponent />
        </div>
      </div>
    </div>
  );
}
