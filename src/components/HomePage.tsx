import { useState, useEffect } from "react";
import { Search, ShoppingCart, Book, Apple, Package, Recycle, Clock, Users, MapPin, Plus } from "lucide-react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import logoImage from "figma:asset/eaf85e4df8466aa8d8517377216a43ad69ed3139.png";
import { getActiveGroupBuys, searchGroupBuys } from "../services/groupBuy";
import type { GroupBuy as DBGroupBuy } from "../types/database";
import { toast } from "sonner";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface GroupBuy {
  id: string;
  title: string;
  titleEn?: string;
  image_url: string;
  current_participants: number;
  max_participants: number;
  price: number;
  original_price: number | null;
  timeLeft: string;
  tag?: string;
  location: string;
  organizer: any;
  distance?: string;
  description?: string | null;
  category?: string | null;
  expires_at: string;
}

interface HomePageProps {
  onNavigate: (page: string, data?: any) => void;
  userId: string | null;
}

export function HomePage({ onNavigate, userId }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [groupBuys, setGroupBuys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch group buys on mount
  useEffect(() => {
    loadGroupBuys();
  }, []);

  const loadGroupBuys = async () => {
    setLoading(true);
    try {
      const { data, error } = await getActiveGroupBuys();
      if (error) {
        toast.error("加载失败 / Failed to load");
        console.error(error);
      } else if (data) {
        setGroupBuys(data);
      }
    } catch (error) {
      console.error('Load error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadGroupBuys();
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await searchGroupBuys(searchQuery);
      if (error) {
        toast.error("搜索失败 / Search failed");
      } else if (data) {
        setGroupBuys(data);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate time left from expires_at
  const getTimeLeft = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry.getTime() - now.getTime();

    if (diff < 0) return "已过期";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}天`;
    }
    return `${hours}小时${minutes}分`;
  };

  const categories = [
    { icon: ShoppingCart, name: "零食百货", nameEn: "Snacks", color: "#8B7FE8" },
    { icon: Apple, name: "生鲜果蔬", nameEn: "Fresh Food", color: "#9D8FEB" },
    { icon: Book, name: "教材教辅", nameEn: "Books", color: "#667eea" },
    { icon: Package, name: "校内服务", nameEn: "Services", color: "#7B6FE6" },
    { icon: Recycle, name: "二手拼购", nameEn: "Second-hand", color: "#A89FED" },
  ];

  // Use real data instead of hardcoded
  const popularGroupBuys = groupBuys.slice(0, 4);

  const oldPopularGroupBuys: GroupBuy[] = [
    {
      id: "1",
      title: "山姆小青柠汁1L*6瓶",
      image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400",
      currentPeople: 3,
      totalPeople: 6,
      price: 56,
      originalPrice: 78,
      timeLeft: "2小时15分",
      tag: "热门",
      location: "宿舍3号楼",
      organizer: "同学A",
    },
    {
      id: "2",
      title: "山姆瑞士卷16枚装",
      image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400",
      currentPeople: 5,
      totalPeople: 6,
      price: 42,
      originalPrice: 58,
      timeLeft: "45分钟",
      tag: "快成团",
      location: "宿舍1号楼",
      organizer: "同学B",
    },
    {
      id: "3",
      title: "盒马鲜牛肉500g",
      image: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=400",
      currentPeople: 2,
      totalPeople: 4,
      price: 38,
      originalPrice: 52,
      timeLeft: "6小时30分",
      location: "宿舍2号楼",
      organizer: "同学C",
    },
    {
      id: "4",
      title: "教材拼印-高数下册",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
      currentPeople: 2,
      totalPeople: 3,
      price: 15,
      originalPrice: 25,
      timeLeft: "12小时",
      location: "宿舍4号楼",
      organizer: "同学D",
    },
  ];

  const nearbyGroupBuys: GroupBuy[] = [
    {
      id: "n1",
      title: "蓝月亮洗衣液3kg装",
      titleEn: "Laundry Detergent 3kg",
      image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400",
      currentPeople: 3,
      totalPeople: 5,
      price: 28,
      originalPrice: 45,
      timeLeft: "3小时20分",
      location: "宿舍3号楼",
      organizer: "同学E",
      distance: "50m",
      description: "适合团体采购，量大优惠，宿舍3号楼自提",
      category: "零食百货",
    },
    {
      id: "n2",
      title: "新鲜草莓2斤装",
      titleEn: "Fresh Strawberries 2kg",
      image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400",
      currentPeople: 4,
      totalPeople: 6,
      price: 35,
      originalPrice: 48,
      timeLeft: "1小时45分",
      tag: "快成团",
      location: "宿舍1号楼",
      organizer: "同学F",
      distance: "200m",
      description: "当天现摘，新鲜直达，宿舍1号楼自提",
      category: "生鲜果蔬",
    },
    {
      id: "n3",
      title: "星巴克咖啡豆500g",
      titleEn: "Starbucks Coffee Beans 500g",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400",
      currentPeople: 2,
      totalPeople: 4,
      price: 68,
      originalPrice: 98,
      timeLeft: "5小时10分",
      location: "宿舍2号楼",
      organizer: "同学G",
      distance: "350m",
      description: "进口咖啡豆，适合咖啡爱好者",
      category: "零食百货",
    },
    {
      id: "n4",
      title: "每日坚果混合装30包",
      titleEn: "Daily Nuts Mix 30 Packs",
      image: "https://images.unsplash.com/photo-1508061235577-58b5b8e6eb5f?w=400",
      currentPeople: 5,
      totalPeople: 6,
      price: 52,
      originalPrice: 75,
      timeLeft: "30分钟",
      tag: "快成团",
      location: "宿舍4号楼",
      organizer: "同学H",
      distance: "480m",
      description: "健康零食，每日一包营养均衡",
      category: "零食百货",
    },
    {
      id: "n5",
      title: "农夫山泉饮用水24瓶",
      titleEn: "Bottled Water 24 Bottles",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
      currentPeople: 4,
      totalPeople: 8,
      price: 18,
      originalPrice: 28,
      timeLeft: "4小时50分",
      location: "宿舍1号楼",
      organizer: "同学I",
      distance: "180m",
      description: "整箱购买更划算，宿舍必备",
      category: "零食百货",
    },
    {
      id: "n6",
      title: "进口车厘子1kg装",
      titleEn: "Imported Cherries 1kg",
      image: "https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=400",
      currentPeople: 3,
      totalPeople: 5,
      price: 88,
      originalPrice: 128,
      timeLeft: "2小时35分",
      tag: "热门",
      location: "宿舍3号楼",
      organizer: "同学J",
      distance: "90m",
      description: "智利进口，个大饱满，甜度高",
      category: "生鲜果蔬",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="p-4" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <div className="flex items-center gap-3">
            {/* Logo */}
            <img 
              src={logoImage} 
              alt="TT Logo" 
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            
            {/* Search Bar */}
            <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 flex-1">
              <Search className="w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="搜索 Search: 教材、零食、水果..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 focus-visible:ring-0 p-0"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto gap-4 p-4 no-scrollbar">
          {categories.map((category) => (
            <div
              key={category.name}
              className="flex flex-col items-center gap-2 cursor-pointer flex-shrink-0"
              onClick={() => onNavigate("category", { categoryName: category.name })}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: category.color + "20" }}
              >
                <category.icon className="w-6 h-6" style={{ color: category.color }} />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-700 leading-none">{category.name}</span>
                <span className="text-[10px] text-gray-500 leading-none -mt-0.5">{category.nameEn}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Group Buys */}
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-purple-700">今日热门拼团</h2>
          <p className="text-xs text-gray-500">Popular Group Buys Today</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {popularGroupBuys.map((groupBuy) => (
            <Card
              key={groupBuy.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onNavigate("detail", groupBuy)}
            >
              <CardContent className="p-0">
                <div className="relative">
                  <ImageWithFallback
                    src={groupBuy.image_url || 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400'}
                    alt={groupBuy.title}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  {groupBuy.tag && (
                    <Badge
                      className="absolute top-2 right-2"
                      style={{ backgroundColor: groupBuy.tag === "热门" ? "#FF6B6B" : "#FFA500" }}
                    >
                      {groupBuy.tag}
                    </Badge>
                  )}
                </div>
                <div className="p-3 space-y-2">
                  <h3 className="text-sm line-clamp-2">{groupBuy.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Users className="w-3 h-3" />
                    <span>
                      {groupBuy.current_participants}/{groupBuy.max_participants}人 people
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-red-500">¥{groupBuy.price}</span>
                      {groupBuy.original_price && (
                        <span className="text-xs text-gray-400 line-through ml-1">
                          ¥{groupBuy.original_price}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{getTimeLeft(groupBuy.expires_at)}后截止 left</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Nearby Group Buys */}
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-purple-700">附近团长拼单</h2>
          <p className="text-xs text-gray-500">Nearby Group Buys</p>
        </div>
        <div className="space-y-3">
          {nearbyGroupBuys.map((groupBuy) => (
            <Card 
              key={groupBuy.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onNavigate("detail", groupBuy)}
            >
              <CardContent className="p-3 flex gap-3">
                {/* Avatar */}
                <Avatar className="flex-shrink-0">
                  <AvatarFallback className="bg-purple-100 text-purple-700">
                    {groupBuy.organizer?.full_name?.[0] || '?'}
                  </AvatarFallback>
                </Avatar>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{groupBuy.title}</p>
                      {groupBuy.category && (
                        <p className="text-xs text-gray-500 truncate">{groupBuy.category}</p>
                      )}
                    </div>
                    {groupBuy.tag && (
                      <Badge
                        className="flex-shrink-0 text-xs"
                        style={{ backgroundColor: groupBuy.tag === "热门" ? "#FF6B6B" : "#FFA500" }}
                      >
                        {groupBuy.tag}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span>{groupBuy.location}</span>
                    </div>
                    {groupBuy.distance && (
                      <Badge variant="outline" className="text-xs">
                        {groupBuy.distance}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="text-red-500 font-medium">¥{groupBuy.price}</span>
                        {groupBuy.original_price && (
                          <span className="text-xs text-gray-400 line-through ml-1">
                            ¥{groupBuy.original_price}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Users className="w-3 h-3" />
                        <span>
                          {groupBuy.current_participants}/{groupBuy.max_participants}人
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-orange-600">
                      <Clock className="w-3 h-3" />
                      <span>{getTimeLeft(groupBuy.expires_at)}</span>
                    </div>
                  </div>
                </div>

                {/* Thumbnail */}
                <ImageWithFallback
                  src={groupBuy.image_url || 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400'}
                  alt={groupBuy.title}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <Button
        className="fixed bottom-24 right-6 w-14 h-14 rounded-full shadow-lg"
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
        onClick={() => onNavigate("create")}
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
}
