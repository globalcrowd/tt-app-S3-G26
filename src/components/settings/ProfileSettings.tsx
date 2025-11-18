import { ArrowLeft, Camera, User, Mail, Phone, Calendar } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { toast } from "sonner@2.0.3";

interface ProfileSettingsProps {
  onBack: () => void;
}

export function ProfileSettings({ onBack }: ProfileSettingsProps) {
  const handleSave = () => {
    toast.success("个人信息已保存 / Profile saved successfully");
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
            <h1>个人信息</h1>
            <p className="text-xs opacity-90">Profile Settings</p>
          </div>
        </div>
      </div>

      {/* Avatar Section */}
      <div className="p-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-4">
              <div>
                <p className="text-center mb-1">头像</p>
                <p className="text-xs text-center text-gray-500 mb-3">Avatar</p>
              </div>
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarFallback className="bg-purple-100 text-purple-700 text-2xl">
                    用
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">点击更换头像</p>
                <p className="text-xs text-gray-400">Click to change avatar</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Form */}
      <div className="p-4 space-y-4">
        <Card>
          <CardContent className="p-4 space-y-4">
            {/* Nickname */}
            <div className="space-y-2">
              <Label>
                <div>昵称</div>
                <div className="text-xs text-gray-500">Nickname</div>
              </Label>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-gray-400" />
                <Input defaultValue="用户12345" placeholder="请输入昵称 / Enter nickname" />
              </div>
            </div>

            {/* Student ID */}
            <div className="space-y-2">
              <Label>
                <div>学号</div>
                <div className="text-xs text-gray-500">Student ID</div>
              </Label>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-gray-400" />
                <Input defaultValue="2021123456" placeholder="请输入学号 / Enter student ID" disabled />
              </div>
              <p className="text-xs text-gray-500 ml-7">学号不可修改 / Student ID cannot be changed</p>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label>
                <div>邮箱</div>
                <div className="text-xs text-gray-500">Email</div>
              </Label>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-gray-400" />
                <Input 
                  type="email" 
                  defaultValue="student@xjtlu.edu.cn" 
                  placeholder="请输入邮箱 / Enter email"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label>
                <div>手机号</div>
                <div className="text-xs text-gray-500">Phone Number</div>
              </Label>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-gray-400" />
                <Input 
                  type="tel" 
                  defaultValue="138****5678" 
                  placeholder="请输入手机号 / Enter phone"
                />
              </div>
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label>
                <div>性别</div>
                <div className="text-xs text-gray-500">Gender</div>
              </Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="gender" value="male" defaultChecked />
                  <span className="text-sm">男 Male</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="gender" value="female" />
                  <span className="text-sm">女 Female</span>
                </label>
              </div>
            </div>

            {/* Enrollment Year */}
            <div className="space-y-2">
              <Label>
                <div>入学年份</div>
                <div className="text-xs text-gray-500">Enrollment Year</div>
              </Label>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <Input defaultValue="2021" type="number" placeholder="请输入入学年份 / Enter year" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <Button 
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600"
          onClick={handleSave}
        >
          <div className="flex flex-col">
            <span>保存修改</span>
            <span className="text-xs opacity-90">Save Changes</span>
          </div>
        </Button>
      </div>
    </div>
  );
}
