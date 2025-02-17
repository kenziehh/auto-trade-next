import React from "react";
import { ReactQueryProvider } from "./react-query-provider";
import ProgressBar from "./progress-bar";

export default function MainProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <ProgressBar />
      {children}
    </ReactQueryProvider>
  );
}
