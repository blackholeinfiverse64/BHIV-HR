import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getClientDashboard } from '../../services/api'
import { Users, UserCheck, Calendar, FileCheck, CheckCircle, TrendingUp, Building2, BarChart3, Clock } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import Layout from '../../components/Layout'

export default function ClientDashboard() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const { data, isLoading } = useQuery({
    queryKey: ['client-dashboard'],
    queryFn: getClientDashboard,
  })

  const handleLogout = async () => {
    await signOut()
    localStorage.removeItem('role')
    localStorage.removeItem('client_id')
    navigate('/')
  }

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  const stats = [
    {
      label: 'Total Applicants',
      value: data?.totalApplicants || 156,
      icon: Users,
      color: 'from-emerald-500 to-green-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      trend: '+18%',
    },
    {
      label: 'Shortlisted',
      value: data?.shortlisted || 45,
      icon: UserCheck,
      color: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      trend: '+12%',
    },
    {
      label: 'Interviewed',
      value: data?.interviewed || 23,
      icon: Calendar,
      color: 'from-purple-500 to-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      trend: '+8%',
    },
    {
      label: 'Offers Extended',
      value: data?.offers || 12,
      icon: FileCheck,
      color: 'from-orange-500 to-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      trend: '+5%',
    },
    {
      label: 'Joined',
      value: data?.joined || 8,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200',
      trend: '+3%',
    },
  ]

  const recentHires = [
    { name: 'Sarah Johnson', role: 'Senior Developer', date: '2 days ago', status: 'Joined' },
    { name: 'Michael Chen', role: 'Product Manager', date: '5 days ago', status: 'Offer Accepted' },
    { name: 'Emma Wilson', role: 'UX Designer', date: '1 week ago', status: 'In Review' },
  ]

  return (
    <Layout userType="client">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="rounded-2xl border-2 border-blue-200/50 bg-white/80 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all">
              <div className="flex flex-col items-center text-center">
                <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 shadow-md`}>
                  <stat.icon className="h-7 w-7 text-white" />
                </div>
                <p className="text-3xl font-bold mb-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent">{stat.value}</p>
                <p className="text-xs text-gray-600 mb-2 font-medium">{stat.label}</p>
                <div className="flex items-center gap-1 text-xs text-green-600 font-semibold">
                  <TrendingUp className="h-3 w-3" />
                  <span>{stat.trend}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hiring Funnel */}
          <div className="rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-blue-200/50 p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Hiring Funnel</h2>
            <div className="space-y-4">
              {[
                { stage: 'Applications Received', count: 156, width: '100%', color: 'bg-emerald-500' },
                { stage: 'Initial Screening', count: 89, width: '57%', color: 'bg-blue-500' },
                { stage: 'Technical Round', count: 45, width: '29%', color: 'bg-purple-500' },
                { stage: 'Final Interview', count: 23, width: '15%', color: 'bg-orange-500' },
                { stage: 'Offer Stage', count: 12, width: '8%', color: 'bg-green-500' },
              ].map((stage, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{stage.stage}</span>
                    <span className="text-sm font-bold">{stage.count}</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${stage.color} rounded-full transition-all duration-500`}
                      style={{ width: stage.width }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-blue-200/50 p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Recent Hires</h2>
              <button className="text-green-600 font-semibold hover:underline hover:text-green-700 transition-colors">View All</button>
            </div>
            <div className="space-y-4">
              {recentHires.map((hire, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200/50 bg-gradient-to-r from-white to-blue-50/30 hover:border-blue-400 hover:shadow-md transition-all group">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-lg">{hire.name[0]}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{hire.name}</h3>
                    <p className="text-sm text-gray-600">{hire.role}</p>
                  </div>
                  <div className="text-right">
                    <div className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 mb-1">
                      {hire.status}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{hire.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="rounded-2xl bg-white border-2 border-blue-200 p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Avg. Time to Hire', value: '24 days', icon: Clock, color: 'text-blue-600' },
              { label: 'Success Rate', value: '78%', icon: TrendingUp, color: 'text-green-600' },
              { label: 'Quality Score', value: '8.5/10', icon: CheckCircle, color: 'text-purple-600' },
              { label: 'Cost per Hire', value: '$4,200', icon: BarChart3, color: 'text-orange-600' },
            ].map((metric, idx) => (
              <div key={idx} className="text-center p-4 rounded-xl bg-gray-50">
                <metric.icon className={`h-8 w-8 mx-auto mb-3 ${metric.color}`} />
                <p className="text-2xl font-bold mb-1">{metric.value}</p>
                <p className="text-sm text-gray-600">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
