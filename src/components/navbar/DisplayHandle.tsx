import clsx from "clsx";
import type {FunctionComponent} from "react";
import {Grip} from "lucide-react";

export interface AvailableDisplay {
    id: string,
    name: string,
    used: boolean,
    component: FunctionComponent
}

export function DisplayHandle({display}: { display: AvailableDisplay }) {
    return (
        <div draggable={true} onDragStart={event => {
            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.setData("text/plain", display.id);
        }} className={clsx("btn btn-neutral cursor-grab flex items-center", display.used && "opacity-25")}>
            <Grip className="size-5"/>
            {display.name}
        </div>
    )
}