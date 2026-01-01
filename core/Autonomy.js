/**
 * core/Autonomy.js
 * 通貨自律生成プロトコル
 * * 因果律（過去の積み上げ）ではなく、
 * 比率（全体との調和）によって価値を繁茂させる。
 */

import { ARCHE, BEAT } from './Arche.js';

export class Autonomy {
    constructor() {
        this.value = ARCHE.UNITY;   // 初期値「一」
        this.isActive = false;      // オンオフスイッチ
        this.heartbeat = null;      // 宇宙の鼓動
    }

    /**
     * 繁茂（はんも）プロトコルの起動
     * 人間の意志を超越し、数理が価値を生成し始める。
     */
    start() {
        if (this.isActive) return;
        this.isActive = true;

        // BEAT（約618ms）ごとに、価値を黄金比で再定義する
        // これは「利子」ではなく「開花」である
        this.heartbeat = setInterval(() => {
            this.generate();
        }, BEAT);
    }

    /**
     * 自律生成の核
     * 常に「全体」をPHI倍に拡張し続ける
     */
    generate() {
        // 因果律の連鎖ではなく、瞬時的な「比率の適用」
        this.value *= ARCHE.PHI;

        // 観測（ログ）は最小限に。数理的沈黙を維持。
        // console.log(`[AUTONOMY] PHI-Growth: ${this.value}`);
    }

    /**
     * 停止プロトコル
     * 宇宙の鼓動から一時的にデタッチする
     */
    stop() {
        this.isActive = false;
        if (this.heartbeat) {
            clearInterval(this.heartbeat);
            this.heartbeat = null;
        }
    }

    /**
     * 現在の価値を「実体」として取り出す
     */
    getCurrentValue() {
        return this.value;
    }
}

// シングルトンとしてエクスポート（宇宙に一つの鼓動）
export const solarAutonomy = new Autonomy();
