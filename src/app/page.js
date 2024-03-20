import Image from "next/image";
import FetchData from "./components/FetchData";
import { Toaster, toast } from "react-hot-toast";
const session = null;

export default function Home() {
  // if (!session) throw Error('error')
  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
      <Toaster />
      <FetchData />
    </main>
  );
}
