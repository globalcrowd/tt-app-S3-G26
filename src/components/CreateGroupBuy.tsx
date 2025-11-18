import { useState } from "react";
import { ArrowLeft, Upload, Plus, Minus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { createGroupBuy } from "../services/groupBuy";
import { toast } from "sonner";

interface CreateGroupBuyProps {
  onBack: () => void;
  onCreate: () => void;
  userId: string;
}

export function CreateGroupBuy({ onBack, onCreate, userId }: CreateGroupBuyProps) {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [totalPeople, setTotalPeople] = useState(4);
  const [duration, setDuration] = useState("24");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [creating, setCreating] = useState(false);

  const templates = [
    { name: "山姆零食拼团", people: "4-6人", category: "零食百货" },
    { name: "教材拼印", people: "2-3人", category: "教材教辅" },
    { name: "生鲜果蔬", people: "3-5人", category: "生鲜果蔬" },
    { name: "宿舍用品", people: "4-8人", category: "校内服务" },
  ];

  const categories = [
    "零食百货",
    "生鲜果蔬",
    "教材教辅",
    "校内服务",
    "二手拼购",
  ];

  const pickupLocations = [
    "宿舍1号楼",
    "宿舍2号楼",
    "宿舍3号楼",
    "宿舍4号楼",
    "北门快递点",
    "南门快递点",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productName || !price || !location) {
      toast.error("请填写必填项 / Please fill required fields");
      return;
    }

    setCreating(true);
    try {
      // Calculate expires_at
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + parseInt(duration));

      const groupBuyData = {
        organizer_id: userId,
        title: productName,
        description: description || null,
        category: category || null,
        image_url: imageUrl || null,
        price: parseFloat(price),
        original_price: originalPrice ? parseFloat(originalPrice) : null,
        max_participants: totalPeople,
        location: location,
        expires_at: expiresAt.toISOString(),
        status: 'active' as const,
      };

      const { data, error } = await createGroupBuy(groupBuyData);

      if (error) {
        toast.error(`创建失败 / Failed: ${error}`);
      } else {
        toast.success("拼团发布成功！/ Successfully created!");
        onCreate();
      }
    } catch (error: any) {
      toast.error(`错误 / Error: ${error.message}`);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm p-4 flex items-center gap-3">
        <button onClick={onBack}>
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1>发起拼团</h1>
          <p className="text-xs text-gray-500">Create Group Buy</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {/* Templates */}
        <Card>
          <CardContent className="p-4">
            <Label className="mb-3 block">
              <div>快速选择模板（可选）</div>
              <div className="text-xs text-gray-500">Quick Template (Optional)</div>
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {templates.map((template, index) => (
                <button
                  key={index}
                  type="button"
                  className="p-3 border rounded-lg text-left hover:border-purple-500 hover:bg-purple-50 transition-colors"
                  onClick={() => {
                    setProductName(template.name);
                    setCategory(template.category);
                    const [min, max] = template.people.match(/\d+/g)?.map(Number) || [4, 6];
                    setTotalPeople(min);
                  }}
                >
                  <p className="text-sm">{template.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{template.people}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Product Info */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div>
              <h3>商品信息</h3>
              <p className="text-xs text-gray-500">Product Information</p>
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label htmlFor="imageUrl">
                <div>商品图片链接（可选）</div>
                <div className="text-xs text-gray-500">Image URL (Optional)</div>
              </Label>
              <Input
                id="imageUrl"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <p className="text-xs text-gray-400">粘贴图片链接 / Paste image URL from Unsplash or similar</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="productName">
                <div>商品名称</div>
                <div className="text-xs text-gray-500">Product Name</div>
              </Label>
              <Input
                id="productName"
                placeholder="例如 e.g.: 山姆小青柠汁1L*6瓶"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">
                <div>商品分类</div>
                <div className="text-xs text-gray-500">Category</div>
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="选择分类 / Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                <div>商品描述（可选）</div>
                <div className="text-xs text-gray-500">Description (Optional)</div>
              </Label>
              <Textarea
                id="description"
                placeholder="简单描述商品规格、特点等 Describe the product..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Price Setting */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div>
              <h3>价格设置</h3>
              <p className="text-xs text-gray-500">Price Settings</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="price">
                  <div>人均拼团价</div>
                  <div className="text-xs text-gray-500">Group Price</div>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">¥</span>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="pl-8"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="originalPrice">
                  <div>原价</div>
                  <div className="text-xs text-gray-500">Original Price</div>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">¥</span>
                  <Input
                    id="originalPrice"
                    type="number"
                    placeholder="0.00"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    className="pl-8"
                    required
                  />
                </div>
              </div>
            </div>

            {price && originalPrice && (
              <div className="p-3 bg-purple-50 rounded-lg text-sm">
                <p className="text-gray-700">
                  总价：¥{(parseFloat(price) * totalPeople).toFixed(2)} · 
                  节省：¥{((parseFloat(originalPrice) - parseFloat(price)) * totalPeople).toFixed(2)}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Group Settings */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div>
              <h3>成团设置</h3>
              <p className="text-xs text-gray-500">Group Settings</p>
            </div>

            <div className="space-y-2">
              <Label>
                <div>成团人数</div>
                <div className="text-xs text-gray-500">Group Size</div>
              </Label>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-gray-700">{totalPeople} 人 people</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setTotalPeople(Math.max(2, totalPeople - 1))}
                    className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setTotalPeople(Math.min(10, totalPeople + 1))}
                    className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500">建议2-10人 Recommended: 2-10 people</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">
                <div>成团截止时间</div>
                <div className="text-xs text-gray-500">Deadline</div>
              </Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="选择时间 Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6小时 6 hours</SelectItem>
                  <SelectItem value="12">12小时 12 hours</SelectItem>
                  <SelectItem value="24">24小时（推荐）24 hours (Recommended)</SelectItem>
                  <SelectItem value="48">48小时 48 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Pickup Location */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div>
              <h3>自提地点</h3>
              <p className="text-xs text-gray-500">Pickup Location</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">
                <div>选择自提点</div>
                <div className="text-xs text-gray-500">Select Pickup Point</div>
              </Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="选择自提点 Select location" />
                </SelectTrigger>
                <SelectContent>
                  {pickupLocations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                  <SelectItem value="custom">自定义地点 Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {location === "custom" && (
              <div className="space-y-2">
                <Label htmlFor="customLocation">
                  <div>自定义地点</div>
                  <div className="text-xs text-gray-500">Custom Location</div>
                </Label>
                <Input
                  id="customLocation"
                  placeholder="例如 e.g.: 图书馆门口 Library entrance"
                  required
                />
              </div>
            )}

            <div className="p-3 bg-blue-50 rounded-lg text-gray-700">
              <p className="text-sm">💡 提示：选择方便取货的地点，成团后请及时联系参团同学</p>
              <p className="text-xs mt-1">Tip: Choose a convenient location and contact members after group is formed</p>
            </div>
          </CardContent>
        </Card>
      </form>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <Button
          type="submit"
          className="w-full"
          style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
          onClick={handleSubmit}
          disabled={creating}
        >
          <div className="flex flex-col">
            <span>{creating ? '发布中...' : '发布拼团'}</span>
            <span className="text-xs opacity-90">{creating ? 'Publishing...' : 'Publish Group Buy'}</span>
          </div>
        </Button>
      </div>
    </div>
  );
}
