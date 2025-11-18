import { ArrowLeft, Shield } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

interface PrivacyPolicyProps {
  onBack: () => void;
}

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <button onClick={onBack}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1>隐私政策</h1>
            <p className="text-xs opacity-90">Privacy Policy</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-purple-600" />
              <div>
                <h2 className="text-lg font-medium">TT 校园拼团隐私政策</h2>
                <p className="text-sm text-gray-500">TT Group Buy Privacy Policy</p>
              </div>
            </div>

            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-6 text-sm">
                {/* Introduction */}
                <div>
                  <h3 className="font-medium mb-2">引言 / Introduction</h3>
                  <p className="text-gray-600 mb-2">
                    TT校园拼团（以下简称"我们"）非常重视用户的隐私保护。本隐私政策旨在帮助您了解我们如何收集、使用、存储和保护您的个人信息。
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    TT Group Buy values your privacy. This policy explains how we collect, use, store, and protect your personal information.
                  </p>
                </div>

                {/* Section 1 */}
                <div>
                  <h3 className="font-medium mb-2">一、我们收集的信息 / Information We Collect</h3>
                  <p className="text-gray-600 mb-2 font-medium">1.1 您主动提供的信息：</p>
                  <p className="text-xs text-gray-500 mb-2">1.1 Information You Provide:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 ml-2">
                    <li>学号、姓名、性别、入学年份</li>
                    <li className="text-xs text-gray-500 ml-6">Student ID, name, gender, enrollment year</li>
                    <li>手机号码、邮箱地址</li>
                    <li className="text-xs text-gray-500 ml-6">Phone number, email address</li>
                    <li>头像、昵称等个人资料</li>
                    <li className="text-xs text-gray-500 ml-6">Avatar, nickname, and other profile info</li>
                    <li>拼团信息、订单数据</li>
                    <li className="text-xs text-gray-500 ml-6">Group buy info, order data</li>
                  </ul>

                  <p className="text-gray-600 mb-2 mt-4 font-medium">1.2 自动收集的信息：</p>
                  <p className="text-xs text-gray-500 mb-2">1.2 Automatically Collected Information:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 ml-2">
                    <li>设备信息（设备型号、操作系统）</li>
                    <li className="text-xs text-gray-500 ml-6">Device info (model, OS)</li>
                    <li>日志信息（IP地址、访问时间）</li>
                    <li className="text-xs text-gray-500 ml-6">Log info (IP address, access time)</li>
                    <li>位置信息（用于自提点推荐）</li>
                    <li className="text-xs text-gray-500 ml-6">Location info (for pickup point recommendations)</li>
                  </ul>
                </div>

                {/* Section 2 */}
                <div>
                  <h3 className="font-medium mb-2">二、信息的使用 / How We Use Information</h3>
                  <p className="text-gray-600 mb-2">我们使用收集的信息用于：</p>
                  <p className="text-xs text-gray-500 mb-2">We use collected information to:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 ml-2">
                    <li>提供、维护和改进我们的服务</li>
                    <li className="text-xs text-gray-500 ml-6">Provide, maintain, and improve our services</li>
                    <li>处理您的拼团和订单请求</li>
                    <li className="text-xs text-gray-500 ml-6">Process your group buy and order requests</li>
                    <li>向您发送服务通知和更新</li>
                    <li className="text-xs text-gray-500 ml-6">Send you service notifications and updates</li>
                    <li>防止欺诈和保障安全</li>
                    <li className="text-xs text-gray-500 ml-6">Prevent fraud and ensure security</li>
                    <li>遵守法律法规要求</li>
                    <li className="text-xs text-gray-500 ml-6">Comply with legal requirements</li>
                  </ul>
                </div>

                {/* Section 3 */}
                <div>
                  <h3 className="font-medium mb-2">三、信息的共享 / Information Sharing</h3>
                  <p className="text-gray-600 mb-2">
                    我们不会出售您的个人信息。我们只会在以下情况下共享您的信息：
                  </p>
                  <p className="text-xs text-gray-500 mb-2">
                    We do not sell your personal information. We only share it in these cases:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 ml-2">
                    <li>获得您的明确同意</li>
                    <li className="text-xs text-gray-500 ml-6">With your explicit consent</li>
                    <li>与同一拼团的其他参与者共享必要信息（如昵称、头像）</li>
                    <li className="text-xs text-gray-500 ml-6">With other participants in the same group (nickname, avatar)</li>
                    <li>法律法规要求或政府部门要求</li>
                    <li className="text-xs text-gray-500 ml-6">As required by law or government authorities</li>
                    <li>保护用户和公众的安全</li>
                    <li className="text-xs text-gray-500 ml-6">To protect user and public safety</li>
                  </ul>
                </div>

                {/* Section 4 */}
                <div>
                  <h3 className="font-medium mb-2">四、信息的存储 / Information Storage</h3>
                  <p className="text-gray-600 mb-2">
                    4.1 我们会将您的信息存储在安全的服务器上，采取加密等安全措施保护您的数据。
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    4.1 We store your information on secure servers with encryption and other security measures.
                  </p>
                  <p className="text-gray-600 mb-2">
                    4.2 我们仅在必要期限内保留您的信息，毕业后可申请删除账号及相关数据。
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    4.2 We retain your information only as necessary. You can request account deletion after graduation.
                  </p>
                </div>

                {/* Section 5 */}
                <div>
                  <h3 className="font-medium mb-2">五、您的权利 / Your Rights</h3>
                  <p className="text-gray-600 mb-2">您有权：</p>
                  <p className="text-xs text-gray-500 mb-2">You have the right to:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 ml-2">
                    <li>访问和更新您的个人信息</li>
                    <li className="text-xs text-gray-500 ml-6">Access and update your personal information</li>
                    <li>删除您的账号和数据</li>
                    <li className="text-xs text-gray-500 ml-6">Delete your account and data</li>
                    <li>控制信息的可见性（通过隐私设置）</li>
                    <li className="text-xs text-gray-500 ml-6">Control information visibility (via privacy settings)</li>
                    <li>导出您的数据</li>
                    <li className="text-xs text-gray-500 ml-6">Export your data</li>
                    <li>拒绝接收营销信息</li>
                    <li className="text-xs text-gray-500 ml-6">Opt out of marketing communications</li>
                  </ul>
                </div>

                {/* Section 6 */}
                <div>
                  <h3 className="font-medium mb-2">六、Cookie 和类似技术 / Cookies and Similar Technologies</h3>
                  <p className="text-gray-600 mb-2">
                    我们使用Cookie和类似技术来提供和改进服务，您可以通过浏览器设置管理Cookie。
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    We use cookies and similar technologies to provide and improve services. You can manage cookies through your browser settings.
                  </p>
                </div>

                {/* Section 7 */}
                <div>
                  <h3 className="font-medium mb-2">七、未成年人保护 / Protection of Minors</h3>
                  <p className="text-gray-600 mb-2">
                    本服务仅面向18周岁以上的在校大学生。如我们发现未成年人使用，将立即停止服务。
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    This service is only for university students aged 18 and above. We will immediately stop service if minors are found using it.
                  </p>
                </div>

                {/* Section 8 */}
                <div>
                  <h3 className="font-medium mb-2">八、政策更新 / Policy Updates</h3>
                  <p className="text-gray-600 mb-2">
                    我们可能会不时更新本隐私政策。重大变更会通过应用内通知或邮件告知您。
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    We may update this privacy policy from time to time. Major changes will be communicated via in-app notifications or email.
                  </p>
                </div>

                {/* Section 9 */}
                <div>
                  <h3 className="font-medium mb-2">九、联系我们 / Contact Us</h3>
                  <p className="text-gray-600 mb-2">
                    如对本隐私政策有任何疑问，请联系我们：
                  </p>
                  <p className="text-xs text-gray-500 mb-2">
                    If you have questions about this privacy policy, contact us:
                  </p>
                  <p className="text-gray-600 mb-1">邮箱 Email: privacy@tt-groupbuy.com</p>
                  <p className="text-gray-600">电话 Phone: 400-xxx-xxxx</p>
                </div>

                {/* Footer */}
                <div className="pt-6 border-t">
                  <p className="text-gray-600 mb-2">
                    生效日期：2025年11月9日
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    Effective Date: November 9, 2025
                  </p>
                  <p className="text-gray-600 mb-2">
                    最后更新：2025年11月9日
                  </p>
                  <p className="text-xs text-gray-500">
                    Last Updated: November 9, 2025
                  </p>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
