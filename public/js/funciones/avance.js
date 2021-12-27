import Swal from "sweetalert2"
export const actualizarAvance = () => {
    // Seleccionar tareas existentes
    const tareas = document.querySelectorAll('li.tarea')

    if(tareas.length){
        //seleccionar tareas completas
        const tareasCompletas = document.querySelectorAll('i.completo')

        //Calcular avance
        const avance = Math.round((tareasCompletas.length / tareas.length) * 100)

        //mostrar avance
        const porcentaje = document.querySelector('#porcentaje');
        porcentaje.style.width = avance+'%'

        if(avance == 100){
            Swal.fire(
                'Completaste el proyecto',
                'Felicidades has terminado tus tareas',
                'success'
            )

        }
    }
}