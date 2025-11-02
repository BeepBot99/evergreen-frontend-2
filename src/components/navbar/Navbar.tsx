import Toolbars from "./Toolbars";
import ThemeController from "./ThemeController";
import {useAtom} from "jotai";
import {toolbarAtom} from "../../lib/state";
import {ChevronDown, ChevronUp, TreePine} from "lucide-react";

export type Toolbar = "displays" | "views" | null;

export default function Navbar() {
    const [toolbar, setToolbar] = useAtom(toolbarAtom)

    return (
        <div className="px-3 pt-3">
            <nav className="navbar bg-base-200 rounded-box">
                <div className="btn btn-ghost text-xl gap-2 items-center">
                    <TreePine fill="currentColor" className="text-primary"/>
                    Evergreen
                </div>
                <div className="flex-1 flex justify-center">
                    {toolbar === "displays" ?
                        <button type="button" className="btn btn-neutral m-1" onClick={() => {
                            setToolbar(null);
                        }}>
                            Displays
                            <ChevronUp className="size-3"/>
                        </button> :
                        <button type="button" className="btn m-1" onClick={() => {
                            setToolbar("displays");
                        }}>
                            Displays
                            <ChevronDown className="size-3"/>
                        </button>}
                    {toolbar === "views" ?
                        <button type="button" className="btn btn-neutral m-1" onClick={() => {
                            setToolbar(null);
                        }}>
                            Views
                            <ChevronUp className="size-3"/>
                        </button> :
                        <button type="button" className="btn m-1" onClick={() => {
                            setToolbar("views");
                        }}>
                            Views
                            <ChevronDown className="size-3"/>
                        </button>}
                </div>
                <ThemeController/>
            </nav>
            <Toolbars/>
        </div>
    );
}