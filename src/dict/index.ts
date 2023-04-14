interface UseDict<T> {
    (): Promise<T|undefined>;
    clear: ()=>void;
}

export function createDict<T>(request: () => Promise<T>): UseDict<T> {
    let load: boolean = false;
    let value:T|undefined = void 0;

    const useDict = async ():Promise<T|undefined> => {
        if (!load) {
            load = true
            value = await request()
        }
        return value
    }

    useDict.clear = () => {
        load = false;
        value = undefined;
    }

    return useDict
}
