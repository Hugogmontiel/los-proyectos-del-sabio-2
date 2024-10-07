document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('miFormulario');
    const inputs = form.querySelectorAll('input');
    const selectTipoVia = document.getElementById('tipoVia');
    const buttonEnviar = document.getElementById('enviar');
    
    
    const patterns = {
        nombre: /^[A-ZÑÁÉÍÓÚ\s]+$/, 
        apellido: /^[A-ZÑÁÉÍÓÚ\s]+$/, 
        direccion: /^[A-ZÑÁÉÍÓÚ\s0-9]+$/, 
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
        telefono: /^[0-9]{9}$/, 
        edad: /^(?:[1-9][0-9]?|1[01][0-9]|120)$/, 
        dni: /^[0-9]{8}[A-Z]$/ 
    };

    
    function validarCampo(input, pattern, mensajeError) {
        let valor = input.value.trim();
    
        if (!input.value.match(pattern)) {
            input.classList.remove('valid');
            input.classList.add('error');
            input.setAttribute('placeholder', mensajeError);
            input.style.backgroundColor = "#fdd"; 
        } else {
            input.classList.remove('error');
            input.classList.add('valid');
            input.style.backgroundColor = "#dfd"; 
        }

        
        verificarFormulario();
    }

    
    function validarSelect() {
        if (selectTipoVia.value === "") {
            selectTipoVia.style.backgroundColor = "#fdd"; 
        } else {
            selectTipoVia.style.backgroundColor = "#dfd"; 
        }

        verificarFormulario();
    }

    
    function verificarFormulario() {
        let esValido = true;
        inputs.forEach(input => {
            
            if (input.classList.contains('error') || input.value === "") {
                esValido = false;
            }
        });

        
        if (selectTipoVia.value === "") {
            esValido = false;
        }

        if(!esValido) {
            buttonEnviar.disabled;
            buttonEnviar.style.backgroundColor = '#cccccc'
        }
        else {
            buttonEnviar.disabled = false;
            buttonEnviar.style.backgroundColor = '#5cb85c'
        }
 
    }

    
    inputs.forEach(input => {
        
        input.addEventListener('input', () => {
            input.style.backgroundColor = '#fff'; 
        });

       
        input.addEventListener('blur', () => {
            if (input.id === 'nombre') {
                validarCampo(input, patterns.nombre, "Nombre en mayúsculas");
            } else if (input.id === 'apellido') {
                validarCampo(input, patterns.apellido, "Apellido en mayúsculas");
            } else if (input.id === 'direccion') {
                validarCampo(input, patterns.direccion, "Dirección en mayúsculas");
            } else if (input.id === 'email') {
                validarCampo(input, patterns.email, "Formato de email inválido");
            } else if (input.id === 'telefono') {
                validarCampo(input, patterns.telefono, "Debe tener 9 dígitos");
            } else if (input.id === 'edad') {
                validarCampo(input, patterns.edad, "Edad entre 1 y 120");
            } else if (input.id === 'dni') {
                validarCampo(input, patterns.dni, "Formato de DNI inválido");
            }
        });
    });

    
    selectTipoVia.addEventListener('change', validarSelect);

    
    buttonEnviar.disabled = true;
    buttonEnviar.style.backgroundColor = "#cccccc";
});
