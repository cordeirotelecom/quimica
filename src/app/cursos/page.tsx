'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Play, BookOpen, Award, Clock, Users, Star, CheckCircle, Lock, Trophy, Target, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

interface Course {
  id: number
  title: string
  description: string
  level: string
  duration: string
  students: number
  rating: number
  instructor: string
  price: string
  image: string
  modules: number
  videos: number
  exercises: number
  certificates: boolean
  topics: string[]
  progress: number
  enrolled: boolean
}

const courses: Course[] = [
  {
    id: 1,
    title: "Química Básica - Fundamentos",
    description: "Aprenda os conceitos fundamentais da química de forma interativa e prática",
    level: "Iniciante",
    duration: "6 semanas",
    students: 15420,
    rating: 4.9,
    instructor: "Dr. Maria Silva",
    price: "Gratuito",
    image: "🧪",
    modules: 12,
    videos: 45,
    exercises: 120,
    certificates: true,
    topics: ["Átomos e Moléculas", "Tabela Periódica", "Ligações Químicas", "Reações Básicas"],
    progress: 0,
    enrolled: false
  },
  {
    id: 2,
    title: "Química Orgânica Avançada",
    description: "Domine a química dos compostos de carbono com exemplos práticos e aplicações",
    level: "Avançado",
    duration: "10 semanas",
    students: 8750,
    rating: 4.8,
    instructor: "Prof. João Santos",
    price: "R$ 199",
    image: "⚗️",
    modules: 18,
    videos: 72,
    exercises: 200,
    certificates: true,
    topics: ["Hidrocarbonetos", "Compostos Funcionais", "Reações Orgânicas", "Biomoléculas"],
    progress: 0,
    enrolled: false
  },
  {
    id: 3,
    title: "Físico-Química Experimental",
    description: "Explore as leis físicas que governam os fenômenos químicos",
    level: "Intermediário",
    duration: "8 semanas",
    students: 12300,
    rating: 4.7,
    instructor: "Dra. Ana Costa",
    price: "R$ 149",
    image: "⚛️",
    modules: 15,
    videos: 60,
    exercises: 180,
    certificates: true,
    topics: ["Termodinâmica", "Cinética Química", "Equilíbrio", "Eletroquímica"],
    progress: 35,
    enrolled: true
  },
  {
    id: 4,
    title: "Química Analítica Moderna",
    description: "Técnicas modernas de análise química e instrumentação",
    level: "Avançado",
    duration: "12 semanas",
    students: 6890,
    rating: 4.9,
    instructor: "Dr. Carlos Lima",
    price: "R$ 299",
    image: "🔬",
    modules: 20,
    videos: 95,
    exercises: 250,
    certificates: true,
    topics: ["Espectrometria", "Cromatografia", "Análise Quantitativa", "Métodos Modernos"],
    progress: 0,
    enrolled: false
  },
  {
    id: 5,
    title: "Bioquímica Aplicada",
    description: "A química da vida: proteínas, enzimas, metabolismo e muito mais",
    level: "Intermediário",
    duration: "9 semanas",
    students: 11200,
    rating: 4.8,
    instructor: "Dra. Luciana Rocha",
    price: "R$ 179",
    image: "🧬",
    modules: 16,
    videos: 68,
    exercises: 190,
    certificates: true,
    topics: ["Proteínas", "Enzimas", "Metabolismo", "Ácidos Nucleicos"],
    progress: 0,
    enrolled: false
  },
  {
    id: 6,
    title: "Química Industrial",
    description: "Processos químicos industriais e aplicações práticas na indústria",
    level: "Avançado",
    duration: "14 semanas",
    students: 4560,
    rating: 4.6,
    instructor: "Eng. Roberto Alves",
    price: "R$ 399",
    image: "🏭",
    modules: 22,
    videos: 110,
    exercises: 300,
    certificates: true,
    topics: ["Processos Industriais", "Catálise", "Engenharia Química", "Sustentabilidade"],
    progress: 0,
    enrolled: false
  }
]

const achievements = [
  { id: 1, title: "Primeiro Curso", description: "Complete seu primeiro curso", icon: "🎓", unlocked: true },
  { id: 2, title: "Estudante Dedicado", description: "Estude por 7 dias consecutivos", icon: "📚", unlocked: true },
  { id: 3, title: "Expert em Experimentos", description: "Complete 50 experimentos", icon: "🧪", unlocked: false },
  { id: 4, title: "Mestre da Química", description: "Complete 5 cursos", icon: "🏆", unlocked: false },
]

export default function Cursos() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [filter, setFilter] = useState('all')
  const [showCourseDetail, setShowCourseDetail] = useState(false)

  const filteredCourses = courses.filter(course => {
    if (filter === 'all') return true
    if (filter === 'enrolled') return course.enrolled
    if (filter === 'free') return course.price === 'Gratuito'
    return course.level === filter
  })

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Iniciante': return 'bg-green-100 text-green-800'
      case 'Intermediário': return 'bg-yellow-100 text-yellow-800'
      case 'Avançado': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (showCourseDetail && selectedCourse) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Header */}
        <header className="px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button 
              onClick={() => setShowCourseDetail(false)}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Voltar aos Cursos</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">{selectedCourse.title}</h1>
            <div className="w-32"></div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Conteúdo Principal */}
            <div className="lg:col-span-2">
              {/* Vídeo/Player */}
              <div className="bg-white rounded-2xl p-8 shadow-lg mb-6">
                <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl flex items-center justify-center text-white mb-6">
                  <div className="text-center">
                    <Play className="h-16 w-16 mx-auto mb-4 text-blue-400" />
                    <h3 className="text-2xl font-bold mb-2">Módulo 1: Introdução</h3>
                    <p className="text-gray-300">Fundamentos da Química Moderna</p>
                    <button className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium">
                      Iniciar Aula
                    </button>
                  </div>
                </div>
                
                {/* Progresso */}
                {selectedCourse.enrolled && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Progresso do Curso</span>
                      <span className="text-sm text-gray-600">{selectedCourse.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${selectedCourse.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Módulos do Curso */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Conteúdo do Curso</h3>
                <div className="space-y-4">
                  {Array.from({ length: selectedCourse.modules }, (_, i) => (
                    <div key={i} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-shrink-0">
                        {selectedCourse.enrolled && i < Math.floor(selectedCourse.modules * selectedCourse.progress / 100) ? (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        ) : selectedCourse.enrolled && i === Math.floor(selectedCourse.modules * selectedCourse.progress / 100) ? (
                          <Play className="h-6 w-6 text-blue-600" />
                        ) : (
                          <Lock className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">Módulo {i + 1}: {selectedCourse.topics[i % selectedCourse.topics.length]}</h4>
                        <p className="text-sm text-gray-600">3 vídeos • 45 min • 10 exercícios</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {Math.floor(Math.random() * 60) + 15} min
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Painel Lateral */}
            <div className="space-y-6">
              {/* Informações do Curso */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{selectedCourse.image}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedCourse.title}</h3>
                  <p className="text-gray-600">{selectedCourse.description}</p>
                </div>

                {!selectedCourse.enrolled ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{selectedCourse.price}</div>
                      {selectedCourse.price !== 'Gratuito' && (
                        <div className="text-sm text-gray-500 line-through">R$ {parseInt(selectedCourse.price.replace(/\D/g, '')) + 100}</div>
                      )}
                    </div>
                    <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      {selectedCourse.price === 'Gratuito' ? 'Inscrever-se Grátis' : 'Comprar Curso'}
                    </button>
                  </div>
                ) : (
                  <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium">
                    Continuar Estudando
                  </button>
                )}

                {/* Estatísticas */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="font-bold text-gray-900">{selectedCourse.modules}</div>
                    <div className="text-sm text-gray-600">Módulos</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="font-bold text-gray-900">{selectedCourse.videos}</div>
                    <div className="text-sm text-gray-600">Vídeos</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="font-bold text-gray-900">{selectedCourse.exercises}</div>
                    <div className="text-sm text-gray-600">Exercícios</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="font-bold text-gray-900">{selectedCourse.duration}</div>
                    <div className="text-sm text-gray-600">Duração</div>
                  </div>
                </div>
              </div>

              {/* Instrutor */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">👨‍🏫 Instrutor</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {selectedCourse.instructor.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{selectedCourse.instructor}</h4>
                    <p className="text-sm text-gray-600">Professor de Química</p>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{selectedCourse.rating} • {selectedCourse.students.toLocaleString()} alunos</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Especialista em química com mais de 15 anos de experiência em ensino e pesquisa. 
                  PhD em Química pela USP e autor de diversos artigos científicos.
                </p>
              </div>

              {/* Certificado */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Award className="h-6 w-6 text-yellow-600" />
                  <h3 className="text-lg font-bold text-yellow-900">Certificado</h3>
                </div>
                <p className="text-yellow-800 text-sm">
                  Receba um certificado oficial ao completar o curso com nota mínima de 70%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
            <ArrowLeft className="h-5 w-5" />
            <span>Voltar ao Início</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Cursos de Química</h1>
          <div className="w-24"></div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <BookOpen className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Aprenda Química do Básico ao Avançado</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cursos estruturados com os melhores professores, experimentos práticos e certificados oficiais.
              Transforme sua carreira com o conhecimento em química.
            </p>
          </motion.div>
        </div>

        {/* Filtros */}
        <div className="mb-8 flex flex-wrap gap-4 justify-center">
          {['all', 'enrolled', 'free', 'Iniciante', 'Intermediário', 'Avançado'].map(filterOption => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === filterOption
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {filterOption === 'all' ? 'Todos' : 
               filterOption === 'enrolled' ? 'Meus Cursos' :
               filterOption === 'free' ? 'Gratuitos' : filterOption}
            </button>
          ))}
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-gray-600">Cursos Disponíveis</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">100K+</div>
            <div className="text-gray-600">Alunos Ativos</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
            <div className="text-gray-600">Taxa de Conclusão</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">4.8</div>
            <div className="text-gray-600">Avaliação Média</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Lista de Cursos */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-6">
              {filteredCourses.map(course => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{course.image}</div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                        {course.level}
                      </span>
                      {course.enrolled && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Inscrito
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{course.description}</p>

                  <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.students.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-400" />
                      {course.rating}
                    </div>
                  </div>

                  {course.enrolled && course.progress > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progresso</span>
                        <span className="text-gray-600">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-blue-600">{course.price}</div>
                    <button 
                      onClick={() => {
                        setSelectedCourse(course)
                        setShowCourseDetail(true)
                      }}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      {course.enrolled ? 'Continuar' : 'Ver Curso'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Painel Lateral */}
          <div className="space-y-6">
            {/* Conquistas */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
                Suas Conquistas
              </h3>
              <div className="space-y-3">
                {achievements.map(achievement => (
                  <div key={achievement.id} className={`flex items-center space-x-3 p-3 rounded-lg ${
                    achievement.unlocked ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'
                  }`}>
                    <div className={`text-2xl ${achievement.unlocked ? '' : 'grayscale'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${achievement.unlocked ? 'text-yellow-900' : 'text-gray-500'}`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-xs ${achievement.unlocked ? 'text-yellow-700' : 'text-gray-400'}`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Próximas Aulas */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Próximas Aulas
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Cinética Química</div>
                    <div className="text-sm text-gray-600">Hoje, 14:00</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Equilíbrio Químico</div>
                    <div className="text-sm text-gray-600">Amanhã, 10:00</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Suporte */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-purple-900 mb-4 flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Precisa de Ajuda?
              </h3>
              <p className="text-purple-800 text-sm mb-4">
                Nossa equipe está sempre pronta para ajudar você em sua jornada de aprendizado.
              </p>
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm">
                Falar com Suporte
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
