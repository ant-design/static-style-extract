import { StyleProviderProps } from "@ant-design/cssinjs/lib/StyleContext";

export type CustomRender = (node: JSX.Element) => JSX.Element;
export type ExtractStyleOptions = {
    hashPriority?: StyleProviderProps["hashPriority"]
};