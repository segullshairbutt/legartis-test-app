import { Category } from './types/contract';

type Severity = 'info' | 'success' | 'warn' | null;

/**
 * Returns a severity level for a given clause category, used for UI styling in PrimeNG components.
 */
export function getSeverityForCategory(category: Category | string): Severity {
  switch (category) {
    case Category.LimitationOfLiability:
      return 'info';
    case Category.TerminationForConvenience:
      return 'success';
    case Category.NonCompete:
      return 'warn';
    default:
      return null;
  }
}
