//////////////////////////////////////////////////////////////////
// 官网参考：https://prettier.io/docs/en/options.html#tab-width //
////////////////////////////////////////////////////////////////
module.exports = {
    /**.pellerrc 的架构 */
    $schema: 'https://json.schemastore.org/prettierrc',
    /**在所有代码语句的末尾添加分号 */
    semi: true,
    /**使用 4 个空格缩进 与 ESLint 的 vue/html-indent 保持一致 */
    tabWidth: 4,
    useTabs: false,
    /**每行最多 160 字符 */
    printWidth: 160,
    /**指定文件的结尾换行符 */
    endOfLine: 'crlf',
    /**使用单引号代替双引号 */
    singleQuote: true,
    /**闭合标签与内容保持同行(JSX)*/
    bracketSameLine: true,
    /**忽略 HTML 空白符敏感度*/
    htmlWhitespaceSensitivity: "ignore",
    /**关闭 Vue 标签强制缩进*/
    vueIndentScriptAndStyle: false,
    plugins: ['prettier-plugin-tailwindcss'],
    tailwindStylesheet: './src/main.css',
};
