class MarkdownToBacklogConverter {
    constructor() {
        this.originalText = '';
        this.checkLists = [];
    }

    convert(markdownText) {
        this.originalText = markdownText;
        
        if (!markdownText || markdownText.trim() === '') {
            throw new Error('テキストが空です');
        }

        let converted = markdownText;
        this.codeBlocks = [];
        this.inlineCodes = [];
        this.checkLists = [];

        // 1. コードブロック（```）を一時的に置換して保護
        converted = this.protectCodeBlocks(converted);

        // 2. インラインコード（`code`）を一時的に置換して保護
        converted = this.protectInlineCodes(converted);

        // 3. 太字+斜体（***text*** → '''''text'''''）を最初に処理
        converted = this.convertBoldItalic(converted);

        // 4. 太字（**text** → '''text'''）
        converted = this.convertBold(converted);

        // 5. 斜体（*text* → ''text''）
        converted = this.convertItalic(converted);

        // 6. 見出し（# → *）を太字・斜体の後に処理
        converted = this.convertHeadings(converted);

        // 7. 打ち消し（~~text~~ → %%text%%）
        converted = this.convertStrikethrough(converted);

        // 8. 下線（<u>text</u> → &text&）
        converted = this.convertUnderline(converted);

        // 9. 色付きテキスト（<span style="color:red">text</span> → &color(red){text}）
        converted = this.convertColoredText(converted);

        // 10. 画像（![alt](url) → #image(url)）※リンクより先に処理
        converted = this.convertImages(converted);

        // 11. リンク（[text](url) → [[text:url]]）
        converted = this.convertLinks(converted);

        // 12. 自動リンク（<https://url> → [[url]]）
        converted = this.convertAutoLinks(converted);

        // 13. チェックリストを保護（リスト変換で壊れないように）
        converted = this.protectCheckLists(converted);

        // 14. リスト（-, * → -）
        converted = this.convertUnorderedLists(converted);

        // 15. 番号リスト（1. → +）
        converted = this.convertOrderedLists(converted);

        // 15.5 チェックリストを復元
        converted = this.restoreCheckLists(converted);

        // 16. 引用ブロック（> > text → >> text）ネスト対応
        converted = this.convertQuotes(converted);

        // 17. 水平線（--- → ----）
        converted = this.convertHorizontalRules(converted);

        // 18. テーブル（Markdown → Backlog）
        converted = this.convertTables(converted);

        // 19. 保護したコードを復元
        converted = this.restoreInlineCodes(converted);
        converted = this.restoreCodeBlocks(converted);

        // 20. 不要な空改行を削除
        converted = this.removeExcessiveBlankLines(converted);

        return converted;
    }

    protectCodeBlocks(text) {
        // Backlogがサポートする言語のマッピング
        const supportedLangs = {
            'java': 'java',
            'cs': 'cs',
            'csharp': 'cs',
            'c': 'c',
            'cpp': 'cpp',
            'c++': 'cpp',
            'python': 'python',
            'py': 'python',
            'ruby': 'ruby',
            'rb': 'ruby',
            'perl': 'perl',
            'php': 'php',
            'javascript': 'javascript',
            'js': 'javascript',
            'html': 'html',
            'css': 'css',
            'xml': 'xml',
            'sql': 'sql',
            'shell': 'shell',
            'bash': 'shell',
            'sh': 'shell'
        };

        return text.replace(/```(\w+)?(?:\r?\n)?([\s\S]*?)```/g, (match, lang, code) => {
            const index = this.codeBlocks.length;
            // 言語がサポートされていれば変換、なければ言語指定なし
            const mappedLang = lang ? supportedLangs[lang.toLowerCase()] : null;
            const langAttr = mappedLang ? `:${mappedLang}` : '';
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

    convertBoldItalic(text) {
        // ***text*** → '''''text'''''（太字+斜体）
        return text.replace(/\*\*\*([^*\r\n]+)\*\*\*/g, "'''''$1'''''");
    }

    convertBold(text) {
        // **text** → '''text'''（Backlog記法では太字は'''）
        return text.replace(/\*\*([^*\r\n]+)\*\*/g, "'''$1'''");
    }

    convertItalic(text) {
        // *text* → ''text''（Backlog記法では斜体は''）
        return text.replace(/(?<!\*)\*([^*\r\n]+)\*(?!\*)/g, "''$1''");
    }

    convertUnderline(text) {
        // <u>text</u> → &text&（Backlog記法の下線）
        return text.replace(/<u>([^<]+)<\/u>/gi, '&$1&');
    }

    convertColoredText(text) {
        // <span style="color:red">text</span> → &color(red){text}
        // <span style="color: #ff0000">text</span> → &color(#ff0000){text}
        return text.replace(/<span\s+style=["']color:\s*([^"';\s]+)[^"']*["']>([^<]+)<\/span>/gi,
            '&color($1){$2}');
    }

    convertAutoLinks(text) {
        // <https://url> → [[url]]
        // <http://url> → [[url]]
        return text.replace(/<(https?:\/\/[^>]+)>/g, '[[$1]]');
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
        // ネストを考慮した箇条書き変換
        // - item → -
        //   - nested → --
        //     - deep → ---
        return text.replace(/^([\s]*)([\*\-])\s+(.+)$/gm, (match, indent, bullet, content) => {
            // インデントの深さを計算（2スペースまたは1タブ = 1レベル）
            const spaces = indent.replace(/\t/g, '  ').length;
            const level = Math.floor(spaces / 2) + 1;
            return '-'.repeat(level) + ' ' + content;
        });
    }

    convertOrderedLists(text) {
        // ネストを考慮した番号リスト変換
        // 1. item → +
        //    1. nested → ++
        return text.replace(/^([\s]*)\d+\.\s+(.+)$/gm, (match, indent, content) => {
            // インデントの深さを計算（3スペースまたは1タブ = 1レベル）
            const spaces = indent.replace(/\t/g, '   ').length;
            const level = Math.floor(spaces / 3) + 1;
            return '+'.repeat(level) + ' ' + content;
        });
    }

    protectCheckLists(text) {
        // チェックリストを一時的に保護（リスト変換で壊れないように）
        // - [ ] item, - [x] item, - [X] item
        return text.replace(/^([\s]*)-\s+\[([ xX])\]\s+(.+)$/gm, (match, indent, check, content) => {
            const index = this.checkLists.length;
            this.checkLists.push({ indent, check, content });
            return `__CHECKLIST_${index}__`;
        });
    }

    restoreCheckLists(text) {
        return text.replace(/__CHECKLIST_(\d+)__/g, (match, index) => {
            const item = this.checkLists[parseInt(index)];
            return `- [${item.check}] ${item.content}`;
        });
    }

    convertQuotes(text) {
        // 引用のネストを正規化
        // > > text → >> text
        // > > > text → >>> text
        return text.replace(/^(>[\s>]*)\s*/gm, (match) => {
            // > の数をカウントして連続した > に変換
            const count = (match.match(/>/g) || []).length;
            return '>'.repeat(count) + ' ';
        });
    }

    convertHorizontalRules(text) {
        // --- または *** → ----
        return text.replace(/^(?:---+|\*\*\*+)$/gm, '----');
    }

    convertTables(text) {
        // Markdownテーブルを検出して変換
        const lines = text.split('\n');
        const result = [];
        let i = 0;

        while (i < lines.length) {
            const line = lines[i];

            // テーブル行かどうかをチェック（|で始まり|で終わる）
            if (this.isTableRow(line)) {
                const tableLines = [];

                // 連続するテーブル行を収集
                while (i < lines.length && this.isTableRow(lines[i])) {
                    tableLines.push(lines[i]);
                    i++;
                }

                // テーブルを変換
                const convertedTable = this.convertTableBlock(tableLines);
                result.push(...convertedTable);
            } else {
                result.push(line);
                i++;
            }
        }

        return result.join('\n');
    }

    isTableRow(line) {
        if (!line) return false;
        const trimmed = line.trim();
        return trimmed.startsWith('|') && trimmed.endsWith('|');
    }

    isSeparatorRow(line) {
        // |---|---| のような区切り行を検出
        return /^\|[\s\-:|]+\|$/.test(line.trim());
    }

    convertTableBlock(tableLines) {
        if (tableLines.length === 0) return [];

        const result = [];
        let isFirstDataRow = true;

        for (let i = 0; i < tableLines.length; i++) {
            const line = tableLines[i];

            // 区切り行（|---|---|）はスキップ
            if (this.isSeparatorRow(line)) {
                continue;
            }

            // セルを抽出してBacklog形式に変換
            const cells = this.extractTableCells(line);
            let backlogRow = '|' + cells.join('|') + '|';

            // 最初のデータ行（ヘッダー）には h を付ける
            if (isFirstDataRow) {
                backlogRow += 'h';
                isFirstDataRow = false;
            }

            result.push(backlogRow);
        }

        return result;
    }

    extractTableCells(line) {
        // |cell1|cell2| → ['cell1', 'cell2']
        const trimmed = line.trim();
        // 先頭と末尾の | を除去して分割
        const inner = trimmed.slice(1, -1);
        return inner.split('|').map(cell => cell.trim());
    }

    convertImages(text) {
        // ![alt](url) → #image(url)
        return text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '#image($2)');
    }

    getOriginalText() {
        return this.originalText;
    }
}

// グローバルに公開（popup.jsから使用するため）
window.MarkdownToBacklogConverter = MarkdownToBacklogConverter;