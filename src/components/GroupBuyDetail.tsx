import { useState } from "react";
import { ArrowLeft, Users, MapPin, Clock, Share2, MessageCircle, Copy, Check, QrCode } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { toast } from "sonner@2.0.3";

interface GroupBuyDetailProps {
  data: any;
  onBack: () => void;
  onJoin: () => void;
  onNavigate: (page: string, data?: any) => void;
}

export function GroupBuyDetail({ data, onBack, onJoin, onNavigate }: GroupBuyDetailProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const images = [data.image];
  const progress = (data.currentPeople / data.totalPeople) * 100;

  const members = [
    { name: "同学A", avatar: "A" },
    { name: "同学B", avatar: "B" },
    { name: "同学C", avatar: "C" },
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

  const handleContactOrganizer = () => {
    // 创建聊天数据并跳转到聊天详情页
    const chatData = {
      id: `chat_${data.id}_${data.organizer}`,
      title: data.title,
      organizer: data.organizer,
      avatar: data.organizer.slice(-1),
      lastMessage: "点击开始聊天",
      time: new Date().toLocaleTimeString("zh-CN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      unread: 0,
      members: data.currentPeople,
      isLeader: false,
      status: "pending",
      fromGroupBuy: true, // 标记这是从拼团详情进入的聊天
    };
    
    onNavigate("chatDetail", chatData);
    toast.success("正在联系团长...");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm p-4 flex items-center gap-3">
        <button onClick={onBack}>
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1>拼团详情</h1>
          <p className="text-xs text-gray-500">Group Buy Details</p>
        </div>
      </div>

      {/* Product Images */}
      <div className="bg-white">
        <img
          src={images[currentImage]}
          alt={data.title}
          className="w-full h-80 object-cover"
        />
      </div>

      {/* Product Info */}
      <Card className="m-4">
        <CardContent className="p-4 space-y-4">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h2 className="flex-1">{data.title}</h2>
              {data.tag && (
                <Badge style={{ backgroundColor: "#FF6B6B" }}>{data.tag}</Badge>
              )}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl text-red-500">¥{data.price}</span>
              <span className="text-sm text-gray-400 line-through">
                原价 Original ¥{data.originalPrice}
              </span>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div>
                <div className="text-gray-600">拼团进度</div>
                <div className="text-xs text-gray-500">Progress</div>
              </div>
              <span className="text-purple-600">
                {data.currentPeople}/{data.totalPeople}人 people
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            
            <div className="flex flex-col gap-1 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>剩余 {data.timeLeft}，不足自动退款</span>
              </div>
              <p className="text-xs ml-5">Time left {data.timeLeft}, auto refund if not met</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <div>
                <div>
                  <p className="text-gray-600">自提地点</p>
                  <p className="text-xs text-gray-500">Pickup Location</p>
                </div>
                <p>{data.location}</p>
                <div className="mt-1">
                  <p className="text-gray-500 text-xs">成团后次日12:00-18:00可取货</p>
                  <p className="text-gray-500 text-[10px]">Pickup next day 12:00-18:00 after group formed</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Participants */}
      <Card className="m-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <div>
                <h3>已参与成员</h3>
                <p className="text-xs text-gray-500">Participants</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-500">
                还差{data.totalPeople - data.currentPeople}人成团
              </span>
              <p className="text-xs text-gray-400">Need {data.totalPeople - data.currentPeople} more</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {members.map((member, index) => (
              <Avatar key={index}>
                <AvatarFallback className="bg-purple-100 text-purple-700">
                  {member.avatar}
                </AvatarFallback>
              </Avatar>
            ))}
            {data.currentPeople < data.totalPeople && (
              <div className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300 flex flex-col items-center justify-center">
                <span className="text-gray-400 text-[10px]">待加入</span>
                <span className="text-gray-400 text-[8px]">Empty</span>
              </div>
            )}
          </div>
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={() => setShowShareDialog(true)}
          >
            <Share2 className="w-4 h-4 mr-1" />
            <div className="flex flex-col items-start">
              <span className="text-sm leading-none">邀请好友</span>
              <span className="text-xs text-gray-500 leading-none -mt-0.5">Invite Friends</span>
            </div>
          </Button>
        </CardContent>
      </Card>

      {/* Organizer Info */}
      <Card className="m-4">
        <CardContent className="p-4">
          <div className="mb-3">
            <h3>团长信息</h3>
            <p className="text-xs text-gray-500">Organizer Info</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-blue-100 text-blue-700">
                  {data.organizer.slice(-1)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p>{data.organizer}</p>
                <p className="text-sm text-gray-500">已开团15次 · 好评率98%</p>
                <p className="text-xs text-gray-400">15 groups · 98% rating</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleContactOrganizer}>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <div className="flex flex-col items-start">
                  <span className="text-xs leading-none">联系</span>
                  <span className="text-[10px] text-gray-500 leading-none -mt-0.5">Contact</span>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Product Details */}
      <Card className="m-4 mb-24">
        <CardContent className="p-4 space-y-3">
          <div>
            <h3>商品须知</h3>
            <p className="text-xs text-gray-500">Product Information</p>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <div>
              <p>• 成团要求：满{data.totalPeople}人成团</p>
              <p className="text-xs text-gray-500 ml-4">Requirement: {data.totalPeople} people needed</p>
              <p>• 成团时间：{data.timeLeft}后自动结算</p>
              <p className="text-xs text-gray-500 ml-4">Time: Auto-settle after {data.timeLeft}</p>
              <p>• 取货方式：自提（{data.location}）</p>
              <p className="text-xs text-gray-500 ml-4">Pickup: Self-pickup at {data.location}</p>
              <p>• 售后说明：成团后不支持退款，特殊情况请联系团长</p>
              <p className="text-xs text-gray-500 ml-4">Refund: No refunds after group formed, contact organizer for special cases</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex gap-3">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => {}}
        >
          <div className="flex flex-col">
            <span className="text-sm">收藏</span>
            <span className="text-xs text-gray-500">Save</span>
          </div>
        </Button>
        <Button
          className="flex-1"
          style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
          onClick={onJoin}
        >
          <div className="flex flex-col">
            <span>立即参团 ¥{data.price}</span>
            <span className="text-xs opacity-90">Join Now</span>
          </div>
        </Button>
      </div>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>
              <div>邀请好友参团</div>
              <div className="text-sm text-gray-500">Invite Friends to Join</div>
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
                  <p className="text-xs text-gray-400">Scan to Join</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">微信扫一扫，快速参团</p>
              <p className="text-[10px] text-gray-400">WeChat scan to join quickly</p>
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
    </div>
  );
}
