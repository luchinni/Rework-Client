import React from 'react'
import CardsOffer from '../CardsOffer/CardsOffer'

const Home = () => {

  const offer: {remuneration: number[], description: string, work_duration_time: string, photo: string, tags: string[], title: string} = {
    remuneration: [100, 150],
    description: "necesito que me hagan el front end de mi vida",
    work_duration_time: "1 semana",
    photo: "https://www.xtrafondos.com/wallpapers/resized/paisaje-digital-en-atardecer-5846.jpg?s=large",
    tags: ["front end developer", "design", "full stack", "css", "javaScript"],
    title: "Página de paisajes (solo front)"
  }

  const client: {name: string, photo: string, rating: number} = {
    name: "Jason",
    photo: "https://www.movilzona.es/app/uploads-movilzona.es/2019/07/Foto-de-Perfil-en-WhatsApp-650x340.jpg",
    rating: 3.7
  }
  

  return (
    <div>
      <span>esto es home!</span>
      <CardsOffer/>
    </div>
  )
}

export default Home