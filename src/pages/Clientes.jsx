import { Form, Col, Row, Button } from "react-bootstrap";
import TableComponent from "../components/TableComponent";
import { useGlobal } from "../context/Global/GlobalContext";
import { useEffect, useState } from "react";
import IconClientes from "../assets/icons-cliente/directory.png";
import { MainTitle } from "../components/Titles";
import { set, useForm } from "react-hook-form";
import { normalizeString } from "../utils/functions";
import { ModalComponent } from "../components/ModalComponent";
import { FormClientes } from "../components/Forms";
import LoadingIcon from "../components/LoaderIcon";
export default function Clientes() {
  const {
    clientes,
    getClientes,
    handleModalShow,
    handleModalClose,
    createCliente,
    updateCliente,
  } = useGlobal([]);
  const [filterData, setFilterData] = useState([]);
  useEffect(() => {
    getClientes();
    setFilterData(clientes);
  }, []);
  useEffect(() => {
    setFilterData(clientes);
  }, [clientes]);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    watch
  } = useForm();
  const handleFilter = (e) => {
    e.preventDefault();
    const data = getValues();
    setFilterData(
      clientes.filter((item) => {
        const filter =
          item.id.toString().includes(data.id_filter) &&
          normalizeString(item.razon_social).includes(
            normalizeString(data.razon_social_filter)
          ) &&
          normalizeString(item.cuit).includes(
            normalizeString(data.cuit_filter)
          ) &&
          normalizeString(item.localidad_filter).includes(
            normalizeString(data.localidad_filter)
          );
        return filter;
      })
    );
  };
  const onSubmit = async (data) => {
    console.log('Creando cliente...');
    const { status } = await createCliente(data);
    if (status === 200) {
      console.log("Cliente creado correctamente");
      handleModalClose();
    }
    else {
      console.log('Error al crear cliente');
    }
  };
  const onUpdate = async (data) => {
    console.log('Actualizando cliente...');
    const res = await updateCliente(data);
    console.log(res)
    /* if (status === 200) {
      console.log("Cliente actualizado correctamente");
      handleModalClose();
    }
    else {
      console.log('Error al actualizar cliente');
    } */
  }
  const columns = [
    {
      name: "Id",
      width: "80px",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Razón Social",
      selector: (row) => row.razon_social,
      sortable: true,
    },
    {
      name: "CUIT",
      width: "150px",
      selector: (row) => row.cuit,
      sortable: true,
    },
    {
      name: "Teléfono",
      width: "150px",
      selector: (row) => row.telefono,
      sortable: true,
    },
    {
      name: "Localidad",
      width: "200px",
      selector: (row) => row.localidad,
      sortable: true,
    },
  ];
  const openCardClient = (data) =>{
    handleModalShow('editClientModal')
    Object.keys(data).map((key) => {
      setValue(key, data[key])
    })
    setTimeout(() => {
      setValue('localidad', data.localidad)
      setValue('provincia', data.provincia)
    }, 800);
  }
  return (
    <div className="mt-5 text-center">
      <MainTitle title="Listado de Clientes" urlIcon={IconClientes} />
      <Form>
        <Row className="my-3 g-1">
          <Form.Group as={Col} sm={2}>
            <Form.Control
              type="number"
              placeholder="Id del Cliente"
              {...register("id_filter")}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Control
              type="search"
              placeholder="Razón social"
              {...register("razon_social_filter")}
            />
          </Form.Group>
          <Form.Group as={Col} sm={2}>
            <Form.Control
              type="text"
              placeholder="CUIT"
              {...register("cuit_filter")}
            />
          </Form.Group>
          <Form.Group as={Col} sm={3}>
            <Form.Control
              type="text"
              placeholder="Localidad"
              {...register("localidad_filter")}
            />
          </Form.Group>
          <Col sm="auto">
            <Button variant="primary" type="submit" onClick={handleFilter}>
              Filtrar
            </Button>
          </Col>
          <Col sm="auto">
            <Button variant="success" type="button" onClick={() => handleModalShow('addClientModal')}>
              Agregar
            </Button>
          </Col>
        </Row>
      </Form>
      <TableComponent columns={columns} data={filterData} handleClickOnRow={openCardClient}/>
      <ModalComponent
        modalId='addClientModal'
        title="Agregar cliente"
        body={<FormClientes register={register} errors={errors} />}
        nameButton={"Guardar"}
        handleOnClick={handleSubmit(onSubmit)}
      />
      <ModalComponent
        modalId='editClientModal'
        title="Editar cliente"
        body={<FormClientes register={register} errors={errors} watch={watch} />}
        nameButton={"Actualizar"}
        handleOnClick={handleSubmit(onUpdate)}
      />
    </div>
  );
}
