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
    const body =
      await `method=openOrders&pair=${params.pair}_idr&nonce=${nonce}`;

    const signature = await createSignature(INDODAX_API_SECRET, body);

    const response = await axios.post(INDODAX_BASE_TRADE_API_URL, body, {
      headers: {
        Key: INDODAX_API_KEY,
        Sign: signature,
      },
    });

    return NextResponse.json(response.data.return.orders);
  } catch (error) {
    console.error("Error fetching open orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch open orders" },
      { status: 500 }
    );
  }
}
