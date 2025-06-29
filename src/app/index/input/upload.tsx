"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function Upload() {
  const { register, control } = useFormContext(); // retrieve all hook methods

  const { fields, append, remove } = useFieldArray({
    name: "files",
    control,
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="text-sm font-bold mb-4">Upload Component</div>
        {fields.map((field, index) => {
          return (
            <div key={field.id} className="flex items-center mb mt-2 add">
              <Input
                {...register(`files.${index}.file`)}
                type="file"
                className="border border-gray-300 rounded p-2 cursor-pointer"
                accept=".jpg, .jpeg, .png, .gif"
              />
              <Button type="button" onClick={() => remove(index)} className="">
                X
              </Button>
            </div>
          );
        })}
      </div>
      <Button
        type="button"
        onClick={() =>
          append({
            file: null,
          })
        }
      >
        Add new File
      </Button>
    </>
  );
}
