import React from 'react'
import './dock.css'

function Dock(){
    return (
        <div class="dock-background">
            <div class="dock-buttons">
                <div class="dock-text">🎵 Raining</div>
                <div class="dock-button toggle-play">▶️</div>
                <div class="dock-button toggle-volume">🔊</div>
            </div>
        </div>
    )
}

export default Dock;