enum ImageFormat
{
    PNG = 'png',
    JPEG = 'jpg'
}

interface IImageSize
{
    width: number;
    height: number;
}

interface IImageOptions extends IImageSize
{
    format: ImageFormat
}

class ImageBuilder
{
    private formatsStore: ImageFormat[] = []
    private optionsStore: IImageSize[] = []

    addPNG (): this
    {
        if ( !this.formatsStore.includes( ImageFormat.PNG ) )
        {
           this.formatsStore.push( ImageFormat.PNG )
        }
        return this
    }
    addJPEG (): this
    {
        if ( !this.formatsStore.includes( ImageFormat.JPEG ) )
        {
           this.formatsStore.push( ImageFormat.JPEG )
        }
        return this
    }
    addOptions (width: number, height: number): this
    {
        this.optionsStore.push( { width, height } )
       return this
    }
    build (): IImageOptions[]
    {
        const allOptions: IImageOptions[] = []
        this.optionsStore.forEach( ( o, i ) =>
        {
            allOptions.push( {
                width: o.width,
                height: o.height,
                format: this.formatsStore[i]
           })
        })
        return allOptions
    }
}

const options = new ImageBuilder().addJPEG().addOptions( 100, 200 ).addPNG().addOptions( 200, 400 ).build()
console.log( options )
