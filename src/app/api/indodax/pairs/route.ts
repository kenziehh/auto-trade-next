import {
  INDODAX_API_KEY,
  INDODAX_API_SECRET,
  INDODAX_BASE_API_URL,
  INDODAX_BASE_TRADE_API_URL,
} from "@/lib/env";
import { createSignature } from "@/lib/signature";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    if (!INDODAX_API_KEY || !INDODAX_API_SECRET) {
      throw new Error("API key or secret key not found");
    }

    const pairsResponse = await axios.get(`${INDODAX_BASE_API_URL}pairs`);
    return NextResponse.json(pairsResponse.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch pairs" },
      { status: 500 }
    );
  }
}
