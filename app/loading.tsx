"use client";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface ILoadingProps {
  loading: boolean;
}

const override = {
  display: "block",
  margin: "100px auto",
};

const Loading = ({ loading }: ILoadingProps) => {
  return (
    <ClipLoader
      color="#3b82f6"
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  );
};

export default Loading;
