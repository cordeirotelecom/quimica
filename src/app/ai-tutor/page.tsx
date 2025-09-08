'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Send, Bot, User, Lightbulb, Camera, FileText, Mic, MicOff, Volume2, Settings, Star, Brain, Zap, BookOpen, Calculator, FlaskConical } from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  attachments?: {
    type: 'image' | 'document' | 'formula'
    content: string
    description?: string
  }[]
}

export default function AITutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Olá! Eu sou a QuímIA, sua assistente inteligente de química! 🧪 Posso ajudá-lo com explicações de conceitos, resolução de problemas, análise de reações químicas, sugestões de experimentos e muito mais. Como posso ajudá-lo hoje?',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [aiPersonality, setAiPersonality] = useState<'friendly' | 'professional' | 'enthusiastic'>('friendly')
  const [difficulty, setDifficulty] = useState<'basic' | 'intermediate' | 'advanced'>('intermediate')
  const [specialization, setSpecialization] = useState<'general' | 'organic' | 'inorganic' | 'physical' | 'analytical'>('general')
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const quickQuestions = [
    { icon: "⚖️", text: "Como calcular massa molar?", category: "Cálculos" },
    { icon: "🧬", text: "Explique ligações químicas", category: "Conceitos" },
    { icon: "🔥", text: "Tipos de reações químicas", category: "Reações" },
    { icon: "⚛️", text: "Estrutura atômica", category: "Átomos" },
    { icon: "🧪", text: "Experimento com ácidos e bases", category: "Experimentos" },
    { icon: "📊", text: "Balanceamento de equações", category: "Equações" },
    { icon: "🌡️", text: "Lei dos gases ideais", category: "Gases" },
    { icon: "💎", text: "Cristalografia química", category: "Estruturas" }
  ]

  const capabilities = [
    { icon: <Brain className="h-5 w-5" />, title: "Explicações Detalhadas", description: "Conceitos complexos simplificados" },
    { icon: <Calculator className="h-5 w-5" />, title: "Resolução de Problemas", description: "Passo a passo com exemplos" },
    { icon: <FlaskConical className="h-5 w-5" />, title: "Análise de Experimentos", description: "Interprete resultados e dados" },
    { icon: <BookOpen className="h-5 w-5" />, title: "Recomendações Personalizadas", description: "Conteúdo adaptado ao seu nível" },
    { icon: <Zap className="h-5 w-5" />, title: "Respostas Instantâneas", description: "IA treinada em química avançada" },
    { icon: <Camera className="h-5 w-5" />, title: "Análise de Imagens", description: "Identifique compostos e estruturas" }
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newMessage])
    setInputMessage('')
    setIsLoading(true)

    // Simular resposta da IA (em produção, conectaria com OpenAI/Claude)
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsLoading(false)
    }, 1000 + Math.random() * 2000)
  }

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
    if (input.includes('massa molar') || input.includes('mol')) {
      return `📚 **Massa Molar - Conceito Fundamental**

A massa molar é a massa de um mol de uma substância, expressa em g/mol.

**Como calcular:**
1. Some as massas atômicas de todos os átomos na fórmula
2. Use a tabela periódica para encontrar as massas atômicas
3. Multiplique pela quantidade de cada átomo

**Exemplo - H₂O:**
- H: 1,008 g/mol × 2 = 2,016 g/mol
- O: 15,999 g/mol × 1 = 15,999 g/mol
- **Total: 18,015 g/mol**

💡 **Dica:** Use nossa calculadora de massa molar para verificar seus cálculos!

Precisa de mais detalhes ou quer praticar com outros exemplos?`
    }
    
    if (input.includes('ligação') || input.includes('ligações')) {
      return `🔗 **Ligações Químicas - Fundamentos**

As ligações químicas são forças que mantêm átomos unidos para formar moléculas e compostos.

**Tipos principais:**

**1. Ligação Iônica** ⚡
- Entre metal e não-metal
- Transferência de elétrons
- Exemplo: NaCl (sal de cozinha)

**2. Ligação Covalente** 🤝
- Entre não-metais
- Compartilhamento de elétrons
- Exemplo: H₂O, CO₂

**3. Ligação Metálica** ⚡
- Entre metais
- "Mar de elétrons"
- Exemplo: Fe, Cu, Au

**Propriedades resultantes:**
- Ponto de fusão/ebulição
- Condutividade elétrica
- Solubilidade

Quer explorar algum tipo específico ou ver simulações 3D das ligações?`
    }
    
    if (input.includes('reação') || input.includes('reações')) {
      return `⚗️ **Tipos de Reações Químicas**

**1. Síntese (Combinação)** ➕
A + B → AB
Exemplo: 2H₂ + O₂ → 2H₂O

**2. Decomposição** ➖
AB → A + B
Exemplo: 2H₂O → 2H₂ + O₂

**3. Simples Troca** 🔄
A + BC → AC + B
Exemplo: Zn + CuSO₄ → ZnSO₄ + Cu

**4. Dupla Troca** 🔄🔄
AB + CD → AD + CB
Exemplo: AgNO₃ + NaCl → AgCl + NaNO₃

**5. Combustão** 🔥
Substância + O₂ → CO₂ + H₂O + energia
Exemplo: CH₄ + 2O₂ → CO₂ + 2H₂O

**Fatores que influenciam:**
- Temperatura
- Concentração
- Catalisadores
- Superfície de contato

Quer ver exemplos práticos ou simular alguma reação específica?`
    }

    // Resposta genérica inteligente
    return `🤖 **Ótima pergunta sobre química!**

Analisei sua dúvida e posso ajudá-lo de várias formas:

**Recursos disponíveis:**
🧪 **Experimentos virtuais** - Teste conceitos na prática
📊 **Calculadoras químicas** - Resolva problemas rapidamente  
⚛️ **Simulações 3D** - Visualize moléculas e reações
📚 **Cursos estruturados** - Aprendizado passo a passo

**Precisa de ajuda específica com:**
- Resolução de exercícios?
- Explicação de conceitos?
- Preparação para provas?
- Experimentos práticos?

Digite sua dúvida específica ou escolha uma das opções acima. Estou aqui para tornar a química mais fácil e interessante para você! 🎯

*Dica: Seja específico para receber ajuda mais direcionada!*`
  }

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question)
    handleSendMessage()
  }

  const toggleListening = () => {
    setIsListening(!isListening)
    // Implementar reconhecimento de voz aqui
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Implementar upload e análise de arquivo
      console.log('Arquivo selecionado:', file.name)
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
              <div className="relative">
                <Bot className="h-8 w-8 text-purple-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">QuímIA - Tutora Inteligente</h1>
                <p className="text-sm text-gray-600">Assistente de Química com IA Avançada</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm text-gray-600">4.9/5 de satisfação</span>
            </div>
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* AI Settings */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <Settings className="h-5 w-5 mr-2 text-purple-600" />
                Configurações da IA
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Personalidade</label>
                  <select 
                    value={aiPersonality} 
                    onChange={(e) => setAiPersonality(e.target.value as 'friendly' | 'professional' | 'enthusiastic')}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="friendly">Amigável</option>
                    <option value="professional">Profissional</option>
                    <option value="enthusiastic">Entusiasmada</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nível</label>
                  <select 
                    value={difficulty} 
                    onChange={(e) => setDifficulty(e.target.value as 'basic' | 'intermediate' | 'advanced')}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="basic">Básico</option>
                    <option value="intermediate">Intermediário</option>
                    <option value="advanced">Avançado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Especialização</label>
                  <select 
                    value={specialization} 
                    onChange={(e) => setSpecialization(e.target.value as 'general' | 'organic' | 'inorganic' | 'physical' | 'analytical')}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="general">Geral</option>
                    <option value="organic">Orgânica</option>
                    <option value="inorganic">Inorgânica</option>
                    <option value="physical">Físico-Química</option>
                    <option value="analytical">Analítica</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Capabilities */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <Brain className="h-5 w-5 mr-2 text-purple-600" />
                Capacidades da IA
              </h3>
              <div className="space-y-3">
                {capabilities.map((capability, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="text-purple-600 mt-0.5">{capability.icon}</div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{capability.title}</div>
                      <div className="text-xs text-gray-600">{capability.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Questions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-purple-600" />
                Perguntas Rápidas
              </h3>
              <div className="space-y-2">
                {quickQuestions.slice(0, 6).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question.text)}
                    className="w-full text-left p-3 bg-gray-50 hover:bg-purple-50 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{question.icon}</span>
                      <div>
                        <div className="text-sm font-medium text-gray-900 group-hover:text-purple-700">
                          {question.text}
                        </div>
                        <div className="text-xs text-gray-500">{question.category}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-[800px] flex flex-col">
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Bot className="h-6 w-6 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-900">QuímIA</h2>
                      <p className="text-sm text-green-600">● Online - Resposta em tempo real</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                      <Volume2 className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                      <FileText className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start space-x-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === 'user' 
                          ? 'bg-blue-500' 
                          : 'bg-gradient-to-br from-purple-500 to-pink-500'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Bot className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <div className={`p-4 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-50 text-gray-900'
                      }`}>
                        <div className="prose prose-sm max-w-none">
                          {message.content.split('\n').map((line, index) => (
                            <div key={index} className={`${line.startsWith('**') ? 'font-bold' : ''}`}>
                              {line.replace(/\*\*/g, '')}
                            </div>
                          ))}
                        </div>
                        <div className={`text-xs mt-2 ${
                          message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-3 max-w-3xl">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="p-4 bg-gray-50 rounded-2xl">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-6 border-t border-gray-100">
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <Camera className="h-5 w-5" />
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*,.pdf,.doc,.docx"
                    className="hidden"
                  />
                  
                  <button 
                    onClick={toggleListening}
                    className={`p-2 transition-colors ${
                      isListening 
                        ? 'text-red-500 hover:text-red-700' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </button>
                  
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Digite sua pergunta sobre química..."
                      className="w-full p-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      disabled={isLoading}
                    />
                  </div>
                  
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="p-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="flex items-center justify-center mt-3 text-xs text-gray-500">
                  <span>QuímIA pode cometer erros. Verifique informações importantes.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
