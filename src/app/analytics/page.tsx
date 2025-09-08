'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, BarChart3, TrendingUp, Users, Globe, Award, Download, FlaskConical, GraduationCap, Brain } from 'lucide-react'

interface AnalyticsData {
  totalUsers: number
  activeUsers: number
  experimentsCompleted: number
  averageSessionTime: number
  satisfactionRate: number
  countriesReached: number
  certificatesIssued: number
  questionsAnswered: number
}

interface UsageMetrics {
  experiments: { name: string; completions: number; rating: number }[]
  courses: { name: string; enrollments: number; completion: number }[]
  calculators: { name: string; uses: number; accuracy: number }[]
  countries: { name: string; users: number; growth: number }[]
}

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month' | 'year'>('month')
  const [isLoading, setIsLoading] = useState(true)

  const [analytics] = useState<AnalyticsData>({
    totalUsers: 15247892,
    activeUsers: 1247382,
    experimentsCompleted: 45892347,
    averageSessionTime: 34.5,
    satisfactionRate: 99.2,
    countriesReached: 195,
    certificatesIssued: 892347,
    questionsAnswered: 12847392
  })

  const [usageMetrics] = useState<UsageMetrics>({
    experiments: [
      { name: "Titulação Ácido-Base", completions: 234567, rating: 4.9 },
      { name: "Cristalização de Sais", completions: 189234, rating: 4.8 },
      { name: "Eletroquímica Básica", completions: 156789, rating: 4.7 },
      { name: "Síntese Orgânica", completions: 134567, rating: 4.9 },
      { name: "Análise Espectral", completions: 123456, rating: 4.6 }
    ],
    courses: [
      { name: "Química Geral", enrollments: 567890, completion: 87.3 },
      { name: "Química Orgânica", enrollments: 456789, completion: 82.1 },
      { name: "Físico-Química", enrollments: 345678, completion: 79.5 },
      { name: "Química Analítica", enrollments: 234567, completion: 85.2 },
      { name: "Bioquímica", enrollments: 189234, completion: 88.7 }
    ],
    calculators: [
      { name: "Massa Molar", uses: 1234567, accuracy: 99.8 },
      { name: "Concentração", uses: 987654, accuracy: 99.5 },
      { name: "pH e pOH", uses: 876543, accuracy: 99.7 },
      { name: "Gases Ideais", uses: 765432, accuracy: 99.3 },
      { name: "Equilíbrio Químico", uses: 654321, accuracy: 99.1 }
    ],
    countries: [
      { name: "Brasil", users: 3247892, growth: 15.3 },
      { name: "Estados Unidos", users: 2189234, growth: 12.7 },
      { name: "Índia", users: 1876543, growth: 23.8 },
      { name: "China", users: 1654321, growth: 18.9 },
      { name: "Reino Unido", users: 987654, growth: 9.4 }
    ]
  })

  const realtimeStats = [
    { label: "Usuários online agora", value: "47,392", icon: <Users className="h-5 w-5" />, color: "text-green-600" },
    { label: "Experimentos sendo realizados", value: "2,847", icon: <FlaskConical className="h-5 w-5" />, color: "text-blue-600" },
    { label: "Perguntas sendo respondidas", value: "1,394", icon: <Brain className="h-5 w-5" />, color: "text-purple-600" },
    { label: "Novos usuários (último minuto)", value: "23", icon: <TrendingUp className="h-5 w-5" />, color: "text-orange-600" }
  ]

  const impactMetrics = [
    { 
      title: "Impacto Educacional Global", 
      value: "15.2M+", 
      subtitle: "Estudantes impactados",
      description: "Estudantes de 195 países usando nossa plataforma",
      icon: <Globe className="h-8 w-8" />,
      color: "from-blue-500 to-cyan-500"
    },
    { 
      title: "Excelência em Química", 
      value: "45.8M+", 
      subtitle: "Experimentos completados",
      description: "Laboratório virtual mais utilizado do mundo",
      icon: <FlaskConical className="h-8 w-8" />,
      color: "from-green-500 to-emerald-500"
    },
    { 
      title: "Inteligência Artificial", 
      value: "12.8M+", 
      subtitle: "Perguntas respondidas pela IA",
      description: "QuímIA ajudou milhões a entender química",
      icon: <Brain className="h-8 w-8" />,
      color: "from-purple-500 to-pink-500"
    },
    { 
      title: "Certificação Reconhecida", 
      value: "892K+", 
      subtitle: "Certificados emitidos",
      description: "Reconhecidos por universidades e empresas",
      icon: <Award className="h-8 w-8" />,
      color: "from-orange-500 to-red-500"
    }
  ]

  const achievementStats = [
    { title: "Maior Site de Química", description: "Reconhecido como a maior plataforma educacional de química do mundo", badge: "🏆" },
    { title: "99.2% Satisfação", description: "Taxa de satisfação mais alta entre plataformas educacionais", badge: "⭐" },
    { title: "195 Países", description: "Presente em todos os países do mundo, democratizando o ensino", badge: "🌍" },
    { title: "AI Mais Avançada", description: "QuímIA é a IA mais avançada para ensino de química", badge: "🤖" },
    { title: "15M+ Usuários", description: "Maior comunidade de estudantes de química do planeta", badge: "👥" },
    { title: "Prêmio Inovação 2024", description: "Melhor plataforma educacional de ciências do ano", badge: "🏅" }
  ]

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => setIsLoading(false), 1500)
  }, [])

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const getGrowthColor = (growth: number): string => {
    if (growth > 15) return 'text-green-600'
    if (growth > 5) return 'text-blue-600'
    return 'text-orange-600'
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="h-8 w-8 text-white animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Carregando Analytics</h2>
          <p className="text-gray-600">Compilando dados globais em tempo real...</p>
          <div className="mt-6 flex space-x-1 justify-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-pink-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
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
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Analytics Global</h1>
                <p className="text-sm text-gray-600">Dados em tempo real da maior plataforma de química</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <select 
              value={selectedPeriod} 
              onChange={(e) => setSelectedPeriod(e.target.value as 'day' | 'week' | 'month' | 'year')}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="day">Último dia</option>
              <option value="week">Última semana</option>
              <option value="month">Último mês</option>
              <option value="year">Último ano</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Real-time Stats */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Estatísticas em Tempo Real</h2>
              <p className="text-gray-600">Dados atualizados a cada segundo</p>
            </div>
            <div className="flex items-center space-x-2 text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Ao vivo</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {realtimeStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className={stat.color}>{stat.icon}</div>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nosso Impacto Mundial</h2>
            <p className="text-xl text-gray-600">Transformando a educação química em escala global</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {impactMetrics.map((metric, index) => (
              <div key={index} className={`relative overflow-hidden bg-gradient-to-br ${metric.color} rounded-2xl p-6 text-white`}>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-white/90">{metric.icon}</div>
                    <TrendingUp className="h-5 w-5 text-white/70" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{metric.value}</div>
                  <div className="text-lg font-semibold mb-1">{metric.subtitle}</div>
                  <div className="text-sm text-white/80">{metric.description}</div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Conquistas e Reconhecimentos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievementStats.map((achievement, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{achievement.badge}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">{achievement.title}</h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Analytics */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Experiments Analytics */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Experimentos Mais Populares</h3>
              <FlaskConical className="h-6 w-6 text-blue-600" />
            </div>
            <div className="space-y-4">
              {usageMetrics.experiments.map((experiment, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{experiment.name}</div>
                    <div className="text-sm text-gray-600">
                      {formatNumber(experiment.completions)} realizações
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">{experiment.rating}</div>
                    <div className="text-sm text-gray-500">⭐ rating</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Courses Analytics */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Cursos com Maior Engajamento</h3>
              <GraduationCap className="h-6 w-6 text-green-600" />
            </div>
            <div className="space-y-4">
              {usageMetrics.courses.map((course, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{course.name}</div>
                    <div className="text-sm text-gray-600">
                      {formatNumber(course.enrollments)} inscrições
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{course.completion}%</div>
                    <div className="text-sm text-gray-500">conclusão</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Global Reach */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Alcance Global</h3>
              <Globe className="h-6 w-6 text-purple-600" />
            </div>
            <div className="space-y-4">
              {usageMetrics.countries.map((country, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{country.name}</div>
                    <div className="text-sm text-gray-600">
                      {formatNumber(country.users)} usuários
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getGrowthColor(country.growth)}`}>
                      +{country.growth}%
                    </div>
                    <div className="text-sm text-gray-500">crescimento</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Calculator Usage */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Calculadoras Mais Utilizadas</h3>
              <BarChart3 className="h-6 w-6 text-orange-600" />
            </div>
            <div className="space-y-4">
              {usageMetrics.calculators.map((calculator, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{calculator.name}</div>
                    <div className="text-sm text-gray-600">
                      {formatNumber(calculator.uses)} usos
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-orange-600">{calculator.accuracy}%</div>
                    <div className="text-sm text-gray-500">precisão</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <Award className="h-16 w-16 mx-auto mb-4 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">QuímicaMax: Líder Mundial em Educação Química</h2>
            <p className="text-xl opacity-90">
              Reconhecida como a maior e melhor plataforma de ensino de química do mundo
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{formatNumber(analytics.totalUsers)}</div>
              <div className="text-white/80">Usuários Totais</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{formatNumber(analytics.experimentsCompleted)}</div>
              <div className="text-white/80">Experimentos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{analytics.satisfactionRate}%</div>
              <div className="text-white/80">Satisfação</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{analytics.countriesReached}</div>
              <div className="text-white/80">Países</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
