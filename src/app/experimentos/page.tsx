'use client'

import { useState, useEffect } from 'react'
import ProfessionalHeader from '../../components/ProfessionalHeader'
import ExperimentCard from '../../components/ExperimentCard'
import { FlaskConical, Filter, Search, SortDesc, Grid, List, Target, Zap, TrendingUp, X } from 'lucide-react'

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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const headerStats = [
    { label: 'Experimentos', value: '2.500+', color: 'text-blue-400' },
    { label: 'Realizados', value: '45.8M+', color: 'text-green-400' },
    { label: 'Satisfação', value: '99.2%', color: 'text-purple-400' },
    { label: 'Países', value: '195', color: 'text-orange-400' }
  ]

  const categories = [
    'Química Geral', 'Química Orgânica', 'Físico-Química', 
    'Química Analítica', 'Bioquímica', 'Eletroquímica'
  ]

  const mockExperiments: Experiment[] = [
    {
      id: '1',
      title: 'Titulação Ácido-Base com Curva de pH',
      description: 'Realize uma titulação completa com monitoramento em tempo real da curva de pH, identificando pontos de equivalência e usando indicadores visuais.',
      difficulty: 'Intermediário',
      duration: 45,
      category: 'Química Analítica',
      subcategory: 'Análise Volumétrica',
      rating: 4.9,
      completions: 234567,
      equipment: ['Bureta digital', 'Erlenmeyer', 'pHmetro', 'Agitador magnético', 'Pipeta volumétrica'],
      chemicals: ['HCl 0,1 M', 'NaOH 0,1 M', 'Fenolftaleína', 'Azul de bromotimol'],
      safetyLevel: 'Médio',
      objectives: [
        'Compreender o conceito de titulação',
        'Interpretar curvas de titulação',
        'Calcular concentrações desconhecidas',
        'Identificar pontos de equivalência'
      ],
      procedure: [
        'Preparar a solução de HCl 0,1 M no erlenmeyer',
        'Adicionar algumas gotas de indicador',
        'Encher a bureta com NaOH 0,1 M',
        'Titular gota a gota até mudança de cor',
        'Registrar o volume gasto na equivalência'
      ],
      theory: 'A titulação é um método analítico quantitativo usado para determinar a concentração de uma solução através da reação com outra solução de concentração conhecida.',
      applications: ['Controle de qualidade', 'Análise ambiental', 'Indústria farmacêutica'],
      isPopular: true,
      isFeatured: true,
      thumbnail: '🧪',
      tags: ['titulação', 'pH', 'ácido', 'base', 'indicador'],
      learningOutcomes: ['Domínio de técnicas analíticas', 'Interpretação de dados'],
      relatedExperiments: ['2', '3']
    },
    {
      id: '2',
      title: 'Síntese e Cristalização do Sulfato de Cobre',
      description: 'Sintetize cristais de sulfato de cobre pentahidratado através de reação controlada e observe o processo de cristalização em diferentes condições.',
      difficulty: 'Iniciante',
      duration: 60,
      category: 'Química Geral',
      subcategory: 'Síntese Inorgânica',
      rating: 4.7,
      completions: 189234,
      equipment: ['Béquer', 'Bastão de vidro', 'Placa de aquecimento', 'Funil', 'Papel filtro'],
      chemicals: ['Ácido sulfúrico', 'Óxido de cobre', 'Água destilada'],
      safetyLevel: 'Alto',
      objectives: [
        'Realizar síntese inorgânica segura',
        'Observar processo de cristalização',
        'Compreender estruturas cristalinas',
        'Calcular rendimento da reação'
      ],
      procedure: [
        'Misturar óxido de cobre com ácido sulfúrico diluído',
        'Aquecer a mistura em banho-maria',
        'Filtrar a solução para remover impurezas',
        'Concentrar por evaporação controlada',
        'Observar formação dos cristais azuis'
      ],
      theory: 'A cristalização é um processo de separação onde sólidos dissolvidos formam cristais organizados ao atingir condições de supersaturação.',
      applications: ['Purificação de compostos', 'Produção industrial', 'Caracterização de materiais'],
      isNew: true,
      thumbnail: '💎',
      tags: ['cristalização', 'síntese', 'sulfato', 'cobre', 'inorgânica'],
      learningOutcomes: ['Técnicas de síntese', 'Análise de cristais'],
      relatedExperiments: ['1', '4']
    },
    {
      id: '3',
      title: 'Eletroquímica: Pilha de Daniell Interativa',
      description: 'Construa uma pilha galvânica clássica e monitore a diferença de potencial, fluxo de elétrons e mudanças nas soluções em tempo real.',
      difficulty: 'Avançado',
      duration: 50,
      category: 'Eletroquímica',
      subcategory: 'Células Galvânicas',
      rating: 4.8,
      completions: 156789,
      equipment: ['Voltímetro digital', 'Eletrodos de Cu e Zn', 'Ponte salina', 'Béqueres', 'Fios condutores'],
      chemicals: ['CuSO₄ 1M', 'ZnSO₄ 1M', 'KCl (ponte salina)'],
      safetyLevel: 'Baixo',
      objectives: [
        'Construir células galvânicas',
        'Medir potenciais de eletrodo',
        'Compreender fluxo eletrônico',
        'Aplicar equação de Nernst'
      ],
      procedure: [
        'Preparar soluções de sulfato de cobre e zinco',
        'Conectar eletrodos aos respectivos béqueres',
        'Instalar ponte salina entre as soluções',
        'Conectar voltímetro e medir ddp inicial',
        'Acompanhar variação do potencial no tempo'
      ],
      theory: 'Células galvânicas convertem energia química em elétrica através de reações redox espontâneas, com elétrons fluindo do ânodo para o cátodo.',
      applications: ['Baterias comerciais', 'Proteção catódica', 'Sensores eletroquímicos'],
      isPopular: true,
      thumbnail: '⚡',
      tags: ['eletroquímica', 'pilha', 'potencial', 'eletrodo', 'redox'],
      learningOutcomes: ['Princípios eletroquímicos', 'Medições elétricas'],
      relatedExperiments: ['1', '5']
    },
    {
      id: '4',
      title: 'Síntese de Sabão Natural - Saponificação',
      description: 'Produza sabão artesanal através da reação de saponificação, explorando a química dos ésteres e bases fortes.',
      difficulty: 'Intermediário',
      duration: 90,
      category: 'Química Orgânica',
      subcategory: 'Reações de Substituição',
      rating: 4.7,
      completions: 234567,
      equipment: ['Béqueres grandes', 'Bastão de vidro', 'Balança', 'Termômetro', 'Formas de silicone'],
      chemicals: ['Óleo de coco/oliva', 'Hidróxido de sódio (NaOH)', 'Água destilada', 'Essências naturais'],
      safetyLevel: 'Médio',
      objectives: [
        'Compreender reações de saponificação',
        'Produzir sabão artesanal',
        'Calcular proporções estequiométricas',
        'Aplicar segurança química'
      ],
      procedure: [
        'Pesar óleo e calcular quantidade de NaOH necessária',
        'Dissolver NaOH em água com cuidado (exotérmica)',
        'Aquecer óleo a temperatura adequada',
        'Misturar lentamente NaOH ao óleo mexendo constantemente',
        'Adicionar essências e despejar nas formas'
      ],
      theory: 'A saponificação é uma reação entre ésteres (óleos/gorduras) e bases fortes, produzindo sabão (sal do ácido graxo) e glicerol.',
      applications: ['Indústria cosmética', 'Produtos de limpeza', 'Sabonetes artesanais'],
      isNew: true,
      thumbnail: '🧼',
      tags: ['orgânica', 'éster', 'saponificação', 'artesanal', 'sustentável'],
      learningOutcomes: ['Química orgânica aplicada', 'Sustentabilidade química'],
      relatedExperiments: ['5', '6']
    },
    {
      id: '5',
      title: 'Cristalização de Sulfato de Cobre - Geometria Molecular',
      description: 'Forme cristais perfeitos de sulfato de cobre pentahidratado e estude estruturas cristalinas e ligações químicas.',
      difficulty: 'Iniciante',
      duration: 120,
      category: 'Química Geral',
      subcategory: 'Estrutura da Matéria',
      rating: 4.9,
      completions: 456789,
      equipment: ['Béquer', 'Bastão de vidro', 'Fio de nylon', 'Lupa', 'Filtro'],
      chemicals: ['Sulfato de cobre anidro', 'Água destilada'],
      safetyLevel: 'Baixo',
      objectives: [
        'Formar cristais perfeitos',
        'Observar estruturas cristalinas',
        'Compreender solubilidade',
        'Estudar hidratação molecular'
      ],
      procedure: [
        'Preparar solução saturada de sulfato de cobre',
        'Filtrar impurezas da solução',
        'Pendurar cristal semente em fio de nylon',
        'Mergulhar na solução e aguardar crescimento',
        'Observar formação diária dos cristais'
      ],
      theory: 'Cristalização é o processo de formação de sólidos cristalinos a partir de soluções, seguindo padrões geométricos específicos.',
      applications: ['Purificação de compostos', 'Indústria farmacêutica', 'Eletrônica'],
      isPopular: true,
      isFeatured: true,
      thumbnail: '💎',
      tags: ['cristais', 'solubilidade', 'geometria', 'estrutura', 'purificação'],
      learningOutcomes: ['Estruturas cristalinas', 'Propriedades da matéria'],
      relatedExperiments: ['1', '3']
    },
    {
      id: '6',
      title: 'Extração de DNA de Morango - Bioquímica Molecular',
      description: 'Extraia DNA visível de morangos usando materiais caseiros e explore a estrutura da vida.',
      difficulty: 'Iniciante',
      duration: 45,
      category: 'Bioquímica',
      subcategory: 'Ácidos Nucleicos',
      rating: 4.8,
      completions: 345678,
      equipment: ['Liquidificador', 'Coador', 'Tubos de ensaio', 'Pipeta', 'Béquer'],
      chemicals: ['Morangos', 'Detergente', 'Sal de cozinha', 'Álcool gelado'],
      safetyLevel: 'Baixo',
      objectives: [
        'Isolar DNA de células vegetais',
        'Compreender estrutura celular',
        'Visualizar material genético',
        'Aplicar técnicas de extração'
      ],
      procedure: [
        'Triturar morangos com solução de sal e detergente',
        'Filtrar mistura para remover fragmentos',
        'Adicionar álcool gelado lentamente',
        'Observar precipitação do DNA',
        'Coletar DNA com pipeta'
      ],
      theory: 'O DNA pode ser extraído rompendo membranas celulares com detergente e precipitando com álcool devido à sua insolubilidade.',
      applications: ['Medicina forense', 'Biotecnologia', 'Testes genéticos'],
      isNew: true,
      isPopular: true,
      thumbnail: '🧬',
      tags: ['DNA', 'bioquímica', 'genética', 'extração', 'molecular'],
      learningOutcomes: ['Biologia molecular', 'Técnicas laboratoriais'],
      relatedExperiments: ['7', '8']
    }
  ]

  useEffect(() => {
    // Simular carregamento
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Professional Header */}
      <ProfessionalHeader
        title="Laboratório Virtual"
        subtitle="Realize experimentos químicos seguros e interativos com tecnologia de ponta. Mais de 2.500 experimentos profissionais ao seu alcance."
        icon={<FlaskConical className="h-8 w-8 text-white" />}
        stats={headerStats}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Advanced Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search Section */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Search className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900">Buscar Experimentos</h3>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Digite palavras-chave..."
                  className="w-full p-4 pr-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Professional Filters */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Filter className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900">Filtros Avançados</h3>
              </div>
              
              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Categoria</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="all">🌟 Todas as categorias</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === 'Química Geral' && '⚗️'} 
                        {category === 'Química Orgânica' && '🧬'} 
                        {category === 'Físico-Química' && '⚛️'} 
                        {category === 'Química Analítica' && '🔬'} 
                        {category === 'Bioquímica' && '🧪'} 
                        {category === 'Eletroquímica' && '⚡'} 
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Nível de Dificuldade</label>
                  <div className="space-y-2">
                    {['all', 'Iniciante', 'Intermediário', 'Avançado', 'Especialista'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedDifficulty(level)}
                        className={`w-full text-left p-3 rounded-xl transition-all ${
                          selectedDifficulty === level
                            ? 'bg-blue-50 text-blue-700 border-2 border-blue-200'
                            : 'hover:bg-gray-50 border-2 border-transparent'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            level === 'Iniciante' ? 'bg-green-500' :
                            level === 'Intermediário' ? 'bg-yellow-500' :
                            level === 'Avançado' ? 'bg-orange-500' :
                            level === 'Especialista' ? 'bg-red-500' : 'bg-gray-500'
                          }`}></div>
                          <span className="font-medium">
                            {level === 'all' ? 'Todos os níveis' : level}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Access */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <Zap className="h-5 w-5 text-orange-600" />
                </div>
                <h3 className="font-bold text-gray-900">Acesso Rápido</h3>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Mais Populares', icon: '🔥', action: () => setSortBy('popular') },
                  { name: 'Melhor Avaliados', icon: '⭐', action: () => setSortBy('rating') },
                  { name: 'Experimentos Novos', icon: '✨', action: () => setSortBy('newest') },
                  { name: 'Rápidos (< 30min)', icon: '⚡', action: () => setSortBy('duration') }
                ].map((item, index) => (
                  <button
                    key={index}
                    onClick={item.action}
                    className="w-full text-left p-3 bg-gray-50 hover:bg-orange-50 rounded-xl transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium text-gray-700 group-hover:text-orange-700">
                        {item.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Control Bar */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {searchQuery ? `Resultados para "${searchQuery}"` : 'Experimentos Disponíveis'}
                  </h2>
                  <p className="text-gray-600">
                    {filteredExperiments.length} experimentos encontrados
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  {/* View Mode Toggle */}
                  <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                      }`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Sort Dropdown */}
                  <div className="flex items-center space-x-2">
                    <SortDesc className="h-4 w-4 text-gray-500" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as 'popular' | 'rating' | 'newest' | 'duration')}
                      className="p-2 border-2 border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="popular">Mais Populares</option>
                      <option value="rating">Melhor Avaliados</option>
                      <option value="newest">Mais Recentes</option>
                      <option value="duration">Menor Duração</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Experiments Grid */}
            <div className={
              viewMode === 'grid' 
                ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" 
                : "space-y-4"
            }>
              {filteredExperiments.map((experiment) => (
                <ExperimentCard
                  key={experiment.id}
                  experiment={experiment}
                  onSelect={() => setSelectedExperiment(experiment)}
                  onPreview={() => console.log('Preview:', experiment.title)}
                />
              ))}
            </div>

            {/* Empty State */}
            {filteredExperiments.length === 0 && (
              <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 text-center">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Nenhum experimento encontrado
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Tente ajustar os filtros ou usar palavras-chave diferentes para encontrar experimentos.
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                    setSelectedDifficulty('all')
                    setSelectedSafety('all')
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                >
                  Limpar Filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Experiment Details Modal */}
      {selectedExperiment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{selectedExperiment.title}</h2>
              <button
                onClick={() => setSelectedExperiment(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-6">{selectedExperiment.description}</p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Objetivos</h3>
                  <ul className="space-y-2">
                    {selectedExperiment.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Target className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Equipamentos</h3>
                  <ul className="space-y-2">
                    {selectedExperiment.equipment.slice(0, 5).map((item, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Teoria Relacionada</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {selectedExperiment.theory}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
