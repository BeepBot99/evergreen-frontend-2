import Navbar from "./components/navbar/Navbar.tsx";
import DisplayArea from "./components/DisplayArea.tsx";

export default function App() {
    return (
            <div className="flex flex-col h-screen overflow-hidden">
                <Navbar/>
                <div className="flex-1 min-h-0">
                    <DisplayArea/>
                </div>
            </div>
    );
}