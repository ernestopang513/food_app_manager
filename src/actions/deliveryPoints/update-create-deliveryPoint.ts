import { isAxiosError } from "axios";
import { foodAppApi } from "../../config/api/foodAppApi";
import { DeliveryPoint } from "../../domain/entities/deliveryPoint";
import { log } from "../../config/loggers/logger";


export const updateCreateDeliveryPoint = (deliveryPoint: Partial<DeliveryPoint>) => {

    deliveryPoint.latitude = isNaN(Number(deliveryPoint.latitude)) ? 0 : Number(deliveryPoint.latitude);

    if(deliveryPoint.id && deliveryPoint.id !== 'new') {
        return updateDeliveryPoint(deliveryPoint);
    }

    return createDeliveryPoint(deliveryPoint);

}

const updateDeliveryPoint = async( deliveryPoint: Partial<DeliveryPoint> ): Promise<DeliveryPoint> => {
    const {id, ...rest} = deliveryPoint;

    try {
        const {data} = await foodAppApi.patch(`/delivery-point/${id}`, {
            ...rest
        });
        return data;
    } catch (error) {
        if(isAxiosError(error)) {
            log(error.response?.data, 'updateDeliveryPoint - 27');
        }
        throw new Error(`Error actualizando punto de entrega`)
    }
}


const createDeliveryPoint = async(deliveryPoint: Partial<DeliveryPoint>): Promise<DeliveryPoint> => {
    const {id, ...rest} = deliveryPoint;

    try {
        const {data} = await foodAppApi.post('/delivery-point', {
            ...rest
        })
        return data;
    } catch (error) {
        if(isAxiosError(error)){
            log(error.response?.data, 'createDeliveryPoint - line 44');
        }
        throw new Error(`Error creando punto de entrega`)
    }
}