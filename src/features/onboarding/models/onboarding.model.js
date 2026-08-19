/**
 * Onboarding Data Model Types (JSDoc)
 *
 * @typedef {Object} User
 * @property {string} id
 * @property {string} studentId
 * @property {string} name
 * @property {string} email
 * @property {string} avatar
 * @property {string} workspaceStatus
 *
 * @typedef {Object} ResumeState
 * @property {string} lastActive
 * @property {string} currentStepName
 * @property {number} estimatedMinutes
 * @property {string} actionText
 *
 * @typedef {Object} ProgressState
 * @property {number} currentStepIndex
 * @property {number} totalSteps
 * @property {number} percentage
 * @property {number} estimatedMinutesLeft
 *
 * @typedef {Object} TodayGoal
 * @property {string} title
 * @property {string} why
 * @property {string} reward
 * @property {number} estimatedMinutes
 *
 * @typedef {Object} ChecklistItem
 * @property {string} id
 * @property {string} title
 * @property {string} why
 * @property {string} reward
 * @property {string} status - 'COMPLETED' | 'IN_PROGRESS' | 'PENDING' | 'LOCKED'
 * @property {string} actionText
 * @property {number} estimatedMinutes
 *
 * @typedef {Object} TimelineStep
 * @property {string} title
 * @property {string} status - 'COMPLETED' | 'ACTIVE' | 'UPCOMING'
 *
 * @typedef {Object} QuickAction
 * @property {string} title
 * @property {string} description
 * @property {string} url
 * @property {string} iconName
 * @property {boolean} comingSoon
 *
 * @typedef {Object} OnboardingDashboardData
 * @property {User} user
 * @property {ResumeState} resume
 * @property {ProgressState} progress
 * @property {TodayGoal} todayGoal
 * @property {ChecklistItem[]} checklist
 * @property {TimelineStep[]} timeline
 * @property {QuickAction[]} quickActions
 */

export const OnboardingStatusEnum = {
  COMPLETED: 'COMPLETED',
  IN_PROGRESS: 'IN_PROGRESS',
  PENDING: 'PENDING',
  LOCKED: 'LOCKED',
};
