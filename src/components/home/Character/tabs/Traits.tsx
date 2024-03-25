import React from "react";
import TraitsList from "./components/Traits/TraitsList";

export interface Trait {
  name: string;
  description: string;
}

export interface TraitGroup {
  title: string;
  subtitle: string;
  characterTraits: Trait[];
}

const traits: TraitGroup[] = [
  {
    title: "Rasgos de raza",
    subtitle: "Alto Elfo",
    characterTraits: [
      {
        name: "Visión en la Oscuridad",
        description:
          "Acostumbrados a los bosques iluminados por el crepúsculo y el cielo nocturno, tienen una visión superior en la oscuridad y la luz tenue. Puedes ver en luz tenue hasta los 60 pies (18 m) como si fuera a plena luz, y en la oscuridad como si fuera en luz tenue. No puedes distinguir colores en la oscuridad, sólo tonos de gris.",
      },
      {
        name: "Ascendencia Feérica",
        description:
          "Tienes ventaja en las tiradas de salvación contra Encantamiento, y no puedes ser dormido mediante la magia.",
      },
      {
        name: "Trance",
        description:
          "Los elfos no necesitan dormir. En lugar de eso, meditan profundamente, permaneciendo semiconscientes durante 4 horas al día. Mientras meditas, puedes soñar en cierta manera; tales sueños son en realidad ejercicios mentales que se han convertido en un reflejo a lo largo de años de práctica. Tras descansar de esta manera, obtienes el mismo beneficio que un humano tras 8 horas de sueño.",
      },
      {
        name: "Trucos",
        description:
          "Conoces un truco de tu elección de la lista de conjuros de mago. La Inteligencia es tu característica de lanzamiento de conjuros con él.",
      },
    ],
  },
  {
    title: "Rasgos de clase",
    subtitle: "Mago nivel 1",
    characterTraits: [
      {
        name: "Lanzamiento de conjuros",
        description:
          "Puedes usar tu inteligencia para lanzar conjuros arcanos. Posees un libro de conjuros el cual recopila todos los conjuros que conoces. Puedes preparar una cantidad de conjuros menor o igual a tu modificador de inteligencia + tu nivel de mago. Para lanzar un conjuro debes gastar un espacio de conjuros.",
      },
      {
        name: "Lanzamiento ritual",
        description:
          "Puedes lanzar un conjuro de mago como un ritual si el conjuro tiene el descriptor ritual y lo tienes en tu libro de conjuros. No necesitas tenerlo preparado.",
      },
      {
        name: "Recuperación arcana",
        description:
          "Has aprendido a recuperar parte de tus energías mágicas gracias al estudio de tu libro de conjuros. Una vez por día, cuando finalizas un descanso corto, puedes elegir qué espacios de conjuros quieres recuperar. Los espacios de conjuros pueden tener un nivel combinado igual a la mitad de tu nivel de mago (redondeando hacia arriba), aunque ninguno de los espacios de conjuros puede ser de nivel 6 o superior.",
      },
    ],
  },
  {
    title: "Libro de conjuros",
    subtitle: "",
    characterTraits: [
      {
        name: "Copiar un conjuro a tu libro",
        description:
          "Los magos pueden añadir conjuros de nivel 1 o superior a su libro si tienen espacios de conjuros disponibles y tiempo para copiarlos. Este proceso implica descifrar y copiar el conjuro, practicarlo para comprenderlo y transcribirlo con su propia anotación, durando 2 horas y requiriendo 50 po por nivel del conjuro.",
      },
      {
        name: "Reemplazar el libro",
        description:
          "Los magos pueden copiar conjuros de su libro a otro libro, siendo más rápido que añadir nuevos conjuros. Requiere solo 1 hora y 10 po por nivel, ya que conocen su propia anotación y cómo lanzar el conjuro. Si pierden su libro, pueden transcribir los conjuros preparados a uno nuevo usando el mismo método.",
      },
    ],
  },
];

const Traits = () => {
  return <TraitsList traits={traits} />;
};

export default Traits;
