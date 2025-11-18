import { useState } from "react";
import { ArrowLeft, User, Bell, Lock, Eye, Trash2, FileText, ChevronRight } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Switch } from "./ui/switch";
import { ProfileSettings } from "./settings/ProfileSettings";
import { SecuritySettings } from "./settings/SecuritySettings";
import { PrivacySettings } from "./settings/PrivacySettings";
import { TermsOfService } from "./settings/TermsOfService";
import { PrivacyPolicy } from "./settings/PrivacyPolicy";
import { toast } from "sonner@2.0.3";

interface SettingsPageProps {
  onBack: () => void;
}

export function SettingsPage({ onBack }: SettingsPageProps) {
  const [currentView, setCurrentView] = useState<string | null>(null);
  const accountSettings = [
    {
      icon: User,
      title: "个人信息",
      titleEn: "Profile",
      subtitle: "修改昵称、头像等",
      subtitleEn: "Edit nickname, avatar, etc.",
      hasSwitch: false,
    },
    {
      icon: Lock,
      title: "账号安全",
      titleEn: "Security",
      subtitle: "修改密码、绑定手机",
      subtitleEn: "Change password, bind phone",
      hasSwitch: false,
    },
  ];

  const notificationSettings = [
    {
      icon: Bell,
      title: "拼团通知",
      titleEn: "Group Buy Notifications",
      subtitle: "新拼团、成团提醒",
      subtitleEn: "New groups, formation alerts",
      hasSwitch: true,
      enabled: true,
    },
    {
      icon: Bell,
      title: "订单通知",
      titleEn: "Order Notifications",
      subtitle: "订单状态变更提醒",
      subtitleEn: "Order status updates",
      hasSwitch: true,
      enabled: true,
    },
    {
      icon: Bell,
      title: "活动推送",
      titleEn: "Promotions",
      subtitle: "优惠活动、新功能",
      subtitleEn: "Deals, new features",
      hasSwitch: true,
      enabled: false,
    },
  ];

  const privacySettings = [
    {
      icon: Eye,
      title: "隐私设置",
      titleEn: "Privacy Settings",
      subtitle: "谁可以看到我的信息",
      subtitleEn: "Who can see my info",
      hasSwitch: false,
    },
    {
      icon: FileText,
      title: "用户协议",
      titleEn: "Terms of Service",
      subtitle: "查看用户服务协议",
      subtitleEn: "View user agreement",
      hasSwitch: false,
    },
    {
      icon: FileText,
      title: "隐私政策",
      titleEn: "Privacy Policy",
      subtitle: "查看隐私保护政策",
      subtitleEn: "View privacy policy",
      hasSwitch: false,
    },
  ];

  const dangerSettings = [
    {
      icon: Trash2,
      title: "清除缓存",
      titleEn: "Clear Cache",
      subtitle: "清除本地缓存数据",
      subtitleEn: "Clear local cache data",
      hasSwitch: false,
      color: "text-orange-600",
    },
    {
      icon: Trash2,
      title: "注销账号",
      titleEn: "Delete Account",
      subtitle: "永久删除账号和数据",
      subtitleEn: "Permanently delete account",
      hasSwitch: false,
      color: "text-red-600",
    },
  ];

  // Handle sub-page views
  if (currentView === "profile") {
    return <ProfileSettings onBack={() => setCurrentView(null)} />;
  }
  if (currentView === "security") {
    return <SecuritySettings onBack={() => setCurrentView(null)} />;
  }
  if (currentView === "privacy") {
    return <PrivacySettings onBack={() => setCurrentView(null)} />;
  }
  if (currentView === "terms") {
    return <TermsOfService onBack={() => setCurrentView(null)} />;
  }
  if (currentView === "policy") {
    return <PrivacyPolicy onBack={() => setCurrentView(null)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <button onClick={onBack}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1>设置</h1>
            <p className="text-xs opacity-90">Settings</p>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="p-4 space-y-3">
        <div className="mb-2">
          <h2 className="text-sm text-gray-500">账号设置</h2>
          <p className="text-xs text-gray-400">Account Settings</p>
        </div>
        {accountSettings.map((setting, index) => {
          const Icon = setting.icon;
          return (
            <Card 
              key={index} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setCurrentView(index === 0 ? "profile" : "security")}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-purple-700" />
                </div>
                <div className="flex-1">
                  <p className="mb-0.5">{setting.title}</p>
                  <p className="text-xs text-gray-500">{setting.titleEn}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{setting.subtitle}</p>
                  <p className="text-xs text-gray-400">{setting.subtitleEn}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Notification Settings */}
      <div className="p-4 space-y-3">
        <div className="mb-2">
          <h2 className="text-sm text-gray-500">通知设置</h2>
          <p className="text-xs text-gray-400">Notification Settings</p>
        </div>
        {notificationSettings.map((setting, index) => {
          const Icon = setting.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-blue-700" />
                </div>
                <div className="flex-1">
                  <p className="mb-0.5">{setting.title}</p>
                  <p className="text-xs text-gray-500">{setting.titleEn}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{setting.subtitle}</p>
                  <p className="text-xs text-gray-400">{setting.subtitleEn}</p>
                </div>
                {setting.hasSwitch && <Switch defaultChecked={setting.enabled} />}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Privacy Settings */}
      <div className="p-4 space-y-3">
        <div className="mb-2">
          <h2 className="text-sm text-gray-500">隐私与条款</h2>
          <p className="text-xs text-gray-400">Privacy & Terms</p>
        </div>
        {privacySettings.map((setting, index) => {
          const Icon = setting.icon;
          const viewMap = ["privacy", "terms", "policy"];
          return (
            <Card 
              key={index} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setCurrentView(viewMap[index])}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-gray-700" />
                </div>
                <div className="flex-1">
                  <p className="mb-0.5">{setting.title}</p>
                  <p className="text-xs text-gray-500">{setting.titleEn}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{setting.subtitle}</p>
                  <p className="text-xs text-gray-400">{setting.subtitleEn}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Danger Zone */}
      <div className="p-4 space-y-3">
        <div className="mb-2">
          <h2 className="text-sm text-gray-500">其他</h2>
          <p className="text-xs text-gray-400">Others</p>
        </div>
        {dangerSettings.map((setting, index) => {
          const Icon = setting.icon;
          return (
            <Card 
              key={index} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => {
                if (index === 0) {
                  toast.success("缓存已清除 / Cache cleared");
                } else {
                  toast.error("注销账号功能开发中 / Delete account under development");
                }
              }}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full ${index === 0 ? "bg-orange-100" : "bg-red-100"} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${setting.color}`} />
                </div>
                <div className="flex-1">
                  <p className={`mb-0.5 ${setting.color}`}>{setting.title}</p>
                  <p className={`text-xs ${setting.color} opacity-75`}>{setting.titleEn}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{setting.subtitle}</p>
                  <p className="text-xs text-gray-400">{setting.subtitleEn}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* App Version */}
      <div className="text-center text-gray-400 p-4">
        <p className="text-sm">TT 校园拼团 v1.0.0</p>
        <p className="text-xs">TT Group Buy v1.0.0</p>
      </div>
    </div>
  );
}
