import {toolbarAtom} from "../lib/state.ts";
import {useSetAtom} from "jotai";

export default function EmptyDisplayScreen() {
    const setToolbar = useSetAtom(toolbarAtom)

    return (
        <div className="flex items-center justify-center h-full bg-base-200 rounded-2xl">
            <div className="card card-border border-base-300 bg-base-100">
                <div className="card-body">
                    <h2 className="card-title text-center block">No Displays (yet)</h2>
                    <div className="card-actions justify-center mt-4">
                        <button onClick={() => { setToolbar("displays"); }} type="button" className="btn btn-primary">Add Display</button>
                    </div>
                </div>
            </div>
        </div>
    )
}