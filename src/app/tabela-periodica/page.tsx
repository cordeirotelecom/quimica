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
  { symbol: 'He', name: 'Hélio', atomicNumber: 2, atomicMass: 4.003, category: 'noble-gas', period: 1, group: 18, electronConfiguration: '1s²', density: 0.1785, meltingPoint: -272.2, boilingPoint: -268.93, discoveryYear: 1895, discoverer: 'William Ramsay & Per Teodor Cleve', color: 'bg-gradient-to-br from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300', applications: ['Balões e dirigíveis', 'Criogenia', 'Soldagem em atmosfera inerte'], properties: ['Gás nobre', 'Quimicamente inerte', 'Menor ponto de ebulição de todos os elementos'], abundance: 'Segundo mais abundante no universo, raro na Terra', healthEffects: 'Não tóxico, mas pode causar asfixia', environmentalImpact: 'Recurso não renovável na Terra' },

  // Período 2
  { symbol: 'Li', name: 'Lítio', atomicNumber: 3, atomicMass: 6.94, category: 'alkali-metal', period: 2, group: 1, electronConfiguration: '[He] 2s¹', density: 0.534, meltingPoint: 180.54, boilingPoint: 1342, discoveryYear: 1817, discoverer: 'Johan August Arfwedson', color: 'bg-gradient-to-br from-red-100 to-red-200 hover:from-red-200 hover:to-red-300', applications: ['Baterias de íon-lítio', 'Medicamentos psiquiátricos', 'Ligas metálicas'], properties: ['Metal mais leve', 'Altamente reativo', 'Flutua na água'], abundance: 'Relativamente raro na crosta terrestre', healthEffects: 'Tóxico em altas doses', environmentalImpact: 'Mineração pode ser problemática' },
  { symbol: 'Be', name: 'Berílio', atomicNumber: 4, atomicMass: 9.012, category: 'alkaline-earth', period: 2, group: 2, electronConfiguration: '[He] 2s²', density: 1.85, meltingPoint: 1287, boilingPoint: 2469, discoveryYear: 1797, discoverer: 'Louis Nicolas Vauquelin', color: 'bg-gradient-to-br from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300', applications: ['Ligas aeroespaciais', 'Instrumentos de precisão', 'Reatores nucleares'], properties: ['Extremamente leve e rígido', 'Resistente à corrosão', 'Transparente aos raios-X'], abundance: 'Raro na crosta terrestre', healthEffects: 'Altamente tóxico e carcinogênico', environmentalImpact: 'Perigoso para trabalhadores' },
  { symbol: 'B', name: 'Boro', atomicNumber: 5, atomicMass: 10.81, category: 'metalloid', period: 2, group: 13, electronConfiguration: '[He] 2s² 2p¹', density: 2.34, meltingPoint: 2076, boilingPoint: 4000, discoveryYear: 1808, discoverer: 'Gay-Lussac & Thénard', color: 'bg-gradient-to-br from-yellow-100 to-yellow-200 hover:from-yellow-200 hover:to-yellow-300', applications: ['Vidro borossilicato', 'Reatores nucleares', 'Fibras cerâmicas'], properties: ['Metaloide', 'Semiconductor', 'Dureza elevada'], abundance: 'Raro na crosta terrestre', healthEffects: 'Essencial em traços, tóxico em excesso', environmentalImpact: 'Impacto mínimo' },
  { symbol: 'C', name: 'Carbono', atomicNumber: 6, atomicMass: 12.011, category: 'nonmetal', period: 2, group: 14, electronConfiguration: '[He] 2s² 2p²', density: 2.267, meltingPoint: 3550, boilingPoint: 4027, discoveryYear: -3750, discoverer: 'Pré-histórico', color: 'bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300', applications: ['Base da vida orgânica', 'Diamantes industriais', 'Grafeno e nanotubos'], properties: ['Forma múltiplas ligações', 'Variedade de alótropos', 'Base da química orgânica'], abundance: 'Quarto elemento mais abundante no universo', healthEffects: 'Essencial para a vida', environmentalImpact: 'Central no ciclo do carbono' },
  { symbol: 'N', name: 'Nitrogênio', atomicNumber: 7, atomicMass: 14.007, category: 'nonmetal', period: 2, group: 15, electronConfiguration: '[He] 2s² 2p³', density: 1.251, meltingPoint: -210.01, boilingPoint: -195.79, discoveryYear: 1772, discoverer: 'Daniel Rutherford', color: 'bg-gradient-to-br from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300', applications: ['Fertilizantes', 'Preservação de alimentos', 'Produção de explosivos'], properties: ['Gás diatômico', 'Quimicamente inerte', 'Essencial para proteínas'], abundance: '78% da atmosfera terrestre', healthEffects: 'Essencial para vida, mas N₂ pode causar asfixia', environmentalImpact: 'Ciclo do nitrogênio vital' },
  { symbol: 'O', name: 'Oxigênio', atomicNumber: 8, atomicMass: 15.999, category: 'nonmetal', period: 2, group: 16, electronConfiguration: '[He] 2s² 2p⁴', density: 1.429, meltingPoint: -218.79, boilingPoint: -182.95, discoveryYear: 1774, discoverer: 'Joseph Priestley', color: 'bg-gradient-to-br from-cyan-100 to-cyan-200 hover:from-cyan-200 hover:to-cyan-300', applications: ['Respiração', 'Combustão', 'Soldagem com oxiacetileno'], properties: ['Altamente reativo', 'Suporte à combustão', 'Essencial para respiração'], abundance: '21% da atmosfera, elemento mais abundante na crosta', healthEffects: 'Essencial para vida', environmentalImpact: 'Fundamental para todos os ecossistemas' },
  { symbol: 'F', name: 'Flúor', atomicNumber: 9, atomicMass: 18.998, category: 'halogen', period: 2, group: 17, electronConfiguration: '[He] 2s² 2p⁵', density: 1.696, meltingPoint: -219.67, boilingPoint: -188.11, discoveryYear: 1886, discoverer: 'Henri Moissan', color: 'bg-gradient-to-br from-teal-100 to-teal-200 hover:from-teal-200 hover:to-teal-300', applications: ['Pasta de dente', 'Refrigerantes', 'Teflon'], properties: ['Elemento mais eletronegativo', 'Extremamente reativo', 'Gás amarelo-pálido'], abundance: '13º elemento mais abundante na crosta', healthEffects: 'Benéfico em pequenas doses, tóxico em excesso', environmentalImpact: 'CFCs destruíram camada de ozônio' },
  { symbol: 'Ne', name: 'Neônio', atomicNumber: 10, atomicMass: 20.180, category: 'noble-gas', period: 2, group: 18, electronConfiguration: '[He] 2s² 2p⁶', density: 0.9002, meltingPoint: -248.59, boilingPoint: -246.08, discoveryYear: 1898, discoverer: 'William Ramsay & Morris Travers', color: 'bg-gradient-to-br from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300', applications: ['Sinais luminosos', 'Lasers de hélio-neônio', 'Criogenia'], properties: ['Gás nobre', 'Quimicamente inerte', 'Emite luz vermelha-laranja'], abundance: '18 ppm na atmosfera terrestre', healthEffects: 'Não tóxico, mas pode causar asfixia por deslocamento de oxigênio', environmentalImpact: 'Impacto ambiental mínimo' },

  // Período 3
  { symbol: 'Na', name: 'Sódio', atomicNumber: 11, atomicMass: 22.990, category: 'alkali-metal', period: 3, group: 1, electronConfiguration: '[Ne] 3s¹', density: 0.971, meltingPoint: 97.79, boilingPoint: 883, discoveryYear: 1807, discoverer: 'Humphry Davy', color: 'bg-gradient-to-br from-red-100 to-red-200 hover:from-red-200 hover:to-red-300', applications: ['Sal de cozinha', 'Lâmpadas de vapor', 'Refrigerante nuclear'], properties: ['Metal macio', 'Altamente reativo', 'Conduz eletricidade'], abundance: 'Sexto elemento mais abundante', healthEffects: 'Essencial para vida, mas excesso causa hipertensão', environmentalImpact: 'Abundante e reciclável' },
  { symbol: 'Mg', name: 'Magnésio', atomicNumber: 12, atomicMass: 24.305, category: 'alkaline-earth', period: 3, group: 2, electronConfiguration: '[Ne] 3s²', density: 1.738, meltingPoint: 650, boilingPoint: 1090, discoveryYear: 1755, discoverer: 'Joseph Black', color: 'bg-gradient-to-br from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300', applications: ['Ligas leves', 'Fogos de artifício', 'Suplementos nutricionais'], properties: ['Metal leve', 'Queima com chama branca brilhante', 'Estrutural'], abundance: 'Oitavo elemento mais abundante', healthEffects: 'Essencial para músculos e ossos', environmentalImpact: 'Reciclável e abundante' },
  { symbol: 'Al', name: 'Alumínio', atomicNumber: 13, atomicMass: 26.982, category: 'post-transition', period: 3, group: 13, electronConfiguration: '[Ne] 3s² 3p¹', density: 2.7, meltingPoint: 660.32, boilingPoint: 2519, discoveryYear: 1825, discoverer: 'Hans Christian Ørsted', color: 'bg-gradient-to-br from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300', applications: ['Embalagens', 'Construção civil', 'Aviação'], properties: ['Leve e resistente', 'Resistente à corrosão', 'Conduz calor e eletricidade'], abundance: 'Metal mais abundante na crosta', healthEffects: 'Geralmente seguro, ligação com Alzheimer controversa', environmentalImpact: 'Altamente reciclável' },
  { symbol: 'Si', name: 'Silício', atomicNumber: 14, atomicMass: 28.085, category: 'metalloid', period: 3, group: 14, electronConfiguration: '[Ne] 3s² 3p²', density: 2.3296, meltingPoint: 1414, boilingPoint: 3265, discoveryYear: 1824, discoverer: 'Jöns Jakob Berzelius', color: 'bg-gradient-to-br from-yellow-100 to-yellow-200 hover:from-yellow-200 hover:to-yellow-300', applications: ['Microchips', 'Vidro', 'Painéis solares'], properties: ['Semiconductor', 'Cristalino', 'Base da eletrônica'], abundance: 'Segundo elemento mais abundante na crosta', healthEffects: 'Silicose por inalação de poeira', environmentalImpact: 'Base da indústria eletrônica' },
  { symbol: 'P', name: 'Fósforo', atomicNumber: 15, atomicMass: 30.974, category: 'nonmetal', period: 3, group: 15, electronConfiguration: '[Ne] 3s² 3p³', density: 1.823, meltingPoint: 44.15, boilingPoint: 277, discoveryYear: 1669, discoverer: 'Hennig Brand', color: 'bg-gradient-to-br from-green-100 to-green-200 hover:from-green-200 hover:to-green-300', applications: ['Fertilizantes', 'Fósforos', 'DNA/RNA'], properties: ['Essencial para vida', 'Fosforescente', 'Altamente reativo'], abundance: '11º elemento mais abundante', healthEffects: 'Essencial para ossos e DNA', environmentalImpact: 'Causa eutrofização em excesso' },
  { symbol: 'S', name: 'Enxofre', atomicNumber: 16, atomicMass: 32.06, category: 'nonmetal', period: 3, group: 16, electronConfiguration: '[Ne] 3s² 3p⁴', density: 2.067, meltingPoint: 115.21, boilingPoint: 444.61, discoveryYear: -2000, discoverer: 'Conhecido na antiguidade', color: 'bg-gradient-to-br from-yellow-200 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400', applications: ['Ácido sulfúrico', 'Vulcanização da borracha', 'Fungicidas'], properties: ['Amarelo cristalino', 'Odor característico', 'Múltiplas formas alotrópicas'], abundance: '16º elemento mais abundante', healthEffects: 'Essencial para proteínas', environmentalImpact: 'Causa chuva ácida como SO₂' },
  { symbol: 'Cl', name: 'Cloro', atomicNumber: 17, atomicMass: 35.45, category: 'halogen', period: 3, group: 17, electronConfiguration: '[Ne] 3s² 3p⁵', density: 3.214, meltingPoint: -101.5, boilingPoint: -34.04, discoveryYear: 1774, discoverer: 'Carl Wilhelm Scheele', color: 'bg-gradient-to-br from-teal-100 to-teal-200 hover:from-teal-200 hover:to-teal-300', applications: ['Desinfetante', 'PVC', 'Tratamento de água'], properties: ['Gás amarelo-esverdeado', 'Altamente reativo', 'Odor irritante'], abundance: '21º elemento mais abundante', healthEffects: 'Tóxico, mas usado para desinfecção', environmentalImpact: 'Organoclorados são persistentes' },
  { symbol: 'Ar', name: 'Argônio', atomicNumber: 18, atomicMass: 39.948, category: 'noble-gas', period: 3, group: 18, electronConfiguration: '[Ne] 3s² 3p⁶', density: 1.784, meltingPoint: -189.35, boilingPoint: -185.85, discoveryYear: 1894, discoverer: 'Lord Rayleigh & William Ramsay', color: 'bg-gradient-to-br from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300', applications: ['Soldagem TIG', 'Lâmpadas incandescentes', 'Conservação de documentos'], properties: ['Gás nobre', 'Quimicamente inerte', 'Terceiro gás mais abundante na atmosfera'], abundance: '0.934% da atmosfera terrestre', healthEffects: 'Não tóxico, mas pode causar asfixia em ambientes fechados', environmentalImpact: 'Impacto ambiental mínimo' },
  
  // Período 4
  { symbol: 'K', name: 'Potássio', atomicNumber: 19, atomicMass: 39.098, category: 'alkali-metal', period: 4, group: 1, electronConfiguration: '[Ar] 4s¹', density: 0.862, meltingPoint: 63.38, boilingPoint: 759, discoveryYear: 1807, discoverer: 'Humphry Davy', color: 'bg-gradient-to-br from-red-100 to-red-200 hover:from-red-200 hover:to-red-300', applications: ['Fertilizantes', 'Vidro', 'Sabões'], properties: ['Metal macio', 'Extremamente reativo', 'Flutua na água'], abundance: 'Sétimo elemento mais abundante', healthEffects: 'Essencial para função muscular e nervosa', environmentalImpact: 'Abundante e essencial' },
  { symbol: 'Ca', name: 'Cálcio', atomicNumber: 20, atomicMass: 40.078, category: 'alkaline-earth', period: 4, group: 2, electronConfiguration: '[Ar] 4s²', density: 1.54, meltingPoint: 842, boilingPoint: 1484, discoveryYear: 1808, discoverer: 'Humphry Davy', color: 'bg-gradient-to-br from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300', applications: ['Cimento', 'Gesso', 'Suplementos'], properties: ['Metal alcalino-terroso', 'Reativo', 'Estrutural biológico'], abundance: 'Quinto elemento mais abundante', healthEffects: 'Essencial para ossos e dentes', environmentalImpact: 'Abundante e reciclável' },
  { symbol: 'Ti', name: 'Titânio', atomicNumber: 22, atomicMass: 47.867, category: 'transition-metal', period: 4, group: 4, electronConfiguration: '[Ar] 3d² 4s²', density: 4.506, meltingPoint: 1668, boilingPoint: 3287, discoveryYear: 1791, discoverer: 'William Gregor', color: 'bg-gradient-to-br from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300', applications: ['Implantes médicos', 'Indústria aeroespacial', 'Equipamentos esportivos'], properties: ['Extremamente resistente', 'Biocompatível', 'Resistente à corrosão'], abundance: '9º elemento mais abundante', healthEffects: 'Biocompatível e seguro', environmentalImpact: 'Reciclável e durável' },
  { symbol: 'Cr', name: 'Cromo', atomicNumber: 24, atomicMass: 51.996, category: 'transition-metal', period: 4, group: 6, electronConfiguration: '[Ar] 3d⁵ 4s¹', density: 7.15, meltingPoint: 1907, boilingPoint: 2671, discoveryYear: 1797, discoverer: 'Louis Nicolas Vauquelin', color: 'bg-gradient-to-br from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300', applications: ['Aço inoxidável', 'Cromagem', 'Pigmentos'], properties: ['Extremamente duro', 'Resistente à corrosão', 'Cores variadas'], abundance: '21º elemento mais abundante', healthEffects: 'Cr³⁺ essencial, Cr⁶⁺ carcinogênico', environmentalImpact: 'Cr⁶⁺ é tóxico ambiental' },
  { symbol: 'Fe', name: 'Ferro', atomicNumber: 26, atomicMass: 55.845, category: 'transition-metal', period: 4, group: 8, electronConfiguration: '[Ar] 3d⁶ 4s²', density: 7.874, meltingPoint: 1538, boilingPoint: 2861, discoveryYear: -1500, discoverer: 'Conhecido na antiguidade', color: 'bg-gradient-to-br from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300', applications: ['Aço', 'Construção', 'Hemoglobina'], properties: ['Magnético', 'Resistente', 'Oxida facilmente'], abundance: 'Quarto elemento mais abundante na crosta', healthEffects: 'Essencial para transporte de oxigênio', environmentalImpact: 'Altamente reciclável' },
  { symbol: 'Ni', name: 'Níquel', atomicNumber: 28, atomicMass: 58.693, category: 'transition-metal', period: 4, group: 10, electronConfiguration: '[Ar] 3d⁸ 4s²', density: 8.912, meltingPoint: 1455, boilingPoint: 2913, discoveryYear: 1751, discoverer: 'Axel Fredrik Cronstedt', color: 'bg-gradient-to-br from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300', applications: ['Aço inoxidável', 'Moedas', 'Baterias'], properties: ['Ferromagnético', 'Resistente à corrosão', 'Maleável'], abundance: '22º elemento mais abundante', healthEffects: 'Pode causar alergias', environmentalImpact: 'Reciclável' },
  { symbol: 'Cu', name: 'Cobre', atomicNumber: 29, atomicMass: 63.546, category: 'transition-metal', period: 4, group: 11, electronConfiguration: '[Ar] 3d¹⁰ 4s¹', density: 8.96, meltingPoint: 1084.62, boilingPoint: 2562, discoveryYear: -9000, discoverer: 'Conhecido na antiguidade', color: 'bg-gradient-to-br from-orange-200 to-orange-300 hover:from-orange-300 hover:to-orange-400', applications: ['Fios elétricos', 'Encanamento', 'Moedas'], properties: ['Excelente condutor', 'Resistente à corrosão', 'Antimicrobiano'], abundance: '26º elemento mais abundante', healthEffects: 'Essencial em traços, tóxico em excesso', environmentalImpact: 'Altamente reciclável' },
  { symbol: 'Zn', name: 'Zinco', atomicNumber: 30, atomicMass: 65.38, category: 'transition-metal', period: 4, group: 12, electronConfiguration: '[Ar] 3d¹⁰ 4s²', density: 7.134, meltingPoint: 419.53, boilingPoint: 907, discoveryYear: 1746, discoverer: 'Andreas Sigismund Marggraf', color: 'bg-gradient-to-br from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300', applications: ['Galvanização', 'Ligas', 'Suplementos'], properties: ['Resistente à corrosão', 'Metal azul-esbranquiçado', 'Essencial biológico'], abundance: '24º elemento mais abundante', healthEffects: 'Essencial para imunidade e cicatrização', environmentalImpact: 'Reciclável' },
  
  // Período 5
  { symbol: 'Rb', name: 'Rubídio', atomicNumber: 37, atomicMass: 85.468, category: 'alkali-metal', period: 5, group: 1, electronConfiguration: '[Kr] 5s¹', density: 1.532, meltingPoint: 39.31, boilingPoint: 688, discoveryYear: 1861, discoverer: 'Robert Bunsen & Gustav Kirchhoff', color: 'bg-gradient-to-br from-red-100 to-red-200 hover:from-red-200 hover:to-red-300', applications: ['Relógios atômicos', 'Fotocélulas', 'Pesquisa'], properties: ['Extremamente reativo', 'Metal macio', 'Radioativo natural'], abundance: '23º elemento em abundância', healthEffects: 'Não essencial, relativamente seguro', environmentalImpact: 'Impacto mínimo' },
  { symbol: 'Sr', name: 'Estrôncio', atomicNumber: 38, atomicMass: 87.62, category: 'alkaline-earth', period: 5, group: 2, electronConfiguration: '[Kr] 5s²', density: 2.64, meltingPoint: 777, boilingPoint: 1382, discoveryYear: 1790, discoverer: 'Adair Crawford', color: 'bg-gradient-to-br from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300', applications: ['Fogos de artifício (cor vermelha)', 'Ímãs de ferrite', 'Tubos de raios catódicos'], properties: ['Chama vermelha característica', 'Reativo com água', 'Metal prateado'], abundance: '18º elemento em abundância', healthEffects: 'Sr-90 radioativo é perigoso', environmentalImpact: 'Sr-90 é contaminante nuclear' },
  { symbol: 'Ag', name: 'Prata', atomicNumber: 47, atomicMass: 107.868, category: 'transition-metal', period: 5, group: 11, electronConfiguration: '[Kr] 4d¹⁰ 5s¹', density: 10.501, meltingPoint: 961.78, boilingPoint: 2162, discoveryYear: -3000, discoverer: 'Conhecido na antiguidade', color: 'bg-gradient-to-br from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400', applications: ['Joias', 'Fotografia', 'Eletrônicos'], properties: ['Melhor condutor elétrico', 'Antimicrobiano', 'Maleável'], abundance: '65º elemento em abundância', healthEffects: 'Geralmente seguro, pode causar argiria', environmentalImpact: 'Reciclável e valioso' },
  { symbol: 'Cd', name: 'Cádmio', atomicNumber: 48, atomicMass: 112.411, category: 'transition-metal', period: 5, group: 12, electronConfiguration: '[Kr] 4d¹⁰ 5s²', density: 8.69, meltingPoint: 321.07, boilingPoint: 767, discoveryYear: 1817, discoverer: 'Friedrich Stromeyer', color: 'bg-gradient-to-br from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300', applications: ['Baterias Ni-Cd', 'Pigmentos', 'Galvanização'], properties: ['Macio e maleável', 'Resistente à corrosão', 'Tóxico'], abundance: '67º elemento em abundância', healthEffects: 'Altamente tóxico e carcinogênico', environmentalImpact: 'Poluente perigoso' },
  { symbol: 'I', name: 'Iodo', atomicNumber: 53, atomicMass: 126.904, category: 'halogen', period: 5, group: 17, electronConfiguration: '[Kr] 4d¹⁰ 5s² 5p⁵', density: 4.933, meltingPoint: 113.7, boilingPoint: 184.3, discoveryYear: 1811, discoverer: 'Bernard Courtois', color: 'bg-gradient-to-br from-purple-200 to-purple-300 hover:from-purple-300 hover:to-purple-400', applications: ['Antiséptico', 'Sal iodado', 'Contrastes médicos'], properties: ['Cristais violeta-escuros', 'Sublima facilmente', 'Essencial para tireoide'], abundance: '61º elemento em abundância', healthEffects: 'Essencial para hormônios da tireoide', environmentalImpact: 'Radioatividade em alguns isótopos' },
  { symbol: 'Xe', name: 'Xenônio', atomicNumber: 54, atomicMass: 131.293, category: 'noble-gas', period: 5, group: 18, electronConfiguration: '[Kr] 4d¹⁰ 5s² 5p⁶', density: 5.887, meltingPoint: -111.75, boilingPoint: -108.09, discoveryYear: 1898, discoverer: 'William Ramsay & Morris Travers', color: 'bg-gradient-to-br from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300', applications: ['Lâmpadas de xenônio', 'Anestesia', 'Propulsão iônica'], properties: ['Gás nobre pesado', 'Forma alguns compostos', 'Anestésico'], abundance: 'Muito raro na atmosfera', healthEffects: 'Anestésico, não tóxico', environmentalImpact: 'Impacto mínimo' },
  
  // Período 6
  { symbol: 'Cs', name: 'Césio', atomicNumber: 55, atomicMass: 132.905, category: 'alkali-metal', period: 6, group: 1, electronConfiguration: '[Xe] 6s¹', density: 1.873, meltingPoint: 28.44, boilingPoint: 671, discoveryYear: 1860, discoverer: 'Robert Bunsen & Gustav Kirchhoff', color: 'bg-gradient-to-br from-red-100 to-red-200 hover:from-red-200 hover:to-red-300', applications: ['Relógios atômicos', 'Fotocélulas', 'Perfuração petrolífera'], properties: ['Metal mais reativo', 'Funde na mão', 'Dourado'], abundance: '45º elemento em abundância', healthEffects: 'Cs-137 radioativo é perigoso', environmentalImpact: 'Cs-137 é contaminante nuclear' },
  { symbol: 'Ba', name: 'Bário', atomicNumber: 56, atomicMass: 137.327, category: 'alkaline-earth', period: 6, group: 2, electronConfiguration: '[Xe] 6s²', density: 3.594, meltingPoint: 727, boilingPoint: 1870, discoveryYear: 1808, discoverer: 'Humphry Davy', color: 'bg-gradient-to-br from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300', applications: ['Contrastes de raios-X', 'Fogos de artifício (verde)', 'Perfuração petrolífera'], properties: ['Chama verde característica', 'Reativo', 'Metal prateado'], abundance: '14º elemento mais abundante', healthEffects: 'Compostos solúveis são tóxicos', environmentalImpact: 'BaSO₄ é seguro' },
  { symbol: 'Au', name: 'Ouro', atomicNumber: 79, atomicMass: 196.967, category: 'transition-metal', period: 6, group: 11, electronConfiguration: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹', density: 19.282, meltingPoint: 1064.18, boilingPoint: 2856, discoveryYear: -2600, discoverer: 'Conhecido na antiguidade', color: 'bg-gradient-to-br from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500', applications: ['Joias', 'Eletrônicos', 'Medicina'], properties: ['Não oxida', 'Extremamente maleável', 'Condutor excelente'], abundance: '75º elemento em abundância', healthEffects: 'Bioinerte e seguro', environmentalImpact: 'Mineração impactante, mas durável' },
  { symbol: 'Hg', name: 'Mercúrio', atomicNumber: 80, atomicMass: 200.592, category: 'transition-metal', period: 6, group: 12, electronConfiguration: '[Xe] 4f¹⁴ 5d¹⁰ 6s²', density: 13.5336, meltingPoint: -38.83, boilingPoint: 356.73, discoveryYear: -1500, discoverer: 'Conhecido na antiguidade', color: 'bg-gradient-to-br from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500', applications: ['Termômetros (histórico)', 'Lâmpadas fluorescentes', 'Amálgamas dentárias'], properties: ['Único metal líquido', 'Densidade alta', 'Tóxico'], abundance: '67º elemento em abundância', healthEffects: 'Altamente tóxico, bioacumulativo', environmentalImpact: 'Poluente perigoso' },
  { symbol: 'Pb', name: 'Chumbo', atomicNumber: 82, atomicMass: 207.2, category: 'post-transition', period: 6, group: 14, electronConfiguration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²', density: 11.342, meltingPoint: 327.46, boilingPoint: 1749, discoveryYear: -4000, discoverer: 'Conhecido na antiguidade', color: 'bg-gradient-to-br from-slate-200 to-slate-300 hover:from-slate-300 hover:to-slate-400', applications: ['Proteção radiológica', 'Baterias', 'Soldas'], properties: ['Muito denso', 'Maleável', 'Resistente à corrosão'], abundance: '36º elemento em abundância', healthEffects: 'Altamente tóxico, especialmente para crianças', environmentalImpact: 'Poluente perigoso persistente' },
  
  // Período 7
  { symbol: 'Fr', name: 'Frâncio', atomicNumber: 87, atomicMass: 223, category: 'alkali-metal', period: 7, group: 1, electronConfiguration: '[Rn] 7s¹', density: 1.87, meltingPoint: 27, boilingPoint: 677, discoveryYear: 1939, discoverer: 'Marguerite Perey', color: 'bg-gradient-to-br from-red-100 to-red-200 hover:from-red-200 hover:to-red-300', applications: ['Pesquisa científica', 'Estudos atômicos'], properties: ['Extremamente radioativo', 'Vida curta', 'Raro'], abundance: 'Extremamente raro', healthEffects: 'Altamente radioativo e perigoso', environmentalImpact: 'Radioativo' },
  { symbol: 'Ra', name: 'Rádio', atomicNumber: 88, atomicMass: 226, category: 'alkaline-earth', period: 7, group: 2, electronConfiguration: '[Rn] 7s²', density: 5.5, meltingPoint: 696, boilingPoint: 1737, discoveryYear: 1898, discoverer: 'Marie e Pierre Curie', color: 'bg-gradient-to-br from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300', applications: ['Tratamento de câncer (histórico)', 'Pesquisa médica'], properties: ['Altamente radioativo', 'Luminescente', 'Raro'], abundance: 'Extremamente raro', healthEffects: 'Carcinogênico e radioativo', environmentalImpact: 'Contaminante radioativo' },
  { symbol: 'U', name: 'Urânio', atomicNumber: 92, atomicMass: 238.029, category: 'actinide', period: 7, group: 3, electronConfiguration: '[Rn] 5f³ 6d¹ 7s²', density: 19.1, meltingPoint: 1135, boilingPoint: 4131, discoveryYear: 1789, discoverer: 'Martin Heinrich Klaproth', color: 'bg-gradient-to-br from-green-300 to-green-400 hover:from-green-400 hover:to-green-500', applications: ['Energia nuclear', 'Armas nucleares', 'Blindagem'], properties: ['Radioativo', 'Densidade muito alta', 'Fissionável'], abundance: '51º elemento em abundância', healthEffects: 'Altamente radioativo e tóxico', environmentalImpact: 'Resíduos radioativos perigosos' },
  
  // Lantanídeos
  { symbol: 'La', name: 'Lantânio', atomicNumber: 57, atomicMass: 138.905, category: 'lanthanide', period: 6, group: 3, electronConfiguration: '[Xe] 5d¹ 6s²', density: 6.162, meltingPoint: 920, boilingPoint: 3464, discoveryYear: 1839, discoverer: 'Carl Gustaf Mosander', color: 'bg-gradient-to-br from-indigo-200 to-indigo-300 hover:from-indigo-300 hover:to-indigo-400', applications: ['Catalisadores', 'Óptica', 'Ligas metálicas'], properties: ['Maleável', 'Reativo ao ar', 'Terra rara'], abundance: '39º elemento em abundância', healthEffects: 'Baixa toxicidade em pequenas quantidades', environmentalImpact: 'Mineração impactante' },
  { symbol: 'Ce', name: 'Cério', atomicNumber: 58, atomicMass: 140.116, category: 'lanthanide', period: 6, group: 3, electronConfiguration: '[Xe] 4f¹ 5d¹ 6s²', density: 6.770, meltingPoint: 798, boilingPoint: 3443, discoveryYear: 1803, discoverer: 'Jöns Jacob Berzelius', color: 'bg-gradient-to-br from-indigo-200 to-indigo-300 hover:from-indigo-300 hover:to-indigo-400', applications: ['Catalisadores automotivos', 'Polimento de vidro', 'Ligas'], properties: ['Mais abundante terra rara', 'Maleável', 'Oxida rapidamente'], abundance: '25º elemento em abundância', healthEffects: 'Baixa toxicidade', environmentalImpact: 'Impacto moderado na mineração' },
  { symbol: 'Nd', name: 'Neodímio', atomicNumber: 60, atomicMass: 144.242, category: 'lanthanide', period: 6, group: 3, electronConfiguration: '[Xe] 4f⁴ 6s²', density: 7.007, meltingPoint: 1021, boilingPoint: 3074, discoveryYear: 1885, discoverer: 'Carl Auer von Welsbach', color: 'bg-gradient-to-br from-indigo-200 to-indigo-300 hover:from-indigo-300 hover:to-indigo-400', applications: ['Ímãs permanentes', 'Lasers', 'Lentes especiais'], properties: ['Magnético', 'Terra rara', 'Oxida rapidamente'], abundance: '27º elemento em abundância', healthEffects: 'Baixa toxicidade', environmentalImpact: 'Mineração impactante' },
  { symbol: 'Eu', name: 'Európio', atomicNumber: 63, atomicMass: 151.964, category: 'lanthanide', period: 6, group: 3, electronConfiguration: '[Xe] 4f⁷ 6s²', density: 5.244, meltingPoint: 822, boilingPoint: 1529, discoveryYear: 1901, discoverer: 'Eugène-Anatole Demarçay', color: 'bg-gradient-to-br from-indigo-200 to-indigo-300 hover:from-indigo-300 hover:to-indigo-400', applications: ['Fósforos para TV', 'Lasers', 'Detectores de falsificação'], properties: ['Fluorescente', 'Muito reativo', 'Terra rara cara'], abundance: 'Raro', healthEffects: 'Baixa toxicidade conhecida', environmentalImpact: 'Mineração especializada' }
]

const categories = [
  { name: 'Metais Alcalinos', color: 'bg-red-100', category: 'alkali-metal', icon: '🔴', description: 'Grupo 1, altamente reativos' },
  { name: 'Metais Alcalino-terrosos', color: 'bg-orange-100', category: 'alkaline-earth', icon: '🟠', description: 'Grupo 2, reativos mas menos que alcalinos' },
  { name: 'Metais de Transição', color: 'bg-blue-100', category: 'transition-metal', icon: '🔵', description: 'Grupos 3-12, múltiplos estados de oxidação' },
  { name: 'Metais Pós-transição', color: 'bg-slate-100', category: 'post-transition', icon: '⚫', description: 'Metais pesados e macios' },
  { name: 'Metaloides', color: 'bg-yellow-100', category: 'metalloid', icon: '🟡', description: 'Propriedades intermediárias' },
  { name: 'Não-metais', color: 'bg-green-100', category: 'nonmetal', icon: '🟢', description: 'Não conduzem eletricidade' },
  { name: 'Halogênios', color: 'bg-teal-100', category: 'halogen', icon: '🟣', description: 'Grupo 17, muito reativos' },
  { name: 'Gases Nobres', color: 'bg-purple-100', category: 'noble-gas', icon: '🟪', description: 'Grupo 18, quimicamente inertes' },
  { name: 'Lantanídeos', color: 'bg-indigo-200', category: 'lanthanide', icon: '🔷', description: 'Terras raras, propriedades similares' },
  { name: 'Actinídeos', color: 'bg-green-200', category: 'actinide', icon: '☢️', description: 'Elementos radioativos pesados' }
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
    { label: 'Categorias', value: `${categories.length}`, color: 'text-orange-400' }
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
