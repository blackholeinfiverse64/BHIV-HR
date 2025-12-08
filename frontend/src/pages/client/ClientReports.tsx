import Layout from '../../components/Layout'
import { BarChart3, TrendingUp, Users, Clock, Download, Calendar } from 'lucide-react'

export default function ClientReports() {
  return (
    <Layout userType="client">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
            <p className="text-gray-600">Track hiring performance and key metrics</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg font-semibold">
            <Download className="h-5 w-5" />
            Export Report
          </button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-green-200/50 p-6 shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-lg">+12%</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">248</p>
            <p className="text-sm text-gray-600">Total Hires (YTD)</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-blue-200/50 p-6 shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-lg">-8%</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">24 days</p>
            <p className="text-sm text-gray-600">Avg. Time to Hire</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-purple-200/50 p-6 shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded-lg">+5%</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">87%</p>
            <p className="text-sm text-gray-600">Offer Accept Rate</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-yellow-200/50 p-6 shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-yellow-600" />
              </div>
              <span className="text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-lg">4.2</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">4.5</p>
            <p className="text-sm text-gray-600">Avg. Candidate Rating</p>
          </div>
        </div>

        {/* Hiring Funnel */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-green-200/50 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-600" />
              Hiring Funnel
            </h2>
            <select className="px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none">
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>Year to Date</option>
            </select>
          </div>

          <div className="space-y-4">
            {[
              { stage: 'Applications Received', count: 1240, percentage: 100, color: 'bg-blue-500' },
              { stage: 'Screening', count: 856, percentage: 69, color: 'bg-indigo-500' },
              { stage: 'Interviews', count: 428, percentage: 35, color: 'bg-purple-500' },
              { stage: 'Offers', count: 142, percentage: 11, color: 'bg-pink-500' },
              { stage: 'Hired', count: 124, percentage: 10, color: 'bg-green-500' },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">{item.stage}</span>
                  <span className="text-gray-600">
                    {item.count} ({item.percentage}%)
                  </span>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full transition-all`} style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Performing Departments */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-green-200/50 p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-600" />
              Top Performing Departments
            </h2>

            <div className="space-y-4">
              {[
                { name: 'Engineering', hires: 89, avgTime: '21 days', color: 'bg-blue-500' },
                { name: 'Sales', hires: 56, avgTime: '18 days', color: 'bg-green-500' },
                { name: 'Marketing', hires: 43, avgTime: '24 days', color: 'bg-purple-500' },
                { name: 'Product', hires: 34, avgTime: '28 days', color: 'bg-pink-500' },
                { name: 'Customer Success', hires: 26, avgTime: '22 days', color: 'bg-yellow-500' },
              ].map((dept, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-green-50/30 border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-lg ${dept.color} text-white flex items-center justify-center font-bold text-lg`}>
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{dept.name}</p>
                      <p className="text-sm text-gray-600">{dept.hires} hires</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Avg. Time</p>
                    <p className="font-bold text-gray-900">{dept.avgTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Trends */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-green-200/50 p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-600" />
              Monthly Hiring Trends
            </h2>

            <div className="space-y-4">
              {[
                { month: 'January', hires: 28, trend: '+15%' },
                { month: 'February', hires: 32, trend: '+14%' },
                { month: 'March', hires: 29, trend: '-9%' },
                { month: 'April', hires: 35, trend: '+21%' },
                { month: 'May', hires: 41, trend: '+17%' },
                { month: 'June', hires: 38, trend: '-7%' },
              ].map((data, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <span className="font-semibold text-gray-900">{data.month}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-gray-900">{data.hires}</span>
                    <span
                      className={`text-sm font-bold px-2 py-1 rounded-lg ${
                        data.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {data.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Candidate Source Performance */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-green-200/50 p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-600" />
            Candidate Source Performance
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { source: 'LinkedIn', applications: 486, hires: 62, conversion: '12.8%', color: 'border-blue-300' },
              { source: 'Indeed', applications: 324, hires: 38, conversion: '11.7%', color: 'border-green-300' },
              { source: 'Referrals', applications: 156, hires: 24, conversion: '15.4%', color: 'border-purple-300' },
            ].map((source, idx) => (
              <div key={idx} className={`p-5 rounded-xl border-2 ${source.color} bg-gradient-to-br from-white to-gray-50`}>
                <h3 className="font-bold text-gray-900 text-lg mb-4">{source.source}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Applications:</span>
                    <span className="font-bold text-gray-900">{source.applications}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Hires:</span>
                    <span className="font-bold text-gray-900">{source.hires}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                    <span className="text-gray-600">Conversion:</span>
                    <span className="font-bold text-green-600 text-lg">{source.conversion}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
