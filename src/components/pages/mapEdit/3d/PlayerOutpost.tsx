import { IPlayerOutpost } from '../types/IMapContent';
import { Station } from './Station';

interface IProps {
    outpost: IPlayerOutpost;
}

export const PlayerOutpost = (props: IProps) => {
    const { outpost } = props;

    return (
        <Station station={outpost.station} />
    );
};
