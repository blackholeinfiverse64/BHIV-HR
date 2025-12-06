import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { analyticsAPI, jobsAPI, candidatesAPI } from '@/services/api'
import { useAuth } from '@/context/AuthContext'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { AvatarWithStatus } from '@/components/ui/Avatar'
import { StatsGridSkeleton, TableSkeleton } from '@/components/ui/Loading'
import { ErrorState } from '@/components/ui/EmptyState'
import { formatDate, getInitials, getStatusColor } from '@/lib/utils'
import {
  Briefcase,
  Users,
  FileText,
  TrendingUp,
  ArrowRight,
  Brain,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  BarChart3,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

// Stats Card Component
function StatCard({ title, value, change, changeType, icon: Icon, trend }) {
  return (
    <Card variant="neo" className="p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-3xl font-bold font-heading">{value}</h3>
        {change && (
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-semibold ${
                changeType === 'positive' ? 'text-success' : 'text-destructive'
              }`}
            >
              {changeType === 'positive' ? '+' : ''}{change}%
            </span>
            <span className="text-xs text-muted-foreground">from last month</span>
          </div>
        )}
      </div>
    </Card>
  )
}

// Recent Activity Item
function ActivityItem({ icon: Icon, title, description, time, status }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/30 transition-colors">
      <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
        status === 'success' ? 'bg-success/10' :
        status === 'warning' ? 'bg-warning/10' :
        status === 'error' ? 'bg-destructive/10' : 'bg-primary/10'
      }`}>
        <Icon className={`h-5 w-5 ${
          status === 'success' ? 'text-success' :
          status === 'warning' ? 'text-warning' :
          status === 'error' ? 'text-destructive' : 'text-primary'
        }`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{title}</p>
        <p className="text-xs text-muted-foreground truncate">{description}</p>
      </div>
      <span className="text-xs text-muted-foreground whitespace-nowrap">{time}</span>
    </div>
  )
}

// Chart data
const applicationTrendData = [
  { name: 'Mon', applications: 12 },
  { name: 'Tue', applications: 19 },
  { name: 'Wed', applications: 15 },
  { name: 'Thu', applications: 25 },
  { name: 'Fri', applications: 22 },
  { name: 'Sat', applications: 8 },
  { name: 'Sun', applications: 5 },
]

const pipelineData = [
  { name: 'Applied', value: 45, color: 'hsl(217, 91%, 60%)' },
  { name: 'Screening', value: 25, color: 'hsl(262, 83%, 58%)' },
  { name: 'Interview', value: 18, color: 'hsl(38, 92%, 50%)' },
  { name: 'Offer', value: 8, color: 'hsl(160, 84%, 39%)' },
  { name: 'Hired', value: 4, color: 'hsl(160, 84%, 30%)' },
]

export function DashboardPage() {
  const { user, userType } = useAuth()

  // Fetch jobs
  const { data: jobsData, isLoading: jobsLoading, error: jobsError } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => jobsAPI.getJobs({ limit: 5 }),
  })

  // Fetch candidates
  const { data: candidatesData, isLoading: candidatesLoading } = useQuery({
    queryKey: ['candidates'],
    queryFn: () => candidatesAPI.getCandidates({ limit: 5 }),
  })

  const jobs = jobsData?.jobs || []
  const candidates = candidatesData?.candidates || []

  // Stats
  const stats = [
    { title: 'Active Jobs', value: jobs.length || 24, change: 12, changeType: 'positive', icon: Briefcase },
    { title: 'Total Candidates', value: candidates.length || 1284, change: 8, changeType: 'positive', icon: Users },
    { title: 'Applications', value: 156, change: -3, changeType: 'negative', icon: FileText },
    { title: 'Hired This Month', value: 12, change: 25, changeType: 'positive', icon: CheckCircle2 },
  ]

  // Activity feed
  const activities = [
    { icon: Users, title: 'New application received', description: 'John Doe applied for Senior Developer', time: '2m ago', status: 'success' },
    { icon: Brain, title: 'AI Matching completed', description: '15 candidates matched for Marketing Manager', time: '15m ago', status: 'success' },
    { icon: Briefcase, title: 'Job posting updated', description: 'Frontend Developer position modified', time: '1h ago', status: 'info' },
    { icon: AlertCircle, title: 'Interview reminder', description: 'Interview with Sarah in 30 minutes', time: '2h ago', status: 'warning' },
    { icon: CheckCircle2, title: 'Candidate hired', description: 'Michael accepted the offer', time: '3h ago', status: 'success' },
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold">
            Welcome back, {user?.name || user?.client_id || 'User'}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your recruiting pipeline today.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link to="/analytics">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Reports
            </Link>
          </Button>
          <Button asChild>
            <Link to="/jobs/new">
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      {jobsLoading ? (
        <StatsGridSkeleton count={4} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      )}

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Application Trend */}
        <Card variant="neo" className="lg:col-span-2 p-6">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-lg">Application Trend</CardTitle>
            <CardDescription>Weekly application overview</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={applicationTrendData}>
                  <defs>
                    <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="applications"
                    stroke="hsl(160, 84%, 39%)"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorApplications)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pipeline Distribution */}
        <Card variant="neo" className="p-6">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-lg">Pipeline Status</CardTitle>
            <CardDescription>Candidate distribution</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pipelineData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pipelineData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-3 justify-center mt-4">
              {pipelineData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Jobs */}
        <Card variant="neo" className="lg:col-span-2 p-6">
          <CardHeader className="p-0 pb-4 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Recent Jobs</CardTitle>
              <CardDescription>Latest job postings</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/jobs">
                View All <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            {jobsLoading ? (
              <TableSkeleton rows={3} columns={4} />
            ) : jobs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No jobs posted yet
              </div>
            ) : (
              <div className="space-y-3">
                {jobs.slice(0, 5).map((job, index) => (
                  <Link
                    key={job.id || index}
                    to={`/jobs/${job.id}`}
                    className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:bg-muted/30 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{job.title || 'Untitled Job'}</p>
                        <p className="text-sm text-muted-foreground">
                          {job.department || 'General'} • {job.location || 'Remote'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={getStatusColor(job.status)}>
                        {job.status || 'Open'}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {job.applications_count || 0} applicants
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card variant="neo" className="p-6">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <CardDescription>Latest updates</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {activities.map((activity, index) => (
                <ActivityItem key={index} {...activity} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Matching Banner */}
      <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-primary/20 p-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
              <Brain className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold">AI-Powered Matching</h3>
              <p className="text-muted-foreground">
                Let our AI find the best candidates for your open positions
              </p>
            </div>
          </div>
          <Button size="lg" asChild>
            <Link to="/matching">
              Start Matching <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default DashboardPage
