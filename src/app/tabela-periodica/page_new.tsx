'use client'

import { useState, useEffect } from 'react'
import ProfessionalHeader from '../../components/ProfessionalHeader'
import { 
  Search, Filter, Info, Thermometer,
  AtomIcon, Book, FlaskConical, Layers, Target,
  ChevronRight, Star, Sparkles, Database
} from 'lucide-react'

interface Element {
  symbol: string
  name: string
  atomicNumber: number
  atomicMass: number
  category: string
  period: number
  group: number
  electronConfiguration: string
  density?: number
  meltingPoint?: number
  boilingPoint?: number
  discoveryYear?: number
  discoverer?: string
  color: string
  applications: string[]
  properties: string[]
  abundance?: string
  healthEffects?: string
  environmentalImpact?: string
}

const elements: Element[] = [
  // Período 1
  { symbol: 'H', name: 'Hidrogênio', atomicNumber: 1, atomicMass: 1.008, category: 'nonmetal', period: 1, group: 1, electronConfiguration: '1s¹', density: 0.0899, meltingPoint: -259.16, boilingPoint: -252.87, discoveryYear: 1766, discoverer: 'Henry Cavendish', color: 'bg-gradient-to-br from-green-100 to-green-200 hover:from-green-200 hover:to-green-300', applications: ['Combustível de foguetes', 'Produção de amônia', 'Hidratação de óleos'], properties: ['Mais leve dos elementos', 'Altamente inflamável', 'Incolor e inodoro'], abundance: 'Mais abundante no universo', healthEffects: 'Não tóxico, mas pode causar asfixia', environmentalImpact: 'Combustível limpo' },
  { symbol: 'He', name: 'Hélio', atomicNumber: 2, atomicMass: 4.003, category: 'noble-gas', period: 1, group: 18, electronConfiguration: '1s²', density: 0.1785, meltingPoint: -272.2, boilingPoint: -268.93, discoveryYear: 1895, discoverer: 'William Ramsay', color: 'bg-gradient-to-br from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300', applications: ['Balões e dirigíveis', 'Criogenia', 'Soldagem'], properties: ['Gás nobre', 'Quimicamente inerte', 'Segundo elemento mais leve'], abundance: 'Segundo mais abundante no universo', healthEffects: 'Não tóxico', environmentalImpact: 'Recurso não renovável' },

  // Período 2
  { symbol: 'Li', name: 'Lítio', atomicNumber: 3, atomicMass: 6.94, category: 'alkali-metal', period: 2, group: 1, electronConfiguration: '[He] 2s¹', density: 0.534, meltingPoint: 180.54, boilingPoint: 1342, discoveryYear: 1817, discoverer: 'Johan August Arfwedson', color: 'bg-gradient-to-br from-red-100 to-red-200 hover:from-red-200 hover:to-red-300', applications: ['Baterias de íon-lítio', 'Medicamentos psiquiátricos', 'Ligas metálicas'], properties: ['Metal mais leve', 'Altamente reativo', 'Flutua na água'], abundance: 'Relativamente raro na crosta terrestre', healthEffects: 'Tóxico em altas doses', environmentalImpact: 'Mineração pode ser problemática' },
  { symbol: 'Be', name: 'Berílio', atomicNumber: 4, atomicMass: 9.012, category: 'alkaline-earth', period: 2, group: 2, electronConfiguration: '[He] 2s²', density: 1.85, meltingPoint: 1287, boilingPoint: 2469, discoveryYear: 1797, discoverer: 'Louis Nicolas Vauquelin', color: 'bg-gradient-to-br from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300', applications: ['Ligas aeroespaciais', 'Instrumentos de precisão', 'Reatores nucleares'], properties: ['Extremamente leve e rígido', 'Resistente à corrosão', 'Transparente aos raios-X'], abundance: 'Raro na crosta terrestre', healthEffects: 'Altamente tóxico e carcinogênico', environmentalImpact: 'Perigoso para trabalhadores' },
  { symbol: 'B', name: 'Boro', atomicNumber: 5, atomicMass: 10.81, category: 'metalloid', period: 2, group: 13, electronConfiguration: '[He] 2s² 2p¹', density: 2.34, meltingPoint: 2076, boilingPoint: 4000, discoveryYear: 1808, discoverer: 'Gay-Lussac & Thénard', color: 'bg-gradient-to-br from-yellow-100 to-yellow-200 hover:from-yellow-200 hover:to-yellow-300', applications: ['Vidro borossilicato', 'Reatores nucleares', 'Fibras cerâmicas'], properties: ['Metaloide', 'Semiconductor', 'Dureza elevada'], abundance: 'Raro na crosta terrestre', healthEffects: 'Essencial em traços, tóxico em excesso', environmentalImpact: 'Impacto mínimo' },
  { symbol: 'C', name: 'Carbono', atomicNumber: 6, atomicMass: 12.011, category: 'nonmetal', period: 2, group: 14, electronConfiguration: '[He] 2s² 2p²', density: 2.267, meltingPoint: 3550, boilingPoint: 4027, discoveryYear: -3750, discoverer: 'Pré-histórico', color: 'bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300', applications: ['Base da vida orgânica', 'Diamantes industriais', 'Grafeno e nanotubos'], properties: ['Forma múltiplas ligações', 'Variedade de alótropos', 'Base da química orgânica'], abundance: 'Quarto elemento mais abundante no universo', healthEffects: 'Essencial para a vida', environmentalImpact: 'Central no ciclo do carbono' },
  { symbol: 'N', name: 'Nitrogênio', atomicNumber: 7, atomicMass: 14.007, category: 'nonmetal', period: 2, group: 15, electronConfiguration: '[He] 2s² 2p³', density: 1.251, meltingPoint: -210.01, boilingPoint: -195.79, discoveryYear: 1772, discoverer: 'Daniel Rutherford', color: 'bg-gradient-to-br from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300', applications: ['Fertilizantes', 'Preservação de alimentos', 'Produção de explosivos'], properties: ['Gás diatômico', 'Quimicamente inerte', 'Essencial para proteínas'], abundance: '78% da atmosfera terrestre', healthEffects: 'Essencial para vida, mas N₂ pode causar asfixia', environmentalImpact: 'Ciclo do nitrogênio vital' },
  { symbol: 'O', name: 'Oxigênio', atomicNumber: 8, atomicMass: 15.999, category: 'nonmetal', period: 2, group: 16, electronConfiguration: '[He] 2s² 2p⁴', density: 1.429, meltingPoint: -218.79, boilingPoint: -182.95, discoveryYear: 1774, discoverer: 'Joseph Priestley', color: 'bg-gradient-to-br from-cyan-100 to-cyan-200 hover:from-cyan-200 hover:to-cyan-300', applications: ['Respiração', 'Combustão', 'Soldagem com oxiacetileno'], properties: ['Altamente reativo', 'Suporte à combustão', 'Essencial para respiração'], abundance: '21% da atmosfera, elemento mais abundante na crosta', healthEffects: 'Essencial para vida', environmentalImpact: 'Fundamental para todos os ecossistemas' },
  { symbol: 'F', name: 'Flúor', atomicNumber: 9, atomicMass: 18.998, category: 'halogen', period: 2, group: 17, electronConfiguration: '[He] 2s² 2p⁵', density: 1.696, meltingPoint: -219.67, boilingPoint: -188.11, discoveryYear: 1886, discoverer: 'Henri Moissan', color: 'bg-gradient-to-br from-teal-100 to-teal-200 hover:from-teal-200 hover:to-teal-300', applications: ['Pasta de dente', 'Refrigerantes', 'Teflon'], properties: ['Elemento mais eletronegativo', 'Extremamente reativo', 'Gás amarelo-pálido'], abundance: '13º elemento mais abundante na crosta', healthEffects: 'Benéfico em pequenas doses, tóxico em excesso', environmentalImpact: 'CFCs destruíram camada de ozônio' },
  { symbol: 'Ne', name: 'Neônio', atomicNumber: 10, atomicMass: 20.180, category: 'noble-gas', period: 2, group: 18, electronConfiguration: '[He] 2s² 2p⁶', density: 0.9002, meltingPoint: -248.59, boilingPoint: -246.08, discoveryYear: 1898, discoverer: 'William Ramsay', color: 'bg-gradient-to-br from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300', applications: ['Sinais luminosos', 'Lasers', 'Criogenia'], properties: ['Gás nobre', 'Quimicamente inerte', 'Emite luz vermelha-laranja'], abundance: 'Raro na atmosfera terrestre', healthEffects: 'Não tóxico', environmentalImpact: 'Impacto mínimo' },

  // Período 3
  { symbol: 'Na', name: 'Sódio', atomicNumber: 11, atomicMass: 22.990, category: 'alkali-metal', period: 3, group: 1, electronConfiguration: '[Ne] 3s¹', density: 0.971, meltingPoint: 97.79, boilingPoint: 883, discoveryYear: 1807, discoverer: 'Humphry Davy', color: 'bg-gradient-to-br from-red-100 to-red-200 hover:from-red-200 hover:to-red-300', applications: ['Sal de cozinha', 'Lâmpadas de vapor', 'Refrigerante nuclear'], properties: ['Metal macio', 'Altamente reativo', 'Conduz eletricidade'], abundance: 'Sexto elemento mais abundante', healthEffects: 'Essencial para vida, mas excesso causa hipertensão', environmentalImpact: 'Abundante e reciclável' },
  { symbol: 'Mg', name: 'Magnésio', atomicNumber: 12, atomicMass: 24.305, category: 'alkaline-earth', period: 3, group: 2, electronConfiguration: '[Ne] 3s²', density: 1.738, meltingPoint: 650, boilingPoint: 1090, discoveryYear: 1755, discoverer: 'Joseph Black', color: 'bg-gradient-to-br from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300', applications: ['Ligas leves', 'Fogos de artifício', 'Suplementos nutricionais'], properties: ['Metal leve', 'Queima com chama branca brilhante', 'Estrutural'], abundance: 'Oitavo elemento mais abundante', healthEffects: 'Essencial para músculos e ossos', environmentalImpact: 'Reciclável e abundante' },
  { symbol: 'Al', name: 'Alumínio', atomicNumber: 13, atomicMass: 26.982, category: 'post-transition', period: 3, group: 13, electronConfiguration: '[Ne] 3s² 3p¹', density: 2.7, meltingPoint: 660.32, boilingPoint: 2519, discoveryYear: 1825, discoverer: 'Hans Christian Ørsted', color: 'bg-gradient-to-br from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300', applications: ['Embalagens', 'Construção civil', 'Aviação'], properties: ['Leve e resistente', 'Resistente à corrosão', 'Conduz calor e eletricidade'], abundance: 'Metal mais abundante na crosta', healthEffects: 'Geralmente seguro, ligação com Alzheimer controversa', environmentalImpact: 'Altamente reciclável' },
  { symbol: 'Si', name: 'Silício', atomicNumber: 14, atomicMass: 28.085, category: 'metalloid', period: 3, group: 14, electronConfiguration: '[Ne] 3s² 3p²', density: 2.3296, meltingPoint: 1414, boilingPoint: 3265, discoveryYear: 1824, discoverer: 'Jöns Jakob Berzelius', color: 'bg-gradient-to-br from-yellow-100 to-yellow-200 hover:from-yellow-200 hover:to-yellow-300', applications: ['Microchips', 'Vidro', 'Painéis solares'], properties: ['Semiconductor', 'Cristalino', 'Base da eletrônica'], abundance: 'Segundo elemento mais abundante na crosta', healthEffects: 'Silicose por inalação de poeira', environmentalImpact: 'Base da indústria eletrônica' },
  { symbol: 'P', name: 'Fósforo', atomicNumber: 15, atomicMass: 30.974, category: 'nonmetal', period: 3, group: 15, electronConfiguration: '[Ne] 3s² 3p³', density: 1.823, meltingPoint: 44.15, boilingPoint: 277, discoveryYear: 1669, discoverer: 'Hennig Brand', color: 'bg-gradient-to-br from-green-100 to-green-200 hover:from-green-200 hover:to-green-300', applications: ['Fertilizantes', 'Fósforos', 'DNA/RNA'], properties: ['Essencial para vida', 'Fosforescente', 'Altamente reativo'], abundance: '11º elemento mais abundante', healthEffects: 'Essencial para ossos e DNA', environmentalImpact: 'Causa eutrofização em excesso' },
  { symbol: 'S', name: 'Enxofre', atomicNumber: 16, atomicMass: 32.06, category: 'nonmetal', period: 3, group: 16, electronConfiguration: '[Ne] 3s² 3p⁴', density: 2.067, meltingPoint: 115.21, boilingPoint: 444.61, discoveryYear: -2000, discoverer: 'Conhecido na antiguidade', color: 'bg-gradient-to-br from-yellow-200 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400', applications: ['Ácido sulfúrico', 'Vulcanização da borracha', 'Fungicidas'], properties: ['Amarelo cristalino', 'Odor característico', 'Múltiplas formas alotrópicas'], abundance: '16º elemento mais abundante', healthEffects: 'Essencial para proteínas', environmentalImpact: 'Causa chuva ácida como SO₂' },
  { symbol: 'Cl', name: 'Cloro', atomicNumber: 17, atomicMass: 35.45, category: 'halogen', period: 3, group: 17, electronConfiguration: '[Ne] 3s² 3p⁵', density: 3.214, meltingPoint: -101.5, boilingPoint: -34.04, discoveryYear: 1774, discoverer: 'Carl Wilhelm Scheele', color: 'bg-gradient-to-br from-teal-100 to-teal-200 hover:from-teal-200 hover:to-teal-300', applications: ['Desinfetante', 'PVC', 'Tratamento de água'], properties: ['Gás amarelo-esverdeado', 'Altamente reativo', 'Odor irritante'], abundance: '21º elemento mais abundante', healthEffects: 'Tóxico, mas usado para desinfecção', environmentalImpact: 'Organoclorados são persistentes' },
  { symbol: 'Ar', name: 'Argônio', atomicNumber: 18, atomicMass: 39.948, category: 'noble-gas', period: 3, group: 18, electronConfiguration: '[Ne] 3s² 3p⁶', density: 1.784, meltingPoint: -189.35, boilingPoint: -185.85, discoveryYear: 1894, discoverer: 'Lord Rayleigh', color: 'bg-gradient-to-br from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300', applications: ['Soldagem', 'Lâmpadas incandescentes', 'Atmosfera inerte'], properties: ['Gás nobre', 'Quimicamente inerte', 'Terceiro gás mais abundante'], abundance: '0.93% da atmosfera', healthEffects: 'Não tóxico', environmentalImpact: 'Impacto mínimo' }
]

const categories = [
  { name: 'Metais Alcalinos', color: 'bg-red-100', category: 'alkali-metal', icon: '🔴', description: 'Grupo 1, altamente reativos' },
  { name: 'Metais Alcalino-terrosos', color: 'bg-orange-100', category: 'alkaline-earth', icon: '🟠', description: 'Grupo 2, reativos mas menos que alcalinos' },
  { name: 'Metaloides', color: 'bg-yellow-100', category: 'metalloid', icon: '🟡', description: 'Propriedades intermediárias' },
  { name: 'Não-metais', color: 'bg-green-100', category: 'nonmetal', icon: '🟢', description: 'Não conduzem eletricidade' },
  { name: 'Halogênios', color: 'bg-teal-100', category: 'halogen', icon: '🔵', description: 'Grupo 17, muito reativos' },
  { name: 'Gases Nobres', color: 'bg-purple-100', category: 'noble-gas', icon: '🟣', description: 'Grupo 18, quimicamente inertes' },
  { name: 'Metais de Transição', color: 'bg-blue-100', category: 'transition-metal', icon: '🔷', description: 'Grupos 3-12, múltiplos estados de oxidação' },
  { name: 'Metais Pós-transição', color: 'bg-slate-100', category: 'post-transition', icon: '🔘', description: 'Metais pesados e macios' }
]

export default function TabelaPeriodicaProfessional() {
  const [selectedElement, setSelectedElement] = useState<Element>(elements[0])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
  const [isLoading, setIsLoading] = useState(true)

  const headerStats = [
    { label: 'Elementos', value: `${elements.length}`, color: 'text-blue-400' },
    { label: 'Grupos', value: '18', color: 'text-green-400' },
    { label: 'Períodos', value: '7', color: 'text-purple-400' },
    { label: 'Categorias', value: '8', color: 'text-orange-400' }
  ]

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  const filteredElements = elements.filter(element => {
    const matchesSearch = element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         element.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         element.atomicNumber.toString().includes(searchTerm)
    const matchesCategory = filterCategory === 'all' || element.category === filterCategory
    return matchesSearch && matchesCategory
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Carregando Tabela Periódica...</h2>
          <p className="text-gray-600">Organizando elementos químicos</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Professional Header */}
      <ProfessionalHeader
        title="Tabela Periódica Interativa"
        subtitle="Explore os elementos químicos com dados profissionais, propriedades detalhadas e aplicações industriais."
        icon={<AtomIcon className="h-8 w-8 text-white" />}
        stats={headerStats}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Search className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900">Buscar Elementos</h3>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nome, símbolo ou número..."
                  className="w-full p-4 pr-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Filter className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900">Categorias</h3>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => setFilterCategory('all')}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    filterCategory === 'all' 
                      ? 'bg-blue-50 border-2 border-blue-200 text-blue-800' 
                      : 'hover:bg-gray-50 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">⚛️</span>
                    <div>
                      <div className="font-medium">Todos os Elementos</div>
                      <div className="text-xs text-gray-500">{elements.length} elementos</div>
                    </div>
                  </div>
                </button>
                
                {categories.map((category) => (
                  <button
                    key={category.category}
                    onClick={() => setFilterCategory(category.category)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      filterCategory === category.category 
                        ? 'bg-blue-50 border-2 border-blue-200 text-blue-800' 
                        : 'hover:bg-gray-50 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{category.icon}</span>
                      <div>
                        <div className="font-medium">{category.name}</div>
                        <div className="text-xs text-gray-500">{category.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">
            {/* Control Bar */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {searchTerm ? `Resultados para "${searchTerm}"` : 'Elementos Disponíveis'}
                  </h2>
                  <p className="text-gray-600">
                    {filteredElements.length} de {elements.length} elementos
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('table')}
                      className={`px-4 py-2 rounded-md transition-colors ${
                        viewMode === 'table' 
                          ? 'bg-white shadow-sm text-blue-600' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <AtomIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('cards')}
                      className={`px-4 py-2 rounded-md transition-colors ${
                        viewMode === 'cards' 
                          ? 'bg-white shadow-sm text-blue-600' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Layers className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Elements Display */}
              <div className="lg:col-span-2">
                {viewMode === 'table' ? (
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                      {filteredElements.map((element) => (
                        <div
                          key={element.atomicNumber}
                          onClick={() => setSelectedElement(element)}
                          className={`${element.color} p-3 rounded-lg cursor-pointer transition-all duration-200 border-2 hover:border-blue-300 hover:scale-105 ${
                            selectedElement.atomicNumber === element.atomicNumber ? 'ring-2 ring-blue-500 border-blue-500' : 'border-transparent'
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-xs font-bold text-gray-600 mb-1">{element.atomicNumber}</div>
                            <div className="text-lg font-bold text-gray-900 mb-1">{element.symbol}</div>
                            <div className="text-xs text-gray-600 leading-tight">{element.name}</div>
                            <div className="text-xs text-gray-500 mt-1">{element.atomicMass}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredElements.map((element) => (
                      <div
                        key={element.atomicNumber}
                        onClick={() => setSelectedElement(element)}
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-16 h-16 ${element.color} rounded-xl flex items-center justify-center`}>
                            <span className="text-2xl font-bold text-gray-900">{element.symbol}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">Nº Atômico</div>
                            <div className="text-2xl font-bold text-gray-900">{element.atomicNumber}</div>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{element.name}</h3>
                        
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex justify-between">
                            <span>Massa Atômica:</span>
                            <span className="font-medium">{element.atomicMass}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Período:</span>
                            <span className="font-medium">{element.period}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Grupo:</span>
                            <span className="font-medium">{element.group}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <div className="text-xs font-medium text-gray-500 mb-2">Principais Aplicações:</div>
                          <div className="flex flex-wrap gap-1">
                            {element.applications.slice(0, 3).map((app, index) => (
                              <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                                {app}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Element Details Panel */}
              <div className="lg:col-span-1">
                {selectedElement && (
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-8">
                    <div className="text-center mb-6">
                      <div className={`w-20 h-20 ${selectedElement.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                        <span className="text-3xl font-bold">{selectedElement.symbol}</span>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedElement.name}</h2>
                      <p className="text-gray-600">Elemento {selectedElement.atomicNumber}</p>
                    </div>

                    <div className="space-y-6">
                      {/* Basic Properties */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                          <AtomIcon className="h-5 w-5 text-blue-500" />
                          <span>Propriedades Básicas</span>
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Massa Atômica:</span>
                            <span className="font-medium">{selectedElement.atomicMass}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Período:</span>
                            <span className="font-medium">{selectedElement.period}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Grupo:</span>
                            <span className="font-medium">{selectedElement.group}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Configuração:</span>
                            <span className="font-medium text-xs">{selectedElement.electronConfiguration}</span>
                          </div>
                          {selectedElement.density && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Densidade:</span>
                              <span className="font-medium">{selectedElement.density} g/cm³</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Applications */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                          <FlaskConical className="h-5 w-5 text-orange-500" />
                          <span>Aplicações</span>
                        </h3>
                        <ul className="space-y-2 text-sm">
                          {selectedElement.applications.map((app, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <ChevronRight className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{app}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Properties */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                          <Sparkles className="h-5 w-5 text-purple-500" />
                          <span>Características</span>
                        </h3>
                        <ul className="space-y-2 text-sm">
                          {selectedElement.properties.map((prop, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <Star className="h-3 w-3 text-yellow-500 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{prop}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Discovery */}
                      {selectedElement.discoveryYear && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                            <Book className="h-5 w-5 text-green-500" />
                            <span>Descoberta</span>
                          </h3>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Ano:</span>
                              <span className="font-medium">{selectedElement.discoveryYear}</span>
                            </div>
                            {selectedElement.discoverer && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Descobridor:</span>
                                <span className="font-medium">{selectedElement.discoverer}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Additional Info */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                          <Info className="h-5 w-5 text-blue-500" />
                          <span>Informações Adicionais</span>
                        </h3>
                        <div className="space-y-3 text-sm">
                          {selectedElement.abundance && (
                            <div>
                              <span className="text-gray-600 block mb-1">Abundância:</span>
                              <span className="text-gray-800">{selectedElement.abundance}</span>
                            </div>
                          )}
                          {selectedElement.healthEffects && (
                            <div>
                              <span className="text-gray-600 block mb-1">Efeitos na Saúde:</span>
                              <span className="text-gray-800">{selectedElement.healthEffects}</span>
                            </div>
                          )}
                          {selectedElement.environmentalImpact && (
                            <div>
                              <span className="text-gray-600 block mb-1">Impacto Ambiental:</span>
                              <span className="text-gray-800">{selectedElement.environmentalImpact}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
