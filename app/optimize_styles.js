const fs = require('fs');
const path = require('path');

const directories = ['./components', './app'];

const replacements = [
    { regex: /text-white/g, replacement: 'text-[var(--color-text)]' },
    { regex: /text-slate-50/g, replacement: 'text-[var(--color-text)]' },
    { regex: /text-slate-300/g, replacement: 'text-[var(--color-muted)]' },
    { regex: /text-slate-400/g, replacement: 'text-[var(--color-muted)]' },
    { regex: /text-slate-500/g, replacement: 'text-[var(--color-muted)]' },
    { regex: /bg-slate-800(\/50|\/20)?/g, replacement: 'bg-[var(--color-surface)]' },
    { regex: /bg-slate-900/g, replacement: 'bg-[var(--color-bg)]' },
    { regex: /border-slate-700(\/60|\/50)?/g, replacement: 'border-[var(--color-border)]' },
    { regex: /border-slate-600/g, replacement: 'border-[var(--color-border)]' },
    { regex: /bg-slate-800/g, replacement: 'bg-[var(--color-surface)]' },
    { regex: /text-slate-900\s+dark:text-white/g, replacement: 'text-[var(--color-text)]' },
];

function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;
            for (const { regex, replacement } of replacements) {
                if (regex.test(content)) {
                    content = content.replace(regex, replacement);
                    modified = true;
                }
            }
            // fix potential `text-[var(--color-text)]` appearing in wrong places if already replaced
            // Not needed if we only run once
            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

for (const dir of directories) {
    if (fs.existsSync(dir)) processDirectory(dir);
}
