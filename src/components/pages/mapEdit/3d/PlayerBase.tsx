import { IMapContent, IPlayerBase } from '../types/IMapContent';
import { Station } from './Station';

interface IProps {
    base: IPlayerBase;
    onClick?: (content: IMapContent) => void;
}

export const PlayerBase = (props: IProps) => {
    const { base, onClick } = props;

    return (
        <Station station={base.station} onClick={onClick} />
    );
};
