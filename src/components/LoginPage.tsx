import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { signIn, signUp } from "../services/auth";
import { toast } from "sonner";

interface LoginPageProps {
  onLogin: (userId: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        const { user, error } = await signIn(email, password);
        if (error) {
          toast.error(`登录失败 / Login failed: ${error}`);
        } else if (user) {
          toast.success("登录成功！/ Login successful!");
          onLogin(user.id);
        }
      } else {
        // Sign up
        if (password !== confirmPassword) {
          toast.error("密码不匹配 / Passwords don't match");
          setLoading(false);
          return;
        }

        const username = email.split('@')[0];
        const { user, error } = await signUp(email, password, fullName, username);

        if (error) {
          toast.error(`注册失败 / Sign up failed: ${error}`);
        } else if (user) {
          toast.success("注册成功！请登录 / Sign up successful! Please login");
          setIsLogin(true);
          setPassword("");
          setConfirmPassword("");
        }
      }
    } catch (error: any) {
      toast.error(`错误 / Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
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
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName">
                  <div>姓名</div>
                  <div className="text-xs text-gray-500">Full Name</div>
                </Label>
                <Input
                  id="fullName"
                  placeholder="请输入姓名 / Enter full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required={!isLogin}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">
                <div>邮箱</div>
                <div className="text-xs text-gray-500">Email</div>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="请输入邮箱 / Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required={!isLogin}
                />
              </div>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
            >
              <div className="flex flex-col items-center">
                <div className="leading-none">
                  {loading ? "处理中..." : (isLogin ? "登录" : "注册")}
                </div>
                <div className="text-xs opacity-90 leading-none -mt-0.5">
                  {loading ? "Processing..." : (isLogin ? "Login" : "Sign Up")}
                </div>
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
