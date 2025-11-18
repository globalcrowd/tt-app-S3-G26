import { ArrowLeft, MapPin, Clock, Phone } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

interface PickupLocationsProps {
  onBack: () => void;
}

export function PickupLocations({ onBack }: PickupLocationsProps) {
  const locations = [
    {
      id: "1",
      name: "宿舍1号楼",
      address: "宿舍1号楼一楼大厅",
      hours: "每天 08:00-22:00",
      phone: "138-xxxx-0001",
      status: "营业中",
      distance: "50m",
    },
    {
      id: "2",
      name: "宿舍2号楼",
      address: "宿舍2号楼一楼大厅",
      hours: "每天 08:00-22:00",
      phone: "138-xxxx-0002",
      status: "营业中",
      distance: "120m",
    },
    {
      id: "3",
      name: "宿舍3号楼",
      address: "宿舍3号楼一楼大厅",
      hours: "每天 08:00-22:00",
      phone: "138-xxxx-0003",
      status: "营业中",
      distance: "200m",
    },
    {
      id: "4",
      name: "宿舍4号楼",
      address: "宿舍4号楼一楼大厅",
      hours: "每天 08:00-22:00",
      phone: "138-xxxx-0004",
      status: "营业中",
      distance: "300m",
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
            <h1>自提点位</h1>
            <p className="text-xs opacity-90">Pickup Locations</p>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="p-4">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-4">
            <div className="text-gray-700">
              <p className="font-semibold text-sm">XJTLU校园自提点</p>
              <p className="text-xs text-gray-600">XJTLU Campus Pickup Points</p>
              <p className="text-sm mt-2">请在拼团成功后，按照约定时间到指定自提点领取商品</p>
              <p className="text-xs text-gray-600 mt-1">Please pick up items at designated locations after group buy success</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Locations List */}
      <div className="p-4 space-y-3">
        {locations.map((location) => (
          <Card key={location.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-purple-700" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="mb-1">{location.name}</h3>
                      <p className="text-sm text-gray-600">{location.address}</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-500 mb-1 flex flex-col py-0.5">
                        <span className="text-xs">{location.status}</span>
                        <span className="text-[9px] opacity-90">Open</span>
                      </Badge>
                      <p className="text-xs text-gray-500">{location.distance}</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-gray-500">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <div>
                        <span className="text-sm">{location.hours}</span>
                        <p className="text-xs">Daily 08:00-22:00</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <div>
                        <span className="text-sm">{location.phone}</span>
                        <p className="text-xs">Contact</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tips */}
      <div className="p-4">
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <p className="text-sm text-yellow-900">
              <span className="font-semibold">温馨提示：</span>
              <br />
              1. 请在约定时间内到自提点领取商品
              <br />
              2. 领取时请出示订单号或二维码
              <br />
              3. 如有问题请联系团长或客服
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
