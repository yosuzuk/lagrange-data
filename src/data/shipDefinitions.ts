import { IShipDefinition } from '../types/ShipDefinition';
import { ediacaran } from './ships/auxiliary/ediacaran';
import { fsv830 } from './ships/auxiliary/fsv830';
import { constantineTheGreat } from './ships/battleCruiser/constantineTheGreat';
import { eternalStorm } from './ships/battleCruiser/eternalStorm';
import { indefatigable } from './ships/battleCruiser/indefatigable';
import { inostrancevia } from './ships/frigate/inostrancevia';
import { spearOfUranus } from './ships/battleCruiser/spearOfUranus';
import { st59 } from './ships/battleCruiser/st59';
import { thunderboldStar } from './ships/battleCruiser/thunderboltStar';
import { cv3000 } from './ships/carrier/cv3000';
import { marshallCrux } from './ships/carrier/marshallCrux';
import { solarWhale } from './ships/carrier/solarWhale';
import { cellularDefender } from './ships/corvette/cellularDefender';
import { cvII003 } from './ships/corvette/cvII003';
import { cvMo11 } from './ships/corvette/cvMo11';
import { cvT800 } from './ships/corvette/cvT800';
import { nebulaChaser } from './ships/corvette/nubulaChaser';
import { redBeast7_13 } from './ships/corvette/redBeast7_13';
import { silentAssassin } from './ships/corvette/silentAssassin';
import { sLevi } from './ships/corvette/sLevi';
import { voidElfin } from './ships/corvette/voidElfin';
import { wildFire } from './ships/corvette/wildFire';
import { callisto } from './ships/cruiser/callisto';
import { cas066 } from './ships/cruiser/cas066';
import { chimera } from './ships/cruiser/chimera';
import { conamaraChaos } from './ships/cruiser/conamaraChaos';
import { crasher } from './ships/cruiser/crasher';
import { io } from './ships/cruiser/io';
import { jaeger } from './ships/cruiser/jaeger';
import { kccpv2_0 } from './ships/cruiser/kccpv2_0';
import { lightCone } from './ships/cruiser/lightCone';
import { predator } from './ships/cruiser/predator';
import { startSweeper } from './ships/cruiser/starSweeper';
import { xt20 } from './ships/cruiser/xt20';
import { ac721 } from './ships/destroyer/ac721';
import { aldabra } from './ships/destroyer/aldabra';
import { argus } from './ships/destroyer/argus';
import { boreas } from './ships/destroyer/boreas';
import { ceres } from './ships/destroyer/ceres';
import { erisI } from './ships/destroyer/erisI';
import { guardian } from './ships/destroyer/guardian';
import { helios } from './ships/destroyer/helios';
import { quaoar } from './ships/destroyer/quaoar';
import { taurus } from './ships/destroyer/taurus';
import { tundra } from './ships/destroyer/tundra';
import { wingedHussar } from './ships/destroyer/wingedHussar';
import { xt10 } from './ships/destroyer/xt10';
import { a101TheRationalTe } from './ships/fighter/a101TheRational';
import { at021 } from './ships/fighter/at021';
import { b192Newland } from './ships/fighter/b192Newland';
import { balancerAnderson } from './ships/fighter/balancerAnderson';
import { br050 } from './ships/fighter/br050';
import { bullfrog } from './ships/fighter/bullfrog';
import { hayreddingsLoyal } from './ships/fighter/hayreddingsLoyal';
import { janbiyaAer410 } from './ships/fighter/janbiyaAer410';
import { mistral } from './ships/fighter/mistral';
import { sandrake } from './ships/fighter/sandrake';
import { sc002 } from './ships/fighter/sc002';
import { sporeA404 } from './ships/fighter/sporeA404';
import { stingray } from './ships/fighter/stingray';
import { strixA100 } from './ships/fighter/strixA100';
import { vitasA021 } from './ships/fighter/vitasA021';
import { vitasB010 } from './ships/fighter/vitasB010';
import { carilion } from './ships/frigate/carilion';
import { fg300 } from './ships/frigate/fg300';
import { grimReaper } from './ships/frigate/grimReaper';
import { mareImbrium } from './ships/frigate/mareImbrium';
import { mareNubium } from './ships/frigate/mareNubium';
import { mareSerenitatis } from './ships/frigate/mareSerenitatis';
import { mareTranquillitatis } from './ships/frigate/mareTranquillitatis';
import { noma330 } from './ships/frigate/noma330';
import { nomaM470 } from './ships/frigate/nomaM470';
import { rager } from './ships/frigate/rager';
import { ranger } from './ships/cruiser/ranger';
import { reliat } from './ships/frigate/reliat';
import { ruby } from './ships/frigate/ruby';
import { xenoStinger } from './ships/frigate/xenoStinger';
import { xt8 } from './ships/frigate/xt8';
import { eternalHeavens } from './ships/carrier/eternalHeavens';
import { haleBopp } from './ships/corvette/haleBopp';
import { templeI } from './ships/corvette/templeI';
import { shieldOfPlutus } from './ships/battleCruiser/shieldOfPlutus';

export const shipDefinitions: IShipDefinition[] = [
    ...a101TheRationalTe,
    ...ac721,
    ...aldabra,
    ...argus,
    ...at021,
    ...b192Newland,
    ...balancerAnderson,
    ...boreas,
    ...br050,
    ...bullfrog,
    ...callisto,
    ...carilion,
    ...cas066,
    ...cellularDefender,
    ...ceres,
    ...chimera,
    ...conamaraChaos,
    ...constantineTheGreat,
    ...crasher,
    ...cvII003,
    ...cvMo11,
    ...cvT800,
    ...cv3000,
    ...ediacaran,
    ...erisI,
    ...eternalHeavens,
    ...eternalStorm,
    ...fsv830,
    ...fg300,
    ...grimReaper,
    ...guardian,
    ...haleBopp,
    ...hayreddingsLoyal,
    ...helios,
    ...indefatigable,
    ...inostrancevia,
    ...io,
    ...jaeger,
    ...janbiyaAer410,
    ...kccpv2_0,
    ...lightCone,
    ...mareImbrium,
    ...mareNubium,
    ...mareSerenitatis,
    ...mareTranquillitatis,
    ...marshallCrux,
    ...mistral,
    ...nebulaChaser,
    ...noma330,
    ...nomaM470,
    ...predator,
    ...quaoar,
    ...redBeast7_13,
    ...rager,
    ...ranger,
    ...reliat,
    ...ruby,
    ...sLevi,
    ...sandrake,
    ...sc002,
    ...silentAssassin,
    ...shieldOfPlutus,
    ...solarWhale,
    ...spearOfUranus,
    ...sporeA404,
    ...st59,
    ...startSweeper,
    ...stingray,
    ...strixA100,
    ...taurus,
    ...templeI,
    ...thunderboldStar,
    ...tundra,
    ...vitasA021,
    ...vitasB010,
    ...voidElfin,
    ...wildFire,
    ...wingedHussar,
    ...xenoStinger,
    ...xt8,
    ...xt10,
    ...xt20,
];
