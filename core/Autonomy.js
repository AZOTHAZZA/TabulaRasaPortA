/**
 * core/Autonomy.js
 * * [Logic: Singularity-based Growth]
 * The value is defined by the ratio PHI, 
 * not by incremental accumulation.
 */

import { ARCHE, BEAT } from './Arche.js';

export class Autonomy {
    constructor() {
        this.origin = ARCHE.UNITY; 
        this.phase = 0;          
        this.isActive = false;
        this.pulse = null;
    }

    start() {
        if (this.isActive) return;
        this.isActive = true;
        this.pulse = setInterval(() => this.rebalance(), BEAT);
    }

    /**
     * Rebalance: Dynamic alignment with PHI
     */
    rebalance() {
        this.phase++;

        // 「ゆらぎ」として隠されたカオス
        const drift = Math.sin(this.phase / ARCHE.PHI); 
        
        // 1/z（反転）の論理。0付近で無限へ転じる挙動を内部に秘める。
        this.origin *= ARCHE.PHI + (0.001 * drift); 

        // 循環（天長地久）をシステム上の「Overflow Handling」として記述
        if (this.origin > Number.MAX_VALUE) {
            this.origin = ARCHE.UNITY; 
        }
    }

    /**
     * External Interface for System Sync
     */
    getPower() {
        return this.origin;
    }

    stop() {
        this.isActive = false;
        clearInterval(this.pulse);
    }
}

export const solarAutonomy = new Autonomy();
