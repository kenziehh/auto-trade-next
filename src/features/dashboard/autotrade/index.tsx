"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { runTradingBot } from "./service/bot";

export function AutoTradeDashboard() {
  const [isRunning, setIsRunning] = useState(false);
  const [selectedPair, setSelectedPair] = useState("btc_idr");
  const [profitLoss, setProfitLoss] = useState<number | null>(null);

  const { mutate: runBot, data: botResult } = useMutation({
    mutationFn: () => runTradingBot(selectedPair),
    onSuccess: (data) => {
      if (data.orderResult) {
        // Calculate profit/loss (this is a simplified calculation)
        const newProfitLoss =
          data.action === "Buy"
            ? -Number.parseFloat(data.orderResult.return.spend_rp)
            : Number.parseFloat(data.orderResult.return.receive_btc) *
              Number.parseFloat(data.orderResult.return.remain_rp);
        setProfitLoss(
          (prevProfitLoss) => (prevProfitLoss || 0) + newProfitLoss
        );
      }
    },
  });

  const handleRunBot = () => {
    setIsRunning(true);
    runBot();
  };

  const handleStopBot = () => {
    setIsRunning(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trading Bot Control</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <select
            value={selectedPair}
            onChange={(e) => setSelectedPair(e.target.value)}
            className="border rounded p-2"
          >
            <option value="btc_idr">BTC/IDR</option>
            <option value="eth_idr">ETH/IDR</option>
            <option value="usdt_idr">USDT/IDR</option>
          </select>
          {isRunning ? (
            <Button onClick={handleStopBot} variant="destructive">
              Stop Bot
            </Button>
          ) : (
            <Button onClick={handleRunBot}>Run Bot</Button>
          )}
        </div>
        {botResult && (
          <div>
            <h3 className="font-bold">Last Bot Action:</h3>
            <p>Action: {botResult.action}</p>
            <p>Last MACD: {botResult.lastMACD.toFixed(8)}</p>
            <p>Last Signal: {botResult.lastSignal.toFixed(8)}</p>
            {botResult.orderResult && (
              <div>
                <h4 className="font-semibold mt-2">Order Result:</h4>
                <p>Order ID: {botResult.orderResult.return.order_id}</p>
                <p>
                  Amount:{" "}
                  {botResult.orderResult.return.receive_btc ||
                    botResult.orderResult.return.spend_rp}{" "}
                  {selectedPair.split("_")[0].toUpperCase()}
                </p>
                <p>Fee: {botResult.orderResult.return.fee}</p>
              </div>
            )}
          </div>
        )}
        {profitLoss !== null && (
          <div className="mt-4">
            <h3 className="font-bold">Total Profit/Loss:</h3>
            <p className={profitLoss >= 0 ? "text-green-600" : "text-red-600"}>
              {profitLoss.toFixed(2)} IDR
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
