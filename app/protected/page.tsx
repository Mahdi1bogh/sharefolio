import { getUserPortfolio } from "./actions";

export default async function ProtectedPage() {
  await getUserPortfolio();
}
