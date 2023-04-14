import {describe, expect, it} from "vitest";
import {createDict} from "./index";

const data = {
    a: 'a',
    b: 'b',
    c: 'c',
}
const getDictHttp = ():Promise<Record<string, string>> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data)
        }, 1000)
    })
}

describe('dict', () => {

    it('should save data', async function () {
        const useDict = createDict<Record<string, string>>(getDictHttp)
        const dict = await useDict()
        expect(dict).toBe(data)
    });

    it('should return undefined', async function () {
        const useDict = createDict(async () => {
        })
        const dict = await useDict()
        expect(dict).toBe(undefined);
    });

    it('should clear', async function () {
        let count:number = 0;
        const getDictHttp = () => {
            count++;
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(data)
                }, 1000)
            })
        }
        const useDict = createDict(getDictHttp)
        await useDict()
        useDict.clear()
        await useDict()
        expect(count).toBe(2);
    });

    it('multiple call', async function () {
        let count:number = 0;
        const getDictHttp = () => {
            count++;
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(data)
                }, 1000)
            })
        }

        const useDict = createDict(getDictHttp)
        const dict = await useDict()
        expect(dict).toBe(data);
        expect(count).toBe(1);
    });

})