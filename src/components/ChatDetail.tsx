import { useState, useRef, useEffect } from "react";
import { 
  ArrowLeft, 
  Send, 
  MoreVertical, 
  Users,
  Package,
  Image as ImageIcon,
  Smile
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "sonner@2.0.3";

interface ChatDetailProps {
  data: any;
  onBack: () => void;
  onNavigate: (page: string, data?: any) => void;
}

interface Message {
  id: number;
  senderId: number;
  senderName: string;
  senderAvatar: string;
  content: string;
  time: string;
  isLeader: boolean;
  isSelf: boolean;
  type: "text" | "system";
}

export function ChatDetail({ data, onBack, onNavigate }: ChatDetailProps) {
  const [message, setMessage] = useState("");
  
  // 如果是从拼团详情进入的，返回时应该去聊天列表
  const handleBackClick = () => {
    if (data.fromGroupBuy) {
      onNavigate('chat');
    } else {
      onBack();
    }
  };
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      senderId: 0,
      senderName: "系统",
      senderAvatar: "系",
      content: "欢迎来到拼团聊天室！请文明交流，愉快拼团 🎉",
      time: "09:00",
      isLeader: false,
      isSelf: false,
      type: "system",
    },
    {
      id: 2,
      senderId: 1,
      senderName: data.organizer || "团长小李",
      senderAvatar: (data.organizer || "李").slice(-1),
      content: "大家好！我是团长，这次拼团的商品质量很好，大家放心参与",
      time: "09:30",
      isLeader: true,
      isSelf: false,
      type: "text",
    },
    {
      id: 3,
      senderId: 2,
      senderName: "张三",
      senderAvatar: "张",
      content: "请问团长，这个商品什么时候能到？",
      time: "10:15",
      isLeader: false,
      isSelf: false,
      type: "text",
    },
    {
      id: 4,
      senderId: 1,
      senderName: data.organizer || "团长小李",
      senderAvatar: (data.organizer || "李").slice(-1),
      content: "预计明天中午12点前会到，到了我会第一时间通知大家的",
      time: "10:20",
      isLeader: true,
      isSelf: false,
      type: "text",
    },
    {
      id: 5,
      senderId: 3,
      senderName: "李四",
      senderAvatar: "四",
      content: "好的，谢谢团长！",
      time: "10:25",
      isLeader: false,
      isSelf: false,
      type: "text",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) {
      toast.error("请输入消息内容");
      return;
    }

    const newMessage: Message = {
      id: messages.length + 1,
      senderId: 999,
      senderName: "我",
      senderAvatar: "我",
      content: message,
      time: new Date().toLocaleTimeString("zh-CN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isLeader: data.isLeader,
      isSelf: true,
      type: "text",
    };

    setMessages([...messages, newMessage]);
    setMessage("");
    toast.success("消息发送成功");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleViewGroupBuy = () => {
    toast.info("正在跳转到拼团详情...");
    onBack();
  };

  const handleViewMembers = () => {
    toast.info("查看成员列表功能开发中...");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <button onClick={handleBackClick}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="truncate text-sm">{data.title}</h1>
            <div className="flex items-center gap-2 mt-0.5">
              {data.isLeader && (
                <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                  团长
                </Badge>
              )}
              <span className="text-xs text-gray-500">{data.members}人</span>
            </div>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleViewGroupBuy}>
              <Package className="w-4 h-4 mr-2" />
              查看拼团详情
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleViewMembers}>
              <Users className="w-4 h-4 mr-2" />
              查看成员列表
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          if (msg.type === "system") {
            return (
              <div key={msg.id} className="flex justify-center">
                <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full max-w-xs text-center">
                  {msg.content}
                </div>
              </div>
            );
          }

          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.isSelf ? "flex-row-reverse justify-start" : "justify-start"}`}
            >
              {/* Avatar */}
              <Avatar className="w-10 h-10 shrink-0">
                <AvatarFallback
                  className={
                    msg.isLeader
                      ? "bg-gradient-to-br from-purple-500 to-indigo-600 text-white"
                      : msg.isSelf
                      ? "bg-gradient-to-br from-blue-500 to-cyan-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }
                >
                  {msg.senderAvatar}
                </AvatarFallback>
              </Avatar>

              {/* Message Content */}
              <div className={`flex flex-col ${msg.isSelf ? "items-end" : "items-start"}`}>
                <div className={`flex items-center gap-2 mb-1 ${msg.isSelf ? "flex-row-reverse" : ""}`}>
                  <span className="text-xs text-gray-500">{msg.senderName}</span>
                  {msg.isLeader && !msg.isSelf && (
                    <Badge className="text-xs bg-purple-100 text-purple-700 h-4">
                      团长
                    </Badge>
                  )}
                  <span className="text-xs text-gray-400">{msg.time}</span>
                </div>
                <div
                  className={`max-w-xs md:max-w-md p-3 rounded-lg ${
                    msg.isSelf
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                      : "bg-white text-gray-900"
                  }`}
                >
                  <p className="text-sm break-words">{msg.content}</p>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Status Info */}
      {data.status === "pending" && (
        <div className="px-4 py-2 bg-orange-50 border-t border-orange-100">
          <p className="text-xs text-orange-700 text-center">
            ⏰ 拼团进行中，还差 {10 - data.members} 人成团
          </p>
        </div>
      )}

      {data.status === "pickup" && (
        <div className="px-4 py-2 bg-blue-50 border-t border-blue-100">
          <p className="text-xs text-blue-700 text-center">
            📦 拼团成功！商品已到达自提点，请及时取货
          </p>
        </div>
      )}

      {data.status === "completed" && (
        <div className="px-4 py-2 bg-green-50 border-t border-green-100">
          <p className="text-xs text-green-700 text-center">
            ✅ 拼团已完成，感谢您的参与！
          </p>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t p-4">
        <div className="flex items-center gap-2">
          {/* Emoji/Image buttons */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toast.info("表情功能开发中...")}
          >
            <Smile className="w-5 h-5 text-gray-500" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toast.info("图片功能开发中...")}
          >
            <ImageIcon className="w-5 h-5 text-gray-500" />
          </Button>

          {/* Input */}
          <Input
            type="text"
            placeholder="输入消息..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />

          {/* Send Button */}
          <Button
            onClick={handleSend}
            disabled={!message.trim()}
            className="bg-gradient-to-r from-purple-600 to-indigo-600"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
