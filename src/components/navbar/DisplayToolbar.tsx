import {type ReactNode, useMemo, useState} from "react";
import {DisplayHandle} from "./DisplayHandle";
import {useAtomValue} from "jotai";
import {availableDisplaysAtom} from "../../lib/state";
import Fuse from "fuse.js";

export default function DisplayToolbar(): ReactNode {
    const [searchQuery, setSearchQuery] = useState("")
    const availableDisplays = useAtomValue(availableDisplaysAtom)

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
                    <svg className="size-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
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
            </>
        )
    }
}

