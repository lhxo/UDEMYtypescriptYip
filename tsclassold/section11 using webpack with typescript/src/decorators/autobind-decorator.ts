//Autobind Decorator
    //target and name not used so replaced with _1 and _2
    export function Autobind(_1: any, _2: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        const adjustedDescriptor: PropertyDescriptor = {
            configurable: true,
            get(){
                const boundFunction = originalMethod.bind(this);
                return boundFunction
            }
        }
        return adjustedDescriptor
}