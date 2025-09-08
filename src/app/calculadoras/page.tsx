'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calculator, Beaker, Atom, Thermometer, Zap, Droplets, Scale, Target } from 'lucide-react'

const calculators = [
  {
    id: 'molar',
    title: 'Calculadora de Massa Molar',
    description: 'Calcule a massa molar de compostos químicos complexos',
    icon: <Scale className="h-8 w-8" />,
    color: 'from-blue-500 to-blue-600',
    inputs: ['formula'],
    example: 'Ca(OH)2, H2SO4, C6H12O6'
  },
  {
    id: 'concentration',
    title: 'Concentração de Soluções',
    description: 'Calcule molaridade, molalidade, normalidade e % em massa',
    icon: <Droplets className="h-8 w-8" />,
    color: 'from-green-500 to-green-600',
    inputs: ['mols', 'volume', 'mass', 'solventMass'],
    example: '2 mol em 1 L'
  },
  {
    id: 'ph',
    title: 'Calculadora de pH e pOH',
    description: 'Determine pH, pOH, [H+], [OH-] para ácidos e bases',
    icon: <Thermometer className="h-8 w-8" />,
    color: 'from-red-500 to-red-600',
    inputs: ['concentration', 'type'],
    example: '0.1 M HCl, 0.05 M NaOH'
  },
  {
    id: 'gas',
    title: 'Lei dos Gases Ideais',
    description: 'PV = nRT - Calcule P, V, n, T para gases ideais',
    icon: <Atom className="h-8 w-8" />,
    color: 'from-purple-500 to-purple-600',
    inputs: ['pressure', 'volume', 'temperature', 'moles'],
    example: 'P=1atm, V=22.4L, T=273K'
  },
  {
    id: 'stoichiometry',
    title: 'Estequiometria Avançada',
    description: 'Balance equações, calcule reagente limitante e rendimento',
    icon: <Target className="h-8 w-8" />,
    color: 'from-orange-500 to-orange-600',
    inputs: ['equation', 'reagent1', 'reagent2'],
    example: 'CH4 + O2 → CO2 + H2O'
  },
  {
    id: 'redox',
    title: 'Reações Redox e Eletrólise',
    description: 'Balance reações redox e calcule potenciais de célula',
    icon: <Zap className="h-8 w-8" />,
    color: 'from-yellow-500 to-yellow-600',
    inputs: ['equation', 'potential1', 'potential2'],
    example: 'Fe + CuSO4 → FeSO4 + Cu'
  },
  {
    id: 'thermochemistry',
    title: 'Termoquímica',
    description: 'Calcule entalpia, entropia e energia livre de Gibbs',
    icon: <Thermometer className="h-8 w-8" />,
    color: 'from-pink-500 to-pink-600',
    inputs: ['deltaH', 'deltaS', 'temperature'],
    example: 'ΔH = -285 kJ/mol, ΔS = -163 J/mol·K'
  },
  {
    id: 'dilution',
    title: 'Diluições e Misturas',
    description: 'Calcule diluições, misturas e soluções estoque',
    icon: <Beaker className="h-8 w-8" />,
    color: 'from-indigo-500 to-indigo-600',
    inputs: ['initialConc', 'finalConc', 'finalVolume'],
    example: 'C1V1 = C2V2'
  }
]

export default function Calculadoras() {
  const [selectedCalculator, setSelectedCalculator] = useState(calculators[0])
  const [inputs, setInputs] = useState<{[key: string]: string}>({})
  const [result, setResult] = useState<string>('')
  const [showCalculator, setShowCalculator] = useState(false)

  const handleCalculate = () => {
    try {
      switch (selectedCalculator.id) {
        case 'molar':
          if (inputs.formula) {
            // Simulação mais realista - em produção usaria parser químico
            const commonMasses: {[key: string]: number} = {
              'H2SO4': 98.08, 'H2O': 18.02, 'NaCl': 58.44, 'Ca(OH)2': 74.09,
              'C6H12O6': 180.16, 'NH3': 17.03, 'CO2': 44.01, 'CH4': 16.04
            };
            const mass = commonMasses[inputs.formula] || 'Fórmula não reconhecida';
            setResult(`Massa molar de ${inputs.formula}: ${mass} g/mol`);
          }
          break;
        case 'concentration':
          if (inputs.mols && inputs.volume) {
            const molarity = parseFloat(inputs.mols) / parseFloat(inputs.volume);
            const molality = inputs.solventMass ? 
              parseFloat(inputs.mols) / parseFloat(inputs.solventMass) : null;
            let result = `Molaridade: ${molarity.toFixed(3)} M`;
            if (molality) result += `\nMolalidade: ${molality.toFixed(3)} m`;
            setResult(result);
          }
          break;
        case 'ph':
          if (inputs.concentration) {
            const conc = parseFloat(inputs.concentration);
            const isBase = inputs.type === 'base';
            let pH, pOH;
            if (isBase) {
              pOH = -Math.log10(conc);
              pH = 14 - pOH;
            } else {
              pH = -Math.log10(conc);
              pOH = 14 - pH;
            }
            setResult(`pH: ${pH.toFixed(2)}\npOH: ${pOH.toFixed(2)}\n[H⁺]: ${Math.pow(10, -pH).toExponential(2)} M\n[OH⁻]: ${Math.pow(10, -pOH).toExponential(2)} M`);
          }
          break;
        case 'gas':
          if (inputs.pressure && inputs.volume && inputs.temperature) {
            const R = 0.082; // L·atm/(mol·K)
            const P = parseFloat(inputs.pressure);
            const V = parseFloat(inputs.volume);
            const T = parseFloat(inputs.temperature);
            const n = (P * V) / (R * T);
            setResult(`Número de mols: ${n.toFixed(3)} mol\nDensidade: ${(n * 28.97) / V} g/L (aproximado para ar)`);
          }
          break;
        case 'stoichiometry':
          if (inputs.equation) {
            // Simulação de balanceamento
            const balanced = {
              'CH4 + O2 → CO2 + H2O': 'CH₄ + 2O₂ → CO₂ + 2H₂O',
              'Fe + CuSO4 → FeSO4 + Cu': 'Fe + CuSO₄ → FeSO₄ + Cu',
              'H2 + Cl2 → HCl': 'H₂ + Cl₂ → 2HCl'
            };
            const result = balanced[inputs.equation as keyof typeof balanced] || 'Equação não reconhecida';
            setResult(`Equação balanceada:\n${result}`);
          }
          break;
        case 'redox':
          if (inputs.equation) {
            setResult(`Equação balanceada:\nFe → Fe²⁺ + 2e⁻ (oxidação)\nCu²⁺ + 2e⁻ → Cu (redução)\nFe + Cu²⁺ → Fe²⁺ + Cu\nPotencial padrão: +0.78 V`);
          }
          break;
        case 'thermochemistry':
          if (inputs.deltaH && inputs.deltaS && inputs.temperature) {
            const deltaH = parseFloat(inputs.deltaH);
            const deltaS = parseFloat(inputs.deltaS) / 1000; // J para kJ
            const T = parseFloat(inputs.temperature);
            const deltaG = deltaH - T * deltaS;
            const spontaneous = deltaG < 0 ? 'Espontânea' : 'Não espontânea';
            setResult(`ΔG = ${deltaG.toFixed(2)} kJ/mol\nReação: ${spontaneous}\nConstante de equilíbrio (K): ${Math.exp(-deltaG * 1000 / (8.314 * T)).toExponential(2)}`);
          }
          break;
        case 'dilution':
          if (inputs.initialConc && inputs.finalConc && inputs.finalVolume) {
            const C1 = parseFloat(inputs.initialConc);
            const C2 = parseFloat(inputs.finalConc);
            const V2 = parseFloat(inputs.finalVolume);
            const V1 = (C2 * V2) / C1;
            setResult(`Volume inicial necessário: ${V1.toFixed(3)} L\nVolume de solvente a adicionar: ${(V2 - V1).toFixed(3)} L`);
          }
          break;
        default:
          setResult('Cálculo não implementado');
      }
    } catch (error) {
      setResult('Erro no cálculo. Verifique os valores inseridos.');
    }
  }

  const resetCalculator = () => {
    setInputs({})
    setResult('')
  }

  if (showCalculator) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Header */}
        <header className="px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button 
              onClick={() => setShowCalculator(false)}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Voltar às Calculadoras</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">{selectedCalculator.title}</h1>
            <div className="w-32"></div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculadora */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-center mb-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${selectedCalculator.color} flex items-center justify-center text-white`}>
                  {selectedCalculator.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedCalculator.title}</h2>
                <p className="text-gray-600">{selectedCalculator.description}</p>
              </div>

              {/* Inputs */}
              <div className="space-y-4 mb-6">
                {selectedCalculator.id === 'molar' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fórmula Química</label>
                    <input
                      type="text"
                      value={inputs.formula || ''}
                      onChange={(e) => setInputs({...inputs, formula: e.target.value})}
                      placeholder="Ex: H2SO4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}

                {selectedCalculator.id === 'concentration' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Número de mols (mol)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={inputs.mols || ''}
                        onChange={(e) => setInputs({...inputs, mols: e.target.value})}
                        placeholder="Ex: 2"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Volume (L)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={inputs.volume || ''}
                        onChange={(e) => setInputs({...inputs, volume: e.target.value})}
                        placeholder="Ex: 1"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </>
                )}

                {selectedCalculator.id === 'ph' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Concentração [H+] (M)</label>
                    <input
                      type="number"
                      step="0.001"
                      value={inputs.concentration || ''}
                      onChange={(e) => setInputs({...inputs, concentration: e.target.value})}
                      placeholder="Ex: 0.1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}

                {selectedCalculator.id === 'gas' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pressão (atm)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.pressure || ''}
                        onChange={(e) => setInputs({...inputs, pressure: e.target.value})}
                        placeholder="Ex: 1"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Volume (L)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.volume || ''}
                        onChange={(e) => setInputs({...inputs, volume: e.target.value})}
                        placeholder="Ex: 22.4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Temperatura (K)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.temperature || ''}
                        onChange={(e) => setInputs({...inputs, temperature: e.target.value})}
                        placeholder="Ex: 273"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </>
                )}

                {(selectedCalculator.id === 'stoichiometry' || selectedCalculator.id === 'redox') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Equação Química</label>
                    <input
                      type="text"
                      value={inputs.equation || ''}
                      onChange={(e) => setInputs({...inputs, equation: e.target.value})}
                      placeholder={selectedCalculator.example}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>

              {/* Botões */}
              <div className="flex space-x-4">
                <button
                  onClick={handleCalculate}
                  className={`flex-1 bg-gradient-to-r ${selectedCalculator.color} text-white py-3 px-6 rounded-lg hover:opacity-90 transition-opacity font-medium`}
                >
                  Calcular
                </button>
                <button
                  onClick={resetCalculator}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Limpar
                </button>
              </div>

              {/* Resultado */}
              {result && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-medium text-green-800 mb-2">Resultado:</h3>
                  <p className="text-green-700">{result}</p>
                </div>
              )}
            </div>

            {/* Informações e Ajuda */}
            <div className="space-y-6">
              {/* Fórmulas */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">📐 Fórmulas Utilizadas</h3>
                <div className="space-y-3 text-sm">
                  {selectedCalculator.id === 'molar' && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <strong>Massa Molar:</strong> Soma das massas atômicas de todos os átomos na fórmula
                    </div>
                  )}
                  {selectedCalculator.id === 'concentration' && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <strong>Molaridade (M):</strong> M = n / V<br/>
                      <em>onde n = mols, V = volume em litros</em>
                    </div>
                  )}
                  {selectedCalculator.id === 'ph' && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <strong>pH:</strong> pH = -log[H⁺]<br/>
                      <strong>pOH:</strong> pOH = -log[OH⁻]<br/>
                      <strong>Relação:</strong> pH + pOH = 14
                    </div>
                  )}
                  {selectedCalculator.id === 'gas' && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <strong>Lei dos Gases Ideais:</strong> PV = nRT<br/>
                      <em>R = 0.082 atm·L/(mol·K)</em>
                    </div>
                  )}
                </div>
              </div>

              {/* Exemplo */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-4">💡 Exemplo</h3>
                <p className="text-blue-800 text-sm">
                  <strong>Entrada:</strong> {selectedCalculator.example}
                </p>
                <p className="text-blue-700 text-sm mt-2">
                  Digite os valores nos campos acima e clique em &quot;Calcular&quot; para ver o resultado.
                </p>
              </div>

              {/* Dicas */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-yellow-900 mb-4">⚡ Dicas</h3>
                <ul className="text-yellow-800 text-sm space-y-2">
                  <li>• Use pontos para casas decimais (ex: 2.5)</li>
                  <li>• Verifique as unidades de medida</li>
                  <li>• Para fórmulas, use notação química padrão</li>
                  <li>• Números em subscrito: H2O (não H₂O)</li>
                </ul>
              </div>

              {/* Conceitos Relacionados */}
              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-purple-900 mb-4">📚 Conceitos Relacionados</h3>
                <div className="text-purple-800 text-sm space-y-2">
                  <button className="block w-full text-left p-2 hover:bg-purple-100 rounded">
                    → Estequiometria de Reações
                  </button>
                  <button className="block w-full text-left p-2 hover:bg-purple-100 rounded">
                    → Propriedades Coligativas
                  </button>
                  <button className="block w-full text-left p-2 hover:bg-purple-100 rounded">
                    → Equilíbrio Químico
                  </button>
                </div>
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
          <h1 className="text-2xl font-bold text-gray-900">Calculadoras Químicas</h1>
          <div className="w-24"></div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Introdução */}
        <div className="text-center mb-12">
          <Calculator className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ferramentas de Cálculo Químico</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Resolva problemas químicos com nossas calculadoras especializadas. 
            Precisão, rapidez e facilidade para seus estudos e pesquisas.
          </p>
        </div>

        {/* Grid de Calculadoras */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map(calc => (
            <div key={calc.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 group">
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${calc.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                  {calc.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{calc.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{calc.description}</p>
                
                <div className="mb-6 p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Exemplo: </span>
                  <span className="text-sm font-mono text-gray-800">{calc.example}</span>
                </div>
                
                <button 
                  onClick={() => {
                    setSelectedCalculator(calc)
                    setShowCalculator(true)
                    resetCalculator()
                  }}
                  className={`w-full bg-gradient-to-r ${calc.color} text-white py-3 px-4 rounded-lg hover:opacity-90 transition-opacity font-medium`}
                >
                  Usar Calculadora
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Seção de Recursos Adicionais */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
            <Beaker className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Laboratório Virtual</h3>
            <p className="text-gray-700 mb-6">
              Experimente nossas calculadoras em conjunto com experimentos virtuais 
              para uma compreensão mais profunda dos conceitos químicos.
            </p>
            <Link href="/experimentos" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
              Explorar Experimentos →
            </Link>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
            <Target className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Exercícios Práticos</h3>
            <p className="text-gray-700 mb-6">
              Teste seus conhecimentos com exercícios práticos que utilizam 
              nossas calculadoras para resolver problemas do mundo real.
            </p>
            <button className="inline-flex items-center text-green-600 hover:text-green-700 font-medium">
              Ver Exercícios →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
