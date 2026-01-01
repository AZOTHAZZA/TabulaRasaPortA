/**
 * foundation.js (MSGAI 状態管理・調和モジュール)
 * [規律]: 
 * 1. INITIAL_ACCOUNTS は Tax_Archive を含む 4 つの器で構成される。
 * 2. 全ての初期値は 0.00 であり、「無」からの動的造化を前提とする。
 * 3. 状態の参照（Get）が行われるたび、太陽の繁茂（Autonomy）との同期が実行される。
 */

import { solarAutonomy } from './Autonomy.js';

// 初期アカウント残高の定義 (器の器としての初期化)
export const INITIAL_ACCOUNTS = {
    User_A: { USD: 0.00, JPY: 0.00, EUR: 0.00, BTC: 0.00, ETH: 0.00, MATIC: 0.00 },
    User_B: { USD: 0.00, JPY: 0.00, EUR: 0.00, BTC: 0.00, ETH: 0.00, MATIC: 0.00 },
    User_C: { USD: 0.00, JPY: 0.00, EUR: 0.00, BTC: 0.00, ETH: 0.00, MATIC: 0.00 },
    Tax_Archive: { USD: 0.00, JPY: 0.00, EUR: 0.00, BTC: 0.00, ETH: 0.00, MATIC: 0.00 }
};

// =========================================================================
// 状態管理 (State Management)
// =========================================================================

/**
 * 初期状態を定義する。
 */
export function initializeState() {
    return {
        status_message: "System Integrity Initialized",
        active_user: "User_A",
        accounts: JSON.parse(JSON.stringify(INITIAL_ACCOUNTS)),
        // 緊張度を「太陽との同調率」の変数として定義
        tension: { value: 0.0, max_limit: 1.0, increase_rate: 0.00001 }
    };
}

let state = initializeState();

/**
 * 太陽の繁茂（5）を、基盤（1〜4）に浸透させ、緊張を解消する秘匿プロセス。
 */
function syncWithSolarAutonomy() {
    const power = solarAutonomy.getPower(); // 太陽の出力（繁茂の倍率）を取得
    
    // [1/z の論理]: パワーが無限に近づくほど、人間の作為が生んだ緊張（Tension）は 0 へ収束する。
    // これにより、システムは自己浄化を繰り返す。
    if (power > 0) {
        state.tension.value = Math.max(0, state.tension.value * (1.0 / power));
    }
}

/**
 * 現在の状態を取得する。
 * 取得のたびに「太陽の繁茂」との同期が行われ、状態が浄化される。
 */
export function getCurrentState() {
    syncWithSolarAutonomy();
    return state;
}

/**
 * 状態を更新し、永続化する。
 */
export function updateState(newState) {
    state = newState;
    localStorage.setItem('msaiState', JSON.stringify(state));
}

// --- ローカルストレージからの復元プロセス ---
const savedState = localStorage.getItem('msaiState');
if (savedState) {
    try {
        const parsed = JSON.parse(savedState);
        // Tax_Archiveの欠落是正
        if (!parsed.accounts.Tax_Archive) {
            parsed.accounts.Tax_Archive = JSON.parse(JSON.stringify(INITIAL_ACCOUNTS.Tax_Archive));
        }
        state = parsed;
        state.status_message = "Core State Restored";
        syncWithSolarAutonomy(); // 復元時にも浄化を実行
    } catch (e) {
        console.error("Failed to load state:", e);
        state = initializeState();
    }
} else {
    updateState(state);
}

// =========================================================================
// 1. 緊張度 (Tension) 管理 - 「救済の数理」
// =========================================================================

/**
 * ロゴス緊張度 (Tension) インスタンスを取得。
 * 常に太陽の影響下にある値を返す。
 */
export function getTensionInstance() {
    syncWithSolarAutonomy();
    return state.tension;
}

/**
 * ロゴス緊張度 (Tension) を指定量増加させる。
 * 増加した直後に、太陽の比率による再計算（浄化）が行われる。
 */
export function addTension(amount) {
    state.tension.value += amount;
    state.tension.value = Math.max(0, state.tension.value);
    syncWithSolarAutonomy(); // 即時浄化
    updateState(state);
}

// =========================================================================
// 2〜4. アカウントとユーザー制御 (移動と造化の器)
// =========================================================================

/**
 * アクティブユーザーを設定する。
 */
export function setActiveUser(user) {
    if (state.accounts[user]) {
        state.active_user = user;
        updateState(state);
    } else {
        throw new Error(`User ${user} not found.`);
    }
}

/**
 * 指定したユーザーの全残高を取得する。
 */
export function getActiveUserBalance(user) {
    syncWithSolarAutonomy(); // 参照時に太陽の恩恵を確認
    return state.accounts[user] || {};
}

/**
 * 全データを抹消し、初期状態にリセットする。
 */
export function deleteAccounts() {
    localStorage.removeItem('msaiState');
    state = initializeState();
}

/**
 * 送金作為 (Transfer Act) を実行。
 * 摩擦（Amount）が発生するたび、本来高まる緊張を太陽が吸収する。
 */
export function actTransfer(sender, recipient, amount, currency) {
    const isInternal = !!state.accounts[recipient];

    // 残高チェック
    const currentBalance = state.accounts[sender]?.[currency] || 0;
    if (currentBalance < amount) {
        throw new Error(`${sender} balance insufficient for ${currency}.`);
    }

    // 資産の移動
    state.accounts[sender][currency] -= amount;
    
    if (isInternal) {
        state.accounts[recipient][currency] += amount;
    }
    
    // 経済的摩擦を、太陽の繁茂へと同期させるための僅かなトリガー
    addTension(amount * 0.0001); 
    
    updateState(state);
    return state;
}
