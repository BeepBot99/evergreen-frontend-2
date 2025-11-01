import {useSetImmerAtom} from "jotai-immer";
import {availableDisplaysAtom} from "./state";
import {useEffect} from "react";
import OpModeSelector from "../components/OpModeSelector";

export function useDefaultDisplays() {
    const setAvailableDisplays = useSetImmerAtom(availableDisplaysAtom)
    useEffect(() => {
        setAvailableDisplays(draft => {
            draft.push(
                {
                    id: "1",
                    name: "Spindexer",
                    used: false,
                    component: () => "spindexer is working"
                },
                {
                    id: "2",
                    name: "Intake",
                    used: false,
                    component: () => "intake is working"
                },
                {
                    id: "3",
                    name: "Shooter",
                    used: false,
                    component: () => "shooter is working"
                },
                {
                    id: "4",
                    name: "PedroPathing",
                    used: false,
                    component: () => "robot is on path"
                },
                {
                    id: "5",
                    name: "OpModes",
                    used: false,
                    component: OpModeSelector
                }
            );
        });
        return () => {
            setAvailableDisplays(draft => {
                draft.splice(0, draft.length);
            })
        }
    }, [setAvailableDisplays]);
}