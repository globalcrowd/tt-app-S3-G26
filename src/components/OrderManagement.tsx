import { useState, useEffect } from "react";
import { ArrowLeft, Clock, Package, CheckCircle, AlertCircle, Share2, QrCode } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { getUserOrders } from "../services/groupBuy";
import { toast } from "sonner";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface OrderManagementProps {
  onBack: () => void;
  onNavigate: (page: string, data?: any) => void;
  userId: string;
}

export function OrderManagement({ onBack, onNavigate, userId }: OrderManagementProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, [userId]);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const { data, error } = await getUserOrders(userId);
      if (error) {
        toast.error("加载失败 / Failed to load");
      } else if (data) {
        // Map the nested group_buy data to flat structure
        const mappedOrders = data.map((order: any) => ({
          id: order.id,
          title: order.group_buy?.title || '',
          image: order.group_buy?.image_url || '',
          status: order.status,
          currentPeople: order.group_buy?.current_participants || 0,
          totalPeople: order.group_buy?.max_participants || 0,
          price: order.total_amount,
          location: order.group_buy?.pickup_location || '',
          orderNumber: `TT${order.id.slice(0, 8)}`,
          quantity: order.quantity,
        }));
        setOrders(mappedOrders);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'confirmed');
  const completedOrders = orders.filter(o => o.status === 'completed');

  const oldOrders = [
    {
      id: "1",
      title: "山姆小青柠汁1L*6瓶",
      image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400",
      status: "pending",
      currentPeople: 5,
      totalPeople: 6,
      price: 56,
      location: "宿舍3号楼",
      timeLeft: "1小时30分",
      orderNumber: "TT202511090001",
    },
    {
      id: "2",
      title: "山姆瑞士卷16枚装",
      image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400",
      status: "pickup",
      currentPeople: 6,
      totalPeople: 6,
      price: 42,
      location: "宿舍1号楼",
      pickupTime: "今日18:00前",
      orderNumber: "TT202511080023",
    },
    {
      id: "3",
      title: "盒马鲜牛肉500g",
      image: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=400",
      status: "completed",
      currentPeople: 4,
      totalPeople: 4,
      price: 38,
      location: "宿舍2号楼",
      orderNumber: "TT202511070045",
    },
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "pending":
        return {
          icon: Clock,
          text: "待成团",
          textEn: "Pending",
          color: "text-orange-500",
          bgColor: "bg-orange-50",
        };
      case "pickup":
        return {
          icon: Package,
          text: "待取货",
          textEn: "Ready",
          color: "text-blue-500",
          bgColor: "bg-blue-50",
        };
      case "completed":
        return {
          icon: CheckCircle,
          text: "已完成",
          textEn: "Completed",
          color: "text-green-500",
          bgColor: "bg-green-50",
        };
      case "refund":
        return {
          icon: AlertCircle,
          text: "售后中",
          textEn: "Refund",
          color: "text-red-500",
          bgColor: "bg-red-50",
        };
      default:
        return {
          icon: Clock,
          text: "未知",
          textEn: "Unknown",
          color: "text-gray-500",
          bgColor: "bg-gray-50",
        };
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true;
    return order.status === activeTab;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm p-4 flex items-center gap-3">
        <button onClick={onBack}>
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1>我的订单</h1>
          <p className="text-xs text-gray-500">My Orders</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending" className="flex flex-col">
              <span className="leading-none">待成团</span>
              <span className="text-[9px] leading-none -mt-0.5">Pending</span>
            </TabsTrigger>
            <TabsTrigger value="pickup" className="flex flex-col">
              <span className="leading-none">待取货</span>
              <span className="text-[9px] leading-none -mt-0.5">Ready</span>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex flex-col">
              <span className="leading-none">已完成</span>
              <span className="text-[9px] leading-none -mt-0.5">Done</span>
            </TabsTrigger>
            <TabsTrigger value="refund" className="flex flex-col">
              <span className="leading-none">售后中</span>
              <span className="text-[9px] leading-none -mt-0.5">Refund</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Orders List */}
      <div className="p-4 space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">暂无订单</p>
            <p className="text-xs text-gray-400 mt-1">No orders</p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const statusInfo = getStatusInfo(order.status);
            const StatusIcon = statusInfo.icon;

            return (
              <Card key={order.id}>
                <CardContent className="p-4">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusInfo.bgColor}`}>
                      <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
                      <div className="flex flex-col">
                        <span className={`text-sm ${statusInfo.color}`}>
                          {statusInfo.text}
                        </span>
                        <span className={`text-[10px] ${statusInfo.color}`}>
                          {statusInfo.textEn}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-400">
                        订单号 Order No.
                      </span>
                      <p className="text-xs text-gray-500">{order.orderNumber}</p>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex gap-3 mb-3">
                    <ImageWithFallback
                      src={order.image}
                      alt={order.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm mb-2">{order.title}</h3>
                      <p className="text-sm text-gray-500 mb-1">
                        {order.location}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {order.currentPeople}/{order.totalPeople}人
                        </span>
                        <span className="text-red-500">¥{order.price}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Info */}
                  {order.status === "pending" && order.timeLeft && (
                    <div className="p-3 bg-orange-50 rounded-lg mb-3">
                      <p className="text-sm text-orange-700">
                        ⏰ 还差{order.totalPeople - order.currentPeople}人成团，剩余{order.timeLeft}
                      </p>
                      <p className="text-xs text-orange-600 mt-1">
                        Need {order.totalPeople - order.currentPeople} more, {order.timeLeft} left
                      </p>
                    </div>
                  )}

                  {order.status === "pickup" && order.pickupTime && (
                    <div className="p-3 bg-blue-50 rounded-lg mb-3">
                      <p className="text-sm text-blue-700">
                        📦 请在{order.pickupTime}到{order.location}取货
                      </p>
                      <p className="text-xs text-blue-600 mt-1">
                        Pick up at {order.location} before {order.pickupTime}
                      </p>
                    </div>
                  )}

                  {order.status === "completed" && (
                    <div className="p-3 bg-green-50 rounded-lg mb-3">
                      <p className="text-sm text-green-700">
                        ✅ 订单已完成，感谢您的参与
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        Order completed, thank you!
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {order.status === "pending" && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => onNavigate('groupBuyDetail', order)}
                        >
                          <div className="flex items-center gap-1">
                            <Share2 className="w-4 h-4" />
                            <div className="flex flex-col items-start">
                              <span className="text-xs leading-none">邀请好友</span>
                              <span className="text-[9px] text-gray-500 leading-none -mt-0.5">Invite</span>
                            </div>
                          </div>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => onNavigate('groupBuyDetail', order)}
                        >
                          <div className="flex flex-col">
                            <span className="text-xs leading-none">查看详情</span>
                            <span className="text-[9px] text-gray-500 leading-none -mt-0.5">Details</span>
                          </div>
                        </Button>
                      </>
                    )}

                    {order.status === "pickup" && (
                      <>
                        <Button
                          size="sm"
                          className="flex-1"
                          style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                          onClick={() => onNavigate('groupBuyDetail', order)}
                        >
                          <div className="flex items-center gap-1">
                            <QrCode className="w-4 h-4" />
                            <div className="flex flex-col items-start">
                              <span className="text-xs leading-none">查看取货码</span>
                              <span className="text-[9px] opacity-90 leading-none -mt-0.5">QR Code</span>
                            </div>
                          </div>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => onNavigate('groupBuyDetail', order)}
                        >
                          <div className="flex flex-col">
                            <span className="text-xs leading-none">联系团长</span>
                            <span className="text-[9px] text-gray-500 leading-none -mt-0.5">Contact</span>
                          </div>
                        </Button>
                      </>
                    )}

                    {order.status === "completed" && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => onNavigate('groupBuyDetail', order)}
                        >
                          <div className="flex flex-col">
                            <span className="text-xs leading-none">再来一单</span>
                            <span className="text-[9px] text-gray-500 leading-none -mt-0.5">Buy Again</span>
                          </div>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => onNavigate('groupBuyDetail', order)}
                        >
                          <div className="flex flex-col">
                            <span className="text-xs leading-none">查看详情</span>
                            <span className="text-[9px] text-gray-500 leading-none -mt-0.5">Details</span>
                          </div>
                        </Button>
                      </>
                    )}

                    {order.status === "refund" && (
                      <>
                        <Button variant="outline" size="sm" className="flex-1">
                          查看进度
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          联系客服
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
