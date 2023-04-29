import { IMapContent, IPlayerPlatform } from '../types/IMapContent';
import { Station } from './Station';

interface IProps {
    platform: IPlayerPlatform;
    onClick?: (content: IMapContent) => void;
}

export const PlayerPlatform = (props: IProps) => {
    const { platform, onClick } = props;

    return (
        <Station station={platform.station} onClick={onClick} />
    );
};
