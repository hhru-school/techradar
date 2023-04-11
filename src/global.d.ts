declare module '*.less' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.module.less' {
    const classes: { [className: string]: string };
    export default classes;
}

declare module '*.svg' {
    const src: string;
    export default src;
}
