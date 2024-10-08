"use client";

import { Pill } from "@/components/ui/pill";
import { BLOCKSCOUT_BASE_URL } from "@/constants/links";
import apiClient from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

export default function YourSubmissions({ round }: { round: number }) {
  return (
    <div className="flex max-h-32 flex-wrap gap-1 overflow-auto">
      <MappedPills round={round} />
    </div>
  );
}

function MappedPills({ round }: { round: number }) {
  const { address } = useAccount();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["user-submissions", address, round],
    queryFn: () => apiClient.getUserRoundSubmissions(address!, round),
    enabled: !!address,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Pill variant="outline">Loading...</Pill>;
  if (!isSuccess) return <Pill variant="outline">n/a</Pill>;

  return data.submissions.items.map((sub) => (
    <a href={`${BLOCKSCOUT_BASE_URL}tx/${sub.txnHash}/`} target="_blank" key={sub.txnHash}>
      <Pill variant="outline">{Number(sub.entry).toLocaleString()}</Pill>
    </a>
  ));
}
