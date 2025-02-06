import { useEffect, useState } from "react"
import { IUsuario } from "../interfaces/IUsuario"
import { appsettings } from "../settings/appsettings";
import Swal from "sweetalert2";
import { Button, Col, Container, Row, Table } from "reactstrap";

export function ListaUsuarios() {
    const [usuarios, setUsuarios] = useState<IUsuario[]>([]);

    const ObtenerUsuarios = async () => {
        const response = await fetch(`${appsettings.urlApi}`)
        if (response.ok) {
            const data = await response.json();
            //console.table(data.results);
            setUsuarios(data.results);
        }
    }

    useEffect(() => {
        ObtenerUsuarios()
    }, [])

    const EliminarUsuario = (idUsuario: number) => {
        Swal.fire({
            title: "Mensaje",
            text: "Estas seguro de eliminar al usuario?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar.."
        }).then(async (result) => {
            if (result.isConfirmed) {
                setUsuarios((usuarioPrev) => usuarioPrev.filter((user, index) => index + 1 !== idUsuario));
                Swal.fire({
                    title: "Operacion Completada!",
                    text: "El Usuario ha sido eliminado",
                    icon: "success"
                });
            }
        });
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col sm={{ size: 8, offset: 2 }}>
                    <h4>Lista de Usuarios</h4>
                    <hr />
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Imagen</th>
                                <th>Nombre Completo</th>
                                <th>Email</th>
                                <th>Pais</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.length > 0 ? (
                                usuarios.map((usuario, index) => (
                                    <tr key={index + 1}>
                                        <td>{index + 1}</td>
                                        <td><img src={usuario.picture.thumbnail} alt="Perfil" /></td>
                                        <td>{usuario.name.first + " " + usuario.name.last}</td>
                                        <td>{usuario.email}</td>
                                        <td>{usuario.location.country}</td>
                                        <td>
                                            <Button color="danger" onClick={() => { EliminarUsuario(index + 1) }}>
                                                Eliminar
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5}>No hay usuarios disponibles</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}