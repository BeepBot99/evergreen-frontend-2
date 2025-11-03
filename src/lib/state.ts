import {atom, type PrimitiveAtom} from "jotai";
import {atomWithStorage} from "jotai/utils";
import type {Toolbar} from "../components/navbar/Navbar";
import type {AvailableDisplay} from "../components/navbar/DisplayHandle";
import type {SerializedDockview} from "dockview-react";

export const toolbarAtom: PrimitiveAtom<Toolbar> = atomWithStorage<Toolbar>("toolbar", null);

export const availableDisplaysAtom: PrimitiveAtom<AvailableDisplay[]> = atom<AvailableDisplay[]>([]);

const layoutStringAtom = atomWithStorage<string | null>("layout", null)
export const layoutAtom = atom(
    get => {
        const layoutString = get(layoutStringAtom)
        try {
            if (layoutString) return JSON.parse(layoutString) as SerializedDockview
        } catch (e) {
            console.error(e)
        }
        return null
    },
    (_get, set, layout: SerializedDockview) => {
        set(layoutStringAtom, JSON.stringify(layout))
    }
)

export const dndTipDismissedAtom = atomWithStorage("dnd-tip-dismissed", false)
