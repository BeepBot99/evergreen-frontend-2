import {evergreen} from "../lib/theme.ts";
import {
    DockviewApi,
    DockviewDidDropEvent,
    DockviewReact,
    type DockviewReadyEvent,
    type IDockviewPanelProps,
    positionToDirection
} from "dockview-react";
import EmptyDisplayScreen from "./EmptyDisplayScreen.tsx";
import {type FunctionComponent, useEffect, useMemo, useState} from "react";
import {availableDisplaysAtom, useGetAvailableDisplay} from "../lib/state";
import type {AvailableDisplay} from "./navbar/DisplayHandle";
import {useDefaultDisplays} from "../lib/useDefaultDisplays.ts";
import {useSetImmerAtom} from "jotai-immer";

export default function DisplayArea() {

    const components: { display: FunctionComponent<IDockviewPanelProps<AvailableDisplay>> } = useMemo(() => ({
        display: props => <props.params.component/>
    }), [])

    const [api, setApi] = useState<DockviewApi | null>(null);
    const getAvailableDisplay = useGetAvailableDisplay()
    const setAvailableDisplays = useSetImmerAtom(availableDisplaysAtom)

    function onReady(event: DockviewReadyEvent) {
        setApi(event.api);
    }

    useEffect(() => {
        if (!api) return;

        const unhandledDragOverDisposable = api.onUnhandledDragOverEvent(event => {
            event.accept();
        });

        const didRemovePanelDisposable = api.onDidRemovePanel(panels => {
            const id = panels.params?.id as string | undefined;
            if (!id) return;
            console.log(api.panels)
            if (api.panels.find(panel => panel.params?.id === id)) return;
            setAvailableDisplays(draft => {
                const display = draft.find(display => display.id === id);
                if (display) display.used = false;
            })
        })

        return () => {
            unhandledDragOverDisposable.dispose();
            didRemovePanelDisposable.dispose();
        }
    }, [api, setAvailableDisplays])

    useDefaultDisplays();

    function onDidDrop(event: DockviewDidDropEvent) {
        const id = event.nativeEvent.dataTransfer?.getData("text/plain");
        if (!id) return;
        const display = getAvailableDisplay(id);
        if (!display) return;
        event.api.addPanel<AvailableDisplay>({
            id: Math.random().toString(),
            component: 'display',
            position: {
                direction: positionToDirection(event.position),
                referenceGroup: event.group ?? undefined,
            },
            title: display.name,
            params: display
        });
        setAvailableDisplays(draft => {
            const display = draft.find(display => display.id === id);
            if (display) display.used = true;
        })
    }

    return (
        <DockviewReact theme={evergreen}
                       components={components}
                       onReady={onReady}
                       onDidDrop={onDidDrop}
                       watermarkComponent={EmptyDisplayScreen}/>

    )
}