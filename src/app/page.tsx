import { ExecutiveDashboard } from "@/components/dashboard/ExecutiveDashboard";
import { executiveDemoData } from "@/data/demo/executive-demo";

export default function Home() {
  return <ExecutiveDashboard data={executiveDemoData} />;
}
