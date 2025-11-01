import {atom, type PrimitiveAtom, useAtomValue} from "jotai";
import type {Toolbar} from "../components/navbar/Navbar";
import type {AvailableDisplay} from "../components/navbar/DisplayHandle";

export const toolbarAtom: PrimitiveAtom<Toolbar> = atom<Toolbar>(null);

export const availableDisplaysAtom: PrimitiveAtom<AvailableDisplay[]> = atom<AvailableDisplay[]>([]);

export function useGetAvailableDisplay() {
    const availableDisplays = useAtomValue(availableDisplaysAtom)
    return (id: string) => availableDisplays.find(it => it.id === id)
}