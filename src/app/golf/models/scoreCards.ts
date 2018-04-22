export class ScoreCard {
  constructor(
    public scorecard_id: string,
    public golfer_id: string,
    public round_id: string,
    public baseScores: number[],
    public stablefordScores: number[]

  ) {  }
}
