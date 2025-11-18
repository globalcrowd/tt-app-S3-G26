import { useState, useEffect } from "react";
import { LoginPage } from "./components/LoginPage";
import { HomePage } from "./components/HomePage";
import { GroupBuyDetail } from "./components/GroupBuyDetail";
import { CreateGroupBuy } from "./components/CreateGroupBuy";
import { OrderManagement } from "./components/OrderManagement";
import { ProfilePage } from "./components/ProfilePage";
import { CategoryPage } from "./components/CategoryPage";
import { MyGroupBuys } from "./components/MyGroupBuys";
import { MyGroupBuyDetail } from "./components/MyGroupBuyDetail";
import { WalletPage } from "./components/WalletPage";
import { PickupLocations } from "./components/PickupLocations";
import { CustomerService } from "./components/CustomerService";
import { SettingsPage } from "./components/SettingsPage";
import { OrderDetail } from "./components/OrderDetail";
import { ChatList } from "./components/ChatList";
import { ChatDetail } from "./components/ChatDetail";
import { BottomNav } from "./components/BottomNav";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { supabase } from "./lib/supabase";
import { signOut } from "./services/auth";

type Page = "login" | "home" | "detail" | "create" | "orders" | "profile" | "category" | "myGroupBuys" | "myGroupBuyDetail" | "wallet" | "pickup" | "service" | "settings" | "orderDetail" | "chat" | "chatDetail";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedGroupBuy, setSelectedGroupBuy] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [pageHistory, setPageHistory] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setIsLoggedIn(true);
          setCurrentUserId(session.user.id);
          setCurrentPage("home");
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setIsLoggedIn(true);
        setCurrentUserId(session.user.id);
      } else {
        setIsLoggedIn(false);
        setCurrentUserId(null);
        setCurrentPage("home");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = (userId: string) => {
    setIsLoggedIn(true);
    setCurrentUserId(userId);
    setCurrentPage("home");
  };

  const handleLogout = async () => {
    await signOut();
    setIsLoggedIn(false);
    setCurrentUserId(null);
    setCurrentPage("home");
    toast.success("已退出登录 / Logged out");
  };

  const handleNavigate = (page: string, data?: any) => {
    // 将当前页面加入历史记录
    setPageHistory(prev => [...prev, currentPage]);
    
    if (page === "detail") {
      setSelectedGroupBuy(data);
      setCurrentPage("detail");
    } else if (page === "myGroupBuyDetail") {
      setSelectedGroupBuy(data);
      setCurrentPage("myGroupBuyDetail");
    } else if (page === "orderDetail" || page === "groupBuyDetail") {
      setSelectedGroupBuy(data);
      setCurrentPage("orderDetail");
    } else if (page === "chatDetail") {
      setSelectedChat(data);
      setCurrentPage("chatDetail");
    } else if (page === "category") {
      setSelectedCategory(data.categoryName);
      setCurrentPage("category");
    } else {
      setCurrentPage(page as Page);
    }
  };

  const handleBack = () => {
    // 从历史记录中获取上一个页面
    if (pageHistory.length > 0) {
      const previousPage = pageHistory[pageHistory.length - 1];
      setPageHistory(prev => prev.slice(0, -1));
      setCurrentPage(previousPage);
    } else {
      // 如果没有历史记录，默认返回首页
      setCurrentPage("home");
    }
  };

  const handleJoinGroupBuy = () => {
    toast.success("参团成功！请在订单页面查看详情");
    setCurrentPage("orders");
  };

  const handleCreateGroupBuy = () => {
    toast.success("拼团发布成功！快去邀请好友参团吧");
    setCurrentPage("home");
  };

  const handleTabChange = (tab: string) => {
    setCurrentPage(tab as Page);
  };

  // Show loading while checking session
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-700">
        <div className="text-white text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>加载中... / Loading...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === "home" && (
        <>
          <HomePage onNavigate={handleNavigate} userId={currentUserId} />
          <BottomNav activeTab="home" onTabChange={handleTabChange} />
        </>
      )}

      {currentPage === "detail" && selectedGroupBuy && currentUserId && (
        <GroupBuyDetail
          data={selectedGroupBuy}
          onBack={handleBack}
          onJoin={handleJoinGroupBuy}
          onNavigate={handleNavigate}
          userId={currentUserId}
        />
      )}

      {currentPage === "create" && currentUserId && (
        <CreateGroupBuy
          onBack={handleBack}
          onCreate={handleCreateGroupBuy}
          userId={currentUserId}
        />
      )}

      {currentPage === "orders" && currentUserId && (
        <>
          <OrderManagement onBack={handleBack} onNavigate={handleNavigate} userId={currentUserId} />
          <BottomNav activeTab="orders" onTabChange={handleTabChange} />
        </>
      )}

      {currentPage === "profile" && (
        <>
          <ProfilePage
            onBack={handleBack}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
          <BottomNav activeTab="profile" onTabChange={handleTabChange} />
        </>
      )}

      {currentPage === "category" && selectedCategory && (
        <CategoryPage
          categoryName={selectedCategory}
          onBack={handleBack}
          onNavigate={handleNavigate}
        />
      )}

      {currentPage === "myGroupBuys" && currentUserId && (
        <MyGroupBuys
          onBack={handleBack}
          onNavigate={handleNavigate}
          userId={currentUserId}
        />
      )}

      {currentPage === "myGroupBuyDetail" && selectedGroupBuy && (
        <MyGroupBuyDetail
          data={selectedGroupBuy}
          onBack={handleBack}
          onNavigate={handleNavigate}
        />
      )}

      {currentPage === "wallet" && (
        <WalletPage onBack={handleBack} />
      )}

      {currentPage === "pickup" && (
        <PickupLocations onBack={handleBack} />
      )}

      {currentPage === "service" && (
        <CustomerService onBack={handleBack} />
      )}

      {currentPage === "settings" && (
        <SettingsPage onBack={handleBack} />
      )}

      {currentPage === "orderDetail" && selectedGroupBuy && (
        <OrderDetail
          data={selectedGroupBuy}
          onBack={handleBack}
        />
      )}

      {currentPage === "chat" && (
        <>
          <ChatList onNavigate={handleNavigate} />
          <BottomNav activeTab="chat" onTabChange={handleTabChange} />
        </>
      )}

      {currentPage === "chatDetail" && selectedChat && (
        <ChatDetail
          data={selectedChat}
          onBack={handleBack}
          onNavigate={handleNavigate}
        />
      )}

      <Toaster />
    </div>
  );
}
