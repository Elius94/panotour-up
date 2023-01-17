/* eslint-disable no-useless-escape */
// esbuild.js
import { execSync } from "child_process"
import { build, analyzeMetafile } from "esbuild"
import fs from "fs"

const pkg = JSON.parse(fs.readFileSync("./package.json"))

const watch = process.argv.includes("--watch")
const dev = process.argv.includes("--dev") || process.env.NODE_ENV === "development"

const banner = "/* eslint-disable linebreak-style */\n" +
    "/*                                                                            \n" +
    "   ____                      _         ____       _   _____           _       \n" +
    "  / ___|___  _ __  ___  ___ | | ___   / ___|_   _(_) |_   _|__   ___ | |___   \n" +
    " | |   / _ \\| '_ \\/ __|/ _ \\| |/ _ \\ | |  _| | | | |   | |/ _ \\ / _ \\| / __|  \n" +
    " | |__| (_) | | | \\__ \\ (_) | |  __/ | |_| | |_| | |   | | (_) | (_) | \\__ \\  \n" +
    "  \\____\\___/|_| |_|___/\\___/|_|\\___|  \\____|\\__,_|_|   |_|\\___/ \\___/|_|___/  \n" +
    "                                                                              \n" +
    `                                                                      v${pkg.version} \n\n\n` +
    `   ${pkg.description}                                                          \n\n` +
    `   Author: ${pkg.author}\n` +
    `   License: ${pkg.license}\n` +
    `   Repository: ${pkg.repository.url}\n\n` +
    "   This program is free software: you can redistribute it and/or modify\n\n"

await build({
    bundle: true,
    target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
    minifySyntax: dev ? true : false,
    minify: dev ? false : true,
    sourcemap: true,
    color: true,
    metafile: dev ? true : false,
    tsconfig: "./tsconfig.json",
    banner: {
        js: banner
    },
    /*watch: watch ? {
        onRebuild(error, result) {
            if (error) console.error("watch build failed:", error)
            else console.log("watch build succeeded:", result)
        }
    } : false,*/
    outdir: "public/dist",
    entryPoints: ["src/app.ts"],
    plugins: [
        {
            name: "TypeScriptDeclarationsPlugin",
            setup(build) {
                build.onEnd((result) => {
                    if (result.errors.length > 0) return
                    execSync("npx tsc --emitDeclarationOnly --declarationDir ./public/dist/types -p ./tsconfig_esbuild.json")
                })
            }
        }
    ]
}).then(async (result) => {
    console.log("\u001b[36mESM Build succeeded!\u001b[37m")
    if (dev) {
        let text = await analyzeMetafile(result.metafile, {
            verbose: true,
        })
        console.log(text)
    }
    watch ? console.log("\u001b[36mWatching...\u001b[37m") : console.log("\u001b[36mBuild complete!\u001b[37m")
})