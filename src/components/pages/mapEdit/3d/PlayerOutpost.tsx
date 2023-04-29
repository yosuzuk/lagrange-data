import { IMapContent, IPlayerOutpost } from '../types/IMapContent';
import { Station } from './Station';

interface IProps {
    outpost: IPlayerOutpost;
    onClick?: (content: IMapContent) => void;
}

export const PlayerOutpost = (props: IProps) => {
    const { outpost, onClick } = props;

    return (
        <Station station={outpost.station} onClick={onClick} />
    );
};
