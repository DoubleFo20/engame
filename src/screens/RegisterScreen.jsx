// src/screens/RegisterScreen.jsx
import React, { useState } from "react";
import { ChevronLeft, UserPlus, Mail } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function RegisterScreen({ onRegister, onNavigateLogin }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirm: "",
    name: "",
    email: "",
  });

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 animate-fade-in bg-slate-950">
      <div className="w-full max-w-xs">
        <button
          onClick={onNavigateLogin}
          className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white"
        >
          <ChevronLeft size={20} /> Back
        </button>
        <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-700 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <UserPlus className="text-blue-500" /> Register
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!form.email.includes("@")) return alert("กรุณากรอก Email ที่ถูกต้อง");
              if (form.password !== form.confirm) return alert("Passwords mismatch");
              if (form.password.length < 3) return alert("Password ต้องมีอย่างน้อย 3 ตัวอักษร");
              onRegister(form);
            }}
          >
            <Input
              label="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              placeholder="example@email.com"
            />
            <Input
              label="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
            <Input
              label="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <Input
              label="Confirm Password"
              type="password"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              required
            />
            <Button type="submit" variant="success" className="w-full mt-4">
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
