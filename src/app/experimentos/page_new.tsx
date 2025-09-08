'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Play, Clock, Users, Star, BookOpen, AlertTriangle, CheckCircle, Filter, Search, TrendingUp, Award, Target, Zap, Globe, Trophy, Flame, Beaker, Atom, FlaskConical, Eye, Timer, Shield, Lightbulb, Microscope, TestTube } from 'lucide-react'

interface Experiment {
  id: string
  title: string
  description: string
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Especialista'
  duration: number
  category: string
  subcategory: string
  rating: number
  completions: number
  equipment: string[]
  chemicals: string[]
  safetyLevel: 'Baixo' | 'Médio' | 'Alto'
  objectives: string[]
  procedure: string[]
  theory: string
  applications: string[]
  videoUrl?: string
  isNew?: boolean
  isPopular?: boolean
  isPremium?: boolean
  isFeatured?: boolean
  thumbnail: string
  tags: string[]
  prerequisites?: string[]
  learningOutcomes: string[]
  relatedExperiments: string[]
}

export default function ExperimentosPage() {
  const [experiments, setExperiments] = useState<Experiment[]>([])
  const [filteredExperiments, setFilteredExperiments] = useState<Experiment[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [selectedSafety, setSelectedSafety] = useState('all')
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest' | 'duration'>('popular')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null)

  const mockExperiments: Experiment[] = [
    {
      id: '1',
      title: 'Titulação Ácido-Base com Curva de pH',
      description: 'Experimento completo de titulação com monitoramento em tempo real da curva de pH.',
      difficulty: 'Intermediário',
      duration: 45,
      category: 'Química Analítica',
      subcategory: 'Volumetria',
      rating: 4.9,
      completions: 234567,
      equipment: ['Bureta automática', 'Agitador magnético', 'pHmetro digital'],
      chemicals: ['HCl 0,1 M', 'NaOH 0,1 M', 'Indicador universal'],
      safetyLevel: 'Médio',
      objectives: [
        'Determinar a concentração de uma solução ácida',
        'Compreender o comportamento da curva de titulação',
        'Identificar o ponto de equivalência'
      ],
      procedure: [
        'Calibrar o pHmetro com soluções tampão padrão',
        'Medir 25,0 mL da solução ácida desconhecida',
        'Adicionar algumas gotas de indicador',
        'Titular com NaOH 0,1 M sob agitação constante'
      ],
      theory: 'A titulação é um método quantitativo que permite determinar a concentração.',
      applications: ['Análise de qualidade em indústrias', 'Controle de medicamentos'],
      thumbnail: '🧪',
      tags: ['titulação', 'pH', 'ácido', 'base'],
      prerequisites: ['Conceitos de ácidos e bases'],
      learningOutcomes: ['Dominar técnicas de titulação'],
      relatedExperiments: ['2', '3'],
      isPopular: true,
      isFeatured: true
    },
    {
      id: '2',
      title: 'Síntese e Cristalização do Sulfato de Cobre',
      description: 'Síntese completa de CuSO₄·5H₂O a partir de cobre metálico.',
      difficulty: 'Avançado',
      duration: 90,
      category: 'Química Inorgânica',
      subcategory: 'Síntese',
      rating: 4.8,
      completions: 156789,
      equipment: ['Balança analítica', 'Béquer', 'Funil de Büchner'],
      chemicals: ['Cobre metálico', 'Ácido sulfúrico concentrado'],
      safetyLevel: 'Alto',
      objectives: [
        'Sintetizar sulfato de cobre pentahidratado',
        'Calcular rendimento teórico e prático'
      ],
      procedure: [
        'Pesar 2,0 g de cobre metálico',
        'Dissolver em ácido nítrico diluído',
        'Evaporar o excesso de ácido'
      ],
      theory: 'A síntese de sais hidratados envolve reações de oxidação-redução.',
      applications: ['Fungicida em agricultura', 'Eletrodeposição'],
      thumbnail: '💎',
      tags: ['síntese', 'cristalização', 'cobre'],
      prerequisites: ['Reações redox', 'Estequiometria'],
      learningOutcomes: ['Dominar técnicas de síntese inorgânica'],
      relatedExperiments: ['1', '3'],
      isNew: true,
      isPremium: true
    },
    {
      id: '3',
      title: 'Cinética da Decomposição da Água Oxigenada',
      description: 'Estudo quantitativo da cinética de decomposição do H₂O₂.',
      difficulty: 'Avançado',
      duration: 75,
      category: 'Físico-Química',
      subcategory: 'Cinética',
      rating: 4.7,
      completions: 98432,
      equipment: ['Espectrofotômetro UV-Vis', 'Banho termostático'],
      chemicals: ['Peróxido de hidrogênio 30%', 'Iodeto de potássio'],
      safetyLevel: 'Médio',
      objectives: [
        'Determinar a ordem de reação',
        'Calcular a constante de velocidade'
      ],
      procedure: [
        'Preparar soluções de diferentes concentrações',
        'Termostatizar o sistema',
        'Adicionar catalisador e iniciar cronômetro'
      ],
      theory: 'A cinética química estuda a velocidade das reações.',
      applications: ['Desenvolvimento de catalisadores'],
      thumbnail: '⚡',
      tags: ['cinética', 'catálise', 'energia de ativação'],
      prerequisites: ['Cinética química', 'Espectrofotometria'],
      learningOutcomes: ['Aplicar métodos cinéticos'],
      relatedExperiments: ['1', '2'],
      isFeatured: true
    },
    {
      id: '4',
      title: 'Eletroquímica: Pilha de Daniell',
      description: 'Construção e caracterização de pilhas galvânicas.',
      difficulty: 'Intermediário',
      duration: 60,
      category: 'Eletroquímica',
      subcategory: 'Pilhas',
      rating: 4.6,
      completions: 187234,
      equipment: ['Voltímetro digital', 'Eletrodos de Cu e Zn'],
      chemicals: ['CuSO₄ 1M', 'ZnSO₄ 1M', 'KCl saturado'],
      safetyLevel: 'Baixo',
      objectives: [
        'Construir uma pilha de Daniell funcional',
        'Medir potenciais de eletrodo'
      ],
      procedure: [
        'Montar a pilha com eletrodos adequados',
        'Conectar ponte salina',
        'Medir potencial inicial'
      ],
      theory: 'As pilhas galvânicas convertem energia química em elétrica.',
      applications: ['Baterias comerciais'],
      thumbnail: '🔋',
      tags: ['eletroquímica', 'pilha', 'potencial'],
      prerequisites: ['Reações redox'],
      learningOutcomes: ['Construir pilhas galvânicas'],
      relatedExperiments: ['2', '3'],
      isPopular: true
    },
    {
      id: '5',
      title: 'Espectrofotometria UV-Vis: Lei de Beer-Lambert',
      description: 'Aplicação da espectrofotometria para determinação quantitativa.',
      difficulty: 'Intermediário',
      duration: 50,
      category: 'Química Analítica',
      subcategory: 'Instrumental',
      rating: 4.8,
      completions: 203456,
      equipment: ['Espectrofotômetro UV-Vis', 'Cubetas de quartzo'],
      chemicals: ['Permanganato de potássio', 'Dicromato de potássio'],
      safetyLevel: 'Baixo',
      objectives: [
        'Verificar a validade da Lei de Beer-Lambert',
        'Construir curvas de calibração'
      ],
      procedure: [
        'Preparar soluções padrão',
        'Determinar comprimento de onda ótimo',
        'Medir absorbâncias das soluções'
      ],
      theory: 'A Lei de Beer-Lambert relaciona absorbância com concentração.',
      applications: ['Análise farmacêutica'],
      thumbnail: '🌈',
      tags: ['espectrofotometria', 'Beer-Lambert', 'análise quantitativa'],
      prerequisites: ['Espectroscopia básica'],
      learningOutcomes: ['Operar espectrofotômetro'],
      relatedExperiments: ['1', '3'],
      isNew: true
    }
  ]

  const categories = [
    'Química Analítica',
    'Química Inorgânica', 
    'Química Orgânica',
    'Físico-Química',
    'Eletroquímica'
  ]

  const difficultyColors = {
    'Iniciante': 'bg-green-100 text-green-800',
    'Intermediário': 'bg-yellow-100 text-yellow-800', 
    'Avançado': 'bg-orange-100 text-orange-800',
    'Especialista': 'bg-red-100 text-red-800'
  }

  const safetyColors = {
    'Baixo': 'bg-green-100 text-green-800',
    'Médio': 'bg-yellow-100 text-yellow-800',
    'Alto': 'bg-red-100 text-red-800'
  }

  useEffect(() => {
    setTimeout(() => {
      setExperiments(mockExperiments)
      setFilteredExperiments(mockExperiments)
      setIsLoading(false)
    }, 1500)
  }, [])

  useEffect(() => {
    applyFilters()
  }, [selectedCategory, selectedDifficulty, selectedSafety, searchQuery, sortBy, experiments])

  const applyFilters = () => {
    let filtered = [...experiments]

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(exp => exp.category === selectedCategory)
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(exp => exp.difficulty === selectedDifficulty)
    }

    if (selectedSafety !== 'all') {
      filtered = filtered.filter(exp => exp.safetyLevel === selectedSafety)
    }

    if (searchQuery) {
      filtered = filtered.filter(exp => 
        exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.completions - a.completions)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case 'duration':
        filtered.sort((a, b) => a.duration - b.duration)
        break
    }

    setFilteredExperiments(filtered)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Carregando laboratório virtual...</h2>
          <p className="text-gray-600">Preparando experimentos profissionais</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Voltar
            </Link>
            <div className="flex items-center space-x-3">
              <FlaskConical className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Laboratório Virtual</h1>
                <p className="text-sm text-gray-600">Experimentos profissionais de química</p>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            <span className="font-medium">{filteredExperiments.length}</span> experimentos disponíveis
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Filtros */}
          <div className="lg:col-span-1 space-y-6">
            {/* Busca */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <Search className="h-5 w-5 mr-2 text-blue-600" />
                Buscar Experimentos
              </h3>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Digite palavras-chave..."
                  className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Filtros */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2 text-blue-600" />
                Filtros
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">Todas as categorias</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dificuldade</label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">Todos os níveis</option>
                    <option value="Iniciante">Iniciante</option>
                    <option value="Intermediário">Intermediário</option>
                    <option value="Avançado">Avançado</option>
                    <option value="Especialista">Especialista</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Segurança</label>
                  <select
                    value={selectedSafety}
                    onChange={(e) => setSelectedSafety(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">Todos os níveis</option>
                    <option value="Baixo">Baixo risco</option>
                    <option value="Médio">Médio risco</option>
                    <option value="Alto">Alto risco</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ordenar por</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="popular">Mais populares</option>
                    <option value="rating">Melhor avaliados</option>
                    <option value="newest">Mais recentes</option>
                    <option value="duration">Menor duração</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Estatísticas */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                Estatísticas
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total de experimentos</span>
                  <span className="font-bold text-gray-900">{experiments.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Realizados hoje</span>
                  <span className="font-bold text-green-600">2,847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Usuários online</span>
                  <span className="font-bold text-blue-600">1,394</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Taxa de sucesso</span>
                  <span className="font-bold text-purple-600">98.7%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Conteúdo Principal */}
          <div className="lg:col-span-3">
            {/* Header da seção */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Experimentos Disponíveis</h2>
                  <p className="text-gray-600">Laboratório virtual com experimentos profissionais</p>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Sistema Online</span>
                </div>
              </div>

              {/* Métricas de destaque */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">2.5M+</div>
                  <div className="text-sm text-blue-700">Experimentos realizados</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">99.1%</div>
                  <div className="text-sm text-green-700">Taxa de sucesso</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">4.8★</div>
                  <div className="text-sm text-purple-700">Avaliação média</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">47</div>
                  <div className="text-sm text-orange-700">Min. duração média</div>
                </div>
              </div>
            </div>

            {/* Grid de Experimentos */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredExperiments.map((experiment) => (
                <div key={experiment.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{experiment.thumbnail}</div>
                        <div>
                          <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {experiment.title}
                          </h3>
                          <p className="text-sm text-gray-600">{experiment.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {experiment.isNew && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                            Novo
                          </span>
                        )}
                        {experiment.isFeatured && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                            Destaque
                          </span>
                        )}
                        {experiment.isPremium && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
                            Premium
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {experiment.description}
                    </p>

                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{experiment.duration} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{experiment.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{experiment.completions.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${difficultyColors[experiment.difficulty]}`}>
                        {experiment.difficulty}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${safetyColors[experiment.safetyLevel]}`}>
                        <Shield className="h-3 w-3 inline mr-1" />
                        {experiment.safetyLevel} risco
                      </span>
                    </div>
                  </div>

                  <div className="p-6 border-b border-gray-100">
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <Target className="h-4 w-4 mr-2 text-blue-600" />
                      Objetivos de Aprendizagem
                    </h4>
                    <ul className="space-y-1">
                      {experiment.objectives.slice(0, 2).map((objective, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <CheckCircle className="h-3 w-3 mt-1 mr-2 text-green-500 flex-shrink-0" />
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setSelectedExperiment(experiment)}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center font-medium"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Iniciar
                      </button>
                      <button className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        Visualizar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mensagem quando não há resultados */}
            {filteredExperiments.length === 0 && (
              <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
                <TestTube className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhum experimento encontrado</h3>
                <p className="text-gray-600 mb-6">
                  Tente ajustar os filtros ou usar palavras-chave diferentes.
                </p>
                <button 
                  onClick={() => {
                    setSelectedCategory('all')
                    setSelectedDifficulty('all')
                    setSelectedSafety('all')
                    setSearchQuery('')
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Limpar Filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal do Experimento Selecionado */}
      {selectedExperiment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{selectedExperiment.thumbnail}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedExperiment.title}</h2>
                    <p className="text-gray-600">{selectedExperiment.category}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedExperiment(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Procedimento</h3>
                <div className="space-y-3">
                  {selectedExperiment.procedure.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Começar Experimento Agora
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
