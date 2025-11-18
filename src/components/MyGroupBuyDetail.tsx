import { useState } from "react";
import { ArrowLeft, Users, Clock, MapPin, Share2, Edit, Trash2, MessageCircle, Phone, Copy, Check, QrCode } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { toast } from "sonner@2.0.3";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface MyGroupBuyDetailProps {
  data: any;
  onBack: () => void;
  onNavigate: (page: string, data?: any) => void;
}

export function MyGroupBuyDetail({ data, onBack, onNavigate }: MyGroupBuyDetailProps) {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [copied, setCopied] = useState(false);

  const participants = [
    {
      id: "1",
      name: "同学A",
      avatar: "A",
      joinTime: "2025-11-08 10:30",
      phone: "138****0001",
      isOrganizer: true,
    },
    {
      id: "2",
      name: "同学B",
      avatar: "B",
      joinTime: "2025-11-08 12:15",
      phone: "138****0002",
      isOrganizer: false,
    },
    {
      id: "3",
      name: "同学C",
      avatar: "C",
      joinTime: "2025-11-08 14:45",
      phone: "138****0003",
      isOrganizer: false,
    },
  ];

  const shareLink = `https://tt.xjtlu.edu.cn/group/${data.id || '12345'}`;

  const handleCopyLink = async () => {
    // Try modern clipboard API first
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      toast.success("链接已复制到剪贴板");
      setTimeout(() => setCopied(false), 2000);
      return;
    } catch (err) {
      // Silently fall through to fallback method
    }

    // Fallback for browsers where clipboard API is blocked or unavailable
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
        toast.success("链接已复制到剪贴板");
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

  const handleCancel = () => {
    setShowCancelDialog(false);
    toast.success("拼团已取消，退款将在24小时内到账");
    onBack();
  };

  const handleContact = (participant: any) => {
    toast.info(`联系 ${participant.name}: ${participant.phone}`);
  };

  const progress = (data.currentPeople / data.totalPeople) * 100;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <button onClick={onBack}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1>拼团详情</h1>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4 mb-4">
              <img
                src={data.image}
                alt={data.title}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <div className="flex-1 space-y-2">
                <h2 className="line-clamp-2">{data.title}</h2>
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      data.status === "进行中"
                        ? "bg-blue-500"
                        : data.status === "已成团"
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }
                  >
                    {data.status}
                  </Badge>
                  <span className="text-sm text-gray-500">团长发起</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{data.location}</span>
                </div>
                {data.status === "进行中" && (
                  <div className="flex items-center gap-2 text-sm text-orange-500">
                    <Clock className="w-4 h-4" />
                    <span>剩余 {data.timeLeft}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">拼团进度</span>
                <span className="text-sm">
                  {data.currentPeople}/{data.totalPeople}人
                </span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="text-center">
                <span className="text-2xl text-red-500">¥{data.price}</span>
                <span className="text-sm text-gray-500 ml-2">拼团价</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      {data.status === "进行中" && (
        <div className="px-4 pb-4 grid grid-cols-2 gap-3">
          <Button
            onClick={handleShare}
            className="bg-gradient-to-r from-purple-600 to-indigo-600"
          >
            <Share2 className="w-4 h-4 mr-2" />
            分享拼团
          </Button>
          <Button 
            variant="outline" 
            className="border-red-500 text-red-500 hover:bg-red-50"
            onClick={() => setShowCancelDialog(true)}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            取消拼团
          </Button>
        </div>
      )}

      {/* Cancel Confirmation Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确定要取消拼团吗？</DialogTitle>
            <DialogDescription>
              取消后，已参团的成员将收到通知，并在24小时内自动退款。此操作不可撤销。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              我再想想
            </Button>
            <Button onClick={handleCancel} className="bg-red-500 hover:bg-red-600">
              确定取消
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>邀请好友参团</DialogTitle>
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
                  <Badge className="bg-purple-100 text-purple-700 text-xs">
                    {data.currentPeople}/{data.totalPeople}人
                  </Badge>
                </div>
              </div>
            </div>

            {/* QR Code Placeholder */}
            <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg">
              <div className="w-48 h-48 bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-3">
                <div className="text-center">
                  <QrCode className="w-16 h-16 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">扫码参团</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">微信扫一扫，快速参团</p>
            </div>

            {/* Share Link */}
            <div className="space-y-2">
              <p className="text-sm text-gray-600">分享链接</p>
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
                      <Check className="w-4 h-4 mr-2" />
                      已复制
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      复制
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="grid grid-cols-4 gap-4 pt-2">
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
                  toast.info("正在保存图片...");
                }}
              >
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                  <QrCode className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-600">保存图片</span>
              </button>
              <button
                className="flex flex-col items-center gap-2"
                onClick={handleCopyLink}
              >
                <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center">
                  <Copy className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-600">复制链接</span>
              </button>
            </div>

            {/* Tips */}
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-900">
                💡 <span className="font-semibold">分享小贴士：</span>
                <br />
                • 分享给好友，邀请更多人参团
                <br />
                • 成团后大家都能享受优惠价格
                <br />
                • 还差{data.totalPeople - data.currentPeople}人即可成团！
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Participants */}
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="w-5 h-5" />
              参团成员 ({data.currentPeople}/{data.totalPeople})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {participants.slice(0, data.currentPeople).map((participant) => (
                <div key={participant.id} className="p-4 flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-purple-100 text-purple-700">
                      {participant.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p>{participant.name}</p>
                      {participant.isOrganizer && (
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                          团长
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{participant.joinTime}</p>
                  </div>
                  {!participant.isOrganizer && data.status !== "已完成" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleContact(participant)}
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      联系
                    </Button>
                  )}
                </div>
              ))}
              
              {/* Empty Slots */}
              {Array.from({ length: data.totalPeople - data.currentPeople }).map((_, index) => (
                <div key={`empty-${index}`} className="p-4 flex items-center gap-4 opacity-50">
                  <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <Users className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-400">等待参团...</p>
                  </div>
                </div>
              ))}
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
              <br />
              {data.status === "进行中" && "• 请及时分享给好友，邀请更多人参团"}
              <br />
              • 拼团成功后请及时联系参团成员确认自提时间
              <br />
              • 如有问题可联系客服或参团成员
              {data.status === "进行中" && (
                <>
                  <br />• 若在规定时间内未成团，将自动取消并退款
                </>
              )}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Statistics (for completed groups) */}
      {data.status === "已完成" && (
        <div className="p-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">拼团统计</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 divide-x text-center">
                <div>
                  <p className="text-2xl text-purple-700 mb-1">{data.currentPeople}</p>
                  <p className="text-sm text-gray-500">成团人数</p>
                </div>
                <div>
                  <p className="text-2xl text-green-700 mb-1">100%</p>
                  <p className="text-sm text-gray-500">完成率</p>
                </div>
                <div>
                  <p className="text-2xl text-blue-700 mb-1">5.0</p>
                  <p className="text-sm text-gray-500">评分</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
