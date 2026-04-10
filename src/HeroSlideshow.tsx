import { useState, useEffect, useCallback } from 'react';

// Imagens otimizadas do Unsplash (servem WebP automaticamente)
const slides = [
  {
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80&auto=format',
    title: 'Uma Viagem Gastronómica',
    subtitle: 'Entre o mar e a terra, descobre sabores únicos',
  },
  {
    image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=1920&q=80&auto=format',
    title: 'Marisco Fresco',
    subtitle: 'Do oceano diretamente para a sua mesa',
  },
  {
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=1920&q=80&auto=format',
    title: 'Carnes Selecionadas',
    subtitle: 'Picanha e filetes preparados com mestria',
  },
  {
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80&auto=format',
    title: 'Ambiente Elegante',
    subtitle: 'O cenário perfeito para momentos especiais',
  },
  {
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1920&q=80&auto=format',
    title: 'Terraça com Vista',
    subtitle: 'Desfrute de refeições ao ar livre',
  },
];

interface HeroSlideshowProps {
  WHATSAPP_LINK: string;
  scrollToSection: (sectionId: string) => void;
}

export default function HeroSlideshow({ WHATSAPP_LINK, scrollToSection }: HeroSlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsTransitioning(false), 700);
    }
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsTransitioning(false), 700);
    }
  }, [isTransitioning]);

  const goToSlide = useCallback((index: number) => {
    if (!isTransitioning && index !== currentSlide) {
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 700);
    }
  }, [isTransitioning, currentSlide]);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);

    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <section 
      id="inicio" 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-105'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            loading={index === 0 ? 'eager' : 'lazy'}
          />
          <div className="absolute inset-0 bg-black/35"></div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,240,228,0.94)_0%,rgba(247,240,228,0.86)_28%,rgba(247,240,228,0.34)_54%,rgba(0,0,0,0.22)_100%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_left_center,rgba(255,255,255,0.24),transparent_42%)]"></div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl text-left pt-12 sm:pt-16 md:pt-20">
          <div className="inline-block rounded-[28px] bg-[rgba(248,241,231,0.42)] backdrop-blur-md border border-white/30 shadow-[0_20px_60px_rgba(0,0,0,0.28)] px-5 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10">
            <p className="text-[#6d4c1f] text-sm sm:text-base md:text-lg font-semibold tracking-[0.18em] uppercase mb-4 sm:mb-5">
              Restaurante Marisqueira
            </p>

            <div className="relative min-h-[170px] sm:min-h-[220px] md:min-h-[280px] lg:min-h-[320px] overflow-hidden mb-6 sm:mb-8">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    index === currentSlide
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  <h1 className="font-['Playfair_Display',serif] text-[#17120d] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] leading-[0.95] font-medium max-w-[11ch]">
                    {slide.title}
                  </h1>
                  <p className="mt-4 sm:mt-5 text-[#2b2116] text-lg sm:text-xl md:text-2xl lg:text-[1.75rem] font-light italic leading-relaxed max-w-[20ch]">
                    {slide.subtitle}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-start items-start sm:items-center mt-4">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-reserve-btn group relative bg-[#D4AF37] hover:bg-[#F5D76E] text-black px-8 sm:px-10 py-4 sm:py-5 rounded-sm flex items-center gap-3 transition-all duration-300 text-xs sm:text-sm uppercase tracking-[0.2em] font-bold shadow-[0_8px_30px_rgba(212,175,55,0.35)]"
              >
                <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-sm"></span>
                <svg className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="relative z-10">Reservar Agora</span>
              </a>

              <button
                onClick={() => scrollToSection('menu')}
                className="border border-[#1a1a1a] hover:border-black text-black hover:bg-black/10 px-8 sm:px-10 py-4 sm:py-5 rounded-sm transition-all duration-300 text-xs sm:text-sm uppercase tracking-[0.2em] font-bold backdrop-blur-sm"
              >
                Ver Menu
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center transition-all z-20 group border border-white/20"
        aria-label="Slide anterior"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#F5E6C8] group-hover:text-white group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center transition-all z-20 group border border-white/20"
        aria-label="Próximo slide"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#F5E6C8] group-hover:text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide 
                ? 'w-6 sm:w-8 h-2 bg-gradient-to-r from-[#D4AF37] to-[#F5D76E] rounded-full shadow-lg' 
                : 'w-2 h-2 bg-[#F5E6C8]/40 hover:bg-[#F5E6C8]/70 rounded-full'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4AF37]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
