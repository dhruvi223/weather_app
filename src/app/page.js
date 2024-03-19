import Image from "next/image";
import FetchData from "./components/FetchData";
import { Toaster, toast } from "react-hot-toast";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Toaster />
      <FetchData />
    </main>
  );
}
