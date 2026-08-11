#!/usr/bin/env node

const fs = require("node:fs")
const path = require("node:path")

const packageRoot = path.resolve(__dirname, "..")
const targetRoot = process.cwd()
const force = process.argv.includes("--force")

if (process.argv.includes("--target")) {
  console.error("--target is no longer supported; OpenCode is installed by default.")
  process.exit(1)
}

const opencodeRoot = path.join(targetRoot, ".opencode")

const opencodeEntries = [
  { source: "opencode/opencode.json", target: "opencode.json" },
  { source: "opencode/agents", target: "agents" },
  { source: "opencode/instructions", target: "instructions" },
  { source: "opencode/skills", target: "skills" },
  { source: "opencode/memory", target: "memory", protectExisting: true },
]

function copyEntry(root, entry) {
  const source = path.join(packageRoot, entry.source)
  const target = path.join(entry.root || root, entry.target)

  if (!fs.existsSync(source)) {
    throw new Error(`Framework file is missing: ${entry.source}`)
  }

  if (entry.protectExisting && fs.existsSync(target)) {
    console.log(`Skipped ${path.relative(targetRoot, target)}; existing project memory is protected.`)
    return
  }

  if (fs.existsSync(target) && !force && !entry.merge) {
    throw new Error(`${path.relative(targetRoot, target)} already exists. Re-run with --force to replace it.`)
  }

  fs.cpSync(source, target, {
    recursive: true,
    force: force || Boolean(entry.merge),
    errorOnExist: !force && !entry.merge,
  })
}

function installOpencode() {
  fs.mkdirSync(opencodeRoot, { recursive: true })
  for (const entry of opencodeEntries) copyEntry(opencodeRoot, entry)
  console.log("Installed opencode-kit into .opencode/.")
  console.log("Restart opencode so it reloads the new config, agents, skills, and memory.")
}

try {
  installOpencode()
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
}
