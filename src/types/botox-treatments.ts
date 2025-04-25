
export interface TreatmentBenefit {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ComparisonFeature {
  name: string;
  botox: string;
  hyaluronic: string;
}

export interface TreatmentComparison {
  title: string;
  botoxTitle: string;
  hyaluronicTitle: string;
  features: ComparisonFeature[];
}

export interface BeforeAfterImage {
  area: string;
  displayName?: string;
  before: string;
  after: string;
  beforeDescription?: string;
  afterDescription?: string;
}
