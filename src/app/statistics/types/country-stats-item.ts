export interface CovidStatisticsResponse {
  response: CovidStatisticsResponseItem[];
}

interface CasesStatsResponse extends StatsResponse {
  active: number;
  critical: number | null;
  recovered: number;
}

interface TestsStatsResponse extends Omit<StatsResponse, 'new'> {}

interface StatsResponse {
  new: number | null;
  '1M_pop': string | null;
  total: number | null;
}

interface CovidStatisticsResponseItem {
  continent: string;
  country: string;
  population: number;
  cases: CasesStatsResponse;
  deaths: StatsResponse;
  tests: TestsStatsResponse;
  day: string;
  time: string;
}

export interface CountryStatsItem {
  continent: string;
  country: string;
  population: number;
  cases: CasesStats;
  deaths: Stats;
  tests: TestsStats;
  day: string;
  time: string;
}

export interface CasesStats extends Stats {
  active: number;
  critical: number | null;
  recovered: number;
}

export interface TestsStats extends Omit<Stats, 'new'> {}

export interface Stats {
  new: number | null;
  oneMilPop?: number;
  total: number | null;
}
