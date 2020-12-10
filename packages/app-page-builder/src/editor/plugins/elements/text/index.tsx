import React from "react";
import loremIpsum from "lorem-ipsum";
import Text, { className } from "./Text";
import { PbEditorPageElementPlugin } from "@webiny/app-page-builder/types";
import { OutputBlockData } from "@editorjs/editorjs";

const createInitialEditorValue = (text: string, type: string): OutputBlockData[] => {
    return [
        {
            type,
            data: {
                text
            }
        }
    ];
};

export default (): PbEditorPageElementPlugin => {
    const defaultLipsum = {
        count: 3,
        units: "sentences",
        sentenceLowerBound: 5,
        sentenceUpperBound: 15
    };

    return {
        name: "pb-editor-page-element-text",
        type: "pb-editor-page-element",
        elementType: "text",
        toolbar: {
            title: "Text",
            group: "pb-editor-element-group-basic",
            preview() {
                const previewText = loremIpsum(defaultLipsum);

                return <p className={className}>{previewText}</p>;
            }
        },
        settings: [
            "pb-editor-page-element-settings-background",
            "",
            "pb-editor-page-element-settings-border",
            "pb-editor-page-element-style-settings-shadow",
            "",
            "pb-editor-page-element-style-settings-padding",
            "pb-editor-page-element-style-settings-margin",
            "",
            "pb-editor-page-element-settings-clone",
            "pb-editor-page-element-settings-delete",
            ""
        ],
        target: ["cell", "block"],
        create({ content = {}, ...options }) {
            const previewText = content.text || loremIpsum(content.lipsum || defaultLipsum);

            return {
                type: "text",
                elements: [],
                data: {
                    text: createInitialEditorValue(previewText, content.typography || "paragraph"),
                    settings: {
                        margin: {
                            mobile: { top: 0, left: 0, right: 0, bottom: 15 },
                            desktop: { top: 0, left: 0, right: 0, bottom: 25 },
                            advanced: true
                        },
                        padding: {
                            desktop: { all: 0 },
                            mobile: { all: 0 }
                        }
                    }
                },
                ...options
            };
        },
        render({ element }) {
            return <Text elementId={element.id} />;
        }
    };
};
