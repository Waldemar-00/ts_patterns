interface ICommonInterface //! The mostly common data
{
    id: number
    status: string
    setVehicle ( vehicle: any ): void
    submit(): Promise<boolean>
}

class TFInsurance implements ICommonInterface //! A data of company
{
    id!: number
    status!: string
    private vehicle: any
    setVehicle ( vehicle: any ): void
    {
        this.vehicle = vehicle
    }
    async submit (): Promise<boolean>
    {
        const response = await fetch( 'tf', {
            method: "POST",
            body: JSON.stringify( { vehicle: this.vehicle } )
        } )
        return response.ok
    }

}

class ABInsurance implements ICommonInterface //! A data of company
{
    id!: number
    status!: string
    private vehicle: any
    setVehicle ( vehicle: any ): void
    {
        this.vehicle = vehicle
    }
    async submit (): Promise<boolean>
    {
        const response = await fetch( 'ab', {
            method: "POST",
            body: JSON.stringify( { vehicle: this.vehicle } )
        } )
        const data = await response.json()
        return data.isSuccess
    }

}

abstract class AbstractInsuranceFactory //! The common data for all companies
{
    DB: any
    abstract createInsurance (): ICommonInterface
    saveHistory (instance: ICommonInterface): void
    {
        this.DB.save( instance.id, instance.status )
    }
}
//! RESULT - FABRIC
class TFInsuranceFactory extends AbstractInsuranceFactory
{
    name!: string
    createInsurance (): TFInsurance
    {
        return new TFInsurance()
    }
}

class ABInsuranceFactory extends AbstractInsuranceFactory
{
    createInsurance (): ABInsurance
    {
        return new ABInsurance()
    }
}
const TFFactory = new TFInsuranceFactory() //! You also have property name
const TFInstance = TFFactory.createInsurance()
TFFactory.saveHistory( TFInstance )
const ABFactory = new ABInsuranceFactory()


const INSURANCE = {
        TF: TFInsurance,
        AB: ABInsurance,
}
//! COMMON FACTORY one for all NOT UNIQUE
class CommonInsuranceFactory
{
    DB: any
    returnInsurance<T extends keyof typeof INSURANCE> (key: T): typeof INSURANCE[T]
    {
        return INSURANCE[key]
    }
    saveHistory (instance: ICommonInterface): void
    {
        this.DB.save( instance.id, instance.status )
    }
}

const commonFactory = new CommonInsuranceFactory()
const TF = new ( commonFactory.returnInsurance( 'TF' ) )
const AB = new ( commonFactory.returnInsurance( 'AB' ) )