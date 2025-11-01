import type {AvailableDisplay} from "../components/navbar/DisplayHandle";

export interface PanelParams {
    id: string;
}

export function displayToParams(display: AvailableDisplay): PanelParams {
    return { id: display.id }
}