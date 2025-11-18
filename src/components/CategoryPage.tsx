import { ArrowLeft, Clock, Users, Plus } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface GroupBuy {
  id: string;
  title: string;
  image: string;
  currentPeople: number;
  totalPeople: number;
  price: number;
  originalPrice: number;
  timeLeft: string;
  tag?: string;
  location: string;
  organizer: string;
}

interface CategoryPageProps {
  categoryName: string;
  onBack: () => void;
  onNavigate: (page: string, data?: any) => void;
}

const categoryData: Record<string, GroupBuy[]> = {
  "零食百货": [
    {
      id: "snack1",
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
      id: "snack2",
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
      id: "snack3",
      title: "奥利奥饼干组合装",
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400",
      currentPeople: 2,
      totalPeople: 4,
      price: 32,
      originalPrice: 45,
      timeLeft: "5小时",
      location: "宿舍2号楼",
      organizer: "同学C",
    },
    {
      id: "snack4",
      title: "乐事薯片大礼包",
      image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400",
      currentPeople: 4,
      totalPeople: 5,
      price: 48,
      originalPrice: 68,
      timeLeft: "3小时",
      location: "宿舍4号楼",
      organizer: "同学D",
    },
    {
      id: "snack5",
      title: "三只松鼠坚果礼盒",
      image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400",
      currentPeople: 1,
      totalPeople: 3,
      price: 58,
      originalPrice: 88,
      timeLeft: "8小时",
      location: "宿舍1号楼",
      organizer: "同学E",
    },
    {
      id: "snack6",
      title: "可口可乐整箱24罐",
      image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400",
      currentPeople: 3,
      totalPeople: 4,
      price: 36,
      originalPrice: 48,
      timeLeft: "4小时",
      location: "宿舍3号楼",
      organizer: "同学F",
    },
  ],
  "生鲜果蔬": [
    {
      id: "fresh1",
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
      id: "fresh2",
      title: "新鲜草莓2斤装",
      image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400",
      currentPeople: 3,
      totalPeople: 4,
      price: 28,
      originalPrice: 40,
      timeLeft: "2小时",
      tag: "快成团",
      location: "宿舍1号楼",
      organizer: "同学G",
    },
    {
      id: "fresh3",
      title: "有机蔬菜组合包",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400",
      currentPeople: 2,
      totalPeople: 3,
      price: 35,
      originalPrice: 48,
      timeLeft: "5小时",
      location: "宿舍3号楼",
      organizer: "同学H",
    },
    {
      id: "fresh4",
      title: "进口榴莲1.5kg",
      image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400",
      currentPeople: 1,
      totalPeople: 3,
      price: 68,
      originalPrice: 98,
      timeLeft: "12小时",
      location: "宿舍4号楼",
      organizer: "同学I",
    },
    {
      id: "fresh5",
      title: "智利车厘子500g",
      image: "https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=400",
      currentPeople: 4,
      totalPeople: 5,
      price: 45,
      originalPrice: 68,
      timeLeft: "1小时",
      tag: "快成团",
      location: "宿舍2号楼",
      organizer: "同学J",
    },
  ],
  "教材教辅": [
    {
      id: "book1",
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
    {
      id: "book2",
      title: "线性代数习题册",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400",
      currentPeople: 1,
      totalPeople: 3,
      price: 12,
      originalPrice: 20,
      timeLeft: "6小时",
      location: "宿舍1号楼",
      organizer: "同学K",
    },
    {
      id: "book3",
      title: "雅思托福备考资料",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400",
      currentPeople: 4,
      totalPeople: 5,
      price: 18,
      originalPrice: 32,
      timeLeft: "3小时",
      tag: "热门",
      location: "宿舍2号楼",
      organizer: "同学L",
    },
    {
      id: "book4",
      title: "Python编程教材",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400",
      currentPeople: 3,
      totalPeople: 4,
      price: 25,
      originalPrice: 45,
      timeLeft: "8小时",
      location: "宿舍3号楼",
      organizer: "同学M",
    },
    {
      id: "book5",
      title: "数据结构与算法",
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
      currentPeople: 2,
      totalPeople: 3,
      price: 22,
      originalPrice: 38,
      timeLeft: "10小时",
      location: "宿舍4号楼",
      organizer: "同学N",
    },
  ],
  "校内服务": [
    {
      id: "service1",
      title: "文印店拼印服务",
      image: "https://images.unsplash.com/photo-1612178537253-bccd437b730e?w=400",
      currentPeople: 5,
      totalPeople: 10,
      price: 0.15,
      originalPrice: 0.3,
      timeLeft: "24小时",
      tag: "热门",
      location: "宿舍1号楼",
      organizer: "同学O",
    },
    {
      id: "service2",
      title: "干洗服务拼团",
      image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=400",
      currentPeople: 3,
      totalPeople: 5,
      price: 25,
      originalPrice: 40,
      timeLeft: "6小时",
      location: "宿舍2号楼",
      organizer: "同学P",
    },
    {
      id: "service3",
      title: "理发店拼单优惠",
      image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400",
      currentPeople: 2,
      totalPeople: 4,
      price: 35,
      originalPrice: 50,
      timeLeft: "4小时",
      location: "宿舍3号楼",
      organizer: "同学Q",
    },
    {
      id: "service4",
      title: "快递代取服务",
      image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400",
      currentPeople: 8,
      totalPeople: 10,
      price: 2,
      originalPrice: 5,
      timeLeft: "2小时",
      tag: "快成团",
      location: "宿舍4号楼",
      organizer: "同学R",
    },
  ],
  "二手拼购": [
    {
      id: "secondhand1",
      title: "二手自行车拼购",
      image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400",
      currentPeople: 1,
      totalPeople: 2,
      price: 180,
      originalPrice: 280,
      timeLeft: "48小时",
      location: "宿舍1号楼",
      organizer: "同学S",
    },
    {
      id: "secondhand2",
      title: "台灯9成新",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
      currentPeople: 1,
      totalPeople: 1,
      price: 30,
      originalPrice: 80,
      timeLeft: "24小时",
      tag: "快成团",
      location: "宿舍2号楼",
      organizer: "同学T",
    },
    {
      id: "secondhand3",
      title: "吹风机拼购",
      image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400",
      currentPeople: 2,
      totalPeople: 3,
      price: 45,
      originalPrice: 120,
      timeLeft: "12小时",
      location: "宿舍3号楼",
      organizer: "同学U",
    },
    {
      id: "secondhand4",
      title: "小冰箱低价转",
      image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400",
      currentPeople: 1,
      totalPeople: 2,
      price: 150,
      originalPrice: 350,
      timeLeft: "36小时",
      location: "宿舍4号楼",
      organizer: "同学V",
    },
    {
      id: "secondhand5",
      title: "毕业季书籍甩卖",
      image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400",
      currentPeople: 3,
      totalPeople: 5,
      price: 8,
      originalPrice: 25,
      timeLeft: "18小时",
      tag: "热门",
      location: "宿舍1号楼",
      organizer: "同学W",
    },
  ],
};

export function CategoryPage({ categoryName, onBack, onNavigate }: CategoryPageProps) {
  const groupBuys = categoryData[categoryName] || [];

  const getCategoryColor = (name: string) => {
    switch (name) {
      case "零食百货":
        return "#FF6B6B";
      case "生鲜果蔬":
        return "#4ECDC4";
      case "教材教辅":
        return "#667eea";
      case "校内服务":
        return "#FFA07A";
      case "二手拼购":
        return "#95E1D3";
      default:
        return "#667eea";
    }
  };

  const color = getCategoryColor(categoryName);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="p-4 flex items-center gap-3" style={{ background: `linear-gradient(135deg, ${color}dd 0%, ${color}bb 100%)` }}>
          <button onClick={onBack} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-white">{categoryName}</h1>
            <p className="text-xs text-white opacity-90">
              {categoryName === "零食百货" && "Snacks & Groceries"}
              {categoryName === "生鲜果蔬" && "Fresh Produce"}
              {categoryName === "教材教辅" && "Textbooks & Study Materials"}
              {categoryName === "校内服务" && "Campus Services"}
              {categoryName === "二手拼购" && "Second-hand Items"}
            </p>
          </div>
        </div>
      </div>

      {/* Category Info */}
      <div className="p-4 bg-white mb-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">当前拼团 Active Groups</p>
            <div>
              <p className="text-xl" style={{ color }}>{groupBuys.length} 个拼团进行中</p>
              <p className="text-xs text-gray-500">{groupBuys.length} groups ongoing</p>
            </div>
          </div>
          <Button
            size="sm"
            style={{ background: `linear-gradient(135deg, ${color}dd 0%, ${color}bb 100%)` }}
            onClick={() => onNavigate("create")}
          >
            <div className="flex items-center gap-1">
              <Plus className="w-4 h-4" />
              <div className="flex flex-col items-start">
                <span className="text-xs">发起拼团</span>
                <span className="text-[10px] opacity-90">Create</span>
              </div>
            </div>
          </Button>
        </div>
      </div>

      {/* Group Buys List */}
      {groupBuys.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">暂无拼团</p>
          <p className="text-xs text-gray-400 mt-1">No active groups</p>
        </div>
      ) : (
        <div className="p-4 grid grid-cols-2 gap-3">
          {groupBuys.map((groupBuy) => (
            <Card
              key={groupBuy.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onNavigate("detail", groupBuy)}
            >
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={groupBuy.image}
                    alt={groupBuy.title}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  {groupBuy.tag && (
                    <Badge
                      className="absolute top-2 right-2 flex flex-col py-0.5"
                      style={{ backgroundColor: groupBuy.tag === "热门" ? "#FF6B6B" : "#FFA500" }}
                    >
                      <span className="text-xs">{groupBuy.tag}</span>
                      <span className="text-[9px] opacity-90">
                        {groupBuy.tag === "热门" ? "Hot" : "Soon"}
                      </span>
                    </Badge>
                  )}
                </div>
                <div className="p-3 space-y-2">
                  <h3 className="text-sm line-clamp-2">{groupBuy.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Users className="w-3 h-3" />
                    <span>
                      {groupBuy.currentPeople}/{groupBuy.totalPeople}人 people
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-red-500">¥{groupBuy.price}</span>
                      <span className="text-xs text-gray-400 line-through ml-1">
                        ¥{groupBuy.originalPrice}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-0.5 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{groupBuy.timeLeft}后截止</span>
                    </div>
                    <span className="text-[10px] ml-4">Ends in {groupBuy.timeLeft}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
