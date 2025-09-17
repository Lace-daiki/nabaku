import { redirect, notFound } from "next/navigation";

export default function FundraiserEntry({ params }) {
  const { id } = params;

  // List of valid IDs (expand when more pages are added)
  const validIds = ["1", "2"];

  if (!validIds.includes(id)) {
    return notFound();
  }

  // Redirect to correct design page
  redirect(`/search/${id}/`);
}
