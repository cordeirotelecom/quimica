'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Beaker, Thermometer, Scale, Timer, Eye, AlertTriangle, CheckCircle, RotateCcw, Play, Pause, FastForward } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Equipment {
  id: string
  name: string
  type: 'container' | 'tool' | 'substance'
  icon: string
  capacity?: number
  current?: number
  temperature?: number
  substance?: string
  color?: string
}

interface Reaction {
  id: string
  name: string
  reactants: string[]
  products: string[]
  conditions: string[]
  observations: string[]
  safety: string[]
  procedure: string[]
}

const initialEquipment: Equipment[] = [
  { id: 'beaker-250', name: 'Béquer 250mL', type: 'container', icon: '🧪', capacity: 250, current: 0 },
  { id: 'beaker-500', name: 'Béquer 500mL', type: 'container', icon: '🧪', capacity: 500, current: 0 },
  { id: 'erlenmeyer', name: 'Erlenmeyer 250mL', type: 'container', icon: '⚗️', capacity: 250, current: 0 },
  { id: 'test-tube', name: 'Tubo de Ensaio', type: 'container', icon: '🧪', capacity: 50, current: 0 },
  { id: 'burette', name: 'Bureta 50mL', type: 'tool', icon: '📏', capacity: 50, current: 50 },
  { id: 'pipette', name: 'Pipeta 25mL', type: 'tool', icon: '💉', capacity: 25, current: 0 },
  { id: 'thermometer', name: 'Termômetro', type: 'tool', icon: '🌡️', temperature: 25 },
  { id: 'scale', name: 'Balança Analítica', type: 'tool', icon: '⚖️' },
  { id: 'water', name: 'Água Destilada', type: 'substance', icon: '💧', color: 'transparent' },
  { id: 'hcl', name: 'HCl 0,1M', type: 'substance', icon: '🧪', color: 'transparent' },
  { id: 'naoh', name: 'NaOH 0,1M', type: 'substance', icon: '🧪', color: 'transparent' },
  { id: 'phenol', name: 'Fenolftaleína', type: 'substance', icon: '🧪', color: 'transparent' },
  { id: 'methyl', name: 'Azul de Metileno', type: 'substance', icon: '🧪', color: 'blue' }
]

const reactions: Reaction[] = [
  {
    id: 'acid-base-titration',
    name: 'Titulação Ácido-Base',
    reactants: ['HCl 0,1M', 'NaOH 0,1M', 'Fenolftaleína'],
    products: ['NaCl', 'H₂O'],
    conditions: ['Temperatura ambiente', 'Agitação constante'],
    observations: ['Mudança de cor no ponto de viragem', 'pH neutro ao final'],
    safety: ['Use óculos de proteção', 'Trabalhe em capela', 'Evite contato com a pele'],
    procedure: [
      'Adicione 25mL de HCl 0,1M no erlenmeyer',
      'Adicione 2-3 gotas de fenolftaleína',
      'Preencha a bureta com NaOH 0,1M',
      'Titule lentamente até mudança de cor',
      'Anote o volume gasto'
    ]
  },
  {
    id: 'crystallization',
    name: 'Cristalização do Sal',
    reactants: ['NaCl', 'Água Destilada'],
    products: ['Cristais de NaCl'],
    conditions: ['Aquecimento', 'Resfriamento lento'],
    observations: ['Dissolução completa', 'Formação de cristais'],
    safety: ['Cuidado com superfícies quentes', 'Use luvas térmicas'],
    procedure: [
      'Adicione água ao béquer',
      'Aqueça até 80°C',
      'Adicione sal até saturar',
      'Resfrie lentamente',
      'Observe a cristalização'
    ]
  }
]

export default function LaboratorioVirtual() {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>([])
  const [workbench, setWorkbench] = useState<Equipment[]>([])
  const [currentReaction, setCurrentReaction] = useState<Reaction | null>(null)
  const [isExperimentRunning, setIsExperimentRunning] = useState(false)
  const [experimentStep, setExperimentStep] = useState(0)
  const [observations, setObservations] = useState<string[]>([])
  const [temperature, setTemperature] = useState(25)
  const [timer, setTimer] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning])

  const addToWorkbench = (equipment: Equipment) => {
    const newEquipment = { ...equipment, id: `${equipment.id}-${Date.now()}` }
    setWorkbench([...workbench, newEquipment])
  }

  const removeFromWorkbench = (id: string) => {
    setWorkbench(workbench.filter(item => item.id !== id))
  }

  const startExperiment = (reaction: Reaction) => {
    setCurrentReaction(reaction)
    setIsExperimentRunning(true)
    setExperimentStep(0)
    setObservations([])
    setTimer(0)
    setIsTimerRunning(true)
  }

  const nextStep = () => {
    if (currentReaction && experimentStep < currentReaction.procedure.length - 1) {
      setExperimentStep(experimentStep + 1)
      
      // Simulação de observações baseadas no passo
      const newObservations = [
        'Adição realizada com sucesso',
        'Mistura homogênea obtida',
        'Mudança de coloração observada',
        'Precipitado formado',
        'Reação completa'
      ]
      
      if (newObservations[experimentStep]) {
        setObservations([...observations, newObservations[experimentStep]])
      }
    }
  }

  const resetExperiment = () => {
    setCurrentReaction(null)
    setIsExperimentRunning(false)
    setExperimentStep(0)
    setObservations([])
    setTimer(0)
    setIsTimerRunning(false)
    setTemperature(25)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
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
          <h1 className="text-2xl font-bold text-gray-900">Laboratório Virtual Avançado</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Timer className="h-4 w-4" />
              <span>{formatTime(timer)}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Thermometer className="h-4 w-4" />
              <span>{temperature}°C</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Equipamentos */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">🧪 Equipamentos</h3>
              
              {/* Recipientes */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Recipientes</h4>
                <div className="space-y-2">
                  {initialEquipment.filter(eq => eq.type === 'container').map(equipment => (
                    <button
                      key={equipment.id}
                      onClick={() => addToWorkbench(equipment)}
                      className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{equipment.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 text-sm">{equipment.name}</div>
                          {equipment.capacity && (
                            <div className="text-xs text-gray-600">{equipment.capacity}mL</div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Instrumentos */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Instrumentos</h4>
                <div className="space-y-2">
                  {initialEquipment.filter(eq => eq.type === 'tool').map(equipment => (
                    <button
                      key={equipment.id}
                      onClick={() => addToWorkbench(equipment)}
                      className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{equipment.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 text-sm">{equipment.name}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Reagentes */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Reagentes</h4>
                <div className="space-y-2">
                  {initialEquipment.filter(eq => eq.type === 'substance').map(equipment => (
                    <button
                      key={equipment.id}
                      onClick={() => addToWorkbench(equipment)}
                      className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{equipment.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 text-sm">{equipment.name}</div>
                        </div>
                        {equipment.color && (
                          <div 
                            className="w-3 h-3 rounded-full border border-gray-300"
                            style={{ backgroundColor: equipment.color === 'transparent' ? '#f0f0f0' : equipment.color }}
                          ></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bancada Principal */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">🔬 Bancada de Trabalho</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className={`p-2 rounded-lg ${isTimerRunning ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}
                  >
                    {isTimerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={resetExperiment}
                    className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Área de Trabalho */}
              <div className="min-h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-dashed border-gray-300">
                {workbench.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <Beaker className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                      <p>Arraste equipamentos para a bancada</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-4">
                    <AnimatePresence>
                      {workbench.map(equipment => (
                        <motion.div
                          key={equipment.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="relative group"
                        >
                          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all">
                            <button
                              onClick={() => removeFromWorkbench(equipment.id)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                            >
                              ×
                            </button>
                            <div className="text-center">
                              <div className="text-3xl mb-2">{equipment.icon}</div>
                              <div className="text-xs font-medium text-gray-700">{equipment.name}</div>
                              {equipment.current !== undefined && (
                                <div className="text-xs text-gray-500 mt-1">
                                  {equipment.current}/{equipment.capacity}mL
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Controles de Experimento */}
              {currentReaction && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-bold text-blue-900 mb-2">Experimento: {currentReaction.name}</h4>
                  <div className="mb-4">
                    <div className="text-sm text-blue-800 mb-2">
                      Passo {experimentStep + 1} de {currentReaction.procedure.length}:
                    </div>
                    <div className="font-medium text-blue-900">
                      {currentReaction.procedure[experimentStep]}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={nextStep}
                      disabled={experimentStep >= currentReaction.procedure.length - 1}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      Próximo Passo
                    </button>
                    <button
                      onClick={resetExperiment}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                    >
                      Finalizar
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Observações */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                Observações do Experimento
              </h3>
              <div className="space-y-2">
                {observations.length === 0 ? (
                  <p className="text-gray-500 text-sm">Nenhuma observação registrada ainda.</p>
                ) : (
                  observations.map((obs, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg"
                    >
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span className="text-sm text-green-800">{obs}</span>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Painel Lateral */}
          <div className="lg:col-span-1 space-y-6">
            {/* Experimentos Disponíveis */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">⚗️ Experimentos</h3>
              <div className="space-y-3">
                {reactions.map(reaction => (
                  <div key={reaction.id} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">{reaction.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Reagentes: {reaction.reactants.join(', ')}
                    </p>
                    <button
                      onClick={() => startExperiment(reaction)}
                      disabled={isExperimentRunning}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
                    >
                      {isExperimentRunning ? 'Em Andamento' : 'Iniciar'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Segurança */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-yellow-900 mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Segurança
              </h3>
              <ul className="space-y-2 text-sm text-yellow-800">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                  <span>Use sempre EPIs adequados</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                  <span>Mantenha a bancada organizada</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                  <span>Leia os procedimentos antes de iniciar</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                  <span>Descarte reagentes adequadamente</span>
                </li>
              </ul>
            </div>

            {/* Controles Ambientais */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">🌡️ Ambiente</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Temperatura: {temperature}°C
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={temperature}
                    onChange={(e) => setTemperature(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-medium text-gray-900">Pressão</div>
                    <div className="text-gray-600">1 atm</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-medium text-gray-900">Umidade</div>
                    <div className="text-gray-600">45%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
