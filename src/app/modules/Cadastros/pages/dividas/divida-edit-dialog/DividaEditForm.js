// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Select,
  DatePickerField,
} from "../../../../../../_metronic/_partials/controls";

// Validation schema
const DividaEditSchema = Yup.object().shape({
  iduser: Yup.string().required("Usuario is Obrigatorio"),
  valor: Yup.string().required("Valor é Obrigatorio"),
  motivo: Yup.string().required("Motivo is required"),
  data: Yup.string().required("data da divida"),
});

export function DividaEditForm({
  saveDivida,
  divida,
  actionsLoading,
  onHide,
  users,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={divida}
        validationSchema={DividaEditSchema}
        onSubmit={(values) => {
          console.log(values);
          saveDivida(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  {/* Usuario */}
                  <div className="col-lg-4">
                    <Select name="iduser" label="Usuario">
                      {users &&
                        users.map((item) => (
                          <option value={item.value}>{item.text}</option>
                        ))}
                    </Select>
                  </div>
                  {/* Date  */}
                  <div className="col-lg-4">
                    <DatePickerField name="data" label="Data da divida" />
                  </div>
                </div>
                <div className="form-group row">
                  {/* Valor */}
                  <div className="col-lg-4">
                    <Field
                      name="valor"
                      component={Input}
                      placeholder="Valor"
                      label="Valor"
                    />
                  </div>
                </div>
                {/* Motivo */}
                <div className="form-group row"></div>
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      type="Motivo"
                      name="motivo"
                      component={Input}
                      placeholder="Motivo"
                      label="Motivo"
                      // customFeedbackLabel="motivo"
                    />
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                Cancel
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Save
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
