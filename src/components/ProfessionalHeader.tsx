import Link from 'next/link'
import { ArrowLeft, Beaker } from 'lucide-react'

interface ProfessionalHeaderProps {
  title: string
  subtitle: string
  icon: React.ReactNode
  stats?: {
    label: string
    value: string
    color?: string
  }[]
  backTo?: string
}

export default function ProfessionalHeader({ 
  title, 
  subtitle, 
  icon, 
  stats = [], 
  backTo = "/" 
}: ProfessionalHeaderProps) {
  return (
    <header className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-8">
        {/* Navigation */}
        <div className="flex items-center mb-8">
          <Link 
            href={backTo} 
            className="flex items-center text-white/80 hover:text-white transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Voltar</span>
          </Link>
          
          <div className="ml-8 flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2">
              <Beaker className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                QuímicaMax
              </span>
            </Link>
          </div>
        </div>

        {/* Main Header Content */}
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                {icon}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                  {title}
                </h1>
                <p className="text-lg md:text-xl text-white/80 max-w-2xl">
                  {subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          {stats.length > 0 && (
            <div className="lg:col-span-1">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                  >
                    <div className={`text-2xl font-bold mb-1 ${stat.color || 'text-white'}`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/70">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full translate-y-24 -translate-x-24 blur-3xl"></div>
      </div>
    </header>
  )
}
