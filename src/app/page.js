import Image from "next/image";
import FetchData from "./components/FetchData";
import ForcastData from "./components/ForcastData";


export default function Home() {

  const [location, setLocation] = useState()
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <FetchData />
     <ForcastData/>
    </main>
  );
}

