const  axios  = require("axios");
import Swal from 'sweetalert2'
const tareas = document.querySelector('.listado-pendientes')
import { actualizarAvance } from '../funciones/avance'
if(tareas){
    tareas.addEventListener('click', e=>{
        if(e.target.classList.contains('fa-check-circle')){
            const icono = e.target
            const idTarea = icono.parentElement.parentElement.dataset.tarea;
            const url = `${location.origin}/tareas/${idTarea}`

            axios.patch(url, { idTarea })
                .then(function(response) {
                    if(response.status === 200){
                        icono.classList.toggle('completo');

                        actualizarAvance()
                    }
                })
        }
        if(e.target.classList.contains('fa-trash')){
            // console.log(e.target)
            const tareaHtml = e.target.parentElement.parentElement
            const idTarea = tareaHtml.dataset.tarea
            Swal.fire({
                title: '¿Deseas eliminar esta Tarea?',
                text: "No podrás deshacer el cambio!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrar'
            }).then((result) => {
                if (result.isConfirmed){
                    // console.log('eliminando...')
                    const url = `${location.origin}/tareas/${idTarea}`
                    axios.delete(url, { params: { idTarea }})
                        .then(response => {
                            
                            if(response.status === 200){
                                // console.log(response)
                                tareaHtml.parentElement.removeChild(tareaHtml)
                                Swal.fire(
                                    'Tarea Eliminada',
                                    response.data,
                                    'success'
                                )
                                actualizarAvance()
                            }
                        })
                }
            })
            // console.log(idTarea)
        }
    })
}