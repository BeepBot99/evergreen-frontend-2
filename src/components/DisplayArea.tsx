import {evergreen} from "../lib/theme.ts";
import {
    DockviewReact,
    type IDockviewPanelProps
} from "dockview-react";
import EmptyDisplayScreen from "./EmptyDisplayScreen.tsx";
import {type FunctionComponent, useMemo} from "react";
import {useDefaultDisplays, useDockview, useGetAvailableDisplay} from "../lib/hooks.ts";
import type {PanelParams} from "../lib/params";

function Display({params, api}: IDockviewPanelProps<PanelParams>) {
    const getAvailableDisplay = useGetAvailableDisplay();

    const display = getAvailableDisplay(params.id)
    if (!display) {
        api.close()
        return null
    }
    return <display.component/>
}

export default function DisplayArea() {

    const components: { display: FunctionComponent<IDockviewPanelProps<PanelParams>> } = useMemo(() => ({
        display: Display
    }), [])

    const onReady = useDockview();

    // TODO: remove this
    useDefaultDisplays();

    return (
        <DockviewReact theme={evergreen}
                       components={components}
                       onReady={onReady}
                       watermarkComponent={EmptyDisplayScreen}/>

    )
}