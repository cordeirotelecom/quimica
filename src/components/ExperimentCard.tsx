import { Clock, Users, Star, Shield, Target, Play, Eye, TrendingUp, Award } from 'lucide-react'

interface ExperimentCardProps {
  experiment: {
    id: string
    title: string
    description: string
    difficulty: string
    duration: number
    rating: number
    completions: number
    safetyLevel: string
    category: string
    isNew?: boolean
    isPopular?: boolean
    isPremium?: boolean
    isFeatured?: boolean
    thumbnail: string
  }
  onSelect: () => void
  onPreview?: () => void
}

export default function ExperimentCard({ experiment, onSelect, onPreview }: ExperimentCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante': return 'bg-green-100 text-green-800 border-green-200'
      case 'Intermediário': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Avançado': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'Especialista': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getSafetyColor = (safety: string) => {
    switch (safety) {
      case 'Baixo': return 'text-green-600'
      case 'Médio': return 'text-yellow-600'
      case 'Alto': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}min`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`
  }

  const formatCompletions = (completions: number) => {
    if (completions >= 1000000) return `${(completions / 1000000).toFixed(1)}M`
    if (completions >= 1000) return `${(completions / 1000).toFixed(1)}K`
    return completions.toString()
  }

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Featured Badge */}
      {experiment.isFeatured && (
        <div className="absolute top-4 left-4 z-10">
          <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            <Award className="h-3 w-3" />
            <span>DESTAQUE</span>
          </div>
        </div>
      )}

      {/* Status Badges */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
        {experiment.isNew && (
          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Novo
          </span>
        )}
        {experiment.isPopular && (
          <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" />
            Popular
          </span>
        )}
        {experiment.isPremium && (
          <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Premium
          </span>
        )}
      </div>

      {/* Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl opacity-20">🧪</div>
        </div>
        
        {/* Hover Play Button */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={onSelect}
            className="bg-white/90 backdrop-blur-sm text-gray-900 p-4 rounded-full hover:bg-white transition-colors transform scale-90 group-hover:scale-100"
          >
            <Play className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title and Description */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {experiment.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
            {experiment.description}
          </p>
        </div>

        {/* Metadata */}
        <div className="space-y-3 mb-4">
          {/* Difficulty and Category */}
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(experiment.difficulty)}`}>
              {experiment.difficulty}
            </span>
            <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
              {experiment.category}
            </span>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-2 text-xs text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{formatDuration(experiment.duration)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 text-yellow-500" />
              <span>{experiment.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-3 w-3" />
              <span>{formatCompletions(experiment.completions)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield className={`h-3 w-3 ${getSafetyColor(experiment.safetyLevel)}`} />
              <span className={getSafetyColor(experiment.safetyLevel)}>
                {experiment.safetyLevel}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onSelect}
            className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm flex items-center justify-center space-x-2"
          >
            <Target className="h-4 w-4" />
            <span>Iniciar Experimento</span>
          </button>
          {onPreview && (
            <button
              onClick={onPreview}
              className="p-2.5 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Eye className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-200 rounded-2xl transition-colors pointer-events-none"></div>
    </div>
  )
}
