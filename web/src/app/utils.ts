import { ClauseType } from './types/contract';

type Severity = 'info' | 'success' | 'warn' | null;

/**
 * Returns a severity level for a given clause category, used for UI styling in PrimeNG components.
 */
export function getSeverityForCategory(category: ClauseType | string): Severity {
  switch (category) {
    case ClauseType.LimitationOfLiability:
      return 'info';
    case ClauseType.TerminationForConvenience:
      return 'success';
    case ClauseType.NonCompete:
      return 'warn';
    default:
      return null;
  }
}
