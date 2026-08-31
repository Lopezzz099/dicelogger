export type CampaignTemplate = {
  campaign_id: number
  name: string
  description: string
  image: string
  images: string[]
  pro: boolean
}

export const campaignTemplates: CampaignTemplate[] = [
  {
    campaign_id: 1,
    name: "Las Ruinas Perdidas de Eärendil",
    description: 'En "Las Ruinas Perdidas de Eärendil", los aventureros se embarcarán en una búsqueda épica para descubrir los secretos ocultos en una antigua ciudad abandonada. En medio de ruinas ancestrales y peligros olvidados, los jugadores enfrentarán desafíos mortales, resolverán enigmas ancestrales y descubrirán artefactos mágicos perdidos en el tiempo. ¿Tendrán el coraje y la astucia para desentrañar los misterios de Eärendil y reclamar su legado perdido? La aventura aguarda en cada esquina, ¡prepárate para adentrarte en lo desconocido!',
    image: "https://dicelogger-images.s3.sa-east-1.amazonaws.com/ruinasMain.webp",
    images: ["https://dicelogger-images.s3.sa-east-1.amazonaws.com/ruinas1.webp", "https://dicelogger-images.s3.sa-east-1.amazonaws.com/ruinas2.webp", "https://dicelogger-images.s3.sa-east-1.amazonaws.com/ruinas3.webp"],
    pro: true
  },
  {
    campaign_id: 2,
    name: "El Reino de las Sombras",
    description: ' En "El Reino de las Sombras", los héroes se enfrentarán a una oscuridad creciente que amenaza con engullir el mundo. Una misteriosa secta ha despertado a antiguas criaturas de las sombras, desatando el caos y el terror en el reino. Los aventureros deberán adentrarse en tierras olvidadas, explorar ruinas ancestrales y enfrentarse a horrores indescriptibles mientras buscan una manera de detener la invasión de las sombras. ¿Serán capaces de enfrentarse a la oscuridad y restaurar la luz en este reino asediado por la noche eterna? La batalla por la supervivencia está a punto de comenzar, ¡únete a la lucha y forja tu leyenda en "El Reino de las Sombras"!',
    image: "https://dicelogger-images.s3.sa-east-1.amazonaws.com/sombrasMain.webp",
    images: ["https://dicelogger-images.s3.sa-east-1.amazonaws.com/sombras1.webp", "https://dicelogger-images.s3.sa-east-1.amazonaws.com/sombras2.webp", "https://dicelogger-images.s3.sa-east-1.amazonaws.com/sombras3.webp"],
    pro: false
  },

]