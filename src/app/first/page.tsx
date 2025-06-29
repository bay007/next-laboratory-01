/* eslint-disable @next/next/no-img-element */
"use client";

import { FloatingInput, FloatingLabel } from "@/components/ui/floatLabel";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useSnapshot } from "valtio";
import Upload from "./input/upload";
import { state } from "./store";

type ApiFile = {
  filename: string;
  content: string /* base64 */;
  mimeType: string;
};

type Inputs = {
  name: string;
  email: string;
  files: { file: File }[]; // Array of files, each with a 'file' property
};

function base64ToFile(
  base64: string,
  filename: string,
  mimeType: string
): File {
  const byteString = atob(base64.split(",")[1] ?? base64);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
  return new File([ab], filename, { type: mimeType });
}

const mockFetchUserData = (): Promise<Inputs> => {
  console.log("Fetching user data...");
  return new Promise((resolve) => {
    // response ApiFile
    const files: ApiFile[] = [
      {
        filename: "image.png",
        content:
          "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAANSURBVBhXY1ixYsV/AAbsAvgqpqzfAAAAAElFTkSuQmCC", // Base64 for a small PNG image
        mimeType: "image/png",
      },
    ];

    setTimeout(() => {
      const mockData: Inputs = {
        name: "Goku Son",
        email: "goku.son@capsulecorp.com",
        // Proporcionamos datos para el array de archivos, que 'Upload' renderizará.
        files: files.map((f) => ({
          file: base64ToFile(f.content, f.filename, f.mimeType),
        })),
      };
      console.log("Data fetched!", mockData);
      resolve(mockData);
    }, 1500);
  });
};

export default function App() {
  const snap = useSnapshot(state);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(true);
  const methods = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log({ data });

  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await mockFetchUserData();
        // 'reset' es el método de react-hook-form para poblar el formulario.
        methods.reset(userData);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      } finally {
        // Oculta el indicador de carga cuando los datos se han cargado (o si hubo un error).
        setIsLoading(false);
      }
    };

    loadData();
    // El array vacío [] asegura que este efecto se ejecute solo una vez al montar el componente.
  }, [methods]);

  return (
    <>
      <div>
        <div>
          Counter <div>{snap.count} </div>{" "}
          <button
            className="my-1 border w-full"
            onClick={() => (state.count += 1)}
          >
            +
          </button>
          <button
            className="my-1 border w-full"
            onClick={() => (state.count -= 1)}
          >
            -
          </button>
        </div>
        <div>
          <img src="https://picsum.photos/180/140" alt="Random" />
        </div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="mt-15">
            <div className="my-2">
              <div className="relative">
                <FloatingLabel htmlFor="floating-name">Name</FloatingLabel>
                <FloatingInput
                  id="floating-name"
                  {...methods.register("name")}
                />
              </div>
            </div>

            <div className="my-2">
              <div className="relative">
                <FloatingLabel htmlFor="floating-email">Email</FloatingLabel>
                <FloatingInput
                  id="floating-email"
                  type="email"
                  {...methods.register("email")}
                />
              </div>
            </div>
            {/* errors will return when field validation fails  */}
            {methods.formState.errors.name && (
              <span className="text-pink-900">This field is required</span>
            )}
            <div className="my-2">
              <Upload />
            </div>
            <Input className="cursor-pointer" type="submit" />
          </form>
        </FormProvider>
      </div>
    </>
  );
}
