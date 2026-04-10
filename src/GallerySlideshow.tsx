import { useState, useEffect } from 'react'
 
// Imagens otimizadas (Unsplash serve WebP automaticamente)
const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=800&q=80&auto=format',
    alt: 'Pratos de mariscos frescos',
    title: 'Mariscos Frescos',
    description: 'Sabores do mar atlântico'
  },
  {
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80&auto=format',
    alt: 'Interior elegante do restaurante',
    title: 'Ambiente Sofisticado',
    description: 'Decoração moderna e acolhedora'
  },
  {
    src: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80&auto=format',
    alt: 'Picanha premium grelhada',
    title: 'Carnes Premium',
    description: 'Seleção das melhores carnes'
  },
  {
    src: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80&auto=format',
    alt: 'Risotto especial do chef',
    title: 'Especialidades',
    description: 'Receitas exclusivas do chef'
  },
  {
    src: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=800&q=80&auto=format',
    alt: 'Frutos do mar',
    title: 'Experiência Gastronómica',
    description: 'Uma viagem de sabores'
  }
]

export default function GallerySlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
        setIsTransitioning(false)
      }, 500)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex(index)
      setIsTransitioning(false)
    }, 300)
  }

  return (
    <section id="galeria" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-amber-500 uppercase tracking-[0.3em] text-sm mb-4">Galeria</p>
          <h2 className="font-['Playfair_Display',serif] text-4xl md:text-5xl font-medium">
            Momentos <span className="italic text-amber-500">Especiais</span>
          </h2>
        </div>

        {/* Main Slideshow */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden shadow-2xl">
          {/* Images */}
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentIndex 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-105'
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Caption */}
              <div className={`absolute bottom-0 left-0 right-0 p-6 md:p-10 transition-all duration-500 ${
                index === currentIndex && !isTransitioning 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
              }`}>
                <h3 className="font-['Playfair_Display',serif] text-2xl md:text-4xl text-white mb-2">
                  {image.title}
                </h3>
                <p className="text-white/70 text-sm md:text-base">
                  {image.description}
                </p>
              </div>
            </div>
          ))}

          {/* Navigation Dots */}
          <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-10">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex 
                    ? 'w-8 md:w-10 h-2 md:h-2.5 bg-amber-500' 
                    : 'w-2 md:w-2.5 h-2 md:h-2.5 bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Side Navigation Arrows - Desktop */}
          <button
            onClick={() => goToSlide((currentIndex - 1 + galleryImages.length) % galleryImages.length)}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 items-center justify-center transition-all duration-300 z-10"
            aria-label="Imagem anterior"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => goToSlide((currentIndex + 1) % galleryImages.length)}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 items-center justify-center transition-all duration-300 z-10"
            aria-label="Próxima imagem"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Thumbnail Strip - Mobile Friendly */}
        <div className="mt-6 grid grid-cols-5 gap-2 md:gap-4">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative aspect-[4/3] rounded-lg overflow-hidden transition-all duration-300 ${
                index === currentIndex 
                  ? 'ring-2 md:ring-4 ring-amber-500 scale-100' 
                  : 'ring-1 ring-white/10 hover:ring-white/30 opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-black transition-opacity ${
                index === currentIndex ? 'opacity-0' : 'opacity-30'
              }`} />
            </button>
          ))}
        </div>

        {/* Counter */}
        <div className="flex justify-center mt-6">
          <p className="text-white/40 text-sm">
            <span className="text-amber-500 font-medium">{currentIndex + 1}</span> / {galleryImages.length}
          </p>
        </div>
      </div>
    </section>
  )
}
