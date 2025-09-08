import Link from 'next/link'
import { ArrowRight, Users, Zap, Target, Heart, Play, Award, Atom, GraduationCap, FlaskConical, Beaker, Calculator, BookOpen, TrendingUp } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: <Beaker className="h-8 w-8" />,
      title: "Experimentos Virtuais",
      description: "Realize experimentos químicos seguros em laboratório virtual interativo com mais de 100 experimentos",
      link: "/experimentos"
    },
    {
      icon: <Calculator className="h-8 w-8" />,
      title: "Calculadoras Químicas", 
      description: "Ferramentas precisas para cálculos de mol, concentração, pH, gases ideais e muito mais",
      link: "/calculadoras"
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Tabela Periódica Interativa",
      description: "Explore elementos com animações 3D, propriedades detalhadas e curiosidades científicas",
      link: "/tabela-periodica"
    },
    {
      icon: <Atom className="h-8 w-8" />,
      title: "Simulações 3D Moleculares",
      description: "Visualize moléculas em 3D, geometrias, orbitais e reações químicas em tempo real",
      link: "/simulacoes"
    },
    {
      icon: <FlaskConical className="h-8 w-8" />,
      title: "Laboratório Virtual Avançado",
      description: "Bancada completa com equipamentos reais, reagentes e experimentos guiados",
      link: "/laboratorio"
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Cursos Estruturados",
      description: "Aprenda do básico ao avançado com professores especialistas e certificados oficiais",
      link: "/cursos"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Para Todas as Idades",
      description: "Conteúdo adaptado desde crianças até universitários, pesquisadores e professores"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "IA Química Assistente",
      description: "Assistente inteligente para resolver problemas, explicar conceitos e guiar experimentos"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Aprendizado Adaptativo",
      description: "Sistema que se ajusta ao seu ritmo, nível e preferências de aprendizagem"
    }
  ]

  const stats = [
    { number: "15M+", label: "Estudantes Impactados" },
    { number: "2.500+", label: "Experimentos Virtuais" },
    { number: "99.2%", label: "Taxa de Satisfação" },
    { number: "195+", label: "Países Atendidos" }
  ]

  const quickAccess = [
    { 
      title: "Experimentos Populares", 
      description: "Titulação ácido-base, cristalização, eletroquímica",
      icon: "🧪",
      link: "/experimentos",
      color: "from-blue-500 to-cyan-500"
    },
    { 
      title: "Moléculas 3D", 
      description: "Água, metano, benzeno, DNA, proteínas",
      icon: "🧬",
      link: "/simulacoes",
      color: "from-purple-500 to-pink-500"
    },
    { 
      title: "Calculadora pH", 
      description: "Calcule pH, pOH e concentrações",
      icon: "🧮",
      link: "/calculadoras",
      color: "from-green-500 to-emerald-500"
    },
    { 
      title: "Curso Química Orgânica", 
      description: "Aprenda química orgânica do zero",
      icon: "📚",
      link: "/cursos",
      color: "from-orange-500 to-red-500"
    }
  ]

  const testimonials = [
    {
      name: "Dr. Ana Silva",
      role: "Professora USP",
      content: "O QuímicaMax revolucionou minhas aulas. Os alunos estão mais engajados e compreendem melhor os conceitos.",
      avatar: "👩‍🏫"
    },
    {
      name: "João Santos",
      role: "Estudante Medicina",
      content: "Consegui compreender bioquímica de forma visual e prática. As simulações 3D são incríveis!",
      avatar: "👨‍🎓"
    },
    {
      name: "Maria Costa",
      role: "Pesquisadora",
      content: "Uso o laboratório virtual para testar hipóteses antes dos experimentos reais. Economizo tempo e recursos.",
      avatar: "👩‍🔬"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Beaker className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              QuímicaMax
            </span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/experimentos" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Experimentos
            </Link>
            <Link href="/tabela-periodica" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Tabela Periódica
            </Link>
            <Link href="/calculadoras" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Calculadoras
            </Link>
            <Link href="/simulacoes" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Simulações 3D
            </Link>
            <Link href="/laboratorio" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Laboratório
            </Link>
            <Link href="/cursos" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Cursos
            </Link>
            <Link href="/ai-tutor" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              IA Tutora
            </Link>
          </nav>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Começar Grátis
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20 max-w-7xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            O Maior Site de
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent block">
              Química do Mundo
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Descubra a química através de experimentos virtuais, simulações 3D, cursos especializados e 
            um laboratório virtual completo. A plataforma mais avançada para ensino de química.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/experimentos" className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 font-medium text-lg flex items-center justify-center group">
            <Play className="mr-2 h-5 w-5" />
            Começar Experimentos
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/simulacoes" className="bg-white text-gray-900 px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors font-medium text-lg border border-gray-200 flex items-center justify-center">
            <Atom className="mr-2 h-5 w-5" />
            Ver Simulações 3D
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Access */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Acesso Rápido</h2>
            <p className="text-xl text-gray-600">Comece agora com nossos recursos mais populares</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {quickAccess.map((item, index) => (
              <Link key={index} href={item.link} className="group">
                <div className={`h-full p-6 bg-gradient-to-br ${item.color} rounded-2xl text-white transform group-hover:scale-105 transition-all duration-300 shadow-lg`}>
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-white/90 text-sm">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Recursos Revolucionários
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tecnologia de ponta, metodologia comprovada e uma experiência de aprendizado 
              única que transforma o ensino de química.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="h-full p-8 bg-white rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-200/50">
                  <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                  {feature.link && (
                    <Link href={feature.link} className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                      Explorar <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              O que nossos usuários dizem
            </h2>
            <p className="text-xl text-gray-600">Mais de 15 milhões de pessoas confiam no QuímicaMax</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-200">
                <div className="text-6xl mb-4">{testimonial.avatar}</div>
                <p className="text-gray-700 mb-6 leading-relaxed">&quot;{testimonial.content}&quot;</p>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <Award className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Junte-se à Maior Comunidade de Química
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Mais de 15 milhões de estudantes, professores e pesquisadores já fazem parte da 
            revolução no ensino de química. Seja o próximo a transformar sua relação com a ciência!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cursos" className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors font-medium text-lg">
              Começar Curso Gratuito
            </Link>
            <Link href="/laboratorio" className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-colors font-medium text-lg">
              Explorar Laboratório
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Beaker className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">QuímicaMax</span>
              </div>
              <p className="text-gray-400 mb-4">
                A maior e mais avançada plataforma de ensino de química do mundo. 
                Transformando a educação através da tecnologia e inovação.
              </p>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-yellow-400" />
                <span className="text-sm text-gray-400">Prêmio Melhor Site Educacional 2024</span>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Laboratório</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/experimentos" className="hover:text-white transition-colors">Experimentos</Link></li>
                <li><Link href="/simulacoes" className="hover:text-white transition-colors">Simulações 3D</Link></li>
                <li><Link href="/laboratorio" className="hover:text-white transition-colors">Bancada Virtual</Link></li>
                <li><Link href="/calculadoras" className="hover:text-white transition-colors">Calculadoras</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Aprendizado</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/cursos" className="hover:text-white transition-colors">Cursos</Link></li>
                <li><Link href="/tabela-periodica" className="hover:text-white transition-colors">Tabela Periódica</Link></li>
                <li><Link href="/fundamental" className="hover:text-white transition-colors">Ensino Fundamental</Link></li>
                <li><Link href="/medio" className="hover:text-white transition-colors">Ensino Médio</Link></li>
                <li><Link href="/superior" className="hover:text-white transition-colors">Ensino Superior</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Comunidade</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/ai-tutor" className="hover:text-white transition-colors">IA Tutora</Link></li>
                <li><Link href="/analytics" className="hover:text-white transition-colors">Analytics</Link></li>
                <li><Link href="/forum" className="hover:text-white transition-colors">Fórum</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/eventos" className="hover:text-white transition-colors">Eventos</Link></li>
                <li><Link href="/professores" className="hover:text-white transition-colors">Para Professores</Link></li>
                <li><Link href="/certificados" className="hover:text-white transition-colors">Certificados</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 QuímicaMax. Todos os direitos reservados.</p>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <Heart className="h-4 w-4 text-red-500" />
              <span className="text-gray-400">Feito com amor para a educação mundial</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
