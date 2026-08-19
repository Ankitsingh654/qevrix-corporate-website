import { onboardingMock } from '../mocks/onboardingMock';

class OnboardingService {
  /**
   * Fetches the onboarding dashboard data.
   * In the future, this will be replaced with an Axios API call.
   * @returns {Promise<import('../models/onboarding.model').OnboardingDashboardData>}
   */
  async getDashboardData() {
    // Simulate network latency
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(onboardingMock);
      }, 500);
    });
  }
}

export const onboardingService = new OnboardingService();
