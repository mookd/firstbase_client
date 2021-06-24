import React from "react";

export default function Header(props: {pageName: string} ) {
  return (
    <header className="header">
      {props && props.pageName}
    </header>
  );
}
