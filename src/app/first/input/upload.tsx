"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";

export default function Upload() {
  const { register, control } = useFormContext();
  const files = useWatch({ name: "files", control }) || [];

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
              {/* Aquí mostramos el nombre del archivo que esté en el estado */}
              {files[index]?.file instanceof File && (
                <span className="ml-2 text-gray-700">
                  {files[index].file.name}
                </span>
              )}
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
