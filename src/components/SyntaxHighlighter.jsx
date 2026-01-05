import React from 'react';

/**
 * Simple Syntax Highlighter Component
 * Provides basic syntax highlighting for code display
 */

// Language-specific keyword patterns
const languagePatterns = {
    python: {
        keywords: ['def', 'return', 'if', 'else', 'elif', 'for', 'while', 'in', 'range', 'len', 'and', 'or', 'not', 'True', 'False', 'None', 'import', 'from', 'as', 'class', 'self', 'print', 'lambda'],
        types: ['int', 'str', 'list', 'dict', 'tuple', 'set', 'bool', 'float'],
        builtins: ['len', 'range', 'print', 'enumerate', 'zip', 'map', 'filter', 'sorted', 'min', 'max', 'sum', 'abs']
    },
    javascript: {
        keywords: ['function', 'return', 'if', 'else', 'for', 'while', 'const', 'let', 'var', 'new', 'this', 'true', 'false', 'null', 'undefined', 'async', 'await', 'class', 'export', 'import', 'from', 'default', 'try', 'catch', 'throw', 'switch', 'case', 'break', 'continue'],
        types: ['Array', 'Object', 'String', 'Number', 'Boolean', 'Map', 'Set', 'Promise'],
        builtins: ['console', 'log', 'Math', 'floor', 'length', 'push', 'pop', 'shift', 'unshift', 'slice', 'splice', 'filter', 'map', 'reduce', 'forEach', 'indexOf', 'includes']
    },
    java: {
        keywords: ['public', 'private', 'protected', 'static', 'void', 'return', 'if', 'else', 'for', 'while', 'class', 'new', 'this', 'true', 'false', 'null', 'import', 'package', 'extends', 'implements', 'interface', 'try', 'catch', 'throw', 'throws', 'final', 'abstract'],
        types: ['int', 'String', 'boolean', 'double', 'float', 'long', 'char', 'byte', 'short', 'Integer', 'Boolean', 'Double', 'Float', 'Long', 'Object', 'void'],
        builtins: ['System', 'out', 'println', 'Arrays', 'Math', 'length']
    },
    go: {
        keywords: ['func', 'return', 'if', 'else', 'for', 'range', 'var', 'const', 'type', 'struct', 'interface', 'package', 'import', 'defer', 'go', 'chan', 'select', 'case', 'default', 'break', 'continue', 'switch', 'nil', 'true', 'false', 'make', 'append', 'len', 'cap'],
        types: ['int', 'int32', 'int64', 'string', 'bool', 'float64', 'float32', 'byte', 'rune', 'error', 'interface{}'],
        builtins: ['fmt', 'Println', 'Printf', 'len', 'append', 'make', 'copy', 'delete', 'panic', 'recover']
    },
    cpp: {
        keywords: ['void', 'return', 'if', 'else', 'for', 'while', 'class', 'public', 'private', 'protected', 'new', 'delete', 'this', 'true', 'false', 'nullptr', 'const', 'static', 'virtual', 'override', 'template', 'typename', 'namespace', 'using', 'include', 'define', 'ifdef', 'endif', 'auto'],
        types: ['int', 'string', 'bool', 'double', 'float', 'long', 'char', 'size_t', 'vector', 'map', 'set', 'pair', 'array', 'void'],
        builtins: ['cout', 'cin', 'endl', 'std', 'swap', 'sort', 'find', 'begin', 'end', 'push_back', 'pop_back', 'size', 'empty', 'front', 'back']
    },
    rust: {
        keywords: ['fn', 'let', 'mut', 'return', 'if', 'else', 'for', 'while', 'loop', 'match', 'impl', 'struct', 'enum', 'trait', 'pub', 'use', 'mod', 'self', 'Self', 'true', 'false', 'Some', 'None', 'Ok', 'Err', 'async', 'await', 'move', 'ref', 'where', 'in'],
        types: ['i32', 'i64', 'u32', 'u64', 'f32', 'f64', 'bool', 'char', 'str', 'String', 'Vec', 'Option', 'Result', 'Box', 'Rc', 'Arc', 'usize', 'isize'],
        builtins: ['println', 'print', 'vec', 'format', 'panic', 'assert', 'debug_assert', 'len', 'push', 'pop', 'iter', 'map', 'filter', 'collect', 'clone', 'to_vec', 'swap']
    }
};

// Token types for styling
const tokenStyles = {
    keyword: 'text-purple-400 font-semibold',
    type: 'text-cyan-400',
    builtin: 'text-yellow-400',
    string: 'text-green-400',
    number: 'text-orange-400',
    comment: 'text-gray-500 italic',
    function: 'text-blue-400',
    operator: 'text-pink-400',
    bracket: 'text-gray-400',
    default: 'text-gray-300'
};

function tokenize(code, language) {
    const patterns = languagePatterns[language] || languagePatterns.javascript;
    const tokens = [];

    // Split code into lines for processing
    const lines = code.split('\n');

    lines.forEach((line, lineIndex) => {
        let remaining = line;
        let position = 0;

        while (remaining.length > 0) {
            let matched = false;

            // Check for comments (// or #)
            const commentMatch = remaining.match(/^(\/\/.*|#.*)/);
            if (commentMatch) {
                tokens.push({ type: 'comment', value: commentMatch[0] });
                remaining = remaining.slice(commentMatch[0].length);
                matched = true;
                continue;
            }

            // Check for multi-line string or regular string
            const stringMatch = remaining.match(/^("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/);
            if (stringMatch) {
                tokens.push({ type: 'string', value: stringMatch[0] });
                remaining = remaining.slice(stringMatch[0].length);
                matched = true;
                continue;
            }

            // Check for numbers
            const numberMatch = remaining.match(/^(\d+\.?\d*)/);
            if (numberMatch) {
                tokens.push({ type: 'number', value: numberMatch[0] });
                remaining = remaining.slice(numberMatch[0].length);
                matched = true;
                continue;
            }

            // Check for identifiers (words)
            const wordMatch = remaining.match(/^([a-zA-Z_][a-zA-Z0-9_]*)/);
            if (wordMatch) {
                const word = wordMatch[0];
                let type = 'default';

                if (patterns.keywords.includes(word)) {
                    type = 'keyword';
                } else if (patterns.types.includes(word)) {
                    type = 'type';
                } else if (patterns.builtins.includes(word)) {
                    type = 'builtin';
                } else if (remaining.slice(word.length).trim().startsWith('(')) {
                    type = 'function';
                }

                tokens.push({ type, value: word });
                remaining = remaining.slice(word.length);
                matched = true;
                continue;
            }

            // Check for operators
            const operatorMatch = remaining.match(/^([+\-*/%=<>!&|^~?:]+)/);
            if (operatorMatch) {
                tokens.push({ type: 'operator', value: operatorMatch[0] });
                remaining = remaining.slice(operatorMatch[0].length);
                matched = true;
                continue;
            }

            // Check for brackets
            const bracketMatch = remaining.match(/^([\[\]{}()])/);
            if (bracketMatch) {
                tokens.push({ type: 'bracket', value: bracketMatch[0] });
                remaining = remaining.slice(1);
                matched = true;
                continue;
            }

            // Default: take single character
            if (!matched) {
                tokens.push({ type: 'default', value: remaining[0] });
                remaining = remaining.slice(1);
            }
        }

        // Add newline token except for last line
        if (lineIndex < lines.length - 1) {
            tokens.push({ type: 'default', value: '\n' });
        }
    });

    return tokens;
}

export default function SyntaxHighlighter({ code, language }) {
    const tokens = tokenize(code, language);

    return (
        <code className="font-mono text-xs sm:text-sm leading-relaxed">
            {tokens.map((token, index) => (
                <span key={index} className={tokenStyles[token.type]}>
                    {token.value}
                </span>
            ))}
        </code>
    );
}
