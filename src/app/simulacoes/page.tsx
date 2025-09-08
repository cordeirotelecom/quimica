'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { ArrowLeft, RotateCcw, ZoomIn, ZoomOut, Play, Pause, SkipForward, Info, Settings, Download, Share } from 'lucide-react'
import { motion } from 'framer-motion'

const molecules = [
  {
    id: 1,
    name: "Água (H₂O)",
    formula: "H2O",
    description: "Molécula fundamental da vida com geometria angular",
    category: "Inorgânica",
    atoms: ["H", "H", "O"],
    bonds: [{ from: 0, to: 2 }, { from: 1, to: 2 }],
    geometry: "Angular",
    bondAngle: "104.5°",
    polarity: "Polar",
    applications: ["Solvente universal", "Reações biológicas", "Hidratação"],
    color: "from-blue-400 to-cyan-500"
  },
  {
    id: 2,
    name: "Metano (CH₄)",
    formula: "CH4",
    description: "Hidrocarboneto mais simples com geometria tetraédrica",
    category: "Orgânica",
    atoms: ["C", "H", "H", "H", "H"],
    bonds: [{ from: 0, to: 1 }, { from: 0, to: 2 }, { from: 0, to: 3 }, { from: 0, to: 4 }],
    geometry: "Tetraédrica",
    bondAngle: "109.5°",
    polarity: "Apolar",
    applications: ["Combustível", "Matéria-prima petroquímica", "Gás natural"],
    color: "from-green-400 to-emerald-500"
  },
  {
    id: 3,
    name: "Amônia (NH₃)",
    formula: "NH3",
    description: "Composto essencial para fertilizantes com geometria piramidal",
    category: "Inorgânica",
    atoms: ["N", "H", "H", "H"],
    bonds: [{ from: 0, to: 1 }, { from: 0, to: 2 }, { from: 0, to: 3 }],
    geometry: "Piramidal",
    bondAngle: "107°",
    polarity: "Polar",
    applications: ["Fertilizantes", "Produtos de limpeza", "Refrigeração"],
    color: "from-purple-400 to-violet-500"
  },
  {
    id: 4,
    name: "Benzeno (C₆H₆)",
    formula: "C6H6",
    description: "Hidrocarboneto aromático com estrutura em anel",
    category: "Orgânica",
    atoms: ["C", "C", "C", "C", "C", "C", "H", "H", "H", "H", "H", "H"],
    bonds: [],
    geometry: "Planar",
    bondAngle: "120°",
    polarity: "Apolar",
    applications: ["Solvente", "Matéria-prima plásticos", "Medicamentos"],
    color: "from-orange-400 to-red-500"
  },
  {
    id: 5,
    name: "Dióxido de Carbono (CO₂)",
    formula: "CO2",
    description: "Gás do efeito estufa com geometria linear",
    category: "Inorgânica",
    atoms: ["C", "O", "O"],
    bonds: [{ from: 0, to: 1, type: "double" }, { from: 0, to: 2, type: "double" }],
    geometry: "Linear",
    bondAngle: "180°",
    polarity: "Apolar",
    applications: ["Fotossíntese", "Refrigeração", "Bebidas carbonatadas"],
    color: "from-gray-400 to-slate-500"
  },
  {
    id: 6,
    name: "Etanol (C₂H₅OH)",
    formula: "C2H5OH",
    description: "Álcool comum com grupo hidroxila funcional",
    category: "Orgânica",
    atoms: ["C", "C", "O", "H", "H", "H", "H", "H", "H"],
    bonds: [],
    geometry: "Tetraédrica",
    bondAngle: "109.5°",
    polarity: "Polar",
    applications: ["Bebidas alcoólicas", "Combustível", "Solvente"],
    color: "from-yellow-400 to-amber-500"
  },
  {
    id: 7,
    name: "Cloreto de Sódio (NaCl)",
    formula: "NaCl",
    description: "Sal de cozinha com estrutura cristalina iônica",
    category: "Iônico",
    atoms: ["Na+", "Cl-"],
    bonds: [{ from: 0, to: 1, type: "ionic" }],
    geometry: "Cúbica simples",
    bondAngle: "90°",
    polarity: "Iônico",
    applications: ["Tempero", "Conservação", "Eletrólise"],
    color: "from-blue-300 to-teal-400"
  },
  {
    id: 8,
    name: "Glicose (C₆H₁₂O₆)",
    formula: "C6H12O6",
    description: "Açúcar fundamental para energia celular",
    category: "Orgânica",
    atoms: ["C", "C", "C", "C", "C", "C", "O", "O", "O", "O", "O", "O"],
    bonds: [
      { from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 },
      { from: 3, to: 4 }, { from: 4, to: 5 }, { from: 5, to: 0 }
    ],
    geometry: "Anel piranosídico",
    bondAngle: "≈109.5°",
    polarity: "Polar",
    applications: ["Energia celular", "Adoçante", "Fermentação"],
    color: "from-emerald-400 to-green-500"
  },
  {
    id: 9,
    name: "Ácido Sulfúrico (H₂SO₄)",
    formula: "H2SO4",
    description: "Ácido forte muito usado na indústria",
    category: "Inorgânica",
    atoms: ["H", "H", "S", "O", "O", "O", "O"],
    bonds: [
      { from: 0, to: 3 }, { from: 1, to: 4 }, { from: 2, to: 3 },
      { from: 2, to: 4 }, { from: 2, to: 5, type: "double" }, { from: 2, to: 6, type: "double" }
    ],
    geometry: "Tetraédrica no S",
    bondAngle: "109.5°",
    polarity: "Polar",
    applications: ["Baterias", "Fertilizantes", "Refinamento"],
    color: "from-red-400 to-pink-500"
  }
]

const simulations = [
  {
    id: 1,
    title: "Hibridização do Carbono",
    description: "Visualize como os orbitais do carbono se hibridizam em sp³, sp² e sp",
    category: "Orbitais",
    duration: "3 min",
    difficulty: "Intermediário",
    icon: "🔬"
  },
  {
    id: 2,
    title: "Formação de Ligações Iônicas",
    description: "Observe como elétrons são transferidos na formação de compostos iônicos",
    category: "Ligações",
    duration: "2 min",
    difficulty: "Iniciante",
    icon: "⚡"
  },
  {
    id: 3,
    title: "Ressonância no Benzeno",
    description: "Entenda o conceito de ressonância através da estrutura do benzeno",
    category: "Ressonância",
    duration: "4 min",
    difficulty: "Avançado",
    icon: "🌀"
  },
  {
    id: 4,
    title: "Polaridade Molecular",
    description: "Explore como a geometria molecular afeta a polaridade",
    category: "Polaridade",
    duration: "3 min",
    difficulty: "Intermediário",
    icon: "🧲"
  }
]

export default function Simulacoes() {
  const [selectedMolecule, setSelectedMolecule] = useState(molecules[0])
  const [isRotating, setIsRotating] = useState(true)
  const [showInfo, setShowInfo] = useState(false)
  const [selectedTab, setSelectedTab] = useState('moleculas')

  const getAtomColor = (atom: string) => {
    const colors: {[key: string]: string} = {
      'H': 'bg-white border-2 border-gray-400',
      'C': 'bg-gray-800',
      'N': 'bg-blue-600',
      'O': 'bg-red-600',
      'S': 'bg-yellow-500',
      'P': 'bg-orange-600'
    }
    return colors[atom] || 'bg-gray-500'
  }

  const getAtomSize = (atom: string) => {
    const sizes: {[key: string]: string} = {
      'H': 'w-8 h-8',
      'C': 'w-12 h-12',
      'N': 'w-11 h-11',
      'O': 'w-10 h-10',
      'S': 'w-14 h-14',
      'P': 'w-13 h-13'
    }
    return sizes[atom] || 'w-10 h-10'
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
          <h1 className="text-2xl font-bold text-gray-900">Simulações 3D</h1>
          <div className="w-24"></div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="mb-8 flex space-x-1 bg-white p-1 rounded-lg shadow-sm">
          <button
            onClick={() => setSelectedTab('moleculas')}
            className={`flex-1 py-3 px-6 rounded-md font-medium transition-all ${
              selectedTab === 'moleculas'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            🧬 Moléculas 3D
          </button>
          <button
            onClick={() => setSelectedTab('simulacoes')}
            className={`flex-1 py-3 px-6 rounded-md font-medium transition-all ${
              selectedTab === 'simulacoes'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            ⚗️ Simulações Dinâmicas
          </button>
        </div>

        {selectedTab === 'moleculas' ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Visualizador 3D */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedMolecule.name}</h2>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsRotating(!isRotating)}
                      className={`p-2 rounded-lg transition-all ${
                        isRotating ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {isRotating ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </button>
                    <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                      <RotateCcw className="h-5 w-5" />
                    </button>
                    <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                      <ZoomIn className="h-5 w-5" />
                    </button>
                    <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                      <ZoomOut className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Visualizador 3D Simulado */}
                <div className="aspect-square bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={isRotating ? { rotateY: 360 } : {}}
                      transition={isRotating ? { duration: 8, repeat: Infinity, ease: "linear" } : {}}
                      className="relative"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Molécula Simulada */}
                      <div className="relative">
                        {selectedMolecule.atoms.map((atom, index) => {
                          const positions = [
                            { x: 0, y: 0 }, // Centro
                            { x: -60, y: -40 }, { x: 60, y: -40 }, // Superiores
                            { x: -80, y: 40 }, { x: 80, y: 40 }, // Inferiores
                            { x: 0, y: 80 }, { x: -40, y: -80 }, { x: 40, y: -80 }
                          ]
                          const pos = positions[index] || { x: 0, y: 0 }
                          
                          return (
                            <motion.div
                              key={index}
                              className={`absolute ${getAtomSize(atom)} ${getAtomColor(atom)} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg`}
                              style={{
                                left: `calc(50% + ${pos.x}px)`,
                                top: `calc(50% + ${pos.y}px)`,
                                transform: 'translate(-50%, -50%)'
                              }}
                              whileHover={{ scale: 1.2 }}
                            >
                              {atom}
                            </motion.div>
                          )
                        })}
                        
                        {/* Ligações */}
                        {selectedMolecule.bonds.map((bond, index) => (
                          <div
                            key={index}
                            className="absolute h-1 bg-gray-400 rounded"
                            style={{
                              width: '60px',
                              left: '50%',
                              top: '50%',
                              transform: 'translate(-50%, -50%)',
                              transformOrigin: 'center'
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Controles de Sobreposição */}
                  <div className="absolute bottom-4 left-4 text-white text-sm">
                    <div>Fórmula: {selectedMolecule.formula}</div>
                    <div>Geometria: {selectedMolecule.geometry}</div>
                  </div>
                </div>

                {/* Controles */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Download className="h-4 w-4" />
                      <span>Exportar</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                      <Share className="h-4 w-4" />
                      <span>Compartilhar</span>
                    </button>
                  </div>
                  <button
                    onClick={() => setShowInfo(!showInfo)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      showInfo ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Info className="h-4 w-4" />
                    <span>Informações</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Painel Lateral */}
            <div className="space-y-6">
              {/* Seletor de Moléculas */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Moléculas Disponíveis</h3>
                <div className="space-y-2">
                  {molecules.map(molecule => (
                    <button
                      key={molecule.id}
                      onClick={() => setSelectedMolecule(molecule)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        selectedMolecule.id === molecule.id
                          ? 'bg-blue-50 border-2 border-blue-200'
                          : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                      }`}
                    >
                      <div className="font-medium text-gray-900">{molecule.name}</div>
                      <div className="text-sm text-gray-600">{molecule.formula}</div>
                      <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                        molecule.category === 'Orgânica' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {molecule.category}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Informações da Molécula */}
              {showInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Propriedades</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Geometria:</span>
                      <span className="font-medium">{selectedMolecule.geometry}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ângulo de Ligação:</span>
                      <span className="font-medium">{selectedMolecule.bondAngle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Polaridade:</span>
                      <span className={`font-medium ${
                        selectedMolecule.polarity === 'Polar' ? 'text-blue-600' : 'text-gray-600'
                      }`}>
                        {selectedMolecule.polarity}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Aplicações */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-green-900 mb-4">🔬 Aplicações</h3>
                <ul className="space-y-2">
                  {selectedMolecule.applications.map((app, index) => (
                    <li key={index} className="flex items-start space-x-2 text-green-800">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{app}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legenda de Átomos */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">🎨 Legenda</h3>
                <div className="space-y-3">
                  {['H', 'C', 'N', 'O', 'S', 'P'].map(atom => (
                    <div key={atom} className="flex items-center space-x-3">
                      <div className={`w-6 h-6 ${getAtomColor(atom)} rounded-full flex items-center justify-center text-white text-xs font-bold`}>
                        {atom}
                      </div>
                      <span className="text-sm text-gray-700">
                        {atom === 'H' ? 'Hidrogênio' :
                         atom === 'C' ? 'Carbono' :
                         atom === 'N' ? 'Nitrogênio' :
                         atom === 'O' ? 'Oxigênio' :
                         atom === 'S' ? 'Enxofre' : 'Fósforo'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Simulações Dinâmicas */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {simulations.map(simulation => (
              <motion.div
                key={simulation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">{simulation.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{simulation.title}</h3>
                  <p className="text-gray-600 text-sm">{simulation.description}</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Categoria:</span>
                    <span className="text-sm font-medium text-gray-900">{simulation.category}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Duração:</span>
                    <span className="text-sm font-medium text-gray-900">{simulation.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Dificuldade:</span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      simulation.difficulty === 'Iniciante' ? 'bg-green-100 text-green-800' :
                      simulation.difficulty === 'Intermediário' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {simulation.difficulty}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center">
                  <Play className="mr-2 h-4 w-4" />
                  Iniciar Simulação
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
