import {AnimatePresence, motion, useReducedMotion} from "motion/react";
import DisplayToolbar from "./DisplayToolbar.tsx";
import {useAtomValue} from "jotai";
import {toolbarAtom} from "../../lib/state";

export default function Toolbars() {
    const toolbar = useAtomValue(toolbarAtom)
    const reducedMotion = useReducedMotion();

    return (
        <AnimatePresence mode="wait">
            {toolbar &&
              <motion.div
                          variants={{
                              collapsed: {height: 0, marginTop: 0, paddingTop: 0, paddingBottom: 0},
                              open: {height: 72, marginTop: 12, paddingTop: 12, paddingBottom: 12}
                          }}
                          initial="collapsed"
                          animate="open"
                          exit="collapsed"
                          transition={{duration: reducedMotion ? 0 : 0.25, ease: "easeInOut"}}
                          className="alert alert-success alert-outline overflow-hidden min-h-0">
                  {toolbar === "displays" && <DisplayToolbar/>}
                  {toolbar === "views" && "todo"}
              </motion.div>}
        </AnimatePresence>
    )
}