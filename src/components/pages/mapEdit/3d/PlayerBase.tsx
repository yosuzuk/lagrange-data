import { IPlayerBase } from '../types/IMapContent';
import { Area } from './Area';
import { Station } from './Station';

interface IProps {
    base: IPlayerBase;
}

export const PlayerBase = (props: IProps) => {
    const { base } = props;

    return (
        <>
            <Station station={base.station} />
            <Area area={base.area} />
        </>
    );
};
