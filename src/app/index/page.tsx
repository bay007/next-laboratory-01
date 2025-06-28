/* eslint-disable @next/next/no-img-element */
"use client";

import { FloatingInput, FloatingLabel } from "@/components/ui/floatLabel";
import { Input } from "@/components/ui/input";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useSnapshot } from "valtio";
import Upload from "./input/upload";
import { state } from "./store";

type Inputs = {
  name: string;
  email: string;
  file: FileList | null;
};

export default function App() {
  const snap = useSnapshot(state);

  const methods = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log({ data });

  return (
    <>
      <div>
        <div>
          Counter <div>{snap.count} </div>{" "}
          <button
            className="my-1 border w-full transition-transform transform active:scale-98 hover:scale-95"
            onClick={() => (state.count += 1)}
          >
            +
          </button>
          <button
            className="my-1 border w-full transition-transform transform active:scale-98 hover:scale-95"
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
