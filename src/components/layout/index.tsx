import type { PropsWithChildren } from "react";
import MainHeader from "../Header";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="layout">
      <MainHeader />
      <div className="content">
        <div>{children}</div>
      </div>
    </div>
  );
};
