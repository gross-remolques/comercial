import { Modal, Button} from "react-bootstrap";
import { useGlobal } from "../context/Global/GlobalContext";
export function ModalComponent({
  title,
  body,
  nameButton,
  handleOnClick,
  modalId
}) {
  const { modalShow, handleModalClose, activeModal} = useGlobal();
  return (
    <Modal
      show={activeModal === modalId}
      onHide={handleModalClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body id="bodyModal">
        {body}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleOnClick}>
          {nameButton}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}