import { Home, ShoppingBag, User, MessageCircle } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "home", icon: Home, label: "首页", labelEn: "Home" },
    { id: "orders", icon: ShoppingBag, label: "订单", labelEn: "Orders" },
    { id: "chat", icon: MessageCircle, label: "聊天", labelEn: "Chat" },
    { id: "profile", icon: User, label: "我的", labelEn: "Me" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
      <div className="flex">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-2 ${
                isActive ? "text-purple-700" : "text-gray-500"
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? "text-purple-700" : "text-gray-400"}`} />
              <div className="flex flex-col items-center">
                <span className="text-xs leading-none">{tab.label}</span>
                <span className="text-[10px] opacity-70 leading-none -mt-0.5">{tab.labelEn}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
