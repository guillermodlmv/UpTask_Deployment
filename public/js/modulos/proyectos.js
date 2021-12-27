import Swal from 'sweetalert2'
import axios from 'axios'

const btnEliminar = document.querySelector('#eliminar-proyecto');

if(btnEliminar) {
    btnEliminar.addEventListener('click', e => {
        const urlProyecto = e.target.dataset.proyectoUrl
        // console.log(urlProyecto)

    Swal.fire({
            title: '¿Deseas eliminar este proyecto?',
            text: "No podrás deshacer el cambio!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar'
        }).then((result) => {
            if (result.isConfirmed) {
                //Enviar peticion a axios

                const url = `${location.origin}/proyectos/${urlProyecto}`
                axios.delete(url, {params: {urlProyecto}})
                    .then(function (response) {
                        // console.log(response)
                        Swal.fire(
                            'Proyecto Eliminado!',
                            response.data,
                            'success'
                        )
                        setTimeout(() => {
                            window.location.href='/'
                        }, 2000);
                    })
                    .catch(()=> Swal.fire({
                        type: 'error',
                        title: 'hubo un error',
                        text: 'No se pudo eliminar el proyecto'
                    }))
            }
        })
})
}
