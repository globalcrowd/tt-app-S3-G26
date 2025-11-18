import { ArrowLeft, FileText } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

interface TermsOfServiceProps {
  onBack: () => void;
}

export function TermsOfService({ onBack }: TermsOfServiceProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <button onClick={onBack}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1>用户协议</h1>
            <p className="text-xs opacity-90">Terms of Service</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-8 h-8 text-purple-600" />
              <div>
                <h2 className="text-lg font-medium">TT 校园拼团用户服务协议</h2>
                <p className="text-sm text-gray-500">TT Group Buy User Agreement</p>
              </div>
            </div>

            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-6 text-sm">
                {/* Section 1 */}
                <div>
                  <h3 className="font-medium mb-2">一、协议的范围 / Agreement Scope</h3>
                  <p className="text-gray-600 mb-2">
                    1.1 本协议是您与TT校园拼团平台（以下简称"本平台"）之间关于您使用本平台服务所订立的协议。
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    1.1 This agreement is between you and TT Group Buy Platform regarding your use of our services.
                  </p>
                  <p className="text-gray-600 mb-2">
                    1.2 本平台仅为西交利物浦大学在校学生提供拼团信息发布和交易撮合服务。
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    1.2 This platform only provides group buying services for XJTLU students.
                  </p>
                </div>

                {/* Section 2 */}
                <div>
                  <h3 className="font-medium mb-2">二、账号注册 / Account Registration</h3>
                  <p className="text-gray-600 mb-2">
                    2.1 您需要使用真实的学号和个人信息进行注册。
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    2.1 You must register with your real student ID and personal information.
                  </p>
                  <p className="text-gray-600 mb-2">
                    2.2 您应妥善保管账号和密码，因您保管不善可能导致的后果由您自行承担。
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    2.2 You are responsible for keeping your account secure.
                  </p>
                  <p className="text-gray-600 mb-2">
                    2.3 禁止将账号转让、出售或出借给他人使用。
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    2.3 Account transfer, sale, or lending is prohibited.
                  </p>
                </div>

                {/* Section 3 */}
                <div>
                  <h3 className="font-medium mb-2">三、用户行为规范 / User Conduct</h3>
                  <p className="text-gray-600 mb-2">
                    3.1 您在使用本平台服务时，必须遵守中华人民共和国相关法律法规。
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    3.1 You must comply with all applicable laws and regulations.
                  </p>
                  <p className="text-gray-600 mb-2">
                    3.2 禁止发布虚假拼团信息或从事欺诈行为。
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    3.2 Posting false information or fraudulent activities is prohibited.
                  </p>
                  <p className="text-gray-600 mb-2">
                    3.3 禁止发布违禁品、危险品等不适合在校园内交易的商品。
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    3.3 Prohibited items and dangerous goods are not allowed.
                  </p>
                  <p className="text-gray-600 mb-2">
                    3.4 用户应诚信交易，按时取货，如因个人原因无法取货应提前告知团长。
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    3.4 Users should trade honestly and pick up items on time.
                  </p>
                </div>

                {/* Section 4 */}
                <div>
                  <h3 className="font-medium mb-2">四、交易规则 / Transaction Rules</h3>
                  <p className="text-gray-600 mb-2">
                    4.1 拼团成功后，参与者需按约定时间到指定地点取货。
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    4.1 After successful group buying, participants must pick up items at designated locations.
                  </p>
                  <p className="text-gray-600 mb-2">
                    4.2 如拼团失败，已支付款项将在24小时内原路退回。
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    4.2 Failed group buy payments will be refunded within 24 hours.
                  </p>
                  <p className="text-gray-600 mb-2">
                    4.3 商品质量问题应先与团长协商解决，协商不成可申请平台介入。
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    4.3 Quality issues should be resolved with the organizer first.
                  </p>
                </div>

                {/* Section 5 */}
                <div>
                  <h3 className="font-medium mb-2">五、平台责任 / Platform Liability</h3>
                  <p className="text-gray-600 mb-2">
                    5.1 本平台仅提供信息发布和撮合服务，不参与具体交易。
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    5.1 The platform only provides information services and does not participate in transactions.
                  </p>
                  <p className="text-gray-600 mb-2">
                    5.2 平台会尽力确保服务的稳定性，但不对服务中断、数据丢失等承担责任。
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    5.2 We strive for service stability but are not liable for interruptions or data loss.
                  </p>
                  <p className="text-gray-600 mb-2">
                    5.3 平台有权对违规用户进行警告、限制功能或封禁账号。
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    5.3 The platform may warn, restrict, or ban violating users.
                  </p>
                </div>

                {/* Section 6 */}
                <div>
                  <h3 className="font-medium mb-2">六、隐私保护 / Privacy Protection</h3>
                  <p className="text-gray-600 mb-2">
                    6.1 我们重视用户隐私，会按照隐私政策保护您的个人信息。
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    6.1 We value your privacy and protect your personal information according to our privacy policy.
                  </p>
                  <p className="text-gray-600 mb-2">
                    6.2 除法律要求外，不会向第三方披露您的个人信息。
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    6.2 We will not disclose your information to third parties except as required by law.
                  </p>
                </div>

                {/* Section 7 */}
                <div>
                  <h3 className="font-medium mb-2">七、协议修改 / Agreement Modification</h3>
                  <p className="text-gray-600 mb-2">
                    7.1 本平台有权随时修改本协议，修改后的协议将在平台公布。
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    7.1 The platform may modify this agreement at any time.
                  </p>
                  <p className="text-gray-600 mb-2">
                    7.2 如您继续使用服务，视为同意修改后的协议。
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    7.2 Continued use indicates acceptance of modified terms.
                  </p>
                </div>

                {/* Footer */}
                <div className="pt-6 border-t">
                  <p className="text-gray-600 mb-2">
                    最后更新时间：2025年11月9日
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    Last Updated: November 9, 2025
                  </p>
                  <p className="text-gray-600">
                    如有疑问，请联系客服：support@tt-groupbuy.com
                  </p>
                  <p className="text-xs text-gray-500">
                    For questions, contact: support@tt-groupbuy.com
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
