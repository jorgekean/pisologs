import { useEffect, useState } from 'react';
import Dexie from 'dexie';
import { v4 as uuidv4 } from 'uuid';

interface Entity {
    id?: string;
}

interface DexieUtilsProps<T extends Entity> {
    tableName: string;
}

function DexieUtils<T extends Entity>({ tableName }: DexieUtilsProps<T>) {
    const [db] = useState(new Dexie(tableName));

    useEffect(() => {
        // console.log((db.verno))
        if (db.verno < 1)
            db.version(1).stores({ [tableName]: 'id' });
        // db.open();
    }, []);

    async function getAll(): Promise<T[]> {
        return db.table<T>(tableName).toArray();
    }

    async function get(id: string): Promise<T | undefined> {
        return db.table<T>(tableName).get(id);
    }

    async function add(entity: T): Promise<string> {
        const id = uuidv4();
        const entityWithId = { ...entity, id };
        await db.table<T>(tableName).add(entityWithId);

        return id;
    }

    async function update(entity: T): Promise<void> {
        const { id, ...rest } = entity;
        if (id) {
            await db.table<T>(tableName).update(id, rest);
        }
    }

    async function deleteEntity(id: string): Promise<void> {
        return db.table<T>(tableName).delete(id);
    }

    return {
        getAll,
        get,
        add,
        update,
        deleteEntity,
    };
}

export default DexieUtils;
