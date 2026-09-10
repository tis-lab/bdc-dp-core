import type { DatasetAccessResult } from "../types/authorization";

export async function checkDatasetAccess(
  datasetIds: string[],
): Promise<DatasetAccessResult[]> {
  const response = await fetch("/api/authorization/check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      datasetIds,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to check dataset access");
  }

  return response.json();
}
