import { ISystemModule } from '../types/ShipDefinition';

export const modules = {
    toStatic: ((module: ISystemModule): ISystemModule => ({
        ...module,
        id: `static_${module.id}`,
        category: 'STATIC',
    })),
} as const;
