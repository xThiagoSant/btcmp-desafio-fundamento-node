import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionServiceDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

function balanceFromType(
  transactions: Transaction[],
  type: 'income' | 'outcome',
): number {
  const value = transactions
    .filter(transaction => transaction.type === type)
    .reduce(
      (previousValue, currentValue) => previousValue + currentValue.value,
      0,
    );

  return value;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public create({
    title,
    value,
    type,
  }: CreateTransactionServiceDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }

  public getBalance(): Balance {
    const totalIncome = balanceFromType(this.transactions, 'income');
    const totalOutcome = balanceFromType(this.transactions, 'outcome');
    const total = totalIncome - totalOutcome;
    return {
      income: totalIncome,
      outcome: totalOutcome,
      total,
    };
  }
}

export default TransactionsRepository;
