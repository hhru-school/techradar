declare module '*.less' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.module.less' {
    const classes: { [className: string]: string };
    export default classes;
}

declare module '*.svg' {
    import React = require('react');

    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}

declare module '*.png' {
    const value: string;
    export default value;
}
