import { ArrowLeft, Clock, Users } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface MyGroupBuysProps {
  onBack: () => void;
  onNavigate: (page: string, data?: any) => void;
}

export function MyGroupBuys({ onBack, onNavigate }: MyGroupBuysProps) {
  const myCreatedGroups = [
    {
      id: "my1",
      title: "山姆小青柠汁1L*6瓶",
      image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400",
      currentPeople: 3,
      totalPeople: 6,
      price: 56,
      timeLeft: "2小时15分",
      status: "进行中",
      location: "宿舍3号楼",
    },
    {
      id: "my2",
      title: "盒马鲜牛排500g",
      image: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=400",
      currentPeople: 4,
      totalPeople: 4,
      price: 45,
      timeLeft: "已成团",
      status: "已成团",
      location: "宿舍2号楼",
    },
    {
      id: "my3",
      title: "教材拼印-高数下册",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
      currentPeople: 3,
      totalPeople: 3,
      price: 15,
      timeLeft: "已完成",
      status: "已完成",
      location: "宿舍4号楼",
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
            <h1>我发起的拼团</h1>
            <p className="text-xs opacity-90">My Created Group Buys</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <Card className="m-4">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 divide-x">
            <div className="text-center">
              <p className="text-2xl text-purple-700 mb-1">1</p>
              <p className="text-sm text-gray-500">进行中</p>
            </div>
            <div className="text-center">
              <p className="text-2xl text-purple-700 mb-1">1</p>
              <p className="text-sm text-gray-500">已成团</p>
            </div>
            <div className="text-center">
              <p className="text-2xl text-purple-700 mb-1">1</p>
              <p className="text-sm text-gray-500">已完成</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Group List */}
      <div className="p-4 space-y-3">
        {myCreatedGroups.map((group) => (
          <Card
            key={group.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onNavigate("myGroupBuyDetail", group)}
          >
            <CardContent className="p-4">
              <div className="flex gap-4">
                <img
                  src={group.image}
                  alt={group.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="text-sm line-clamp-2">{group.title}</h3>
                    <Badge
                      className={
                        group.status === "进行中"
                          ? "bg-blue-500"
                          : group.status === "已成团"
                          ? "bg-green-500"
                          : "bg-gray-500"
                      }
                    >
                      {group.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>
                        {group.currentPeople}/{group.totalPeople}人
                      </span>
                    </div>
                    {group.status === "进行中" && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{group.timeLeft}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-red-500">¥{group.price}</span>
                    <span className="text-sm text-gray-500">{group.location}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
