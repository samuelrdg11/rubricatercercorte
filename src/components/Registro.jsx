import React from 'react'
import { db } from '../firebase'
import { useState } from 'react'

const Registro = (props) => {
    const [nombre, setNombre] = React.useState('')
    const [apellido, setApellido] = React.useState('')
    const [descrip, setDescrip] = React.useState('')
    const [ubi, setUbi] = React.useState('')
    const [date,setDate] = React.useState('')
    const [id, setId] = React.useState('')
    const [lista, setLista] = React.useState([])
    const [modoEdicion, setModoEdicion] = React.useState(false)
    const [error, setError] = React.useState(null)
    const categorias = [
        {
            "nombre": "Mantenimiento Inmuebles",
            "tipo": ["Baños", "Cielo Raso", "Eléctrico", "Pared", "Puerta"]
        },
        {
            "nombre": "Mantenimiento Muebles",
            "tipo": ["Aire Acondicionado", "Archivador", "Puesto de trabajo", "Silla"]
        },
        {
            "nombre": "Servicios",
            "tipo": ["Aseo", "Transporte", "Vigilancia"]
        }
    ]
    const [tipos, setTipos] = useState(-1);
    const cargarTipos = function (e) {
        const opcion = e.target.value;

        setTipos(opcion);
    }
    React.useEffect(() => {
        const obtenerDatos = async () => {
            try {

                const data = await db.collection(props.user.email).get()
                const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                console.log(arrayData);
                setLista(arrayData)
            } catch (error) {
                console.log(error);
            }
        }
        obtenerDatos()
    }, [])
    
    const guardarDatos = async (e) => {
        e.preventDefault()
        if (!nombre.trim()) {
            setError('¡No ha seleccionado una categoria!')
            return
        }
        if (!apellido.trim()) {
            setError('¡No ha seleccionado un tipo de servicio!')
            return
        }
        if (!date.trim()) {
            setError('¡Seleccione la fecha del requerimiento!')
            return
        }
        if (!descrip.trim()) {
            setError('¡El campo descripción está vacio!')
            return
        }
        if (!ubi.trim()) {
            setError('¡El campo ubicación está vacio!')
            return
        }
        try {

            const nuevousuario = {
                nombre, apellido, descrip, ubi, date
            }
            const dato = await db.collection(props.user.email).add(nuevousuario)
            setLista([
                ...lista,
                { ...nuevousuario, id: dato.id }
            ])

        } catch (error) {
            console.log(error);
        }
        setNombre('')
        setApellido('')
        setDescrip('')
        setUbi('')
        setDate('')
        setError(null)
    }
    const eliminarDato = async (id) => {
        try {

            await db.collection(props.user.email).doc(id).delete()
            const listaFiltrada = lista.filter((elemento) => elemento.id !== id)
            setLista(listaFiltrada)
        }
        catch (error) {
            console.log(error);
        }
    }


    const editar = (elemento) => {
        setModoEdicion(true)
        setNombre(elemento.nombre)
        setApellido(elemento.apellido)
        setDescrip(elemento.descrip)
        setUbi(elemento.ubi)
        setDate(elemento.date)
        setId(elemento.id)
    }

    const editarDatos = async (e) => {
        e.preventDefault()
        if (!nombre.trim()) {
            setError('¡No ha seleccionado una categoria!')
            return
        }
        if (!apellido.trim()) {
            setError('¡No ha seleccionado un tipo de servicio!')
            return
        }
        if (!date.trim()) {
            setError('¡Seleccione la fecha del requerimiento!')
            return
        }
        if (!descrip.trim()) {
            setError('¡El campo descripción está vacio!')
            return
        }
        if (!ubi.trim()) {
            setError('¡El campo ubicación está vacio!')
            return
        }
      
        try {

            await db.collection(props.user.email).doc(id).update({
                nombre, apellido, descrip, ubi, date
            })

            const listaEditada = lista.map(
                (elemento) => elemento.id === id ? { id: id, nombre: nombre, apellido: apellido, descrip: descrip, ubi: ubi, date: date} :
                    elemento)

            setLista(listaEditada)
            setModoEdicion(false)
            setNombre('')
            setApellido('')
            setDescrip('')
            setUbi('')
            setDate('')
            setId('')
            setError(null)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="container">
            <br />
            <h5 className="text-center">{
                modoEdicion ? 'EDITAR REQUERIMIENTOS' : 'REGISTRO DE REQUERIMIENTOS'
            }</h5>
            { }
            <div className="row">
                <div className="col-12">
                    <form onSubmit={modoEdicion ? editarDatos : guardarDatos}>
                        { }
                        {
                            error ? (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            ) :
                                null
                        }
                        { }
                        <br />
                        <div className='row'>
                            <div className='col-4'>
                            <h6 className='text-primary'> Categorias</h6>
                                
                                <select className='form-select form-control mb-3' name="categorias" id="selCategorias" onClick={cargarTipos}
                                    onChange={(e) => { setNombre(e.target.value) }}
                                    value={nombre}>
                                    <option value={-1}>Selecciona la categoria</option>
                                    {
                                        categorias.map((elemento, i) => (
                                            <option value={i}>{elemento.nombre}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='col-4'>
                            <h6 className='text-primary'> Tipo de servicio</h6>
                                
                                <select className='form-select form-control mb-3' name="tipos" id="selTipos"
                                    onChange={(e) => { setApellido(e.target.value) }}
                                    value={apellido}>
                                    <option value={-1}>Selecciona el tipo de servicio</option>
                                    {
                                        tipos > -1 &&
                                        (
                                            categorias[tipos].tipo.map((elemento, i) => (
                                                <option>{elemento}</option>
                                            ))
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                       
                        <div className='col-5'>
                            <h6 className='text-primary'>Fecha de solicitud</h6>
                        <input type="date" name="mifecha"
                          onChange={(e) => { setDate(e.target.value) }}
                          value={date}></input>
                        </div>
                        <br />

                        <h6 className='text-primary'>Descripción de la solicitud</h6>
                        <textarea className='form-control'
                            onChange={(e) => { setDescrip(e.target.value) }}
                            value={descrip}
                        ></textarea>

                        <h6 className='text-primary'>Ubicación dentro de la empresa</h6>
                        <textarea className='form-control'
                            onChange={(e) => { setUbi(e.target.value) }}
                            value={ubi}
                        ></textarea>

                        <hr />


                        <div className="d-grid gap-2">
                            {
                                modoEdicion ? <button className="btn btn-outline-warning mb-3" type="submit">Editar</button>
                                    : <button className="btn btn-outline-info mb-3" type="submit">Agregar</button>
                            }
                        </div>
                    </form>
                </div>
            </div>
            { }
            <hr />
            <div className="row">
                <div className="col-12">
                    <h5 className="text-center">LISTA DE REQUERIMIENTOS</h5>
                    <ul className="list-group">
                        {
                            lista.length === 0 ? <li className="list-group-item list-group-item-info">No existen requerimientos</li> :
                                (
                                    lista.map((elemento) => (
                                        <li className="list-group-item list-group-item-info" key={elemento.id}><span className="lead">
                                        {elemento.date} / {elemento.nombre} / {elemento.apellido} / {elemento.descrip} / {elemento.ubi} 
                                        </span>
                                            <button className="btn btn-success btn-sm mx-2 float-end"
                                                onClick={() => editar(elemento)}
                                            >Editar</button>
                                            <button className="btn btn-danger btn-sm mx-2 float-end"
                                                onClick={() => eliminarDato(elemento.id)}
                                            >Eliminar</button>
                                           
                                        </li>
                                    ))
                                )
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Registro
