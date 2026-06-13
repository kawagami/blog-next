import { useRef } from 'react';
import {
    continueList,
    indent,
    insert,
    isUrl,
    unindent,
    wrapLink,
    type EditResult,
} from '@/libs/markdown-edit';

interface Options {
    /** Called when an image is pasted/dropped; the consumer uploads then calls `insert`. */
    onImageUpload?: (file: File) => void;
}

/**
 * Wires the pure markdown-edit transforms to a textarea: owns the ref, applies
 * results (value + caret restore + focus), and exposes ready-to-spread handlers.
 *
 *   const editor = useMarkdownTextarea(value, setValue, { onImageUpload });
 *   <textarea ref={editor.ref} value={value}
 *             onChange={e => setValue(e.target.value)} {...editor.handlers} />
 */
export function useMarkdownTextarea(
    value: string,
    onChange: (next: string) => void,
    { onImageUpload }: Options = {},
) {
    const ref = useRef<HTMLTextAreaElement>(null);

    const apply = (result: EditResult | null): boolean => {
        if (!result) return false;
        onChange(result.value);
        setTimeout(() => {
            const ta = ref.current;
            if (!ta) return;
            ta.selectionStart = result.start;
            ta.selectionEnd = result.end;
            ta.focus();
        }, 0);
        return true;
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const ta = ref.current;
        if (!ta) return;
        const { selectionStart: s, selectionEnd: en, value: v } = ta;

        if (e.key === 'Tab') {
            e.preventDefault();
            apply(e.shiftKey ? unindent(v, s, en) : indent(v, s, en));
            return;
        }
        if (e.key === 'Enter') {
            if (apply(continueList(v, s, en))) e.preventDefault();
        }
    };

    const onPaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
        const file = Array.from(e.clipboardData.files).find(f => f.type.startsWith('image/'))
            ?? Array.from(e.clipboardData.items).find(i => i.type.startsWith('image/'))?.getAsFile()
            ?? undefined;
        if (file) {
            e.preventDefault();
            onImageUpload?.(file);
            return;
        }

        const ta = ref.current;
        if (!ta) return;
        const { selectionStart: s, selectionEnd: en, value: v } = ta;
        if (s === en) return;
        const pasted = e.clipboardData.getData('text').trim();
        if (!isUrl(pasted)) return;
        if (apply(wrapLink(v, s, en, pasted))) e.preventDefault();
    };

    /** Insert text at the current caret (e.g. uploaded image markdown). */
    const insertText = (text: string) => {
        const ta = ref.current;
        const start = ta?.selectionStart ?? value.length;
        const end = ta?.selectionEnd ?? value.length;
        apply(insert(value, start, end, text));
    };

    return { ref, handlers: { onKeyDown, onPaste }, insert: insertText };
}
