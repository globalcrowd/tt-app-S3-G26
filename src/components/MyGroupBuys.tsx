import { useState, useEffect } from "react";
import { ArrowLeft, Clock, Users } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { getUserGroupBuys } from "../services/groupBuy";
import { toast } from "sonner";

interface MyGroupBuysProps {
  onBack: () => void;
  onNavigate: (page: string, data?: any) => void;
  userId: string;
}

export function MyGroupBuys({ onBack, onNavigate, userId }: MyGroupBuysProps) {
  const [groupBuys, setGroupBuys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMyGroupBuys();
  }, [userId]);

  const loadMyGroupBuys = async () => {
    setLoading(true);
    try {
      const { data, error } = await getUserGroupBuys(userId);
      if (error) {
        toast.error("加载失败 / Failed to load");
      } else if (data) {
        setGroupBuys(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const activeGroups = groupBuys.filter(g => g.status === 'active');
  const completedGroups = groupBuys.filter(g => g.status === 'completed');
  const cancelledGroups = groupBuys.filter(g => g.status === 'cancelled' || g.status === 'expired');

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
              <p className="text-2xl text-purple-700 mb-1">{activeGroups.length}</p>
              <p className="text-sm text-gray-500">进行中</p>
            </div>
            <div className="text-center">
              <p className="text-2xl text-purple-700 mb-1">{completedGroups.length}</p>
              <p className="text-sm text-gray-500">已完成</p>
            </div>
            <div className="text-center">
              <p className="text-2xl text-purple-700 mb-1">{groupBuys.length}</p>
              <p className="text-sm text-gray-500">总数</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Group List */}
      <div className="p-4 space-y-3">
        {loading ? (
          <p className="text-center text-gray-500">加载中... / Loading...</p>
        ) : groupBuys.length === 0 ? (
          <p className="text-center text-gray-500">暂无拼团 / No group buys yet</p>
        ) : (
          groupBuys.map((group) => (
          <Card
            key={group.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onNavigate("myGroupBuyDetail", group)}
          >
            <CardContent className="p-4">
              <div className="flex gap-4">
                <img
                  src={group.image_url || 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400'}
                  alt={group.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="text-sm line-clamp-2">{group.title}</h3>
                    <Badge
                      className={
                        group.status === "active"
                          ? "bg-blue-500"
                          : group.status === "completed"
                          ? "bg-green-500"
                          : "bg-gray-500"
                      }
                    >
                      {group.status === 'active' ? '进行中' : group.status === 'completed' ? '已完成' : '已取消'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>
                        {group.current_participants}/{group.max_participants}人
                      </span>
                    </div>
                    {group.status === "active" && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(group.expires_at) > new Date() ? '进行中' : '已过期'}</span>
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
          ))
        )}
      </div>
    </div>
  );
}
