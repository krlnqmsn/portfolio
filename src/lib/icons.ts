import {
  siBootstrap,
  siClaude,
  siCss,
  siExpress,
  siFacebook,
  siGit,
  siHtml5,
  siJavascript,
  siLaravel,
  siModelcontextprotocol,
  siMongodb,
  siOpenjdk,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siOpenapiinitiative,
  siPhp,
  siPostgresql,
  siPython,
  siQt,
  siReact,
  siTailwindcss,
  siTiktok,
  siTypescript,
} from "simple-icons";

/**
 * Brand marks from simple-icons (24×24 path data, monochrome so they
 * inherit `currentColor`). Only the icons the tech stack actually uses
 * are imported, so the bundle stays small.
 */
export const iconPaths = {
  typescript: siTypescript.path,
  javascript: siJavascript.path,
  react: siReact.path,
  nextjs: siNextdotjs.path,
  html: siHtml5.path,
  css: siCss.path,
  nodejs: siNodedotjs.path,
  express: siExpress.path,
  laravel: siLaravel.path,
  mongodb: siMongodb.path,
  mysql: siMysql.path,
  postgresql: siPostgresql.path,
  tailwindcss: siTailwindcss.path,
  bootstrap: siBootstrap.path,
  php: siPhp.path,
  java: siOpenjdk.path,
  python: siPython.path,
  qt: siQt.path,
  openapi: siOpenapiinitiative.path,
  mcp: siModelcontextprotocol.path,
  claude: siClaude.path,
  git: siGit.path,
  facebook: siFacebook.path,
  tiktok: siTiktok.path,
  /** Generic envelope — there is no "email" brand mark. */
  mail: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z",
} as const;

export type IconName = keyof typeof iconPaths;

/** Map display labels used in project data to their brand mark. */
const TECH_ICONS: Record<string, IconName> = {
  typescript: "typescript",
  javascript: "javascript",
  react: "react",
  "react.js": "react",
  "react native": "react",
  "next.js": "nextjs",
  html: "html",
  css: "css",
  "tailwind css": "tailwindcss",
  bootstrap: "bootstrap",
  "node.js": "nodejs",
  "node js": "nodejs",
  "express.js": "express",
  "express js": "express",
  express: "express",
  laravel: "laravel",
  mongodb: "mongodb",
  "mongo db": "mongodb",
  mysql: "mysql",
  postgresql: "postgresql",
  postgres: "postgresql",
  php: "php",
  java: "java",
  python: "python",
  swing: "java",
  "java swing": "java",
  pyqt: "qt",
  qt: "qt",
};

export function techIcon(label: string): IconName | undefined {
  return TECH_ICONS[label.trim().toLowerCase()];
}
