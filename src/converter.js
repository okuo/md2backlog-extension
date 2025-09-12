class MarkdownToBacklogConverter {
    constructor() {
        this.originalText = '';
    }

    convert(markdownText) {
        this.originalText = markdownText;
        
        if (!markdownText || markdownText.trim() === '') {
            throw new Error('テキストが空です');
        }

        let converted = markdownText;
        this.codeBlocks = [];
        this.inlineCodes = [];

        // 1. コードブロック（```）を一時的に置換して保護
        converted = this.protectCodeBlocks(converted);

        // 2. インラインコード（`code`）を一時的に置換して保護
        converted = this.protectInlineCodes(converted);

        // 3. 太字（**text** → ''text''）を見出しより先に処理
        converted = this.convertBold(converted);

        // 4. 斜体（*text* → '''text'''）
        converted = this.convertItalic(converted);

        // 5. 見出し（# → *）を太字・斜体の後に処理
        converted = this.convertHeadings(converted);

        // 6. 打ち消し（~~text~~ → %%text%%）
        converted = this.convertStrikethrough(converted);

        // 7. リンク（[text](url) → [[text:url]]）
        converted = this.convertLinks(converted);

        // 8. リスト（-, * → -）
        converted = this.convertUnorderedLists(converted);

        // 9. 番号リスト（1. → +）
        converted = this.convertOrderedLists(converted);

        // 10. チェックリスト（- [ ] → - [ ]）
        converted = this.convertCheckLists(converted);

        // 11. 引用ブロック（> text → > text）
        converted = this.convertQuotes(converted);

        // 12. 水平線（--- → ----）
        converted = this.convertHorizontalRules(converted);

        // 13. 保護したコードを復元
        converted = this.restoreInlineCodes(converted);
        converted = this.restoreCodeBlocks(converted);

        // 14. 不要な空改行を削除
        converted = this.removeExcessiveBlankLines(converted);

        return converted;
    }

    protectCodeBlocks(text) {
        return text.replace(/```(\w+)?(?:\r?\n)?([\s\S]*?)```/g, (match, lang, code) => {
            const index = this.codeBlocks.length;
            // Backlog記法でサポートされているのはjavaとcsのみ
            const langAttr = (lang === 'java' || lang === 'cs') ? `:${lang}` : '';
            this.codeBlocks.push(`{code${langAttr}}\n${code.trim()}\n{/code}`);
            return `__CODE_BLOCK_${index}__`;
        });
    }

    protectInlineCodes(text) {
        return text.replace(/`([^`]+)`/g, (match, code) => {
            const index = this.inlineCodes.length;
            this.inlineCodes.push(`{code}${code}{/code}`);
            return `__INLINE_CODE_${index}__`;
        });
    }

    restoreCodeBlocks(text) {
        return text.replace(/__CODE_BLOCK_(\d+)__/g, (match, index) => {
            return this.codeBlocks[parseInt(index)];
        });
    }

    restoreInlineCodes(text) {
        return text.replace(/__INLINE_CODE_(\d+)__/g, (match, index) => {
            return this.inlineCodes[parseInt(index)];
        });
    }

    removeExcessiveBlankLines(text) {
        // 全ての空行を削除（1行以上の連続する空行を0行に）
        return text.replace(/\n\s*\n(\s*\n)*/g, '\n');
    }

    convertHeadings(text) {
        // # → *
        return text.replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, content) => {
            const level = hashes.length;
            return '*'.repeat(level) + ' ' + content;
        });
    }

    convertBold(text) {
        // **text** → '''text'''（Backlog記法では太字は'''）
        return text.replace(/\*\*([^*\r\n]+)\*\*/g, "'''$1'''");
    }

    convertItalic(text) {
        // *text* → ''text''（Backlog記法では斜体は''）
        return text.replace(/(?<!\*)\*([^*\r\n]+)\*(?!\*)/g, "''$1''");
    }

    convertStrikethrough(text) {
        // ~~text~~ → %%text%%
        return text.replace(/~~([^~]+)~~/g, '%%$1%%');
    }

    convertLinks(text) {
        // [text](url) → [[text:url]]
        return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '[[$1:$2]]');
    }

    convertUnorderedLists(text) {
        // - item または * item → - item
        return text.replace(/^[\s]*[\*\-]\s+(.+)$/gm, '- $1');
    }

    convertOrderedLists(text) {
        // 1. item → + item
        return text.replace(/^[\s]*\d+\.\s+(.+)$/gm, '+ $1');
    }

    convertCheckLists(text) {
        // - [ ] item → - [ ] item (そのまま)
        // - [x] item → - [x] item (そのまま)
        return text; // Backlog記法でも同じ形式なのでそのまま
    }

    convertQuotes(text) {
        // > text → > text (そのまま)
        return text; // Backlog記法でも同じ形式なのでそのまま
    }

    convertHorizontalRules(text) {
        // --- または *** → ----
        return text.replace(/^(?:---+|\*\*\*+)$/gm, '----');
    }

    getOriginalText() {
        return this.originalText;
    }
}

// グローバルに公開（popup.jsから使用するため）
window.MarkdownToBacklogConverter = MarkdownToBacklogConverter;