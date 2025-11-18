import { useState } from "react";
import { 
  ArrowLeft, 
  Share2, 
  MapPin, 
  Clock, 
  Users, 
  Package,
  CheckCircle,
  QrCode,
  Copy,
  Check,
  MessageCircle,
  Phone,
  AlertCircle
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { toast } from "sonner@2.0.3";

interface OrderDetailProps {
  data: any;
  onBack: () => void;
}

export function OrderDetail({ data, onBack }: OrderDetailProps) {
  const [showQRCode, setShowQRCode] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [copied, setCopied] = useState(false);

  const progress = (data.currentPeople / data.totalPeople) * 100;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-orange-500 bg-orange-50";
      case "pickup":
        return "text-blue-500 bg-blue-50";
      case "completed":
        return "text-green-500 bg-green-50";
      case "refund":
        return "text-red-500 bg-red-50";
      default:
        return "text-gray-500 bg-gray-50";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return { cn: "待成团", en: "Pending" };
      case "pickup":
        return { cn: "待取货", en: "Ready to Pickup" };
      case "completed":
        return { cn: "已完成", en: "Completed" };
      case "refund":
        return { cn: "售后中", en: "Refunding" };
      default:
        return { cn: "未知", en: "Unknown" };
    }
  };

  const members = [
    { name: "用户A", avatar: "A" },
    { name: "用户B", avatar: "B" },
    { name: "用户C", avatar: "C" },
    { name: "用户D", avatar: "D" },
    { name: "用户E", avatar: "E" },
  ];

  const orderTimeline = [
    { 
      time: "2024-11-09 14:30", 
      status: "下单成功", 
      desc: "您已成功参与拼团",
      icon: CheckCircle,
      active: true
    },
    { 
      time: data.status === "pending" ? "待确定" : "2024-11-09 16:45", 
      status: "拼团成功", 
      desc: "已满员，等待发货",
      icon: Users,
      active: data.status !== "pending"
    },
    { 
      time: data.status === "pickup" || data.status === "completed" ? "2024-11-10 10:00" : "待确定", 
      status: "商品到达", 
      desc: `已送达${data.location}`,
      icon: Package,
      active: data.status === "pickup" || data.status === "completed"
    },
    { 
      time: data.status === "completed" ? "2024-11-10 16:20" : "待确定", 
      status: "取货完成", 
      desc: "交易完成",
      icon: CheckCircle,
      active: data.status === "completed"
    },
  ];

  const shareLink = `https://tt.xjtlu.edu.cn/order/${data.orderNumber}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      toast.success("订单号已复制到剪贴板");
      setTimeout(() => setCopied(false), 2000);
      return;
    } catch (err) {
      // Fallback
    }

    try {
      const textArea = document.createElement("textarea");
      textArea.value = shareLink;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      
      if (successful) {
        setCopied(true);
        toast.success("订单号已复制到剪贴板");
        setTimeout(() => setCopied(false), 2000);
      } else {
        toast.error("复制失败，请手动复制");
      }
    } catch (err) {
      toast.error("复制失败，请手动复制");
    }
  };

  const handleShare = () => {
    setShowShareDialog(true);
  };

  const handleCancelOrder = () => {
    setShowCancelDialog(true);
  };

  const confirmCancelOrder = () => {
    toast.success("订单已取消，退款将在1-3个工作日内到账");
    setShowCancelDialog(false);
    // 延迟返回，让用户看到成功提示
    setTimeout(() => {
      onBack();
    }, 1500);
  };

  const pickupCode = "TT" + data.orderNumber.slice(-6);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1>订单详情</h1>
            <p className="text-xs text-gray-500">Order Details</p>
          </div>
        </div>
        {data.status === "pending" && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleShare}
          >
            <div className="flex items-center gap-1">
              <Share2 className="w-4 h-4" />
              <div className="flex flex-col items-start">
                <span className="text-xs leading-none">分享</span>
                <span className="text-[10px] text-gray-500 leading-none -mt-0.5">Share</span>
              </div>
            </div>
          </Button>
        )}
      </div>

      {/* Order Status */}
      <Card className="m-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className={`px-4 py-2 rounded-full ${getStatusColor(data.status)}`}>
              <div className="flex flex-col">
                <span className="font-medium">{getStatusText(data.status).cn}</span>
                <span className="text-xs">{getStatusText(data.status).en}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">订单号 Order No.</p>
              <div className="flex items-center gap-2">
                <p className="text-sm">{data.orderNumber}</p>
                <button onClick={handleCopyLink}>
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {data.status === "pending" && data.timeLeft && (
            <div className="p-3 bg-orange-50 rounded-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              <div className="flex-1">
                <p className="text-sm text-orange-700">
                  还差 {data.totalPeople - data.currentPeople} 人成团
                </p>
                <p className="text-xs text-orange-600">Need {data.totalPeople - data.currentPeople} more people</p>
                <p className="text-xs text-orange-600 mt-1">剩余 {data.timeLeft}，不足自动退款</p>
                <p className="text-[10px] text-orange-500">Time left {data.timeLeft}, auto refund if not met</p>
              </div>
            </div>
          )}

          {data.status === "pickup" && (
            <div className="p-3 bg-blue-50 rounded-lg flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-500" />
              <div className="flex-1">
                <p className="text-sm text-blue-700">
                  商品已到达 {data.location}
                </p>
                <p className="text-xs text-blue-600">Item arrived at {data.location}</p>
                <p className="text-xs text-blue-600 mt-1">请在 {data.pickupTime || "今日18:00前"} 取货</p>
                <p className="text-[10px] text-blue-500">Please pick up before {data.pickupTime || "18:00 today"}</p>
              </div>
              <Button 
                size="sm"
                onClick={() => setShowQRCode(true)}
                className="bg-gradient-to-r from-purple-600 to-indigo-600"
              >
                <div className="flex flex-col">
                  <span className="text-xs">取货码</span>
                  <span className="text-[10px] opacity-90">Pickup</span>
                </div>
              </Button>
            </div>
          )}

          {data.status === "completed" && (
            <div className="p-3 bg-green-50 rounded-lg flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-green-700">
                  订单已完成，感谢您的参与！
                </p>
                <p className="text-xs text-green-600">Order completed, thank you!</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Product Info */}
      <Card className="m-4">
        <CardContent className="p-4">
          <div className="mb-3">
            <h3>商品信息</h3>
            <p className="text-xs text-gray-500">Product Info</p>
          </div>
          <div className="flex gap-3">
            <img
              src={data.image}
              alt={data.title}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h4 className="mb-2">{data.title}</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {data.currentPeople}/{data.totalPeople}人团
                </span>
                <span className="text-red-500 text-lg">¥{data.price}</span>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Group Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div>
                <span className="text-gray-600">拼团进度</span>
                <p className="text-xs text-gray-500">Progress</p>
              </div>
              <span className="text-purple-600">
                {data.currentPeople}/{data.totalPeople}人
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Participants */}
      <Card className="m-4">
        <CardContent className="p-4">
          <div className="mb-3 flex items-center gap-2">
            <Users className="w-5 h-5" />
            <div>
              <h3>参团成员</h3>
              <p className="text-xs text-gray-500">Participants</p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {members.slice(0, data.currentPeople).map((member, index) => (
              <div key={index} className="flex flex-col items-center gap-1">
                <Avatar>
                  <AvatarFallback className="bg-purple-100 text-purple-700">
                    {member.avatar}
                  </AvatarFallback>
                </Avatar>
                {index === 0 && (
                  <Badge variant="secondary" className="text-xs flex flex-col py-0">
                    <span>团长</span>
                    <span className="text-[9px]">Leader</span>
                  </Badge>
                )}
              </div>
            ))}
            {data.currentPeople < data.totalPeople &&
              Array.from({ length: data.totalPeople - data.currentPeople }).map((_, index) => (
                <div key={`empty-${index}`} className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <Users className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-gray-400 block">待加入</span>
                    <span className="text-[9px] text-gray-400">Empty</span>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Pickup Location */}
      <Card className="m-4">
        <CardContent className="p-4">
          <div className="mb-3 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <div>
              <h3>自提信息</h3>
              <p className="text-xs text-gray-500">Pickup Info</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-2 text-sm">
              <div className="text-gray-600 w-24">
                <div>自提地点:</div>
                <div className="text-xs text-gray-500">Location:</div>
              </div>
              <span>{data.location}</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <div className="text-gray-600 w-24">
                <div>取货时间:</div>
                <div className="text-xs text-gray-500">Time:</div>
              </div>
              <span className="text-gray-700">
                {data.status === "pickup" || data.status === "completed" 
                  ? data.pickupTime || "今日12:00-18:00" 
                  : "成团后次日12:00-18:00"}
              </span>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg text-gray-600 mt-3">
              <p className="text-sm">📍 温馨提示 Reminder:</p>
              <p className="text-xs">• 请在规定时间内取货，逾期将视为自动放弃</p>
              <p className="text-[10px] text-gray-500 ml-3">Pick up on time or forfeit</p>
              <p className="text-xs">• 取货时请出示取货码</p>
              <p className="text-[10px] text-gray-500 ml-3">Show pickup code</p>
              <p className="text-xs">• 如有问题请及时联系团长</p>
              <p className="text-[10px] text-gray-500 ml-3">Contact organizer if needed</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Timeline */}
      <Card className="m-4">
        <CardContent className="p-4">
          <div className="mb-4">
            <h3>订单跟踪</h3>
            <p className="text-xs text-gray-500">Order Tracking</p>
          </div>
          <div className="space-y-4">
            {orderTimeline.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      item.active 
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' 
                        : 'bg-gray-200 text-gray-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {index < orderTimeline.length - 1 && (
                      <div className={`w-0.5 h-12 ${
                        item.active ? 'bg-purple-300' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className={`text-sm font-medium ${
                      item.active ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {item.status}
                    </p>
                    <p className={`text-xs ${
                      item.active ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {item.desc}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* QR Code Dialog */}
      <Dialog open={showQRCode} onOpenChange={setShowQRCode}>
        <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>
              <div>取货码</div>
              <div className="text-sm text-gray-500">Pickup Code</div>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* QR Code */}
            <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg">
              <div className="w-48 h-48 bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <QrCode className="w-16 h-16 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">取货二维码</p>
                  <p className="text-xs text-gray-400">Pickup QR Code</p>
                </div>
              </div>
              
              {/* Pickup Code */}
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">取货码 Pickup Code</p>
                <p className="text-3xl font-mono tracking-wider text-purple-600 mb-2">
                  {pickupCode}
                </p>
                <p className="text-xs text-gray-500">请向工作人员出示此码</p>
                <p className="text-[10px] text-gray-400">Show this code to staff</p>
              </div>
            </div>

            {/* Info */}
            <div className="p-3 bg-blue-50 rounded-lg text-blue-700">
              <p className="font-medium mb-1 text-sm">📦 取货地点 Location: {data.location}</p>
              <p className="text-sm">⏰ 取货时间 Time: {data.pickupTime || "今日12:00-18:00"}</p>
            </div>

            {/* Contact */}
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <MessageCircle className="w-4 h-4 mr-1" />
                <div className="flex flex-col items-start">
                  <span className="text-xs leading-none">联系团长</span>
                  <span className="text-[10px] text-gray-500 leading-none -mt-0.5">Contact</span>
                </div>
              </Button>
              <Button variant="outline" className="flex-1">
                <Phone className="w-4 h-4 mr-1" />
                <div className="flex flex-col items-start">
                  <span className="text-xs leading-none">联系客服</span>
                  <span className="text-[10px] text-gray-500 leading-none -mt-0.5">Support</span>
                </div>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cancel Order Confirmation Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <div>确认取消订单？</div>
              <div className="text-sm text-gray-500 mt-1">Confirm Cancellation?</div>
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-3">
                {/* Product Info */}
                <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={data.image}
                    alt={data.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 line-clamp-2">{data.title}</p>
                    <p className="text-red-500 mt-1">¥{data.price}</p>
                  </div>
                </div>

                {/* Warning */}
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-orange-700 space-y-1">
                      <p className="font-medium">取消说明 Cancellation Policy:</p>
                      <p className="text-xs">• 取消订单后将无法恢复</p>
                      <p className="text-[10px] text-orange-600 ml-3">Cannot restore after cancellation</p>
                      <p className="text-xs">• 退款将在1-3个工作日内到账</p>
                      <p className="text-[10px] text-orange-600 ml-3">Refund in 1-3 business days</p>
                      <p className="text-xs">• 如有疑问请联系客服</p>
                      <p className="text-[10px] text-orange-600 ml-3">Contact support if needed</p>
                    </div>
                  </div>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <div className="flex flex-col">
                <span>我再想想</span>
                <span className="text-xs text-gray-500">Keep Order</span>
              </div>
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmCancelOrder}
              className="bg-red-500 hover:bg-red-600"
            >
              <div className="flex flex-col">
                <span>确认取消</span>
                <span className="text-xs opacity-90">Confirm Cancel</span>
              </div>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>
              <div>邀请好友参团</div>
              <div className="text-sm text-gray-500">Invite Friends</div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Product Preview */}
            <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
              <img
                src={data.image}
                alt={data.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1 space-y-1">
                <p className="text-sm line-clamp-2">{data.title}</p>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">¥{data.price}</span>
                  <Badge className="bg-purple-100 text-purple-700 text-xs flex flex-col py-0">
                    <span>还差{data.totalPeople - data.currentPeople}人</span>
                    <span className="text-[9px]">Need {data.totalPeople - data.currentPeople}</span>
                  </Badge>
                </div>
              </div>
            </div>

            {/* Share Link */}
            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-600">分享链接</p>
                <p className="text-xs text-gray-500">Share Link</p>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 p-3 bg-gray-50 rounded-lg text-sm text-gray-600 truncate">
                  {shareLink}
                </div>
                <Button
                  onClick={handleCopyLink}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      <div className="flex flex-col items-start">
                        <span className="text-xs leading-none">已复制</span>
                        <span className="text-[10px] opacity-90 leading-none -mt-0.5">Copied</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1" />
                      <div className="flex flex-col items-start">
                        <span className="text-xs leading-none">复制</span>
                        <span className="text-[10px] opacity-90 leading-none -mt-0.5">Copy</span>
                      </div>
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              <button
                className="flex flex-col items-center gap-2"
                onClick={() => {
                  toast.info("正在打开微信分享...");
                }}
              >
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-600">微信</span>
              </button>
              <button
                className="flex flex-col items-center gap-2"
                onClick={() => {
                  toast.info("正在打开QQ分享...");
                }}
              >
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-600">QQ</span>
              </button>
              <button
                className="flex flex-col items-center gap-2"
                onClick={() => {
                  handleCopyLink();
                }}
              >
                <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center">
                  <Share2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-600">更多</span>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        {data.status === "pending" && (
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4 mr-1" />
              <div className="flex flex-col items-start">
                <span className="text-sm leading-none">邀请好友</span>
                <span className="text-xs text-gray-500 leading-none -mt-0.5">Invite</span>
              </div>
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
              onClick={handleCancelOrder}
            >
              <div className="flex flex-col">
                <span className="text-sm leading-none">取消订单</span>
                <span className="text-xs leading-none -mt-0.5">Cancel</span>
              </div>
            </Button>
          </div>
        )}

        {data.status === "pickup" && (
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              <div className="flex flex-col items-start">
                <span className="text-sm leading-none">联系团长</span>
                <span className="text-xs text-gray-500 leading-none -mt-0.5">Contact</span>
              </div>
            </Button>
            <Button
              className="flex-1"
              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
              onClick={() => setShowQRCode(true)}
            >
              <QrCode className="w-4 h-4 mr-1" />
              <div className="flex flex-col items-start">
                <span className="text-sm leading-none">查看取货码</span>
                <span className="text-xs opacity-90 leading-none -mt-0.5">Pickup Code</span>
              </div>
            </Button>
          </div>
        )}

        {data.status === "completed" && (
          <Button
            className="w-full"
            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
            onClick={() => {
              toast.success("即将跳转到首页查找相似拼团...");
            }}
          >
            <div className="flex flex-col">
              <span>再来一单</span>
              <span className="text-xs opacity-90">Buy Again</span>
            </div>
          </Button>
        )}

        {data.status === "refund" && (
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
            >
              <AlertCircle className="w-4 h-4 mr-1" />
              <div className="flex flex-col items-start">
                <span className="text-sm leading-none">查看进度</span>
                <span className="text-xs text-gray-500 leading-none -mt-0.5">Status</span>
              </div>
            </Button>
            <Button
              variant="outline"
              className="flex-1"
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              <div className="flex flex-col items-start">
                <span className="text-sm leading-none">联系客服</span>
                <span className="text-xs text-gray-500 leading-none -mt-0.5">Support</span>
              </div>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
