import { t } from '../i18n';
import { ISystemModule } from '../types/ShipDefinition';

export const modules = {
    toStatic: ((module: ISystemModule): ISystemModule => ({
        ...module,
        id: `static_${module.id}`,
        category: 'STATIC',
    })),
    propulsionSystem: (properties: Partial<ISystemModule>): ISystemModule => {
        return createStaticModule({
            id: 'propulsionSystem',
            name: t('modules.propulsionSystem'),
            ...properties,
        });
    },
} as const;

interface ICreateStaticModuleProperties extends Partial<ISystemModule> {
    id: string;
    name: string;
}

function createStaticModule(properties: ICreateStaticModuleProperties): ISystemModule {
    return {
        category: 'STATIC',
        categoryNumber: 1,
        ...properties,
    };
}
