import React from "react";

export default function ErrorMessage(props: { message:string }) {
  const { message } = props;
  if (message !== '') {
    return (
      <div className="w-full text-center text-sm">{message}</div>
      );
  } return (
    <div className="h-3vh" />
  );
}