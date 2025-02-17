import { runTradingBot } from "@/features/dashboard/autotrade/service/bot";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { pair: string } }
) {
  try {
    const pair = params.pair;
    if (!pair) {
      return NextResponse.json({ error: "Pair is required" }, { status: 400 });
    }

    const botResult = await runTradingBot(pair);
    return NextResponse.json({ success: true, data: botResult });
  } catch (error) {
    console.error("Error starting trading bot:", error);
    return NextResponse.json(
      { error: "Failed to start trading bot" },
      { status: 500 }
    );
  }
}
