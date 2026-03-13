// Función para comenzar el test
function startTest() {
    // Ocultamos la pantalla de bienvenida
    document.getElementById('welcome-screen').style.display = 'none';
    
    // Mostramos la pantalla del cuestionario
    document.getElementById('quiz-screen').style.display = 'block';
}

// Lógica para procesar el cuestionario y asignar puntuación a las ramas de estudio
function submitQuiz() {
    // Inicializamos las puntuaciones para cada rama
    let points = {
        ingenieria: 0,
        salud: 0,
        arte: 0,
        negocios: 0,
        otras: 0
    };

    // Tomamos todas las respuestas del cuestionario
    const answers = document.querySelectorAll('input[type="radio"]:checked');
    
    // Evaluamos cada respuesta y sumamos los puntos correspondientes
    answers.forEach(answer => {
        switch(answer.name) {
            case 'q1':
            case 'q2':
            case 'q3':
                if (answer.value === 'a') points.ingenieria += 2;
                else if (answer.value === 'b') points.arte += 2;
                else if (answer.value === 'c') points.negocios += 2;
                else if (answer.value === 'd') points.salud += 2;
                else points.otras += 1;
                break;
            case 'q4':
            case 'q5':
            case 'q6':
                if (answer.value === 'a') points.ingenieria += 2;
                else if (answer.value === 'b') points.arte += 2;
                else if (answer.value === 'c') points.negocios += 2;
                else if (answer.value === 'd') points.salud += 2;
                else points.otras += 1;
                break;
            case 'q7':
            case 'q8':
            case 'q9':
                if (answer.value === 'a') points.ingenieria += 2;
                else if (answer.value === 'b') points.arte += 2;
                else if (answer.value === 'c') points.negocios += 2;
                else if (answer.value === 'd') points.salud += 2;
                else points.otras += 1;
                break;
            case 'q10':
            case 'q11':
            case 'q12':
                if (answer.value === 'a') points.ingenieria += 2;
                else if (answer.value === 'b') points.arte += 2;
                else if (answer.value === 'c') points.negocios += 2;
                else if (answer.value === 'd') points.salud += 2;
                else points.otras += 1;
                break;
            case 'q13':
            case 'q14':
            case 'q15':
                if (answer.value === 'a') points.ingenieria += 2;
                else if (answer.value === 'b') points.arte += 2;
                else if (answer.value === 'c') points.negocios += 2;
                else if (answer.value === 'd') points.salud += 2;
                else points.otras += 1;
                break;
            default:
                break;
        }
    });

    // Determinamos la rama de estudio con más puntos
    let maxPoints = Math.max(points.ingenieria, points.salud, points.arte, points.negocios, points.otras);
    let recommendedField = "";

    if (maxPoints === points.ingenieria) recommendedField = "Ingeniería o Ciencias";
    else if (maxPoints === points.salud) recommendedField = "Salud o Psicología";
    else if (maxPoints === points.arte) recommendedField = "Arte o Diseño";
    else if (maxPoints === points.negocios) recommendedField = "Negocios o Administración";
    else recommendedField = "Otras opciones";

    // Muestra los resultados
    document.getElementById('result-text').textContent = `Te recomendamos estudiar: ${recommendedField}`;
    
    // Oculta la pantalla del cuestionario y muestra la pantalla de resultados
    document.getElementById('quiz-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
}
