import { ArrowLeft, Lock, Key, Smartphone, Shield, ChevronRight } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { toast } from "sonner@2.0.3";

interface SecuritySettingsProps {
  onBack: () => void;
}

export function SecuritySettings({ onBack }: SecuritySettingsProps) {
  const securityOptions = [
    {
      icon: Lock,
      title: "修改密码",
      titleEn: "Change Password",
      subtitle: "定期修改密码保护账号安全",
      subtitleEn: "Change password regularly for security",
      action: () => toast.info("修改密码功能开发中 / Feature in development"),
    },
    {
      icon: Smartphone,
      title: "绑定手机",
      titleEn: "Bind Phone",
      subtitle: "已绑定: 138****5678",
      subtitleEn: "Bound: 138****5678",
      action: () => toast.info("修改手机号功能开发中 / Feature in development"),
    },
    {
      icon: Key,
      title: "微信绑定",
      titleEn: "WeChat Binding",
      subtitle: "已绑定微信账号",
      subtitleEn: "WeChat account bound",
      action: () => toast.info("微信解绑功能开发中 / Feature in development"),
    },
    {
      icon: Shield,
      title: "登录设备管理",
      titleEn: "Device Management",
      subtitle: "管理已登录的设备",
      subtitleEn: "Manage logged-in devices",
      action: () => toast.info("设备管理功能开发中 / Feature in development"),
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
            <h1>账号安全</h1>
            <p className="text-xs opacity-90">Security Settings</p>
          </div>
        </div>
      </div>

      {/* Security Level */}
      <div className="p-4">
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-green-700">安全等级：高</p>
                  <span className="text-xs text-green-600">Security Level: High</span>
                </div>
                <p className="text-sm text-green-600">您的账号安全性良好</p>
                <p className="text-xs text-green-500">Your account security is good</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Options */}
      <div className="p-4 space-y-3">
        <div className="mb-2">
          <h2 className="text-sm text-gray-500">安全选项</h2>
          <p className="text-xs text-gray-400">Security Options</p>
        </div>

        {securityOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <Card 
              key={index}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={option.action}
            >
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
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Security Tips */}
      <div className="p-4">
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <p className="font-medium mb-2 text-yellow-900">安全提示 Security Tips</p>
            <div className="space-y-2 text-sm text-yellow-800">
              <p>• 定期修改密码，使用复杂密码</p>
              <p className="text-xs text-yellow-700 ml-3">Change password regularly, use strong passwords</p>
              <p>• 不要在公共设备上保存登录信息</p>
              <p className="text-xs text-yellow-700 ml-3">Don't save login info on public devices</p>
              <p>• 发现异常登录请及时修改密码</p>
              <p className="text-xs text-yellow-700 ml-3">Change password if suspicious activity detected</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
