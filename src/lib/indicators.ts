export function calculateEMA(prices: number[], period: number): number[] {
  const k = 2 / (period + 1);
  const emaData = [prices[0]];
  for (let i = 1; i < prices.length; i++) {
    const ema = prices[i] * k + emaData[i - 1] * (1 - k);
    emaData.push(ema);
  }
  return emaData;
}

export function calculateMACD(
  prices: number[],
  fastPeriod = 12,
  slowPeriod = 26,
  signalPeriod = 9
): {
  macdLine: number[];
  signalLine: number[];
  histogram: number[];
} {
  const fastEMA = calculateEMA(prices, fastPeriod);
  const slowEMA = calculateEMA(prices, slowPeriod);
  const macdLine = fastEMA.map((fast, i) => fast - slowEMA[i]);
  const signalLine = calculateEMA(macdLine, signalPeriod);
  const histogram = macdLine.map((macd, i) => macd - signalLine[i]);

  return { macdLine, signalLine, histogram };
}
