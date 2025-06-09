
export interface TestResult {
  id: string;
  name: string;
  status: 'passed' | 'failed' | 'skipped' | 'pending';
  duration: number;
  error?: string;
  file?: string;
  line?: number;
}

export interface TestSuite {
  name: string;
  results: TestResult[];
  totalTests: number;
  passedTests: number;
  failedTests: number;
  skippedTests: number;
  duration: number;
}

export interface TestReport {
  timestamp: string;
  suites: TestSuite[];
  totalTests: number;
  passedTests: number;
  failedTests: number;
  skippedTests: number;
  overallDuration: number;
  coverage?: {
    lines: number;
    functions: number;
    branches: number;
    statements: number;
  };
}

export type TestCategory = 'unit' | 'integration' | 'e2e' | 'performance' | 'accessibility' | 'visual';
