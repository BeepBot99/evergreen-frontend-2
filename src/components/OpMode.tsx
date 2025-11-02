import clsx from "clsx";
import {Bot, Gamepad2, Play, Star} from "lucide-react";

export type OpModeType = "teleop" | "autonomous";

export type OpModeData = Readonly<{
    name: string,
    group: string,
    type: OpModeType,
    starred: boolean
}>

export default function OpMode({data: {name, group, type, starred}, setStarred}: {
    data: OpModeData,
    setStarred: (starred: boolean) => void
}) {

    function toggleStarred() {
        setStarred(!starred);
    }

    return (
        <li className="list-row">
            <div>
                {type === "autonomous" ? <Bot className="size-8"/> : <Gamepad2 className="size-8"/>}
            </div>
            <div>
                <div>{name}</div>
                <div className="text-xs uppercase font-semibold opacity-60">{group}</div>
            </div>
            <button type="button" className="btn btn-square btn-ghost" aria-label="Start OpMode">
                <Play/>
            </button>
            <button onClick={toggleStarred} type="button"
                    className={clsx("btn", "btn-square", "btn-ghost", starred && "text-secondary")}
                    aria-label="Pin OpMode">
                {starred ? <Star fill="currentColor"/> : <Star/>}
            </button>
        </li>
    );
}