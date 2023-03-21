import { URLSearchParamsInit } from 'react-router-dom';
import { Season } from '../components/pages/researchAgreement/types/Season';
import { ResearchManufacturer } from '../types/ResearchManufacturer';
import { ResearchStrategyType } from '../types/ResearchStrategyType';
import { ResearchTacticType } from '../types/ResearchTacticType';

export interface ITechFilesParams {
    id: string;
}

export interface IResearchAgreementParams {
    season: Season;
    manufacturer: ResearchManufacturer | null;
    strategy: ResearchStrategyType | null;
    tactic: ResearchTacticType | null;
    shipId: string | null;
}

export const routes = {
    techFiles: createRouteDefinition<ITechFilesParams>('techFiles'),
    researchAgreement: createRouteDefinition<IResearchAgreementParams>('researchAgreement'),
    shipData: createRouteDefinition<never>('shipData'),
    fleetSetup: createRouteDefinition<never>('fleetSetup'),
    myList: createRouteDefinition<never>('myList'),
    dpmCalc: createRouteDefinition<never>('dpmCalc'),
    imageEdit: createRouteDefinition<never>('imageEdit'),
} as const;

type TCreateSeachParams<TParams> = (params: TParams) => URLSearchParamsInit;

interface ICreateRouteDefinitionResult<TParams> {
    path: string;
    routePath: string;
    createSearchParams: TCreateSeachParams<TParams>;
    createPath: (params: TParams) => string;
    getSearchParam: <TKey extends keyof TParams>(key: TKey, urlSearchParams: URLSearchParams) => TParams[TKey] | null;
}

function createRouteDefinition<TParams>(basePath: string): ICreateRouteDefinitionResult<TParams> {
    return {
        path: '/' + basePath,
        routePath: basePath,
        createSearchParams: (params: TParams): URLSearchParamsInit => {
            const parameters = params as unknown as Record<string, string | null>;
            return Object.keys(parameters).reduce((acc, key: string) => ({
                ...acc,
                ...(parameters[key] === null ? {} : {
                    [key]: `${parameters[key]}`,
                }),
            }), {} as Record<string, string>) as unknown as URLSearchParamsInit;
        },
        createPath: (params: TParams) => `/${basePath}?${(new URLSearchParams(params as unknown as Record<string, string>))}`,
        getSearchParam: <TKey extends keyof TParams>(key: TKey, urlSearchParams: URLSearchParams): TParams[TKey] | null => {
            const value = urlSearchParams.get(key as string);
            return value === 'null' ? null : value as TParams[TKey] | null;
        },
    };
}
