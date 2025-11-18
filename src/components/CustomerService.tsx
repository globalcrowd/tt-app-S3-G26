import { ArrowLeft, MessageCircle, Phone, Mail, HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

interface CustomerServiceProps {
  onBack: () => void;
}

export function CustomerService({ onBack }: CustomerServiceProps) {
  const faqItems = [
    {
      question: "如何发起拼团？",
      answer: "点击首页的'+'按钮，选择商品类别，填写商品信息、价格、人数等信息，即可发起拼团。",
    },
    {
      question: "拼团失败了怎么办？",
      answer: "如果在规定时间内未达到成团人数，系统会自动取消拼团并在24小时内退款到您的账户。",
    },
    {
      question: "如何联系团长？",
      answer: "在拼团详情页面，点击团长头像即可查看联系方式，支持微信和电话联系。",
    },
    {
      question: "商品质量问题如何处理？",
      answer: "如遇商品质量问题，请及时联系团长或客服，我们会协助您处理退换货事宜。",
    },
    {
      question: "自提时间有什么要求？",
      answer: "一般要求在拼团成功后48小时内到指定自提点领取，具体时间以拼团详情为准。",
    },
    {
      question: "可以修改已发起的拼团吗？",
      answer: "拼团发起后不支持修改信息。如需修改，请取消当前拼团后重新发起。",
    },
  ];

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "在线客服",
      titleEn: "Online Chat",
      subtitle: "工作时间：09:00-22:00",
      subtitleEn: "Hours: 09:00-22:00",
      action: "联系客服",
      actionEn: "Contact",
      color: "bg-blue-100 text-blue-700",
    },
    {
      icon: Phone,
      title: "客服电话",
      titleEn: "Phone",
      subtitle: "400-xxx-xxxx",
      subtitleEn: "400-xxx-xxxx",
      action: "拨打电话",
      actionEn: "Call",
      color: "bg-green-100 text-green-700",
    },
    {
      icon: Mail,
      title: "邮箱反馈",
      titleEn: "Email",
      subtitle: "support@tt-groupbuy.com",
      subtitleEn: "support@tt-groupbuy.com",
      action: "发送邮件",
      actionEn: "Send",
      color: "bg-purple-100 text-purple-700",
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
            <h1>客服中心</h1>
            <p className="text-xs opacity-90">Customer Service</p>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="p-4 space-y-3">
        <div className="mb-2">
          <h2 className="text-sm text-gray-500">联系我们</h2>
          <p className="text-xs text-gray-400">Contact Us</p>
        </div>
        {contactMethods.map((method, index) => {
          const Icon = method.icon;
          return (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${method.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="mb-1">{method.title}</p>
                  <p className="text-xs text-gray-500">{method.titleEn}</p>
                  <p className="text-sm text-gray-500 mt-1">{method.subtitle}</p>
                  <p className="text-xs text-gray-400">{method.subtitleEn}</p>
                </div>
                <Button size="sm" variant="outline">
                  <div className="flex flex-col">
                    <span className="text-xs">{method.action}</span>
                    <span className="text-[10px] text-gray-500">{method.actionEn}</span>
                  </div>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* FAQ */}
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              常见问题
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-sm text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>

      {/* Feedback */}
      <div className="p-4">
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-700 mb-3">
              有任何意见或建议？我们很乐意听取您的反馈
            </p>
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600">
              提交反馈
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
