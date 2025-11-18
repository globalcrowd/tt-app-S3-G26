import { ArrowLeft, Eye, EyeOff, Users, MessageCircle, ShoppingBag } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Switch } from "../ui/switch";
import { useState } from "react";

interface PrivacySettingsProps {
  onBack: () => void;
}

export function PrivacySettings({ onBack }: PrivacySettingsProps) {
  const [settings, setSettings] = useState({
    showProfile: true,
    showGroupBuys: true,
    showOrders: false,
    allowMessages: true,
  });

  const privacyOptions = [
    {
      icon: Eye,
      title: "个人资料可见性",
      titleEn: "Profile Visibility",
      subtitle: "其他用户可以查看我的个人资料",
      subtitleEn: "Others can view my profile",
      key: "showProfile" as keyof typeof settings,
    },
    {
      icon: ShoppingBag,
      title: "拼团记录可见",
      titleEn: "Group Buy History",
      subtitle: "其他用户可以看到我参与的拼团",
      subtitleEn: "Others can see my group buys",
      key: "showGroupBuys" as keyof typeof settings,
    },
    {
      icon: Users,
      title: "订单信息隐藏",
      titleEn: "Hide Order Info",
      subtitle: "隐藏我的订单详细信息",
      subtitleEn: "Hide my order details",
      key: "showOrders" as keyof typeof settings,
    },
    {
      icon: MessageCircle,
      title: "允许私信",
      titleEn: "Allow Messages",
      subtitle: "其他用户可以给我发送私信",
      subtitleEn: "Others can send me messages",
      key: "allowMessages" as keyof typeof settings,
    },
  ];

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <button onClick={onBack}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1>隐私设置</h1>
            <p className="text-xs opacity-90">Privacy Settings</p>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="p-4">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-4">
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-semibold">保护您的隐私</span>
            </p>
            <p className="text-xs text-gray-600 mb-2">Protect Your Privacy</p>
            <p className="text-sm text-gray-600">
              您可以控制哪些信息对其他用户可见
            </p>
            <p className="text-xs text-gray-500">
              You can control what information is visible to others
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Privacy Options */}
      <div className="p-4 space-y-3">
        <div className="mb-2">
          <h2 className="text-sm text-gray-500">隐私选项</h2>
          <p className="text-xs text-gray-400">Privacy Options</p>
        </div>

        {privacyOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-purple-700" />
                </div>
                <div className="flex-1">
                  <p className="mb-0.5">{option.title}</p>
                  <p className="text-xs text-gray-500">{option.titleEn}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{option.subtitle}</p>
                  <p className="text-xs text-gray-400">{option.subtitleEn}</p>
                </div>
                <Switch 
                  checked={settings[option.key]}
                  onCheckedChange={() => handleToggle(option.key)}
                />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Data Management */}
      <div className="p-4">
        <Card>
          <CardContent className="p-4">
            <div className="mb-3">
              <p className="font-medium mb-1">数据管理</p>
              <p className="text-xs text-gray-500">Data Management</p>
            </div>
            <div className="space-y-3">
              <button className="w-full p-3 border rounded-lg text-left hover:bg-gray-50 transition-colors">
                <p className="text-sm mb-1">下载我的数据</p>
                <p className="text-xs text-gray-500">Download My Data</p>
                <p className="text-xs text-gray-400 mt-1">获取您在TT上的所有数据副本</p>
                <p className="text-[10px] text-gray-400">Get a copy of all your data on TT</p>
              </button>
              <button className="w-full p-3 border border-red-200 rounded-lg text-left hover:bg-red-50 transition-colors">
                <p className="text-sm text-red-600 mb-1">删除我的数据</p>
                <p className="text-xs text-red-500">Delete My Data</p>
                <p className="text-xs text-gray-500 mt-1">永久删除您的所有数据</p>
                <p className="text-[10px] text-gray-400">Permanently delete all your data</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Privacy Tips */}
      <div className="p-4">
        <Card className="bg-gray-50">
          <CardContent className="p-4">
            <p className="text-sm font-medium mb-2 text-gray-700">隐私提示 Privacy Tips</p>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• 建议定期检查隐私设置</p>
              <p className="text-xs text-gray-500 ml-3">Review privacy settings regularly</p>
              <p>• 不要分享敏感个人信息</p>
              <p className="text-xs text-gray-500 ml-3">Don't share sensitive personal info</p>
              <p>• 谨慎添加陌生人为好友</p>
              <p className="text-xs text-gray-500 ml-3">Be careful adding strangers</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
