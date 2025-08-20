// NFA (AI Election Evaluator) Utils
// Pure functions to compute candidate scores based on data

interface ForumStats {
  posts: number
  upvotes: number
  downvotes?: number
  uniCommunityScore: number
}

interface Comment {
  user: string
  text: string
  createdAt: string
}

interface NFAResult {
  subscores: {
    events: number
    leadership: number
    reputation: number
    agendaFeasibility: number
  }
  overall: number
  grade: 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'D'
  summary: string
}

// Clamp helper
const c01 = (x: number) => Math.max(0, Math.min(1, x))

// Events / Badges (quality + "recency" tags in badge text like "(2025)")
// - base: badges.length / 6
// - quality boosts: +0.06 if badge includes leader|excellence|organizer|mentor|ambassador|champion
// - domain boosts: +0.05 if badge includes research|industry|housing|health|safety|academic
// - recency: +0.03 per "(2025)" or "(Q3)", up to +0.06
// Return Math.round(0–100)
function scoreEvents(badges: string[]): number {
  let score = badges.length / 6 // base score
  
  // Quality boosts
  const qualityKeywords = ['leader', 'excellence', 'organizer', 'mentor', 'ambassador', 'champion']
  badges.forEach(badge => {
    const lowerBadge = badge.toLowerCase()
    if (qualityKeywords.some(keyword => lowerBadge.includes(keyword))) {
      score += 0.06
    }
  })
  
  // Domain boosts
  const domainKeywords = ['research', 'industry', 'housing', 'health', 'safety', 'academic']
  badges.forEach(badge => {
    const lowerBadge = badge.toLowerCase()
    if (domainKeywords.some(keyword => lowerBadge.includes(keyword))) {
      score += 0.05
    }
  })
  
  // Recency boosts (simulate with some badges having recent markers)
  let recencyBoost = 0
  badges.forEach(badge => {
    if (badge.includes('(2025)') || badge.includes('(Q3)') || badge.includes('(Q4)')) {
      recencyBoost += 0.03
    }
  })
  score += Math.min(recencyBoost, 0.06) // cap at +0.06
  
  return Math.round(c01(score) * 100)
}

// Community Support (constructiveness):
// postsFactor = posts / 150
// upvoteRatio = upvotes / max(1, upvotes+downvotes)
// community = uniCommunityScore / 100
// blend = 0.35*postsFactor + 0.40*upvoteRatio + 0.25*community
function scoreLeadership(s: ForumStats): number {
  const postsFactor = s.posts / 150
  const totalVotes = s.upvotes + (s.downvotes || 0)
  const upvoteRatio = s.upvotes / Math.max(1, totalVotes)
  const community = s.uniCommunityScore / 100
  
  const blend = 0.35 * postsFactor + 0.40 * upvoteRatio + 0.25 * community
  return Math.round(c01(blend) * 100)
}

// Peer Feedback (ratings + sentiment):
// stars = (avgRating - 3) / 2  // 3★=0, 5★=1
// volume = log10(max(1,totalRatings))/2  // 100 ratings ~= 1
// sentiment = average over comments: +1 for positive words (great, helpful, clear, caring, practical),
//  -1 for negatives (vague, unrealistic, rude, unreliable), normalize to 0..1
// blend = 0.6*stars + 0.15*volume + 0.25*sentiment
function scoreReputation(avg: number, count: number, comments?: Comment[]): number {
  const stars = (avg - 3) / 2
  const volume = Math.log10(Math.max(1, count)) / 2
  
  let sentiment = 0.5 // neutral baseline
  if (comments && comments.length > 0) {
    const positiveWords = ['great', 'helpful', 'clear', 'caring', 'practical', 'excellent', 'strong', 'impressive', 'dedicated', 'reliable']
    const negativeWords = ['vague', 'unrealistic', 'rude', 'unreliable', 'weak', 'poor', 'disappointing', 'unclear', 'impractical']
    
    let sentimentSum = 0
    comments.forEach(comment => {
      const text = comment.text.toLowerCase()
      let commentSentiment = 0
      
      positiveWords.forEach(word => {
        if (text.includes(word)) commentSentiment += 1
      })
      
      negativeWords.forEach(word => {
        if (text.includes(word)) commentSentiment -= 1
      })
      
      sentimentSum += commentSentiment
    })
    
    // Normalize to 0..1 range
    const avgSentiment = sentimentSum / comments.length
    sentiment = c01((avgSentiment + 2) / 4) // map -2..2 to 0..1
  }
  
  const blend = 0.6 * c01(stars) + 0.15 * c01(volume) + 0.25 * sentiment
  return Math.round(c01(blend) * 100)
}

// Agenda Feasibility (keyword heuristics):
// +concrete: count of (timeline|pilot|budget|kpi|workshop|partnership|database|program|rollout|phase|mentorship)
// +metrics: numbers, %, "quarter", "semester", "deadline", "deliverable"
// -vague: (hope|aspire|maybe|explore|someday)
// Start at 0.55, add +0.04*concrete (cap +0.25), +0.05*metrics (cap +0.2), minus 0.06*vague (cap -0.3)
function scoreAgenda(text: string, notes?: string): number {
  const fullText = (text + ' ' + (notes || '')).toLowerCase()
  
  let score = 0.55 // baseline
  
  // Concrete keywords
  const concreteKeywords = ['timeline', 'pilot', 'budget', 'kpi', 'workshop', 'partnership', 'database', 'program', 'rollout', 'phase', 'mentorship']
  let concreteCount = 0
  concreteKeywords.forEach(keyword => {
    if (fullText.includes(keyword)) concreteCount++
  })
  score += Math.min(0.04 * concreteCount, 0.25)
  
  // Metrics keywords
  const metricsKeywords = ['quarter', 'semester', 'deadline', 'deliverable', '%', 'percent']
  let metricsCount = 0
  metricsKeywords.forEach(keyword => {
    if (fullText.includes(keyword)) metricsCount++
  })
  // Also count numbers
  const numberMatches = fullText.match(/\d+/g)
  if (numberMatches) metricsCount += numberMatches.length
  
  score += Math.min(0.05 * metricsCount, 0.2)
  
  // Vague keywords (negative)
  const vagueKeywords = ['hope', 'aspire', 'maybe', 'explore', 'someday']
  let vagueCount = 0
  vagueKeywords.forEach(keyword => {
    if (fullText.includes(keyword)) vagueCount++
  })
  score -= Math.min(0.06 * vagueCount, 0.3)
  
  return Math.round(c01(score) * 100)
}

// Grade conversion
function toGrade(x: number): 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'D' {
  if (x >= 95) return 'A+'
  if (x >= 90) return 'A'
  if (x >= 85) return 'A-'
  if (x >= 80) return 'B+'
  if (x >= 75) return 'B'
  if (x >= 70) return 'B-'
  if (x >= 65) return 'C+'
  if (x >= 60) return 'C'
  return 'D'
}

// Generate summary
function summarize(name: string, s: { events: number; leadership: number; reputation: number; agendaFeasibility: number }): string {
  const scores = [
    { name: 'events', value: s.events, label: 'event participation' },
    { name: 'leadership', value: s.leadership, label: 'community leadership' },
    { name: 'reputation', value: s.reputation, label: 'peer feedback' },
    { name: 'agendaFeasibility', value: s.agendaFeasibility, label: 'agenda feasibility' }
  ]
  
  const strongest = scores.reduce((max, current) => current.value > max.value ? current : max)
  const weakest = scores.reduce((min, current) => current.value < min.value ? current : min)
  
  let summary = `${name} shows strongest performance in ${strongest.label} (${strongest.value}/100). `
  
  if (weakest.value < 60) {
    summary += `Areas for improvement include ${weakest.label} (${weakest.value}/100). `
  } else if (strongest.value >= 85) {
    summary += `Demonstrates consistent excellence across all evaluation criteria. `
  } else {
    summary += `Shows balanced capabilities with room for growth in ${weakest.label}. `
  }
  
  // Add overall assessment
  const average = (s.events + s.leadership + s.reputation + s.agendaFeasibility) / 4
  if (average >= 80) {
    summary += 'Strong candidate with proven track record.'
  } else if (average >= 65) {
    summary += 'Solid candidate with good potential.'
  } else {
    summary += 'Developing candidate with growth opportunities.'
  }
  
  return summary
}

// Weights for overall score
const WEIGHTS = { events: 0.30, leadership: 0.25, reputation: 0.15, agenda: 0.30 }

// Main NFA computation function
export function computeNFA(candidate: {
  fullName: string
  badges: string[]
  forumStats: ForumStats
  averageRating: number
  totalRatings: number
  agenda: string
  agendaFeasibilityNotes?: string
  comments?: Comment[]
}): NFAResult {
  const subscores = {
    events: scoreEvents(candidate.badges),
    leadership: scoreLeadership(candidate.forumStats),
    reputation: scoreReputation(candidate.averageRating, candidate.totalRatings, candidate.comments),
    agendaFeasibility: scoreAgenda(candidate.agenda, candidate.agendaFeasibilityNotes)
  }
  
  const overall = Math.round(
    WEIGHTS.events * subscores.events +
    WEIGHTS.leadership * subscores.leadership +
    WEIGHTS.reputation * subscores.reputation +
    WEIGHTS.agenda * subscores.agendaFeasibility
  )
  
  const grade = toGrade(overall)
  const summary = summarize(candidate.fullName, subscores)
  
  return {
    subscores,
    overall,
    grade,
    summary
  }
}
