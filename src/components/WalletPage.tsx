import { ArrowLeft, Wallet, TrendingUp, TrendingDown, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface WalletPageProps {
  onBack: () => void;
}

export function WalletPage({ onBack }: WalletPageProps) {
  const transactions = [
    {
      id: "1",
      type: "支出",
      title: "参与拼团-山姆小青柠汁",
      amount: -56,
      time: "2025-11-08 14:30",
      icon: TrendingDown,
      color: "text-red-500",
    },
    {
      id: "2",
      type: "退款",
      title: "拼团失败退款",
      amount: 42,
      time: "2025-11-07 10:15",
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      id: "3",
      type: "支出",
      title: "发起拼团押金",
      amount: -20,
      time: "2025-11-06 16:45",
      icon: TrendingDown,
      color: "text-red-500",
    },
    {
      id: "4",
      type: "退款",
      title: "押金退回",
      amount: 20,
      time: "2025-11-05 09:20",
      icon: TrendingUp,
      color: "text-green-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <button onClick={onBack}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1>我的钱包</h1>
            <p className="text-xs opacity-90">My Wallet</p>
          </div>
        </div>
      </div>

      {/* Balance Card */}
      <div className="p-4">
        <Card className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Wallet className="w-5 h-5" />
              <div>
                <span className="text-sm opacity-90 block">账户余额</span>
                <span className="text-xs opacity-75">Account Balance</span>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-4xl mb-1">¥0.00</p>
              <p className="text-sm opacity-75">可用余额 ¥0.00</p>
              <p className="text-xs opacity-60">Available Balance ¥0.00</p>
            </div>
            <Button className="w-full bg-white text-purple-600 hover:bg-gray-100">
              <div className="flex items-center gap-1">
                <Plus className="w-4 h-4" />
                <div className="flex flex-col items-start">
                  <span className="text-sm">充值</span>
                  <span className="text-xs opacity-75">Top Up</span>
                </div>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Stats */}
      <Card className="m-4">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 divide-x">
            <div className="text-center">
              <p className="text-2xl text-purple-700 mb-1">¥56</p>
              <p className="text-sm text-gray-500">本月支出</p>
              <p className="text-xs text-gray-400">Monthly Expense</p>
            </div>
            <div className="text-center">
              <p className="text-2xl text-green-700 mb-1">¥62</p>
              <p className="text-sm text-gray-500">本月退款</p>
              <p className="text-xs text-gray-400">Monthly Refund</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction List */}
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              <div>交易记录</div>
              <div className="text-xs text-gray-500">Transaction History</div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {transactions.map((transaction) => {
                const Icon = transaction.icon;
                return (
                  <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.type === "支出" ? "bg-red-100" : "bg-green-100"}`}>
                        <Icon className={`w-5 h-5 ${transaction.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm mb-1">{transaction.title}</p>
                        <p className="text-xs text-gray-500">{transaction.time}</p>
                      </div>
                      <p className={`${transaction.color}`}>
                        {transaction.amount > 0 ? "+" : ""}¥{Math.abs(transaction.amount)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tips */}
      <div className="p-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">温馨提示：</span>
              拼团支付金额将在拼团成功后自动扣除，拼团失败将在24小时内自动退款。
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
