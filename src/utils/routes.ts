import { URLSearchParamsInit } from 'react-router-dom';
import { IColumnConfig } from '../components/columns/types/IColumnConfig';
import { FilterKey } from '../components/filter/types/ShipFilterState';
import { MapInteractionMode } from '../components/pages/mapEdit/types/Mode';
import { Season } from '../components/pages/researchAgreement/types/Season';
import { ResearchManufacturer } from '../types/ResearchManufacturer';
import { ResearchStrategyType } from '../types/ResearchStrategyType';
import { ResearchTacticType } from '../types/ResearchTacticType';
import { SortDirection } from './sortingUtils';

export interface ITechFilesParams {
    id: string;
}

export interface IResearchAgreementParams {
    view: 'ships' | 'table';
    season: Season;
    manufacturer: ResearchManufacturer | null;
    strategy: ResearchStrategyType | null;
    tactic: ResearchTacticType | null;
    shipId: string | null;
}

export interface IShipDataParams {
    filter: FilterKey[];
    columns: (keyof IColumnConfig)[];
    sortBy: string | null;
    sortDirection: SortDirection;
}

export interface ITechPointConfigParams {
    filter: FilterKey[];
}

export interface IMapSelectedParams {
    d: string;
    mode?: MapInteractionMode;
}

export const routes = {
    techFiles: createParameterizedRouteDefinition<ITechFilesParams>('techFiles'),
    researchAgreement: createParameterizedRouteDefinition<IResearchAgreementParams>('researchAgreement'),
    shipData: createParameterizedRouteDefinition<IShipDataParams>('shipData'),
    shipDataById: ({ path: (shipId: string) => `/shipData/${shipId}`, routePath: ':shipId' }),
    fleetSetup: createRouteDefinition('fleetSetup'),
    fleetSetupByKey: ({ path: (fleetKey: string) => `/fleetSetup/${fleetKey}`, routePath: ':fleetKey' }),
    fleetSetupEdit: createRouteDefinition('fleetSetup/edit'),
    fleetSetupEditByKey: ({ path: (fleetKey: string) => `/fleetSetup/edit/${fleetKey}`, routePath: ':fleetKey' }),
    techPointConfig: createParameterizedRouteDefinition<ITechPointConfigParams>('techPointConfig'),
    myList: createRouteDefinition('myList'),
    myListEdit: createRouteDefinition('myList/edit'),
    dpmCalc: createRouteDefinition('dpmCalc'),
    imageEdit: createRouteDefinition('imageEdit'),
    map: createRouteDefinition('map'),
    mapSelected: createParameterizedRouteDefinition<IMapSelectedParams>('map/selected'),
    debug: createRouteDefinition('debug'),
} as const;

type TCreateSeachParams<TParams> = (params: TParams) => URLSearchParamsInit;

interface IRouteDefinition {
    path: string;
    routePath: string;
}

function createRouteDefinition(basePath: string): IRouteDefinition {
    return {
        path: '/' + basePath,
        routePath: basePath,
    };
}

interface IParameterizedRouteDefinition<TParams> extends IRouteDefinition {
    createSearchParams: TCreateSeachParams<TParams>;
    createPath: (params: TParams) => string;
    getSearchParam: <TKey extends keyof TParams>(key: TKey, urlSearchParams: URLSearchParams) => TParams[TKey] | null;
}

function createParameterizedRouteDefinition<TParams>(basePath: string): IParameterizedRouteDefinition<TParams> {
    return {
        ...createRouteDefinition(basePath),
        createSearchParams: (params: TParams): URLSearchParamsInit => {
            const parameters = params as unknown as Record<string, string | string[] | null>;
            return Object.keys(parameters).reduce((acc, key: string) => ({
                ...acc,
                ...(parameters[key] === null ? {} : {
                    [key]: Array.isArray(parameters[key]) ? parameters[key] as string[] : `${parameters[key]}`,
                }),
            }), {} as Record<string, string | string[]>) as unknown as URLSearchParamsInit;
        },
        createPath: (params: TParams) => `/${basePath}?${(new URLSearchParams(params as unknown as Record<string, string>))}`,
        getSearchParam: <TKey extends keyof TParams>(key: TKey, urlSearchParams: URLSearchParams): TParams[TKey] | null => {
            const value = urlSearchParams.get(key as string);
            return value === 'null' ? null : value as TParams[TKey] | null;
        },
    };
}
