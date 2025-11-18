import { ArrowLeft, User, ShoppingBag, Wallet, MapPin, HeadphonesIcon, Settings, LogOut, ChevronRight, Star } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import backgroundImage from "figma:asset/2bec5e6e262593782e6db8dcf99d6e70672c5910.png";

interface ProfilePageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function ProfilePage({ onBack, onNavigate, onLogout }: ProfilePageProps) {
  const menuItems = [
    {
      icon: ShoppingBag,
      title: "我的拼团",
      titleEn: "My Group Buys",
      subtitle: "查看参与的拼团",
      subtitleEn: "View joined groups",
      action: () => onNavigate("orders"),
      badge: 2,
    },
    {
      icon: Star,
      title: "我发起的拼团",
      titleEn: "My Created Groups",
      subtitle: "管理我创建的拼单",
      subtitleEn: "Manage my groups",
      action: () => onNavigate("myGroupBuys"),
      badge: 1,
    },
    {
      icon: Wallet,
      title: "我的钱包",
      titleEn: "My Wallet",
      subtitle: "余额 ¥0.00",
      subtitleEn: "Balance ¥0.00",
      action: () => onNavigate("wallet"),
    },
    {
      icon: MapPin,
      title: "自提点位",
      titleEn: "Pickup Locations",
      subtitle: "查看校园自提点",
      subtitleEn: "View pickup points",
      action: () => onNavigate("pickup"),
    },
    {
      icon: HeadphonesIcon,
      title: "客服中心",
      titleEn: "Customer Service",
      subtitle: "帮助与反馈",
      subtitleEn: "Help & Feedback",
      action: () => onNavigate("service"),
    },
    {
      icon: Settings,
      title: "设置",
      titleEn: "Settings",
      subtitle: "账号与隐私",
      subtitleEn: "Account & Privacy",
      action: () => onNavigate("settings"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div 
        className="p-4 pb-6 relative bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(102, 126, 234, 0.7), rgba(118, 75, 162, 0.7)), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <button onClick={onBack} className="text-white mb-4 relative z-10">
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* User Info */}
        <div className="flex items-center gap-4 text-white relative z-10">
          <Avatar className="w-16 h-16 ring-2 ring-white/50">
            <AvatarFallback className="bg-white text-purple-700 text-xl">
              学
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="mb-1 drop-shadow-lg">学生用户 Student User</h2>
            <p className="text-sm text-white/90 drop-shadow">学号 ID：202012345</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge className="bg-white/30 hover:bg-white/40 backdrop-blur-sm">
                新手团长 Newbie
              </Badge>
              <span className="text-sm drop-shadow">已开团 3 次 groups</span>
            </div>
          </div>
          <button className="text-white">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <Card className="m-4">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 divide-x">
            <div className="text-center">
              <p className="text-2xl text-purple-700 mb-1">8</p>
              <p className="text-sm text-gray-500">参与拼团</p>
              <p className="text-[10px] text-gray-400">Joined</p>
            </div>
            <div className="text-center">
              <p className="text-2xl text-purple-700 mb-1">3</p>
              <p className="text-sm text-gray-500">发起拼团</p>
              <p className="text-[10px] text-gray-400">Created</p>
            </div>
            <div className="text-center">
              <p className="text-2xl text-purple-700 mb-1">98%</p>
              <p className="text-sm text-gray-500">好评率</p>
              <p className="text-[10px] text-gray-400">Rating</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items */}
      <div className="p-4 space-y-3">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow" onClick={item.action}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-purple-700" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div>
                      <p>{item.title}</p>
                      <p className="text-xs text-gray-500">{item.titleEn}</p>
                    </div>
                    {item.badge && (
                      <Badge variant="secondary" className="bg-red-500 text-white text-xs h-5">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">{item.subtitle} / {item.subtitleEn}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Logout Button */}
      <div className="p-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onLogout}>
          <CardContent className="p-4 flex items-center justify-center gap-2 text-red-500">
            <LogOut className="w-5 h-5" />
            <div className="flex flex-col items-center">
              <span className="leading-none">退出登录</span>
              <span className="text-xs leading-none -mt-0.5">Logout</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* App Info */}
      <div className="text-center text-sm text-gray-400 p-4">
        <p>TT 校园拼团 Campus Group Buy v1.0.0</p>
        <p className="mt-1">专为 XJTLU 学生打造</p>
        <p className="text-xs mt-1">Made for XJTLU Students</p>
      </div>
    </div>
  );
}
