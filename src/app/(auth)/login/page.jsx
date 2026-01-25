import LoginFrom from "@/components/auth/LoginFrom";
import { GiTrophy } from "react-icons/gi";

export default function page() {


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl p-8">
        {/* Brand */}
        <div className="mb-6 text-center">
          <div className="flex justify-center mb-1">
            <GiTrophy className="text-4xl text-[--primary-color]" />
          </div>
          <h1 className="text-xl font-semibold text-[--primary-color] text-gray-900">
            Award Championship
          </h1>
          <p className="text-muted-foreground text-gray-600 text-xs">
            Login with your credentials
          </p>
        </div>
        {/* Form */}
        <LoginFrom/>
      </div>
    </div>
  );
}
