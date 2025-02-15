import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { transactions } from "../mocks"



export function RecentTransactions() {
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
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{transaction.type}</TableCell>
            <TableCell>{transaction.asset}</TableCell>
            <TableCell>{transaction.amount}</TableCell>
            <TableCell>{transaction.price}</TableCell>
            <TableCell>{transaction.total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

