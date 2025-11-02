import {useSetImmerAtom} from "jotai-immer";
import {availableDisplaysAtom, dndTipDismissedAtom, layoutAtom} from "./state";
import {useCallback, useEffect, useState} from "react";
import OpModeSelector from "../components/OpModeSelector";
import {DockviewApi, type DockviewIDisposable, type DockviewReadyEvent, positionToDirection} from "dockview-react";
import * as uuid from "uuid";
import {displayToParams, type PanelParams} from "./params";
import {useAtom, useAtomValue, useSetAtom} from "jotai";

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

export function useGetAvailableDisplay() {
    const availableDisplays = useAtomValue(availableDisplaysAtom)
    return (id: string) => availableDisplays.find(it => it.id === id)
}

export function useDockview() {
    const [api, setApi] = useState<DockviewApi | null>(null);
    const getAvailableDisplay = useGetAvailableDisplay()
    const setAvailableDisplays = useSetImmerAtom(availableDisplaysAtom)
    const [layout, setLayout] = useAtom(layoutAtom)
    const setDndTipDismissed = useSetAtom(dndTipDismissedAtom)

    useEffect(() => {
        if (!api) return;

        if (layout) api.fromJSON(layout);

        const disposables: DockviewIDisposable[] = []

        disposables.push(
            api.onUnhandledDragOverEvent(event => {
                event.accept();
            })
        )

        disposables.push(
            api.onDidRemovePanel(panels => {
                const id = panels.params?.id as string | undefined;
                if (!id) return;
                console.log(api.panels)
                if (api.panels.find(panel => panel.params?.id === id)) return;
                setAvailableDisplays(draft => {
                    const display = draft.find(display => display.id === id);
                    if (display) display.used = false;
                })
            })
        )

        disposables.push(
            api.onDidDrop(event => {
                const id = event.nativeEvent.dataTransfer?.getData("text/plain");
                if (!id) return;
                const display = getAvailableDisplay(id);
                if (!display) return;
                event.api.addPanel<PanelParams>({
                    id: uuid.v4(),
                    component: 'display',
                    position: {
                        direction: positionToDirection(event.position),
                        referenceGroup: event.group ?? undefined,
                    },
                    title: display.name,
                    params: displayToParams(display)
                });
                setAvailableDisplays(draft => {
                    const display = draft.find(display => display.id === id);
                    if (display) display.used = true;
                })
            })
        )

        disposables.push(
            api.onDidLayoutChange(() => {
                setLayout(api.toJSON());
            })
        )

        disposables.push(
            api.onDidAddPanel(() => {
                setLayout(api.toJSON());
                setDndTipDismissed(true);
            })
        )

        return () => {
            disposables.forEach(disposable => { disposable.dispose(); });
        }
    }, [api, getAvailableDisplay, layout, setAvailableDisplays, setDndTipDismissed, setLayout])

    return useCallback((event: DockviewReadyEvent) => {
        setApi(event.api);
    }, [])
}