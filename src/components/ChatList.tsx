import { useState } from "react";
import { Search, MessageCircle, Users, Clock } from "lucide-react";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface ChatListProps {
  onNavigate: (page: string, data?: any) => void;
}

export function ChatList({ onNavigate }: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // 模拟聊天数据
  const chats = [
    {
      id: 1,
      groupBuyId: 1,
      title: "Sam's Club会员店 三只松鼠坚果礼盒",
      lastMessage: "好的，我明天下午去取货",
      lastTime: "5分钟前",
      unread: 2,
      avatar: "团",
      isLeader: false,
      status: "pickup",
      members: 5,
    },
    {
      id: 2,
      groupBuyId: 2,
      title: "盒马鲜生 进口榴莲",
      lastMessage: "团长：大家记得明天12点前来取货哦",
      lastTime: "1小时前",
      unread: 0,
      avatar: "盒",
      isLeader: true,
      status: "pickup",
      members: 3,
    },
    {
      id: 3,
      groupBuyId: 3,
      title: "Costco 超大装洗衣液",
      lastMessage: "还差2个人，大家帮忙转发一下",
      lastTime: "2小时前",
      unread: 5,
      avatar: "C",
      isLeader: false,
      status: "pending",
      members: 8,
    },
    {
      id: 4,
      groupBuyId: 4,
      title: "山姆会员店 澳洲牛排",
      lastMessage: "已经取货了，谢谢团长！",
      lastTime: "昨天",
      unread: 0,
      avatar: "山",
      isLeader: false,
      status: "completed",
      members: 10,
    },
    {
      id: 5,
      groupBuyId: 5,
      title: "盒马 海鲜大礼包",
      lastMessage: "团长：商品明天到，请大家准备好",
      lastTime: "昨天",
      unread: 1,
      avatar: "海",
      isLeader: true,
      status: "pending",
      members: 6,
    },
  ];

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return { cn: "拼团中", en: "Pending" };
      case "pickup":
        return { cn: "待取货", en: "Ready" };
      case "completed":
        return { cn: "已完成", en: "Done" };
      default:
        return { cn: "", en: "" };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-700";
      case "pickup":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const filteredChats = chats.filter((chat) => {
    const matchesSearch = chat.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "leader") return matchesSearch && chat.isLeader;
    if (activeTab === "member") return matchesSearch && !chat.isLeader;
    return matchesSearch;
  });

  const handleChatClick = (chat: any) => {
    onNavigate("chatDetail", {
      chatId: chat.id,
      groupBuyId: chat.groupBuyId,
      title: chat.title,
      isLeader: chat.isLeader,
      status: chat.status,
      members: chat.members,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="p-4">
          <div className="mb-4">
            <h1>聊天</h1>
            <p className="text-xs text-gray-500">Messages</p>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="搜索拼团聊天 Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="px-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all" className="flex flex-col py-3">
              <span className="leading-none">全部</span>
              <span className="text-[9px] leading-none -mt-0.5">All</span>
            </TabsTrigger>
            <TabsTrigger value="leader" className="flex flex-col py-3">
              <span className="leading-none">我发起的</span>
              <span className="text-[9px] leading-none -mt-0.5">Created</span>
            </TabsTrigger>
            <TabsTrigger value="member" className="flex flex-col py-3">
              <span className="leading-none">我参与的</span>
              <span className="text-[9px] leading-none -mt-0.5">Joined</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Chat List */}
      <div className="p-4 space-y-3">
        {filteredChats.length === 0 ? (
          <div className="text-center py-20">
            <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">暂无聊天记录</p>
            <p className="text-xs text-gray-400 mt-1">No chats yet</p>
            <p className="text-sm text-gray-400 mt-2">参与拼团后即可与团长和成员聊天</p>
            <p className="text-xs text-gray-400 mt-1">Join a group buy to start chatting</p>
          </div>
        ) : (
          filteredChats.map((chat) => (
            <Card
              key={chat.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleChatClick(chat)}
            >
              <CardContent className="p-4">
                <div className="flex gap-3">
                  {/* Avatar */}
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
                        {chat.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {chat.unread > 0 && (
                      <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <h3 className="text-sm truncate">{chat.title}</h3>
                        {chat.isLeader && (
                          <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700 shrink-0 flex flex-col items-center py-0">
                            <span>团长</span>
                            <span className="text-[8px]">Leader</span>
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-gray-400 shrink-0 ml-2">
                        {chat.lastTime}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 truncate mb-2">
                      {chat.lastMessage}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <Badge className={`${getStatusColor(chat.status)} text-xs flex flex-col py-0 leading-tight`}>
                        <span>{getStatusText(chat.status).cn}</span>
                        <span className="text-[9px]">{getStatusText(chat.status).en}</span>
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{chat.members}人 members</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Tips */}
      {filteredChats.length > 0 && (
        <div className="px-4 pb-4">
          <div className="p-3 bg-blue-50 rounded-lg text-blue-700">
            <p className="flex items-center gap-2 text-sm">
              <MessageCircle className="w-4 h-4" />
              温馨提示：请文明聊天，不要发送不当信息
            </p>
            <p className="text-xs mt-1 ml-6">
              Tip: Please chat respectfully
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
