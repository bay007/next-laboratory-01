"use client";

import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export default function Upload() {
  const { register } = useFormContext(); // retrieve all hook methods

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-sm font-bold mb-4">Upload Component</div>
      <Input
        {...register("file")}
        type="file"
        className="border border-gray-300 rounded p-2 cursor-pointer"
        accept=".jpg, .jpeg, .png, .gif"
      />
    </div>
  );
}
