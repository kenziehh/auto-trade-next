"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RecentTransactions } from "./components/recent-transaction";
import { Overview } from "./components/overview";
import { Balance } from "@/types/ticker";
import { getUserBalance } from "./service/indodax/get-user-balance";
import { History } from "@/types/history";
import { getTradeHistory } from "./service/indodax/get-trade-history";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pair } from "@/types/pair";
import { getAllPairs } from "./service/indodax/get-all-pairs";

export function DashboardMain() {
  const [selectedPair, setSelectedPair] = useState("btc_idr");

  const {
    data: balance,
    isLoading,
    isError,
  } = useQuery<Balance, Error>({
    queryKey: ["balance"],
    queryFn: getUserBalance,
  });

  const { data: histories, isLoading: isHistoryLoading } = useQuery<
    History[],
    Error
  >({
    queryKey: ["history", selectedPair],
    queryFn: () => getTradeHistory(selectedPair),
    enabled: !!selectedPair,
  });

  const { data: pairs, isLoading: isPairsLoading } = useQuery<Pair[], Error>({
    queryKey: ["pairs", selectedPair],
    queryFn: getAllPairs,
  });
  return (
    <main className="flex-1 overflow-y-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Total IDR Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-[100px]" />
            ) : isError ? (
              <div className="text-2xl font-bold text-red-500">
                Error fetching balance
              </div>
            ) : (
              <div className="text-2xl font-bold">Rp. {balance?.idr || 0}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Active Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">3 buy, 4 sell</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Profit/Loss</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+$1,234.56</div>
            <p className="text-xs text-muted-foreground">+5.2% this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Trading Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$98,765.43</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mt-6">
        <h2 className="text-xl font-bold">Recent Transactions</h2>
        <Select onValueChange={setSelectedPair} defaultValue={"btc_idr"}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select pair" />
          </SelectTrigger>
          <SelectContent>
            {pairs?.map((pair: Pair) => (
              <SelectItem value={pair.ticker_id} key={pair.id}>
                {pair.symbol}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentTransactions
              histories={histories ?? []}
              isLoading={isHistoryLoading}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
