'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search, Filter, Star, Clock, Users, BookOpen, FlaskConical, Calculator, Atom, Brain, TrendingUp, Globe, Target } from 'lucide-react'

interface SearchResult {
  id: string
  type: 'experiment' | 'course' | 'calculator' | 'simulation' | 'article' | 'video'
  title: string
  description: string
  difficulty: 'Básico' | 'Intermediário' | 'Avançado'
  duration: string
  rating: number
  completions: number
  tags: string[]
  category: string
  thumbnail?: string
  isNew?: boolean
  isPopular?: boolean
  isPremium?: boolean
}

const sampleResults: SearchResult[] = [
  {
    id: '1',
    type: 'experiment',
    title: 'Titulação Ácido-Base Completa',
    description: 'Aprenda a realizar titulações precisas com indicadores visuais e curvas de titulação em tempo real.',
    difficulty: 'Intermediário',
    duration: '45 min',
    rating: 4.9,
    completions: 234567,
    tags: ['ácidos', 'bases', 'pH', 'titulação', 'indicadores'],
    category: 'Química Analítica',
    isPopular: true
  },
  {
    id: '2',
    type: 'simulation',
    title: 'Estrutura 3D da Molécula de DNA',
    description: 'Visualize e manipule a estrutura tridimensional do DNA, explore ligações de hidrogênio e pares de bases.',
    difficulty: 'Avançado',
    duration: '30 min',
    rating: 4.8,
    completions: 156789,
    tags: ['DNA', 'bioquímica', '3D', 'estrutura', 'genética'],
    category: 'Bioquímica',
    isNew: true
  },
  {
    id: '3',
    type: 'course',
    title: 'Química Orgânica: Do Básico ao Avançado',
    description: 'Curso completo de química orgânica com mais de 100 aulas, exercícios práticos e certificado.',
    difficulty: 'Básico',
    duration: '20 horas',
    rating: 4.9,
    completions: 98765,
    tags: ['orgânica', 'carbono', 'funções', 'mecanismos', 'síntese'],
    category: 'Química Orgânica',
    isPremium: true
  },
  {
    id: '4',
    type: 'calculator',
    title: 'Calculadora de Massa Molar Avançada',
    description: 'Calcule massa molar de compostos complexos com interface intuitiva e explicações detalhadas.',
    difficulty: 'Básico',
    duration: '5 min',
    rating: 4.7,
    completions: 1234567,
    tags: ['massa molar', 'cálculos', 'compostos', 'fórmulas'],
    category: 'Ferramentas',
    isPopular: true
  },
  {
    id: '5',
    type: 'article',
    title: 'Como a Química Quântica Explica as Ligações',
    description: 'Artigo aprofundado sobre mecânica quântica aplicada à química e formação de ligações químicas.',
    difficulty: 'Avançado',
    duration: '15 min',
    rating: 4.6,
    completions: 45678,
    tags: ['quântica', 'ligações', 'orbitais', 'teoria', 'física'],
    category: 'Físico-Química'
  },
  {
    id: '6',
    type: 'video',
    title: 'Reações de Combustão Espetaculares',
    description: 'Vídeos em alta qualidade de reações de combustão com explicações científicas detalhadas.',
    difficulty: 'Intermediário',
    duration: '12 min',
    rating: 4.8,
    completions: 189234,
    tags: ['combustão', 'energia', 'reações', 'termoquímica'],
    category: 'Termoquímica',
    isPopular: true
  }
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [results] = useState<SearchResult[]>(sampleResults)
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>(sampleResults)
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'popularity' | 'recent'>('relevance')
  const [isLoading, setIsLoading] = useState(false)

  const contentTypes = [
    { value: 'all', label: 'Todos', icon: <Globe className="h-4 w-4" /> },
    { value: 'experiment', label: 'Experimentos', icon: <FlaskConical className="h-4 w-4" /> },
    { value: 'course', label: 'Cursos', icon: <BookOpen className="h-4 w-4" /> },
    { value: 'simulation', label: 'Simulações', icon: <Atom className="h-4 w-4" /> },
    { value: 'calculator', label: 'Calculadoras', icon: <Calculator className="h-4 w-4" /> },
    { value: 'article', label: 'Artigos', icon: <Target className="h-4 w-4" /> },
    { value: 'video', label: 'Vídeos', icon: <Brain className="h-4 w-4" /> }
  ]

  const categories = [
    'Química Geral', 'Química Orgânica', 'Química Inorgânica', 'Físico-Química',
    'Química Analítica', 'Bioquímica', 'Termoquímica', 'Eletroquímica', 'Ferramentas'
  ]

  const popularSearches = [
    'tabela periódica', 'ligações químicas', 'pH e pOH', 'estequiometria',
    'química orgânica', 'reações químicas', 'gases ideais', 'soluções',
    'equilíbrio químico', 'cinética química', 'termodinâmica', 'eletroquímica'
  ]

  const trendingTopics = [
    { topic: 'Química Verde', growth: '+45%', icon: '🌱' },
    { topic: 'Nanotecnologia', growth: '+38%', icon: '⚛️' },
    { topic: 'Energia Renovável', growth: '+32%', icon: '🔋' },
    { topic: 'Química Medicinal', growth: '+28%', icon: '💊' },
    { topic: 'Polímeros', growth: '+25%', icon: '🧪' },
    { topic: 'Catálise', growth: '+22%', icon: '⚡' }
  ]

  const applyFilters = useCallback(() => {
    let filtered = [...results]

    // Filtro por busca
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Filtro por tipo
    if (selectedType !== 'all') {
      filtered = filtered.filter(item => item.type === selectedType)
    }

    // Filtro por dificuldade
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(item => item.difficulty === selectedDifficulty)
    }

    // Filtro por categoria
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    // Ordenação
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'popularity':
        filtered.sort((a, b) => b.completions - a.completions)
        break
      case 'recent':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
    }

    setFilteredResults(filtered)
  }, [results, searchQuery, selectedType, selectedDifficulty, selectedCategory, sortBy])

  useEffect(() => {
    applyFilters()
  }, [applyFilters])

  const handleSearch = () => {
    setIsLoading(true)
    setTimeout(() => {
      applyFilters()
      setIsLoading(false)
    }, 500)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'experiment': return <FlaskConical className="h-5 w-5" />
      case 'course': return <BookOpen className="h-5 w-5" />
      case 'simulation': return <Atom className="h-5 w-5" />
      case 'calculator': return <Calculator className="h-5 w-5" />
      case 'article': return <Target className="h-5 w-5" />
      case 'video': return <Brain className="h-5 w-5" />
      default: return <Globe className="h-5 w-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'experiment': return 'text-blue-600 bg-blue-50'
      case 'course': return 'text-green-600 bg-green-50'
      case 'simulation': return 'text-purple-600 bg-purple-50'
      case 'calculator': return 'text-orange-600 bg-orange-50'
      case 'article': return 'text-gray-600 bg-gray-50'
      case 'video': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Básico': return 'text-green-600 bg-green-50'
      case 'Intermediário': return 'text-yellow-600 bg-yellow-50'
      case 'Avançado': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
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
              <Search className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Pesquisa Avançada</h1>
                <p className="text-sm text-gray-600">Descubra todo o conteúdo da maior plataforma de química</p>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            {filteredResults.length} resultados encontrados
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search Box */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <Search className="h-5 w-5 mr-2 text-blue-600" />
                Buscar Conteúdo
              </h3>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Digite palavras-chave..."
                    className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button 
                    onClick={handleSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-blue-600"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content Type Filter */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2 text-blue-600" />
                Tipo de Conteúdo
              </h3>
              <div className="space-y-2">
                {contentTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setSelectedType(type.value)}
                    className={`w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-2 ${
                      selectedType === type.value
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {type.icon}
                    <span>{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Dificuldade</h3>
              <div className="space-y-2">
                {['all', 'Básico', 'Intermediário', 'Avançado'].map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`w-full text-left p-2 rounded-lg transition-colors ${
                      selectedDifficulty === difficulty
                        ? 'bg-blue-50 text-blue-700'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {difficulty === 'all' ? 'Todos os níveis' : difficulty}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Categoria</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left p-2 rounded-lg transition-colors ${
                    selectedCategory === 'all' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                  }`}
                >
                  Todas as categorias
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left p-2 rounded-lg transition-colors text-sm ${
                      selectedCategory === category
                        ? 'bg-blue-50 text-blue-700'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                Tópicos em Alta
              </h3>
              <div className="space-y-3">
                {trendingTopics.map((trend, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(trend.topic)}
                    className="w-full text-left p-3 bg-gray-50 hover:bg-green-50 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{trend.icon}</span>
                        <span className="font-medium text-gray-900 group-hover:text-green-700 text-sm">
                          {trend.topic}
                        </span>
                      </div>
                      <span className="text-xs text-green-600 font-medium">{trend.growth}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Header */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {searchQuery ? `Resultados para "${searchQuery}"` : 'Explorar Conteúdo'}
                  </h2>
                  <p className="text-gray-600">{filteredResults.length} resultados encontrados</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">Ordenar por:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'relevance' | 'rating' | 'popularity' | 'recent')}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="relevance">Relevância</option>
                    <option value="rating">Avaliação</option>
                    <option value="popularity">Popularidade</option>
                    <option value="recent">Mais recentes</option>
                  </select>
                </div>
              </div>

              {/* Popular Searches */}
              {!searchQuery && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Buscas populares:</h3>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => setSearchQuery(search)}
                        className="px-3 py-1 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-sm transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Results */}
            {isLoading ? (
              <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
                <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Buscando conteúdo...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredResults.map((result) => (
                  <div key={result.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={`p-3 rounded-lg ${getTypeColor(result.type)}`}>
                          {getTypeIcon(result.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 cursor-pointer">
                              {result.title}
                            </h3>
                            <div className="flex items-center space-x-2">
                              {result.isNew && (
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                                  Novo
                                </span>
                              )}
                              {result.isPopular && (
                                <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-medium">
                                  Popular
                                </span>
                              )}
                              {result.isPremium && (
                                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
                                  Premium
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-gray-600 mb-3">{result.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className={`px-2 py-1 rounded-full ${getDifficultyColor(result.difficulty)}`}>
                              {result.difficulty}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {result.duration}
                            </span>
                            <span className="flex items-center">
                              <Star className="h-4 w-4 mr-1 text-yellow-500" />
                              {result.rating}
                            </span>
                            <span className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {result.completions.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <span className="text-xs text-gray-500">Tags:</span>
                            {result.tags.slice(0, 4).map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition-colors"
                                onClick={() => setSearchQuery(tag)}
                              >
                                {tag}
                              </span>
                            ))}
                            {result.tags.length > 4 && (
                              <span className="text-xs text-gray-500">+{result.tags.length - 4} mais</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="text-sm text-gray-600">
                        Categoria: <span className="font-medium">{result.category}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button className="px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors">
                          Visualizar
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Acessar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredResults.length === 0 && (
                  <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
                    <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhum resultado encontrado</h3>
                    <p className="text-gray-600 mb-6">
                      Tente usar palavras-chave diferentes ou remover alguns filtros.
                    </p>
                    <button 
                      onClick={() => {
                        setSearchQuery('')
                        setSelectedType('all')
                        setSelectedDifficulty('all')
                        setSelectedCategory('all')
                      }}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Limpar Filtros
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
