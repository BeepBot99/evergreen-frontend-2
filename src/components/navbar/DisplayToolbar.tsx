import {type ReactNode, useMemo, useState} from "react";
import {DisplayHandle} from "./DisplayHandle";
import {useAtom, useAtomValue} from "jotai";
import {availableDisplaysAtom, dndTipDismissedAtom} from "../../lib/state";
import Fuse from "fuse.js";
import {Search, X} from "lucide-react";

export default function DisplayToolbar(): ReactNode {
    const [searchQuery, setSearchQuery] = useState("")
    const availableDisplays = useAtomValue(availableDisplaysAtom)
    const [dndTipDismissed, setDndTipDismissed] = useAtom(dndTipDismissedAtom)

    const fuse = useMemo(() => new Fuse(availableDisplays, {
        keys: ["name"],
        findAllMatches: true,
        threshold: 0.4,

    }), [availableDisplays])

    const searchResults = searchQuery ? fuse.search(searchQuery).map(it => it.item) : availableDisplays;

    if (availableDisplays.length === 0) {
        return "No Displays Available."
    } else {
        return (
            <>
                <label className="input w-full text-base-content">
                    <Search opacity={0.5} className="size-4"/>
                    <input type="search" placeholder="Search" value={searchQuery} onChange={e => {
                        setSearchQuery(e.target.value)
                    }}/>
                </label>

                <div className="flex gap-2">
                    {searchResults.map(display => (
                            <DisplayHandle display={display} key={display.id}/>
                        )
                    )}
                </div>

                {!dndTipDismissed &&
                  <div className="toast toast-top toast-end">
                    <div className="alert alert-info">
                      Drag and drop a display to get started.
                      <button onClick={() => { setDndTipDismissed(true); }} className="btn btn-ghost btn-xs" type="button" aria-label="Dismiss">
                        <X className="size-4"/>
                      </button>
                    </div>
                  </div>}
            </>
        )
    }
}

