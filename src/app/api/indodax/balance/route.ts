import {
  INDODAX_API_KEY,
  INDODAX_API_SECRET,
  INDODAX_BASE_TRADE_API_URL,
} from "@/lib/env";
import { NextResponse } from "next/server";
import axios from "axios";
import { createSignature } from "@/lib/signature";

export async function GET() {
  try {
    const nonce = Date.now();
    const body = `method=getInfo&nonce=${nonce}`;
    const signature = await createSignature(INDODAX_API_SECRET, body);
    const response = await axios.post(INDODAX_BASE_TRADE_API_URL, body, {
      headers: {
        Key: INDODAX_API_KEY,
        Sign: signature,
      },
    });

    return NextResponse.json(response.data.return.balance);
  } catch (error) {
    console.error("Error fetching balance:", error);
    return NextResponse.json(
      { error: "Failed to fetch balance" },
      { status: 500 }
    );
  }
}
