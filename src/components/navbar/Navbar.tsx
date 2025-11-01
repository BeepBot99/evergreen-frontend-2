import Toolbars from "./Toolbars";
import ThemeController from "./ThemeController";
import {useAtom} from "jotai";
import {toolbarAtom} from "../../lib/state";

export type Toolbar = "displays" | "views" | null;

export default function Navbar() {
    const [toolbar, setToolbar] = useAtom(toolbarAtom)

    return (
        <div className="px-3 pt-3">
            <nav className="navbar bg-base-200 rounded-box">
                <div className="btn btn-ghost text-xl gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-6 text-primary" viewBox="0 0 14 14">
                        <path fill="currentColor" fillRule="evenodd"
                              d="M6.888.288a.25.25 0 0 1 .223 0c1.734.864 3.303 2.424 4.154 4.202a.63.63 0 0 1-.083.678a.8.8 0 0 1-.625.285h-.512c-.14 0-.231.07-.27.144c-.038.07-.036.151.03.226c.947 1.05 1.61 2.002 2.478 3.498c.263.453-.06.943-.533 1.026a28 28 0 0 1-3.812.408c-.077.003-.133.074-.133.15v2.283a.75.75 0 0 1-1.5 0v-2.282c0-.075-.054-.145-.13-.147a28 28 0 0 1-3.926-.412c-.472-.083-.796-.573-.533-1.026c.869-1.496 1.531-2.448 2.478-3.498c.067-.075.069-.156.03-.226c-.039-.074-.13-.144-.27-.144h-.512a.8.8 0 0 1-.625-.285a.63.63 0 0 1-.083-.678c.851-1.778 2.42-3.338 4.154-4.202"
                              clipRule="evenodd"/>
                    </svg>
                    Evergreen
                </div>
                <div className="flex-1 flex justify-center">
                    {toolbar === "displays" ?
                        <button type="button" className="btn btn-neutral m-1" onClick={() => {
                            setToolbar(null);
                        }}>
                            Displays
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="size-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5"/>
                            </svg>
                        </button> :
                        <button type="button" className="btn m-1" onClick={() => {
                            setToolbar("displays");
                        }}>
                            Displays
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="size-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                            </svg>
                        </button>}
                    {toolbar === "views" ?
                        <button type="button" className="btn btn-neutral m-1" onClick={() => {
                            setToolbar(null);
                        }}>
                            Views
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="size-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5"/>
                            </svg>
                        </button> :
                        <button type="button" className="btn m-1" onClick={() => {
                            setToolbar("views");
                        }}>
                            Views
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="size-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                            </svg>
                        </button>}
                </div>
                <ThemeController/>
            </nav>
            <Toolbars/>
        </div>
    );
}