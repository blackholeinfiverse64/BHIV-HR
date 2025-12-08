import Layout from '../../components/Layout'
import { Briefcase, Calendar, FileText, TrendingUp, Clock, CheckCircle } from 'lucide-react'

export default function CandidateDashboard() {
  return (
    <Layout userType="candidate">
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-3">Candidate Dashboard</h1>
          <p className="text-muted-foreground text-lg font-medium">Welcome back! Here's your job search overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="neo-card p-6 animate-fade-up">
            <div className="flex items-start justify-between mb-4">
              <div className="h-14 w-14 rounded-xl flex items-center justify-center shadow-md" style={{ background: 'var(--gradient-primary)' }}>
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <span className="badge badge-primary">+3 New</span>
            </div>
            <p className="text-4xl font-heading font-bold text-foreground mb-2">12</p>
            <p className="text-sm font-medium text-muted-foreground">Active Applications</p>
          </div>

          <div className="neo-card p-6 animate-fade-up animation-delay-100">
            <div className="flex items-start justify-between mb-4">
              <div className="h-14 w-14 rounded-xl flex items-center justify-center shadow-md" style={{ background: 'var(--gradient-secondary)' }}>
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <span className="badge badge-secondary">This Week</span>
            </div>
            <p className="text-4xl font-heading font-bold text-foreground mb-2">3</p>
            <p className="text-sm font-medium text-muted-foreground">Upcoming Interviews</p>
          </div>

          <div className="neo-card p-6 animate-fade-up animation-delay-200">
            <div className="flex items-start justify-between mb-4">
              <div className="h-14 w-14 rounded-xl flex items-center justify-center shadow-md bg-gradient-to-br from-success to-success/80">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <span className="badge badge-success">66%</span>
            </div>
            <p className="text-4xl font-heading font-bold text-foreground mb-2">8</p>
            <p className="text-sm font-medium text-muted-foreground">Shortlisted</p>
          </div>

          <div className="neo-card p-6 animate-fade-up animation-delay-300">
            <div className="flex items-start justify-between mb-4">
              <div className="h-14 w-14 rounded-xl flex items-center justify-center shadow-md" style={{ background: 'var(--gradient-accent)' }}>
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="badge badge-warning">88%</span>
            </div>
            <p className="text-4xl font-heading font-bold text-foreground mb-2">4.2</p>
            <p className="text-sm font-medium text-muted-foreground">Avg Match Score</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Applications */}
          <div className="card-glass p-6 animate-fade-up animation-delay-400">
            <h2 className="text-xl font-heading font-bold text-foreground mb-6 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Recent Applications
            </h2>
            <div className="space-y-3">
              {[
                { company: 'Tech Corp', position: 'Senior Developer', status: 'Reviewing', variant: 'info' },
                { company: 'StartupXYZ', position: 'Full Stack Engineer', status: 'Shortlisted', variant: 'success' },
                { company: 'InnovateLabs', position: 'Frontend Lead', status: 'Interview', variant: 'secondary' },
              ].map((app, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-card hover:bg-muted/30 border border-border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                  <div>
                    <p className="font-bold text-foreground">{app.company}</p>
                    <p className="text-sm text-muted-foreground">{app.position}</p>
                  </div>
                  <span className={`badge badge-${app.variant}`}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Interviews */}
          <div className="card-glass p-6 animate-fade-up animation-delay-500">
            <h2 className="text-xl font-heading font-bold text-foreground mb-6 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
              Upcoming Interviews
            </h2>
            <div className="space-y-3">
              {[
                { company: 'Tech Corp', date: 'Dec 10, 2025', time: '2:00 PM', type: 'Technical Round' },
                { company: 'StartupXYZ', date: 'Dec 12, 2025', time: '10:00 AM', type: 'HR Round' },
                { company: 'InnovateLabs', date: 'Dec 15, 2025', time: '3:30 PM', type: 'Final Round' },
              ].map((interview, idx) => (
                <div key={idx} className="flex items-start justify-between p-4 rounded-xl bg-card hover:bg-muted/30 border border-border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                  <div className="flex items-start gap-3">
                    <div className="h-11 w-11 rounded-xl bg-secondary/10 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{interview.company}</p>
                      <p className="text-sm text-muted-foreground">{interview.type}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        {interview.date} • {interview.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Completion */}
        <div className="neo-card p-6 animate-fade-up">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground">Profile Completion</h2>
              <p className="text-sm text-muted-foreground mt-1">Complete your profile to increase visibility</p>
            </div>
            <span className="text-3xl font-heading font-bold gradient-text">85%</span>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-6">
            <div className="h-full rounded-full transition-all duration-500" style={{ width: '85%', background: 'var(--gradient-primary)' }} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="text-foreground font-medium">Basic Info</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="text-foreground font-medium">Experience</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="text-foreground font-medium">Skills</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <span className="text-muted-foreground">Certifications</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
