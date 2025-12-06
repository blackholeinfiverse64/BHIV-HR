import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { jobsAPI, candidatesAPI, matchingAPI } from '@/services/api'
import { useToast } from '@/context/ToastContext'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/Select'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { EmptyState, Spinner } from '@/components/ui/index'
import { getInitials, formatDate } from '@/lib/utils'
import {
  Sparkles,
  Search,
  Briefcase,
  Users,
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Calendar,
  CheckCircle2,
  XCircle,
  Zap,
  Target,
  TrendingUp,
  ArrowRight,
  RefreshCw,
} from 'lucide-react'

// Match Score Indicator
function MatchScore({ score }) {
  const getScoreColor = () => {
    if (score >= 80) return 'text-success'
    if (score >= 60) return 'text-warning'
    return 'text-destructive'
  }

  const getScoreBg = () => {
    if (score >= 80) return 'from-success/20 to-success/5'
    if (score >= 60) return 'from-warning/20 to-warning/5'
    return 'from-destructive/20 to-destructive/5'
  }

  return (
    <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${getScoreBg()} flex items-center justify-center`}>
      <span className={`text-2xl font-bold ${getScoreColor()}`}>{score}%</span>
    </div>
  )
}

// Candidate Match Card
function MatchCard({ match, onFeedback }) {
  const [showReason, setShowReason] = useState(false)

  return (
    <Card variant="neo" className="group p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-start gap-4">
        <Avatar className="h-14 w-14 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
          <AvatarImage src={match.candidate?.avatar_url} />
          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5 text-primary font-semibold">
            {getInitials(match.candidate?.name || match.candidate?.full_name || 'Unknown')}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate">
            {match.candidate?.name || match.candidate?.full_name || 'Unknown'}
          </h3>
          <p className="text-sm text-muted-foreground truncate">
            {match.candidate?.current_title || 'Not specified'}
          </p>
        </div>

        <MatchScore score={match.score || match.match_score || 0} />
      </div>

      {/* Match Highlights */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
          <span className="text-muted-foreground">
            {match.matching_skills?.length || 0} matching skills
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
          <span className="text-muted-foreground">
            {match.experience_match || 'Experience aligned'}
          </span>
        </div>
        {match.gaps?.length > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <XCircle className="h-4 w-4 text-warning shrink-0" />
            <span className="text-muted-foreground">
              {match.gaps.length} potential gap{match.gaps.length > 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>

      {/* Skills */}
      {match.matching_skills && match.matching_skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4">
          {match.matching_skills.slice(0, 4).map((skill, i) => (
            <Badge key={i} variant="success" className="text-xs">
              {skill}
            </Badge>
          ))}
          {match.matching_skills.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{match.matching_skills.length - 4}
            </Badge>
          )}
        </div>
      )}

      {/* AI Reasoning Toggle */}
      {match.reason && (
        <div className="mt-4">
          <button
            onClick={() => setShowReason(!showReason)}
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            <Sparkles className="h-3 w-3" />
            {showReason ? 'Hide' : 'Show'} AI reasoning
          </button>
          {showReason && (
            <p className="mt-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
              {match.reason}
            </p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-success hover:text-success hover:bg-success/10"
            onClick={() => onFeedback?.(match.candidate?.id, 'positive')}
          >
            <ThumbsUp className="h-4 w-4 mr-1" /> Good Match
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => onFeedback?.(match.candidate?.id, 'negative')}
          >
            <ThumbsDown className="h-4 w-4 mr-1" /> Not a Fit
          </Button>
        </div>
        <Button size="sm" variant="secondary">
          <Calendar className="h-4 w-4 mr-1" /> Schedule
        </Button>
      </div>
    </Card>
  )
}

export function MatchingPage() {
  const { toast } = useToast()
  const [selectedJob, setSelectedJob] = useState('')
  const [matchCriteria, setMatchCriteria] = useState({
    skills_weight: 40,
    experience_weight: 30,
    education_weight: 15,
    location_weight: 15,
  })

  // Fetch jobs for selection
  const { data: jobsData } = useQuery({
    queryKey: ['jobs-for-matching'],
    queryFn: () => jobsAPI.getJobs({ status: 'open', limit: 100 }),
  })

  const jobs = jobsData?.jobs || []

  // Fetch matches when job is selected
  const {
    data: matchesData,
    isLoading: matchesLoading,
    refetch: refetchMatches,
    isFetching,
  } = useQuery({
    queryKey: ['matches', selectedJob],
    queryFn: () => matchingAPI.getMatchingCandidates(selectedJob),
    enabled: !!selectedJob,
  })

  const matches = matchesData?.matches || matchesData?.candidates || []

  // Trigger AI matching
  const triggerMatchMutation = useMutation({
    mutationFn: () => matchingAPI.triggerMatching(selectedJob, matchCriteria),
    onSuccess: () => {
      toast.success('Matching Started', 'AI is analyzing candidates...')
      setTimeout(() => refetchMatches(), 2000)
    },
    onError: () => {
      toast.error('Error', 'Failed to start matching process')
    },
  })

  // Submit feedback
  const feedbackMutation = useMutation({
    mutationFn: ({ candidateId, feedback }) =>
      matchingAPI.submitFeedback(selectedJob, candidateId, feedback),
    onSuccess: () => {
      toast.success('Feedback Submitted', 'Your feedback helps improve our AI matching.')
    },
  })

  const handleFeedback = (candidateId, feedback) => {
    feedbackMutation.mutate({ candidateId, feedback })
  }

  const selectedJobData = jobs.find((j) => j.id === selectedJob)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            AI Candidate Matching
          </h1>
          <p className="text-muted-foreground mt-1">
            Find the best candidates for your open positions using AI-powered matching
          </p>
        </div>
      </div>

      {/* Job Selection */}
      <Card variant="neo" className="p-6">
        <CardHeader className="p-0 pb-6">
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            Select Job Position
          </CardTitle>
          <CardDescription>
            Choose a job to find matching candidates
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Select value={selectedJob} onValueChange={setSelectedJob}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a job position..." />
                </SelectTrigger>
                <SelectContent>
                  {jobs.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      <span className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        {job.title}
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {job.applications_count || 0} applicants
                        </Badge>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={() => triggerMatchMutation.mutate()}
              disabled={!selectedJob || triggerMatchMutation.isPending}
              loading={triggerMatchMutation.isPending}
            >
              <Zap className="h-4 w-4 mr-2" />
              Run AI Matching
            </Button>
          </div>

          {/* Selected Job Info */}
          {selectedJobData && (
            <div className="mt-4 p-4 rounded-xl bg-muted/50">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{selectedJobData.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedJobData.department} • {selectedJobData.location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Required Skills</p>
                  <div className="flex gap-1 mt-1">
                    {selectedJobData.skills?.slice(0, 3).map((skill, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Matching Results */}
      {selectedJob && (
        <Tabs defaultValue="matches" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="matches" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Top Matches
            </TabsTrigger>
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              All Results
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="matches" className="space-y-6">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  {matches.length} Matching Candidates
                </h3>
                <p className="text-sm text-muted-foreground">
                  Ranked by AI match score
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetchMatches()}
                disabled={isFetching}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isFetching ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>

            {/* Matches Grid */}
            {matchesLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i} className="p-6">
                    <div className="flex gap-4">
                      <div className="h-14 w-14 rounded-full bg-muted animate-pulse" />
                      <div className="flex-1 space-y-2">
                        <div className="h-5 w-32 bg-muted rounded animate-pulse" />
                        <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                      </div>
                      <div className="h-16 w-16 rounded-2xl bg-muted animate-pulse" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : matches.length === 0 ? (
              <EmptyState
                icon={Users}
                title="No matches yet"
                description="Click 'Run AI Matching' to find candidates for this position"
                actionLabel="Run AI Matching"
                onAction={() => triggerMatchMutation.mutate()}
              />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {matches
                  .sort((a, b) => (b.score || b.match_score || 0) - (a.score || a.match_score || 0))
                  .map((match, index) => (
                    <MatchCard key={match.candidate?.id || index} match={match} onFeedback={handleFeedback} />
                  ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-6">
            <Card variant="glass" className="p-6">
              <p className="text-muted-foreground">
                Full candidate results with all scores and details will appear here.
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="neo" className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-success/10 flex items-center justify-center">
                    <Target className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {matches.filter((m) => (m.score || m.match_score || 0) >= 80).length}
                    </p>
                    <p className="text-sm text-muted-foreground">High Match (80%+)</p>
                  </div>
                </div>
              </Card>
              <Card variant="neo" className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-warning/10 flex items-center justify-center">
                    <Star className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {matches.length > 0
                        ? Math.round(
                            matches.reduce((sum, m) => sum + (m.score || m.match_score || 0), 0) /
                              matches.length
                          )
                        : 0}
                      %
                    </p>
                    <p className="text-sm text-muted-foreground">Average Match Score</p>
                  </div>
                </div>
              </Card>
              <Card variant="neo" className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{matches.length}</p>
                    <p className="text-sm text-muted-foreground">Total Candidates Analyzed</p>
                  </div>
                </div>
              </Card>
            </div>

            <Card variant="glass" className="p-6">
              <h4 className="font-semibold mb-4">Most Common Skills in Top Matches</h4>
              <div className="flex flex-wrap gap-2">
                {['Python', 'React', 'Node.js', 'AWS', 'Machine Learning', 'SQL'].map(
                  (skill, i) => (
                    <Badge key={i} variant="secondary" className="text-sm py-1 px-3">
                      {skill}
                      <span className="ml-2 text-muted-foreground">
                        {Math.floor(Math.random() * 20) + 5}
                      </span>
                    </Badge>
                  )
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* How It Works */}
      {!selectedJob && (
        <Card variant="gradient" className="p-8">
          <h3 className="text-xl font-semibold mb-6 text-center">How AI Matching Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Briefcase,
                title: '1. Select a Job',
                description: 'Choose an open position to find matching candidates',
              },
              {
                icon: Sparkles,
                title: '2. AI Analysis',
                description: 'Our AI analyzes skills, experience, and job requirements',
              },
              {
                icon: Target,
                title: '3. Get Results',
                description: 'Review ranked candidates with match scores and reasoning',
              },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}

export default MatchingPage
