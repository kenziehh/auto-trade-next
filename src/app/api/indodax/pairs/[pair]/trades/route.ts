import {
  INDODAX_API_KEY,
  INDODAX_API_SECRET,
  INDODAX_BASE_API_URL,
  INDODAX_BASE_TRADE_API_URL,
} from "@/lib/env";
import { createSignature } from "@/lib/signature";
import { Trade } from "@/types/trade";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { pair: string } }
) {
  try {
    if (!INDODAX_API_KEY || !INDODAX_API_SECRET) {
      throw new Error("API key or secret key not found");
    }

    const { pair } = await params;
    const url = new URL(req.url);
    const timeframe = url.searchParams.get("timeframe") || "1h";

    const response = await axios.get(
      `${INDODAX_BASE_API_URL}${pair}/trades?timeframe=${timeframe}`
    );
    const trades = response.data;
    const prices = trades.map((trade: Trade) => Number.parseFloat(trade.price));

    return NextResponse.json(prices.reverse());
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch trades" },
      { status: 500 }
    );
  }
}
