/* eslint-disable @next/next/no-img-element */
"use client";

import { FloatingInput, FloatingLabel } from "@/components/ui/floatLabel";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSnapshot } from "valtio";
import { state } from "./store";

type Inputs = {
  example: string;
  name: string;
};

export default function App() {
  const snap = useSnapshot(state);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
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
      <form onSubmit={handleSubmit(onSubmit)} className="mt-15">
        <Input placeholder="name" {...register("name", { required: true })} />
        <Input type="email" placeholder="Email" {...register("example")} />

        <div className="my-1">
          <div className="relative">
            <FloatingInput
              id="floating-customize"
              className="transition-transform transform focus:scale-98 hover:scale-95"
            />
            <FloatingLabel htmlFor="floating-customize">
              Customize
            </FloatingLabel>
          </div>
        </div>

        <div className="my-1">
          <div className="relative">
            <FloatingInput id="floating-customize" />
            <FloatingLabel htmlFor="floating-customize">
              Customize
            </FloatingLabel>
          </div>
        </div>
        {/* errors will return when field validation fails  */}
        {errors.name && (
          <span className="text-pink-900">This field is required</span>
        )}

        <Input className="cursor-pointer" type="submit" />
      </form>
    </div>
  );
}
