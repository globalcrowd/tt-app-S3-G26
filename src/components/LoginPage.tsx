import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <span className="text-white text-3xl">TT</span>
            </div>
          </div>
          <CardTitle className="text-2xl">
            <span className="block">XJTLU 校园拼团</span>
            <span className="block text-base text-gray-600 mt-1">Campus Group Buy</span>
          </CardTitle>
          <CardDescription>
            {isLogin ? (
              <>
                <span className="block">登录您的账号</span>
                <span className="block text-xs">Login to your account</span>
              </>
            ) : (
              <>
                <span className="block">创建新账号</span>
                <span className="block text-xs">Create new account</span>
              </>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="studentId">
                <div>学号</div>
                <div className="text-xs text-gray-500">Student ID</div>
              </Label>
              <Input
                id="studentId"
                placeholder="请输入学号 / Enter student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">
                <div>密码</div>
                <div className="text-xs text-gray-500">Password</div>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="请输入密码 / Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  <div>确认密码</div>
                  <div className="text-xs text-gray-500">Confirm Password</div>
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="请再次输入密码 / Re-enter password"
                  required
                />
              </div>
            )}
            <Button
              type="submit"
              className="w-full"
              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
            >
              <div className="flex flex-col items-center">
                <div className="leading-none">{isLogin ? "登录" : "注册"}</div>
                <div className="text-xs opacity-90 leading-none -mt-0.5">{isLogin ? "Login" : "Sign Up"}</div>
              </div>
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-purple-600 hover:underline"
            >
              {isLogin ? (
                <>
                  <span className="block">还没有账号？立即注册</span>
                  <span className="block text-xs text-gray-500">Don't have an account? Sign up</span>
                </>
              ) : (
                <>
                  <span className="block">已有账号？返回登录</span>
                  <span className="block text-xs text-gray-500">Have an account? Login</span>
                </>
              )}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
