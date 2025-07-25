declare module 'vite-plugin-png-to-svg' {
    interface PngToSvgOptions {
        pngPath: string;
        outputPath: string;
        filter?: (file: string) => boolean;
        afterConversion?: () => Promise<void>;
    }
    const plugin: (options: PngToSvgOptions) => any;
    export default plugin;
}
