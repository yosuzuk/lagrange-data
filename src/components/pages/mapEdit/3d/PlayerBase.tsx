import { IPlayerBase } from '../types/IMapContent';
import { Station } from './Station';

interface IProps {
    base: IPlayerBase;
}

export const PlayerBase = (props: IProps) => {
    const { base } = props;

    return (
        <Station station={base.station} />
    );
};
