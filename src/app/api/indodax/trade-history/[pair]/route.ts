import {
  INDODAX_API_KEY,
  INDODAX_API_SECRET,
  INDODAX_BASE_TRADE_API_URL,
} from "@/lib/env";
import { createSignature } from "@/lib/signature";
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

    const nonce = Date.now();
    const body = await `method=tradeHistory&pair=${params.pair}&nonce=${nonce}`;

    const signature = await createSignature(INDODAX_API_SECRET, body);

    const response = await axios.post(INDODAX_BASE_TRADE_API_URL, body, {
      headers: {
        Key: INDODAX_API_KEY,
        Sign: signature,
      },
    });

    return NextResponse.json(response.data.return.trades);
  } catch (error) {
    console.error("Error fetching trade history:", error);
    return NextResponse.json(
      { error: "Failed to fetch trade history" },
      { status: 500 }
    );
  }
}
