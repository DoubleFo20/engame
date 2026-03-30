// src/screens/LoginScreen.jsx
import React, { useState } from "react";
import { Gamepad2, ChevronLeft, Loader2 } from "lucide-react";
import { apiForgotPassword } from "../api";

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
}) => (
  <div className="mb-4">
    <label className="block text-sm text-slate-400 mb-2">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full bg-slate-800 rounded-lg px-4 py-3 text-white border border-slate-700 focus:border-blue-500 outline-none"
    />
  </div>
);

const Button = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  type = "button",
  disabled = false,
}) => {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white",
    ghost: "bg-transparent hover:bg-slate-800 text-blue-400",
    success: "bg-green-600 hover:bg-green-500 text-white",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`py-3 px-6 rounded-xl font-bold transition-all ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export default function LoginScreen({ onLogin, onNavigateRegister }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [forgotForm, setForgotForm] = useState({ username: "", email: "", newPassword: "", confirm: "" });
  const [forgotLoading, setForgotLoading] = useState(false);

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    if (!forgotForm.username || !forgotForm.email || !forgotForm.newPassword) {
      return alert("กรุณากรอกข้อมูลให้ครบ");
    }
    if (forgotForm.newPassword !== forgotForm.confirm) {
      return alert("รหัสผ่านไม่ตรงกัน");
    }
    if (forgotForm.newPassword.length < 3) {
      return alert("Password ต้องมีอย่างน้อย 3 ตัวอักษร");
    }
    setForgotLoading(true);
    try {
      const result = await apiForgotPassword(forgotForm.username, forgotForm.email, forgotForm.newPassword);
      alert("✅ " + result.message);
      setShowForgot(false);
      setForgotForm({ username: "", email: "", newPassword: "", confirm: "" });
    } catch (err) {
      alert("❌ " + (err.message || "เกิดข้อผิดพลาด"));
    } finally {
      setForgotLoading(false);
    }
  };

  // Forgot Password screen
  if (showForgot) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 animate-fade-in bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
        <div className="w-full max-w-xs">
          <button
            onClick={() => setShowForgot(false)}
            className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white"
          >
            <ChevronLeft size={20} /> กลับหน้า Login
          </button>
          <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-700 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-2">🔑 ลืมรหัสผ่าน</h2>
            <p className="text-xs text-slate-400 mb-4">
              กรอก Username และ Email ที่ใช้สมัคร แล้วตั้งรหัสผ่านใหม่ได้เลย
            </p>
            <form onSubmit={handleForgotSubmit}>
              <Input
                label="Username"
                value={forgotForm.username}
                onChange={(e) => setForgotForm({ ...forgotForm, username: e.target.value })}
                placeholder="กรอก username"
                required
              />
              <Input
                label="Email"
                type="email"
                value={forgotForm.email}
                onChange={(e) => setForgotForm({ ...forgotForm, email: e.target.value })}
                placeholder="email ที่ใช้สมัคร"
                required
              />
              <Input
                label="รหัสผ่านใหม่"
                type="password"
                value={forgotForm.newPassword}
                onChange={(e) => setForgotForm({ ...forgotForm, newPassword: e.target.value })}
                placeholder="ตั้งรหัสผ่านใหม่"
                required
              />
              <Input
                label="ยืนยันรหัสผ่านใหม่"
                type="password"
                value={forgotForm.confirm}
                onChange={(e) => setForgotForm({ ...forgotForm, confirm: e.target.value })}
                placeholder="กรอกอีกครั้ง"
                required
              />
              <Button type="submit" className="w-full flex items-center justify-center gap-2" disabled={forgotLoading}>
                {forgotLoading ? <><Loader2 size={16} className="animate-spin" /> กำลังดำเนินการ...</> : "รีเซ็ตรหัสผ่าน"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Normal Login screen
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 animate-fade-in bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
      {/* โลโก้ + ชื่อเกม */}
      <div className="mb-6 relative">
        <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 rounded-full" />
        <Gamepad2
          size={64}
          className="text-white relative z-10 drop-shadow-2xl"
        />
      </div>
      <h1 className="text-4xl font-black text-white mb-1 tracking-tighter">
        ENGAME
      </h1>
      <p className="text-slate-400 mb-8 text-sm">ROV English Training</p>

      {/* กล่องฟอร์ม */}
      <div className="w-full max-w-xs bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-700 shadow-xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!u.trim() || !p.trim()) {
              alert("Please enter username and password");
              return;
            }
            onLogin(u, p);
          }}
        >
          <Input
            label="Username"
            value={u}
            onChange={(e) => setU(e.target.value)}
            placeholder="Enter username"
          />
          <Input
            label="Password"
            type="password"
            value={p}
            onChange={(e) => setP(e.target.value)}
            placeholder="Enter password"
          />
          <Button type="submit" className="w-full mb-2">
            Login
          </Button>
          <div className="text-center mb-4">
            <button
              type="button"
              onClick={() => setShowForgot(true)}
              className="text-xs text-slate-500 hover:text-blue-400 transition-colors"
            >
              Forgot Password?
            </button>
          </div>
        </form>

        {/* Quick Login */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {/* <button
            onClick={() => onLogin("player", "123")}
            className="p-2 bg-slate-800 rounded text-xs text-slate-300 border border-slate-700"
          >
            Try as Player
          </button>
          <button
            onClick={() => onLogin("admin", "123")}
            className="p-2 bg-slate-800 rounded text-xs text-slate-300 border border-slate-700"
          >
            Try as Admin
          </button> */}
        </div>

        {/* ปุ่มไป Register */}
        <div className="text-center">
          <Button
            variant="ghost"
            className="w-full py-2 text-blue-400"
            onClick={onNavigateRegister}
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
}
