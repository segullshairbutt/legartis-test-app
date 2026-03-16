enum Category {
  LimitationOfLiability = 'Limitation of Liability',
  TerminationForConvenience = 'Termination for Convenience',
  NonCompete = 'Non-Compete',
}

interface Clause {
  id: number;
  contractId: number;
  text: string;
  type: Category;
}

interface Contract {
  id: number;
  title: string;
  numberOfClauses: number;
  categories: Category[];
  createdAt: Date;
}

export type { Contract, Clause };
export { Category };
