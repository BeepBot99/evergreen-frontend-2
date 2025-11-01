import clsx from "clsx";
import type {FunctionComponent} from "react";

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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            {display.name}
        </div>
    )
}