class PopupController {
    constructor() {
        this.converter = new MarkdownToBacklogConverter();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const convertBtn = document.getElementById('convert-btn');
        const backBtn = document.getElementById('back-btn');

        convertBtn.addEventListener('click', () => this.handleConvert());
        backBtn.addEventListener('click', () => this.handleBack());
    }

    async handleConvert() {
        try {
            this.showLoading();
            
            // クリップボードからテキストを取得
            const clipboardText = await this.readClipboard();
            
            if (!clipboardText || clipboardText.trim() === '') {
                throw new Error('クリップボードが空です。\nテキストをコピーしてから実行してください。');
            }

            // Markdownを変換
            const convertedText = this.converter.convert(clipboardText);
            
            // 変換結果をクリップボードにセット
            await this.writeClipboard(convertedText);
            
            this.showSuccess();
            
        } catch (error) {
            console.error('変換エラー:', error);
            this.showError(error.message);
        }
    }

    async handleBack() {
        try {
            const originalText = this.converter.getOriginalText();
            if (originalText) {
                await this.writeClipboard(originalText);
                this.showInitial();
                this.showMessage('元のテキストに戻しました', 'success');
            }
        } catch (error) {
            console.error('復元エラー:', error);
            this.showError('復元に失敗しました');
        }
    }

    async readClipboard() {
        try {
            return await navigator.clipboard.readText();
        } catch (error) {
            throw new Error('クリップボードの読み取りに失敗しました。\nブラウザの権限を確認してください。');
        }
    }

    async writeClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
        } catch (error) {
            throw new Error('クリップボードへの書き込みに失敗しました。\nブラウザの権限を確認してください。');
        }
    }

    showInitial() {
        document.getElementById('initial-state').style.display = 'block';
        document.getElementById('loading-state').style.display = 'none';
        document.getElementById('success-state').style.display = 'none';
        this.clearError();
    }

    showLoading() {
        document.getElementById('initial-state').style.display = 'none';
        document.getElementById('loading-state').style.display = 'block';
        document.getElementById('success-state').style.display = 'none';
        this.clearError();
    }

    showSuccess() {
        document.getElementById('initial-state').style.display = 'none';
        document.getElementById('loading-state').style.display = 'none';
        document.getElementById('success-state').style.display = 'block';
        this.clearError();
    }

    showError(message) {
        document.getElementById('loading-state').style.display = 'none';
        document.getElementById('initial-state').style.display = 'block';
        
        const errorElement = document.getElementById('error-message');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        // 5秒後にエラーメッセージを自動で消す
        setTimeout(() => {
            this.clearError();
        }, 5000);
    }

    showMessage(message, type = 'info') {
        const errorElement = document.getElementById('error-message');
        errorElement.textContent = message;
        errorElement.className = `error ${type}`;
        errorElement.style.display = 'block';
        
        setTimeout(() => {
            this.clearError();
        }, 3000);
    }

    clearError() {
        const errorElement = document.getElementById('error-message');
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        errorElement.className = 'error';
    }
}

// DOM読み込み完了後に初期化
document.addEventListener('DOMContentLoaded', () => {
    new PopupController();
});