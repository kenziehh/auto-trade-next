import { calculateMACD } from "@/lib/indicators";
import { getPairTrades } from "../api/get-pair-trades";
import { createBuyOrder, createSellOrder } from "../api/create-order";

interface BotResult {
  action: string;
  lastMACD: number;
  lastSignal: number;
  orderResult?: any;
}

export async function runTradingBot(pair: string): Promise<BotResult> {
  try {
    const prices = await getPairTrades(pair, "1h");
    const { macdLine, signalLine } = calculateMACD(prices);

    const lastMACD = macdLine[macdLine.length - 1];
    const lastSignal = signalLine[signalLine.length - 1];
    const previousMACD = macdLine[macdLine.length - 2];
    const previousSignal = signalLine[signalLine.length - 2];

    const lastPrice = prices[prices.length - 1];
    const tradeAmount = 100000; // Trade with 100,000 IDR, adjust as needed

    let action = "No action taken";
    let orderResult;

    if (lastMACD > lastSignal && previousMACD <= previousSignal) {
      // MACD line crosses above signal line - Buy signal
      action = "Buy";
      orderResult = await createBuyOrder(pair, lastPrice, tradeAmount);
    } else if (lastMACD < lastSignal && previousMACD >= previousSignal) {
      // MACD line crosses below signal line - Sell signal
      action = "Sell";
      const assetAmount = tradeAmount / lastPrice; // Calculate amount of asset to sell
      orderResult = await createSellOrder(pair, lastPrice, assetAmount);
    }

    return { action, lastMACD, lastSignal, orderResult };
  } catch (error) {
    console.error("Error running trading bot:", error);
    throw error;
  }
}
