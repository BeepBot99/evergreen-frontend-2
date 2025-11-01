import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import 'dockview-react/dist/styles/dockview.css'
import App from './App.tsx'
import { MotionConfig } from "motion/react"

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MotionConfig reducedMotion="user">
            <App/>
        </MotionConfig>
    </StrictMode>,
)
