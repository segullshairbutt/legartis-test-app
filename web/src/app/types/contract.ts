enum Category {
  LimitationOfLiability = 'Limitation of Liability',
  TerminationForConvenience = 'Termination for Convenience',
  NonCompete = 'Non-Compete',
}

interface Clause {
  id: number;
  contract_id: number;
  clause_text: string;
  clause_type: Category;
}

interface Contract {
  id: number;
  title: string;
  number_of_clauses: number;
  clause_types: Category[];
  created_at: Date;
}

interface ContractDetail extends Contract {
  clauses: Clause[];
}

export type { Contract, Clause, ContractDetail };
export { Category };
