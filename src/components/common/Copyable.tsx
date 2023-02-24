import React, { ReactNode, useState } from "react";

type CopyState = "copy" | "copied" | "errored";

export function Copyable({
  text,
  children,
  replaceText,
}: {
  text: string;
  children: ReactNode;
  replaceText?: boolean;
}) {
  const [state, setState] = useState<CopyState>("copy");

  const handleClick = async () => {
    try {
      await copyToClipboard(text);
      setState("copied");
    } catch (err) {
      setState("errored");
    }
    setTimeout(() => setState("copy"), 1000);
  };

  function CopyIcon() {
    if (state === "copy") {
      return (
        <span className="fe fe-copy c-pointer" onClick={handleClick}></span>
      );
    } else if (state === "copied") {
      return <span className="fe fe-check-circle"></span>;
    } else if (state === "errored") {
      return (
        <span
          className="fe fe-x-circle"
          title="Please check your browser's copy permissions."
        ></span>
      );
    }
    return null;
  }

  let message: string | undefined;
  let textColor = "";
  if (state === "copied") {
    message = "Copied";
    textColor = "text-info";
  } else if (state === "errored") {
    message = "Copy Failed";
    textColor = "text-danger";
  }

  function PrependCopyIcon() {
    return (
      <>
        <span className="font-size-tiny me-2">
          <span className={textColor}>
            {message !== undefined && <span className="me-2">{message}</span>}
            <CopyIcon />
          </span>
        </span>
        {children}
      </>
    );
  }

  function ReplaceWithMessage() {
    return (
      <span className="d-flex flex-column flex-nowrap">
        <span className="font-size-tiny">
          <span className={textColor}>
            <CopyIcon />
            <span className="ms-2">{message}</span>
          </span>
        </span>
        <span className="v-hidden">{children}</span>
      </span>
    );
  }

  if (state === "copy") {
    return <PrependCopyIcon />;
  } else if (replaceText) {
    return <ReplaceWithMessage />;
  }

  return (
    <>
      <span className="d-none d-lg-inline">
        <PrependCopyIcon />
      </span>
      <span className="d-inline d-lg-none">
        <ReplaceWithMessage />
      </span>
    </>
  );
}

// See: https://stackoverflow.com/questions/51805395/navigator-clipboard-is-undefined
function copyToClipboard(textToCopy: string) {
    // navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
      // navigator clipboard api method
      return navigator.clipboard.writeText(textToCopy);
    } else {
      // text area method
      let textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      // make the textarea out of viewport
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      return new Promise((res, rej) => {
        // here the magic happens
        document.execCommand("copy") ? res(undefined) : rej();
      }).finally(() => {
        textArea.remove();
      });
    }
}