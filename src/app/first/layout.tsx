import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="w-fulll md:w-3/4 mx-auto p-12">{children}</div>
    </>
  );
}
