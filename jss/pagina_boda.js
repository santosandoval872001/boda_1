const musica = document.getElementById("musica");
const boton = document.getElementById("btnMusica");
const notas = document.getElementById("notas");

let reproduciendo = false;
let intervalo;

boton.onclick = () => {
  if (!reproduciendo) {
    musica.play();
    boton.innerHTML = '<i class="bi bi-music-note-beamed"></i>';

    reproduciendo = true;

    intervalo = setInterval(crearNota, 300);
  } else {
    musica.pause();
    boton.innerHTML = '<i class="bi bi-music-note-beamed"></i>';

    reproduciendo = false;

    clearInterval(intervalo);
  }
};

function crearNota() {
  const nota = document.createElement("span");

  const simbolos = ["♪", "♫", "♬", "♩"];

  nota.innerHTML = simbolos[Math.floor(Math.random() * simbolos.length)];

  nota.className = "nota";

  nota.style.setProperty("--x", Math.random() * 80 - 40 + "px");

  notas.appendChild(nota);

  setTimeout(() => {
    nota.remove();
  }, 2000);
}

const llevaSi = document.getElementById("llevaSi");
const llevaNo = document.getElementById("llevaNo");
const contenedor = document.getElementById("contenedorAcompanante");

llevaSi.addEventListener("change", () => {
  contenedor.style.display = "block";
});

llevaNo.addEventListener("change", () => {
  contenedor.style.display = "none";
});

async function enviar() {
  const nombre = document.getElementById("nombre").value.trim();

  const asistencia = document.querySelector('input[name="asistencia"]:checked');

  const lleva = document.querySelector('input[name="lleva"]:checked');

  const nombreAcompanante = document
    .getElementById("nombreAcompanante")
    .value.trim();

  if (nombre == "") {
    Swal.fire({
      icon: "warning",
      title: "Falta tu nombre",
      text: "Escribe tu nombre.",
    });

    return;
  }

  if (!asistencia) {
    Swal.fire({
      icon: "warning",
      title: "Selecciona una opción",
      text: "¿Asistirás a la boda?",
    });

    return;
  }

  if (!lleva) {
    Swal.fire({
      icon: "warning",
      title: "Selecciona una opción",
      text: "¿Llevarás acompañante?",
    });

    return;
  }

  if (lleva.value == "Si" && nombreAcompanante == "") {
    Swal.fire({
      icon: "warning",
      title: "Falta el acompañante",
      text: "Escribe el nombre del acompañante.",
    });

    return;
  }

  const boton = document.getElementById("btnEnviar");

  boton.disabled = true;

  boton.innerHTML = `
    <span class="spinner-border spinner-border-sm"></span>
    Enviando...
    `;

  const datos = {
    nombre: nombre,

    asistencia: asistencia.value,

    acompanante: lleva.value,

    nombreAcompanante: nombreAcompanante,
  };

  try {
    const respuesta = await fetch(
      "https://script.google.com/macros/s/AKfycbxAg5418Bsmh-JYTXMjL8eJoW1OV4SsUhqupeSybwYNscDOwh_HCQyJQ5aauKDoHVOB/exec",
      {
        method: "POST",
        body: JSON.stringify(datos),
      },
    );

    console.log(respuesta.status);
    console.log(await respuesta.text());

    Swal.fire({
      imageUrl: "img/anillos.jpg", // tu imagen
      imageWidth: 90,
      imageHeight: 90,
      title: "¡Gracias por confirmar!",
      html: `
                Tu asistencia ha sido registrada correctamente.
                <br><br>
                <strong>Nos sentimos muy felices de compartir este momento contigo.</strong>
            `,
      background: "#fff",
      color: "#222",
      confirmButtonText: "Nos vemos en la boda",
      confirmButtonColor: "#000",
    });
  } catch (error) {
    console.error("ERROR:", error);

    Swal.fire({
      icon: "error",
      title: "Error",
      text: error,
    });
  }

  boton.disabled = false;

  boton.innerHTML = "Confirmar asistencia";
}

function romperSello() {
  const sello = document.querySelector(".sello");

  const centro = sello.getBoundingClientRect();

  for (let i = 0; i < 35; i++) {
    const p = document.createElement("div");

    p.className = "fragmento";

    const tam = 6 + Math.random() * 14;

    p.style.width = tam + "px";
    p.style.height = tam + "px";

    p.style.left = centro.width / 2 - tam / 2 + "px";
    p.style.top = centro.height / 2 - tam / 2 + "px";

    sello.appendChild(p);

    const angulo = Math.random() * Math.PI * 2;

    const fuerza = 80 + Math.random() * 120;

    const vx = Math.cos(angulo) * fuerza;
    const vy = Math.sin(angulo) * fuerza;

    const rotacion = Math.random() * 900 - 450;

    p.animate(
      [
        {
          transform: "translate(0px,0px) rotate(0deg)",
          opacity: 1,
        },

        {
          transform: `translate(${vx}px,${vy + 120}px) rotate(${rotacion}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: 1200 + Math.random() * 600,

        easing: "cubic-bezier(.2,.7,.2,1)",

        fill: "forwards",
      },
    );
  }

  document.querySelector(".centro").style.opacity = "0";
}

function abrirInvitacion() {
  const sello = document.querySelector(".sello");

  sello.classList.add("romper");

  romperSello();

  setTimeout(() => {
    document.querySelector(".tapa").style.transform = "rotateX(180deg)";
  }, 500);

  setTimeout(() => {
    document.querySelector(".carta").style.transform = "translateY(-220px)";
  }, 1200);

  setTimeout(() => {
    document.getElementById("pantallaSobre").style.opacity = "0";
  }, 2500);

  setTimeout(() => {
    document.getElementById("pantallaSobre").style.display = "none";

    document.getElementById("contenidoInvitacion").style.display = "block";
  }, 3000);
}
