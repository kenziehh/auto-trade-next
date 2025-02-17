import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { transactions } from "../mocks";
import { History } from "@/types/history";
import { Skeleton } from "@/components/ui/skeleton";

export function RecentTransactions({
  histories,
  isLoading = false,
}: {
  histories: History[];
  isLoading?: boolean;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Asset</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-6 w-12" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-24" />
                </TableCell>
              </TableRow>
            ))
          : histories.map((history) => {
              const assetKey = history.currency.split("_")[0]; 
              const amount = history[assetKey] || "0"; 

              return (
                <TableRow key={history.trade_id}>
                  <TableCell>{history.type.toUpperCase()}</TableCell>
                  <TableCell>{assetKey.toUpperCase()}</TableCell>
                  <TableCell>{amount}</TableCell>
                  <TableCell>{history.price}</TableCell>
                  <TableCell>
                    {(parseFloat(amount) * parseFloat(history.price)).toFixed(
                      2
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
      </TableBody>
    </Table>
  );
}
