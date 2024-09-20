"use client";

import { numSchema } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api";

import NotFound from "@/app/not-found";
import LoadingPage from "./_pages/loading";
import PastRoundPage from "./_pages/past-round";
import ActiveRoundPage from "./_pages/active-round";

export default function Page({ params }: { params: { num: string } }) {
  const round = numSchema.parse(params.num);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["round", round],
    queryFn: () => apiClient.getRound(round),
  });

  if (isLoading) return <LoadingPage />;
  if (!isSuccess) return <NotFound />;

  switch (data.roundState) {
    case "active":
      return <ActiveRoundPage data={data} />;
    case "past":
      return <PastRoundPage data={data} />;
    default:
      return <>alt</>;
  }
}
