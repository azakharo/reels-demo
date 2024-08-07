/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_ENABLED_FAKE_DATA: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
