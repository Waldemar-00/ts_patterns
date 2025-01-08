"use strict";
var ImageFormat;
(function (ImageFormat) {
    ImageFormat["PNG"] = "png";
    ImageFormat["JPEG"] = "jpg";
})(ImageFormat || (ImageFormat = {}));
class ImageBuilder {
    constructor() {
        this.formatsStore = [];
        this.optionsStore = [];
    }
    addPNG() {
        if (!this.formatsStore.includes(ImageFormat.PNG)) {
            this.formatsStore.push(ImageFormat.PNG);
        }
        return this;
    }
    addJPEG() {
        if (!this.formatsStore.includes(ImageFormat.JPEG)) {
            this.formatsStore.push(ImageFormat.JPEG);
        }
        return this;
    }
    addOptions(width, height) {
        this.optionsStore.push({ width, height });
        return this;
    }
    build() {
        const allOptions = [];
        this.optionsStore.forEach((o, i) => {
            allOptions.push({
                width: o.width,
                height: o.height,
                format: this.formatsStore[i]
            });
        });
        return allOptions;
    }
}
const options = new ImageBuilder().addJPEG().addOptions(100, 200).addPNG().addOptions(200, 400).build();
console.log(options);
