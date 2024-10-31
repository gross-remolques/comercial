import { Form, Row, Col } from "react-bootstrap";
import { useGlobal } from "../context/Global/GlobalContext";
import { useEffect, useState } from "react";
import TextWarningForm from "./TextWarningForm";
export function FormClientes({ register, errors, watch}) {
  const [codPostal, setCodPostal] = useState(watch("cod_postal") || "");
  const [localidadesByCod, setLocalidadesByCod] = useState([]);
  const { getLocalidades, localidades } = useGlobal();
  useEffect(() => {
    getLocalidades();
  }, []);

  useEffect(() => {
    setLocalidadesByCod(
      localidades.filter((item) => item.cod_postal == codPostal)
    );
  }, [codPostal]);
  const handleCodPostalChange = (e) => {
    if (e.target.value.length == 4) setCodPostal(e.target.value);
  };
  const formattedCuit = (e) => {
    const input = e.target;
    const cuit = input.value.replace(/-/g, ""); // Elimina guiones existentes
    const format = cuit.replace(/(\d{2})(\d{8})(\d{1})/, "$1-$2-$3"); // Formatea el CUIT
    input.value = format;
  };
  const formattedTel = (e) => {
    let format;
    const input = e.target;
    const tel = input.value.replace(/-/g, ""); // Elimina guiones existentes
    if (input.value.startsWith("11")) {
      format = tel.replace(/(\d{2})(\d{4})(\d{3})/, "$1-$2-$3"); // Formatea el TELEFONO
    } else {
      format = tel.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"); // Formatea el TELEFONO
    }
    input.value = format;
  }
  return (
    <Form>
      <Row className="g-2">
        <Form.Group as={Col} sm={3}>
          <Form.Label>Id <span className="form-text text-danger">*</span></Form.Label>
          <Form.Control
            type="number"
            placeholder="Codigo"
            {...register("id", {
              required: true,
            })}
          />
        </Form.Group>
        <Form.Group as={Col} sm={9}>
          <Form.Label>Razón Social <span className="form-text text-danger">*</span></Form.Label>
          <Form.Control
            type="text"
            placeholder="Razón Social"
            {...register("razon_social", {
              required: true,
            })}
          />
        </Form.Group>
        <Form.Group as={Col} sm={6}>
          <Form.Label>CUIT <span className="form-text text-danger">*</span></Form.Label>
          <Form.Control
            type="text"
            placeholder="CUIT"
            {...register("cuit", {
              required: true,
              maxLength: {
                value: 13,
                message: "El número de teléfono debe tener 11 dígitos.",
              },
              minLength: {
                value: 13,
                message: "El número de teléfono debe tener 11 dígitos.",
              },
            })}
            onInput={formattedCuit}
          />
          {errors.cuit && <TextWarningForm message={errors.cuit.message} />}
        </Form.Group>
        <Form.Group as={Col} sm={3}>
          <Form.Label>Retención <span className="form-text text-danger">*</span></Form.Label>
          <Form.Select
            {...register("retencion", {
              required: true,
            })}
          >
            <option value=""></option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} sm={3}>
          <Form.Label>Cód. postal <span className="form-text text-danger">*</span></Form.Label>
          <Form.Control
            type="number"
            placeholder="Cód. Postal"
            {...register("cod_postal", {
              required: true,
            })}
            onChange={handleCodPostalChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Localidad <span className="form-text text-danger">*</span></Form.Label>
          <Form.Select
            {...register("localidad", {
              required: true,
            })}
          >
            <option value=""></option>
            {localidadesByCod.map((item, index) => (
              <option key={`${item.localidad}-${index}`} value={item.localidad}>
                {item.localidad}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Provincia <span className="form-text text-danger">*</span></Form.Label>
          <Form.Select
            {...register("provincia", {
              required: true,
            })}
          >
            <option value=""></option>
            {localidadesByCod.map((item, index) => (
              <option key={`${item.provincia}-${index}`} value={item.provincia}>
                {item.provincia}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Dirección <span className="form-text text-danger">*</span></Form.Label>
          <Form.Control
            type="text"
            placeholder="República de Entre Rí­os 1880"
            {...register("direccion", {
              required: true,
            })}
          />
        </Form.Group>
        <Form.Group as={Col} sm={5}>
          <Form.Label>Telefono <span className="form-text text-danger">*</span></Form.Label>
          <Form.Control
            type="text"
            placeholder="Telefono"
            {...register("telefono", {
              required: true,
              maxLength: {
                value: 12,
                message: "El número de teléfono debe tener 10 dígitos.",
              },
              minLength: {
                value: 12,
                message: "El número de teléfono debe tener 10 dígitos.",
              },
            })}
            onInput={formattedTel}
          />
          {errors.tel && <TextWarningForm message={errors.tel.message} />}
        </Form.Group>
        <Form.Group as={Col} sm={7}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            {...register("email")}
          />
        </Form.Group>
      </Row>
      {errors && Object.values(errors).some(error => error.type === 'required') && <TextWarningForm message="Los campos con ( * ) son requeridos" />
      }
    </Form>
  );
}
