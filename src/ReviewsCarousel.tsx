import { useState, useEffect, useRef } from 'react'

interface Review {
  name: string
  rating: number
  date: string
  text: string
  color: string
}

// Fotos reais e autênticas para os avatares
const realisticAvatars = [
  'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=150&h=150&fit=crop&crop=faces', // Homem 1
  'https://images.unsplash.com/photo-1531123897727-8f129e1bf32c?w=150&h=150&fit=crop&crop=faces', // Mulher 1
  'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=150&h=150&fit=crop&crop=faces', // Homem 2
  'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop&crop=faces', // Mulher 2
  'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=faces', // Mulher 3
  'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150&h=150&fit=crop&crop=faces', // Homem 3
  'https://images.unsplash.com/photo-1506803682981-6e718a9dd3ee?w=150&h=150&fit=crop&crop=faces', // Mulher 4
  'https://images.unsplash.com/photo-1510706019500-d23a509eecd4?w=150&h=150&fit=crop&crop=faces', // Mulher 5
]

const getAvatarUrl = (name: string) => {
  // Gera um índice consistente baseado no nome para que a foto seja sempre a mesma para a mesma pessoa
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % realisticAvatars.length;
  return realisticAvatars[index];
}

const reviews: Review[] = [
  {
    name: 'Ana Paula Domingos',
    rating: 5,
    date: 'há 2 semanas',
    text: 'Fomos jantar em família e foi uma experiência maravilhosa. Pedimos a lagosta grelhada e a picanha, ambos estavam divinos. O atendimento foi impecável e o ambiente muito agradável. Voltaremos com certeza!',
    color: 'bg-rose-600',
  },
  {
    name: 'Carlos Manuel',
    rating: 5,
    date: 'há 3 semanas',
    text: 'Melhor restaurante de Talatona sem dúvida. A vitela maturada com cogumelos é de outro nível. Preço justo para a qualidade que oferecem. Recomendo a todos.',
    color: 'bg-blue-600',
  },
  {
    name: 'Graça Valentim',
    rating: 5,
    date: 'há 1 mês',
    text: 'Celebrámos o nosso aniversário de casamento no Terraza e foi perfeito. A equipa foi muito atenciosa, o ambiente é romântico e a comida estava excepcional. O risotto de cogumelos é de chorar de bom!',
    color: 'bg-purple-600',
  },
  {
    name: 'Fernando Gaspar',
    rating: 4,
    date: 'há 1 mês',
    text: 'Boa comida e ambiente agradável. Pedi o camarão tigre e estava fresco e bem temperado. Só demorou um pouco para servir, mas nada que tire o brilho da experiência. Vou voltar.',
    color: 'bg-teal-600',
  },
  {
    name: 'Luísa Mendes',
    rating: 5,
    date: 'há 1 mês',
    text: 'Simplesmente fantástico! A esplanada é linda, especialmente à noite. Pedimos marisco variado e cada peça estava perfeita. Os churros com chocolate no final foram a cereja no topo. Adorei!',
    color: 'bg-amber-700',
  },
  {
    name: 'Pedro Neto',
    rating: 5,
    date: 'há 2 meses',
    text: 'Fui com colegas de trabalho para um almoço de negócios. Ambiente discreto e elegante, perfeito para reuniões. A comida é de excelente qualidade. O filé mignon estava no ponto perfeito.',
    color: 'bg-indigo-600',
  },
  {
    name: 'Marta Conceição',
    rating: 5,
    date: 'há 2 meses',
    text: 'O melhor sítio para comer marisco em Luanda! Fresco, bem preparado e com sabor autêntico. A lagosta é o prato estrela, vale cada kwanza. Serviço atencioso e profissional.',
    color: 'bg-emerald-600',
  },
  {
    name: 'Hélder Sampaio',
    rating: 4,
    date: 'há 2 meses',
    text: 'Bom restaurante com boa variedade no menu. Experimentei a vitela e fiquei satisfeito. O vinho que nos sugeriram acompanhou muito bem. Ambiente sofisticado sem ser pretensioso.',
    color: 'bg-cyan-700',
  },
  {
    name: 'Teresa João',
    rating: 5,
    date: 'há 2 meses',
    text: 'Viemos de Benguela e alguém nos recomendou este restaurante. Não nos arrependemos! Comida deliciosa, funcionários simpáticos e o local é lindo. Quando voltarmos a Luanda, já sabemos onde jantar.',
    color: 'bg-pink-600',
  },
  {
    name: 'António Cambuta',
    rating: 5,
    date: 'há 3 meses',
    text: 'Levei a minha namorada no dia dos namorados e ela adorou. A decoração do espaço é muito bonita, a comida estava impecável. Os camarões tigre são enormes e muito saborosos. Nota 10!',
    color: 'bg-orange-600',
  },
  {
    name: 'Isabel Queiroz',
    rating: 4,
    date: 'há 3 meses',
    text: 'Gostei bastante do restaurante. Ambiente requintado e comida de qualidade. Pedi o risotto de cogumelos e estava cremoso e cheio de sabor. O preço é um pouco elevado, mas a qualidade justifica.',
    color: 'bg-violet-600',
  },
  {
    name: 'Nelson Mateus',
    rating: 5,
    date: 'há 3 meses',
    text: 'Restaurante top! Vim com amigos e ficámos todos satisfeitos. O menu tem opções para todos os gostos. A picanha premium é mesmo premium — carne de primeira. Repetimos sem pensar duas vezes.',
    color: 'bg-red-600',
  },
  {
    name: 'Filomena Banza',
    rating: 5,
    date: 'há 3 meses',
    text: 'Lugar especial! Fui com as minhas amigas e passámos um serão incrível. Os cocktails são bons e a comida é maravilhosa. A esplanada tem uma vista agradável. Serviço rápido e atencioso.',
    color: 'bg-fuchsia-600',
  },
  {
    name: 'Jorge Kalupeteka',
    rating: 4,
    date: 'há 4 meses',
    text: 'Bom restaurante para ocasiões especiais. Preços dentro do esperado para este tipo de estabelecimento. A comida está sempre bem preparada. Gostei particularmente dos mariscos.',
    color: 'bg-sky-600',
  },
  {
    name: 'Catarina Fernandes',
    rating: 5,
    date: 'há 4 meses',
    text: 'O Terraza é o meu restaurante favorito em Talatona! Já lá fui umas 5 vezes e nunca me desiludiu. A lagosta é fresca e suculenta, o atendimento é sempre impecável. Nota máxima!',
    color: 'bg-lime-700',
  },
  {
    name: 'Domingos Sebastião',
    rating: 5,
    date: 'há 4 meses',
    text: 'Excelente experiência! Fui com a família no domingo e adorámos. O espaço é grande e confortável. A comida é saborosa e bem servida. Destaque para a sobremesa — os churros são fantásticos.',
    color: 'bg-amber-600',
  },
  {
    name: 'Raquel Caetano',
    rating: 5,
    date: 'há 5 meses',
    text: 'Que restaurante maravilhoso! Vim pela primeira vez e fiquei encantada. O ambiente é sofisticado mas acolhedor. O peixe grelhado estava divinal. O pessoal é muito simpático e profissional.',
    color: 'bg-rose-700',
  },
  {
    name: 'Osvaldo Tchivela',
    rating: 4,
    date: 'há 5 meses',
    text: 'Lugar agradável com boa comida. Fui almoçar com parceiros de negócio e ficaram impressionados. Menu variado com pratos tanto de mar como de terra. Bom custo-benefício.',
    color: 'bg-blue-700',
  },
  {
    name: 'Sandra Lopes',
    rating: 5,
    date: 'há 5 meses',
    text: 'Melhor marisqueira de Luanda! Os camarões estavam fresquíssimos e a lagosta grelhada é de outro mundo. Foi no dia do meu aniversário e a equipa fez questão de me felicitar. Adorei esse toque pessoal!',
    color: 'bg-emerald-700',
  },
  {
    name: 'Bruno Afonso',
    rating: 5,
    date: 'há 5 meses',
    text: 'Vim jantar com a minha esposa e ficámos muito satisfeitos. Ambiente romântico e elegante. A vitela maturada estava fenomenal, desmancha na boca. Os empregados são muito atenciosos.',
    color: 'bg-purple-700',
  },
  {
    name: 'Eunice Tavares',
    rating: 4,
    date: 'há 6 meses',
    text: 'Restaurante muito bom! Gostei do ambiente e da comida. Pedi a picanha e estava no ponto. O espaço exterior é ótimo, especialmente quando o tempo está bom. Preços razoáveis para a zona.',
    color: 'bg-teal-700',
  },
  {
    name: 'Ricardo Ndala',
    rating: 5,
    date: 'há 6 meses',
    text: 'Terraza nunca desilude! Sempre que tenho convidados internacionais, trago-os aqui. A qualidade é consistente e o menu tem opções para todos. O marisco é sempre fresco e bem preparado.',
    color: 'bg-indigo-700',
  },
  {
    name: 'Joana Pacheco',
    rating: 5,
    date: 'há 6 meses',
    text: 'Fui com a minha mãe celebrar o dia dela e foi uma experiência muito bonita. O restaurante tem um charme especial. A comida é deliciosa, pedimos marisco e peixe, tudo fresco e saboroso.',
    color: 'bg-pink-700',
  },
  {
    name: 'Miguel Tomás',
    rating: 4,
    date: 'há 7 meses',
    text: 'Bom lugar para jantar em Talatona. Menu diversificado, porções generosas e boa apresentação dos pratos. O ambiente é agradável e a localização é prática. Recomendo para grupos.',
    color: 'bg-cyan-600',
  },
  {
    name: 'Vera Nascimento',
    rating: 5,
    date: 'há 7 meses',
    text: 'Adorei tudo! Desde o atendimento até à sobremesa, tudo foi perfeito. O espaço é lindo, a comida é espetacular e os preços são justos. Os churros com chocolate são viciantes! Já quero voltar.',
    color: 'bg-orange-700',
  },
  {
    name: 'Adilson Campos',
    rating: 5,
    date: 'há 7 meses',
    text: 'Restaurante de classe! Fui para um jantar de aniversário de empresa e tudo correu na perfeição. O espaço é elegante, a comida é top e o atendimento foi excelente. Parabéns à equipa!',
    color: 'bg-red-700',
  },
  {
    name: 'Dulce Henriques',
    rating: 4,
    date: 'há 8 meses',
    text: 'Gostei muito do restaurante. A decoração é bonita e moderna. Pedi o risotto e estava muito cremoso e saboroso. O serviço foi bom, embora no sábado estivesse um pouco cheio. Vale a reserva antecipada.',
    color: 'bg-violet-700',
  },
  {
    name: 'Paulino Sousa',
    rating: 5,
    date: 'há 8 meses',
    text: 'Excelente! É o meu go-to para jantares especiais. Comida de alta qualidade, ambiente agradável e localização conveniente. A lagosta é sempre a minha escolha — nunca falha.',
    color: 'bg-sky-700',
  },
  {
    name: 'Mariana Vieira',
    rating: 5,
    date: 'há 8 meses',
    text: 'Vim com amigas para um jantar de despedida de solteira e foi incrível! O ambiente é perfeito, a comida maravilhosa e os cocktails são muito bons. A equipa foi super simpática connosco.',
    color: 'bg-fuchsia-700',
  },
  {
    name: 'Ernesto Capita',
    rating: 4,
    date: 'há 9 meses',
    text: 'Restaurante sólido em Talatona. Comida boa, ambiente cuidado e bom serviço. Experimentei a picanha e o camarão, ambos estavam bem executados. Preço condizente com a qualidade oferecida.',
    color: 'bg-lime-600',
  },
  {
    name: 'Cláudia Baptista',
    rating: 5,
    date: 'há 9 meses',
    text: 'O Terraza é sem dúvida um dos melhores restaurantes de Luanda. A qualidade é sempre alta e o menu tem opções para todos. Destaco o peixe do dia, que estava fresco e delicioso. Super recomendo!',
    color: 'bg-amber-600',
  },
  {
    name: 'Tomás Kassoma',
    rating: 5,
    date: 'há 10 meses',
    text: 'Lugar fantástico! Trouxe a família toda e ficámos todos encantados. As crianças também gostaram, há opções para miúdos. A vitela estava espetacular. Ambiente familiar e acolhedor.',
    color: 'bg-rose-600',
  },
  {
    name: 'Lúcia Manuel',
    rating: 5,
    date: 'há 10 meses',
    text: 'Uma jóia escondida em Talatona! A comida é fantástica, o ambiente é lindo e o serviço é de primeira. Pedi a lagosta com manteiga de alho e estava celestial. Definitivamente vou voltar.',
    color: 'bg-blue-600',
  },
  {
    name: 'Gaspar Nunes',
    rating: 4,
    date: 'há 11 meses',
    text: 'Bom restaurante com boa relação qualidade-preço. O espaço é amplo e bem decorado. Gostei da picanha premium, carne de excelente qualidade. O pessoal é profissional e atencioso.',
    color: 'bg-purple-600',
  },
  {
    name: 'Beatriz Pereira',
    rating: 5,
    date: 'há 1 ano',
    text: 'Restaurante maravilhoso! Fui com o meu marido e passámos uma noite inesquecível. A comida é divina, o ambiente romântico e o serviço excelente. Os mariscos são os melhores que já comi em Luanda!',
    color: 'bg-teal-600',
  },
]

export default function ReviewsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const animationRef = useRef<number | null>(null)
  const scrollPositionRef = useRef(0)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const speed = 0.4 // pixels per frame - generous slow speed

    const animate = () => {
      if (!isPaused && scrollContainer) {
        scrollPositionRef.current += speed

        // Reset when we've scrolled through the first set of reviews
        const halfWidth = scrollContainer.scrollWidth / 2
        if (scrollPositionRef.current >= halfWidth) {
          scrollPositionRef.current = 0
        }

        scrollContainer.scrollLeft = scrollPositionRef.current
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPaused])

  // Duplicate reviews for seamless infinite scroll
  const allReviews = [...reviews, ...reviews]

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${star <= rating ? 'text-amber-500' : 'text-white/20'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )

  return (
    <section id="criticas" className="py-24 md:py-32 bg-[#111] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-xs sm:text-sm mb-4">Testemunhos</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
            O Que Dizem os Nossos <span className="italic text-[#D4AF37]">Clientes</span>
          </h2>
          <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${star <= 4 ? 'text-amber-500' : 'text-amber-500/50'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-white/70 text-xs sm:text-sm">4.3 de 5 · 198 críticas no Google</span>
          </div>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-[#111] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-[#111] to-transparent z-10 pointer-events-none"></div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-hidden px-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {allReviews.map((review, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-[340px] bg-[#0a0a0a] p-4 sm:p-5 md:p-6 rounded-xl border border-white/5 hover:border-amber-500/20 transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={getAvatarUrl(review.name)}
                  alt={review.name}
                  className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full object-cover bg-white/10"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">{review.name}</p>
                  <p className="text-white/40 text-xs">{review.date}</p>
                </div>
              </div>

              <StarRating rating={review.rating} />

              <p className="text-white/65 text-xs sm:text-sm leading-relaxed mt-3 line-clamp-3 sm:line-clamp-4">
                {review.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-16 md:mt-24">
        <a
          href="https://www.google.com/maps/place/Terraza+Talatona+-+Restaurante+Marisqueira/@-8.921138,12.9136933,11z/data=!4m6!3m5!1s0x1a51f5a99bf68115:0xe3d3732191dcfa0e!8m2!3d-8.921138!4d13.2020844!16s%2Fg%2F11s38w42dr?entry=ttu&g_ep=EgoyMDI2MDQwNS4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 px-8 py-4 rounded-sm text-white hover:bg-white/5 transition-all text-xs uppercase font-bold tracking-[0.2em]"
        >
          Ver Todas as Críticas no Google
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </section>
  )
}
